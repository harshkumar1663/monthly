import * as Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '@/app/utils/constants';

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private walls!: Phaser.Physics.Arcade.StaticGroup;
  private doubts!: Phaser.Physics.Arcade.Group;
  private memories!: Phaser.Physics.Arcade.Group;
  private gate!: Phaser.Physics.Arcade.Image;
  private goalCharacter!: Phaser.GameObjects.Container;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wKey!: Phaser.Input.Keyboard.Key;
  private aKey!: Phaser.Input.Keyboard.Key;
  private sKey!: Phaser.Input.Keyboard.Key;
  private dKey!: Phaser.Input.Keyboard.Key;

  private onComplete?: () => void;
  private hasWon = false;
  private memoryCount = 0;
  private readonly memoryTarget = 3;
  private lastMindHitAt = 0;

  private touchLeft = false;
  private touchRight = false;
  private touchUp = false;
  private touchDown = false;

  private objectiveText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private hintText!: Phaser.GameObjects.Text;
  private warningText!: Phaser.GameObjects.Text;

  constructor() {
    super('GameScene');
  }

  setOnComplete(callback: () => void) {
    this.onComplete = callback;
    this.registry.set('onComplete', callback);
  }

  preload() {}

  create() {
    if (!this.onComplete) {
      this.onComplete = this.registry.get('onComplete');
    }

    this.cameras.main.setBackgroundColor(0xe2d2f3);
    (this.physics.world as any).gravity.y = 0;

    this.createTextures();
    this.createBackdrop();
    this.createMaze();
    this.createPlayer();
    this.createMemories();
    this.createDoubts();
    this.createGoal();

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.player, this.gate);
    this.physics.add.overlap(this.player, this.memories, this.collectMemory as any, undefined, this);
    this.physics.add.overlap(this.player, this.doubts, this.hitDoubt as any, undefined, this);

    this.objectiveText = this.add.text(GAME_WIDTH / 2, 14, 'Maze of Love: collect 3 memories, unlock gate, reach CUTIEPIE', {
      fontSize: '15px',
      fontFamily: 'var(--font-pixelify)',
      color: '#4A4A4A',
      backgroundColor: '#FFF8F0',
      padding: { x: 10, y: 5 },
    });
    this.objectiveText.setOrigin(0.5, 0);
    this.objectiveText.setDepth(100);

    this.statusText = this.add.text(18, 18, `Memories: ${this.memoryCount}/${this.memoryTarget}`, {
      fontSize: '18px',
      fontFamily: 'var(--font-pixelify)',
      color: '#FF69B4',
      stroke: '#FFFFFF',
      strokeThickness: 3,
    });
    this.statusText.setDepth(100);

    this.warningText = this.add.text(GAME_WIDTH / 2, 46, '', {
      fontSize: '13px',
      fontFamily: 'var(--font-pixelify)',
      color: '#FFFFFF',
      backgroundColor: '#8F79B5',
      padding: { x: 8, y: 3 },
    });
    this.warningText.setOrigin(0.5, 0);
    this.warningText.setDepth(101);
    this.warningText.setVisible(false);

    this.hintText = this.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT - 22,
      'Move: Arrow Keys or WASD | Avoid doubts (☁️) in motion',
      {
        fontSize: '12px',
        fontFamily: 'var(--font-pixelify)',
        color: '#4A4A4A',
        backgroundColor: '#FFFFFF',
        padding: { x: 10, y: 4 },
      }
    );
    this.hintText.setOrigin(0.5, 0.5);
    this.hintText.setDepth(100);

    this.createOnScreenControls();
  }

  update() {
    if (this.hasWon) return;

    const speed = 165;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.aKey.isDown || this.touchLeft) vx = -speed;
    else if (this.cursors.right.isDown || this.dKey.isDown || this.touchRight) vx = speed;

    if (this.cursors.up.isDown || this.wKey.isDown || this.touchUp) vy = -speed;
    else if (this.cursors.down.isDown || this.sKey.isDown || this.touchDown) vy = speed;

    this.player.setVelocity(vx, vy);

    if (vx < 0) this.player.setFlipX(true);
    if (vx > 0) this.player.setFlipX(false);

    const canWin = this.memoryCount >= this.memoryTarget;
    if (canWin) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.goalCharacter.x, this.goalCharacter.y);
      if (distance < 40) {
        this.winGame();
      }
    }
  }

  private createTextures() {
    const cat = this.make.graphics({} as any);
    cat.lineStyle(2, 0x2e2e2e, 1);
    cat.fillStyle(0xfff8f0, 1);
    cat.fillRoundedRect(4, 6, 24, 22, 8);
    cat.strokeRoundedRect(4, 6, 24, 22, 8);
    cat.fillTriangle(8, 8, 11, 2, 14, 8);
    cat.fillTriangle(18, 8, 21, 2, 24, 8);
    cat.strokeTriangle(8, 8, 11, 2, 14, 8);
    cat.strokeTriangle(18, 8, 21, 2, 24, 8);
    cat.fillStyle(0x4a4a4a, 1);
    cat.fillCircle(12, 16, 2);
    cat.fillCircle(20, 16, 2);
    cat.fillStyle(0xff69b4, 1);
    cat.fillCircle(16, 20, 1.8);
    cat.generateTexture('player-topdown', 32, 32);
    cat.destroy();

    const wall = this.make.graphics({} as any);
    wall.fillStyle(0xb698d6, 1);
    wall.fillRoundedRect(0, 0, 32, 32, 4);
    wall.lineStyle(2, 0x5f4a82, 1);
    wall.strokeRoundedRect(0, 0, 32, 32, 4);
    wall.generateTexture('maze-wall', 32, 32);
    wall.destroy();

    const memory = this.make.graphics({} as any);
    memory.fillStyle(0xfff8f0, 1);
    memory.fillRoundedRect(4, 4, 16, 16, 5);
    memory.fillStyle(0xff69b4, 1);
    memory.fillCircle(12, 12, 5);
    memory.fillStyle(0xffd580, 1);
    memory.fillCircle(12, 12, 2.5);
    memory.generateTexture('memory-orb', 24, 24);
    memory.destroy();

    const doubt = this.make.graphics({} as any);
    doubt.fillStyle(0x9bb0c8, 1);
    doubt.fillCircle(10, 14, 8);
    doubt.fillCircle(20, 12, 10);
    doubt.fillCircle(30, 14, 8);
    doubt.fillRoundedRect(8, 14, 24, 10, 6);
    doubt.generateTexture('doubt-cloud', 40, 28);
    doubt.destroy();

    const gate = this.make.graphics({} as any);
    gate.fillStyle(0x8f79b5, 1);
    gate.fillRoundedRect(0, 0, 26, 64, 6);
    gate.fillStyle(0xbca9d8, 1);
    gate.fillRoundedRect(4, 6, 18, 50, 4);
    gate.generateTexture('love-gate', 26, 64);
    gate.destroy();

    const goal = this.make.graphics({} as any);
    goal.fillStyle(0xadd8e6, 1);
    goal.fillRoundedRect(4, 16, 24, 28, 4);
    goal.fillStyle(0xffb6c1, 1);
    goal.fillCircle(16, 10, 12);
    goal.fillStyle(0x4a4a4a, 1);
    goal.fillCircle(12, 8, 2);
    goal.fillCircle(20, 8, 2);
    goal.generateTexture('goal-character', 32, 48);
    goal.destroy();
  }

  private createBackdrop() {
    for (let i = 0; i < 8; i++) {
      const star = this.add.text(40 + i * 95, 70 + (i % 2) * 30, '✨', { fontSize: '14px' });
      star.setAlpha(0.22);
      this.tweens.add({
        targets: star,
        alpha: 0.15,
        duration: 1000 + i * 120,
        yoyo: true,
        repeat: -1,
      });
    }
  }

  private createMaze() {
    this.walls = this.physics.add.staticGroup();

    const addWall = (x: number, y: number, width: number, height: number) => {
      const w = this.walls.create(x, y, 'maze-wall') as Phaser.Physics.Arcade.Sprite;
      w.setDisplaySize(width, height);
      w.refreshBody();
    };

    addWall(GAME_WIDTH / 2, 2, GAME_WIDTH, 8);
    addWall(GAME_WIDTH / 2, GAME_HEIGHT - 2, GAME_WIDTH, 8);
    addWall(2, GAME_HEIGHT / 2, 8, GAME_HEIGHT);
    addWall(GAME_WIDTH - 2, GAME_HEIGHT / 2, 8, GAME_HEIGHT);

    addWall(180, 160, 260, 14);
    addWall(460, 220, 280, 14);
    addWall(250, 300, 300, 14);
    addWall(580, 370, 320, 14);
    addWall(210, 450, 260, 14);

    addWall(120, 250, 14, 190);
    addWall(360, 110, 14, 180);
    addWall(520, 300, 14, 170);
    addWall(700, 170, 14, 210);

    addWall(760, 560, 70, 14);

    this.gate = this.physics.add.staticImage(690, 535, 'love-gate');
    this.gate.refreshBody();

    const gateLabel = this.add.text(690, 500, 'LOCKED', {
      fontSize: '11px',
      fontFamily: 'var(--font-pixelify)',
      color: '#FFFFFF',
      backgroundColor: '#8F79B5',
      padding: { x: 6, y: 2 },
    });
    gateLabel.setOrigin(0.5);
    gateLabel.setDepth(40);
    this.gate.setData('labelRef', gateLabel);
  }

  private createPlayer() {
    const marker = this.add.circle(60, 540, 20, 0xffffff, 0.3);
    marker.setStrokeStyle(2, 0xff69b4, 0.8);
    marker.setDepth(19);

    this.player = this.physics.add.sprite(60, 540, 'player-topdown');
    this.player.setScale(1.15);
    this.player.setCollideWorldBounds(true);
    this.player.setDepth(20);

    this.tweens.add({
      targets: marker,
      alpha: 0.12,
      scale: 1.12,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    this.events.on('update', () => {
      marker.setPosition(this.player.x, this.player.y + 2);
    });
  }

  private createMemories() {
    this.memories = this.physics.add.group({ allowGravity: false, immovable: true });

    const positions = [
      { x: 90, y: 90 },
      { x: 610, y: 90 },
      { x: 610, y: 520 },
    ];

    positions.forEach((pos, i) => {
      const memory = this.memories.create(pos.x, pos.y, 'memory-orb') as Phaser.Physics.Arcade.Sprite;
      memory.setScale(0.9);
      this.tweens.add({
        targets: memory,
        y: pos.y - 8,
        duration: 900 + i * 120,
        yoyo: true,
        repeat: -1,
      });
    });
  }

  private createDoubts() {
    this.doubts = this.physics.add.group({ allowGravity: false, immovable: true });

    const createLabeledDoubt = (x: number, y: number, label: string) => {
      const doubt = this.doubts.create(x, y, 'doubt-cloud') as Phaser.Physics.Arcade.Sprite;
      doubt.setData('label', label);

      const doubtLabel = this.add.text(x, y - 24, label, {
        fontSize: '10px',
        fontFamily: 'var(--font-pixelify)',
        color: '#FFFFFF',
        backgroundColor: '#7f6aa6',
        padding: { x: 4, y: 2 },
      });
      doubtLabel.setOrigin(0.5);
      doubtLabel.setDepth(60);

      return { doubt, doubtLabel };
    };

    const d1 = createLabeledDoubt(250, 255, 'Overthinking');
    const d2 = createLabeledDoubt(560, 335, 'Distance');
    const d3 = createLabeledDoubt(355, 520, 'What If');
    const d4 = createLabeledDoubt(445, 430, 'Insecurity');

    this.tweens.add({ targets: [d1.doubt, d1.doubtLabel], x: 540, duration: 1650, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.tweens.add({ targets: [d2.doubt, d2.doubtLabel], y: 520, duration: 1450, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.tweens.add({ targets: [d3.doubt, d3.doubtLabel], x: 100, duration: 1300, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.tweens.add({ targets: [d4.doubt, d4.doubtLabel], y: 260, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  }

  private createGoal() {
    this.goalCharacter = this.add.container(750, 500);
    const character = this.add.sprite(0, 0, 'goal-character');
    const heart = this.add.text(0, -36, '💖', { fontSize: '20px' }).setOrigin(0.5);
    const label = this.add
      .text(0, -58, 'CUTIEPIE', {
        fontSize: '12px',
        fontFamily: 'var(--font-pixelify)',
        color: '#FFFFFF',
        backgroundColor: '#FF69B4',
        padding: { x: 8, y: 3 },
      })
      .setOrigin(0.5);

    this.goalCharacter.add([character, heart, label]);
    this.goalCharacter.setDepth(50);

    this.tweens.add({
      targets: heart,
      y: -40,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });
  }

  private collectMemory(_playerObj: Phaser.GameObjects.GameObject, memoryObj: Phaser.GameObjects.GameObject) {
    const memory = memoryObj as Phaser.Physics.Arcade.Sprite;
    memory.destroy();
    this.memoryCount += 1;
    this.statusText.setText(`Memories: ${this.memoryCount}/${this.memoryTarget}`);

    this.cameras.main.flash(100, 255, 190, 220, false);

    if (this.memoryCount >= this.memoryTarget) {
      this.gate.disableBody(true, true);
      const label = this.gate.getData('labelRef') as Phaser.GameObjects.Text;
      if (label) {
        label.setText('OPEN');
        label.setBackgroundColor('#FF69B4');
      }
      this.warningText.setText('Gate unlocked! Go to CUTIEPIE 💖');
      this.warningText.setVisible(true);
      this.time.delayedCall(1000, () => this.warningText.setVisible(false));
    }
  }

  private hitDoubt(playerObj: Phaser.GameObjects.GameObject, doubtObj: Phaser.GameObjects.GameObject) {
    const now = this.time.now;
    if (now - this.lastMindHitAt < 700) return;
    this.lastMindHitAt = now;

    const player = playerObj as Phaser.Physics.Arcade.Sprite;
    const doubt = doubtObj as Phaser.Physics.Arcade.Sprite;
    player.setPosition(60, 540);
    player.setVelocity(0, 0);

    const label = (doubt.getData('label') as string) || 'Doubt';
    this.warningText.setText(`${label} caught you. Breathe and try again.`);
    this.warningText.setVisible(true);
    this.time.delayedCall(900, () => this.warningText.setVisible(false));

    this.cameras.main.shake(120, 0.004);
  }

  private createOnScreenControls() {
    const makeButton = (
      x: number,
      y: number,
      text: string,
      onPress: (value: boolean) => void
    ) => {
      const circle = this.add.circle(x, y, 28, 0xffffff, 0.38);
      circle.setStrokeStyle(2, 0x8f79b5, 0.9);
      circle.setScrollFactor(0);
      circle.setDepth(120);
      circle.setInteractive({ useHandCursor: true });

      const label = this.add.text(x, y, text, {
        fontSize: '20px',
        fontFamily: 'var(--font-pixelify)',
        color: '#4A4A4A',
      });
      label.setOrigin(0.5);
      label.setScrollFactor(0);
      label.setDepth(121);

      circle.on('pointerdown', () => onPress(true));
      circle.on('pointerup', () => onPress(false));
      circle.on('pointerout', () => onPress(false));
      circle.on('pointerupoutside', () => onPress(false));
    };

    makeButton(70, GAME_HEIGHT - 70, '←', (v) => {
      this.touchLeft = v;
    });
    makeButton(146, GAME_HEIGHT - 70, '→', (v) => {
      this.touchRight = v;
    });
    makeButton(108, GAME_HEIGHT - 132, '↑', (v) => {
      this.touchUp = v;
    });
    makeButton(108, GAME_HEIGHT - 18, '↓', (v) => {
      this.touchDown = v;
    });
  }

  private winGame() {
    this.hasWon = true;
    this.player.setVelocity(0, 0);

    for (let i = 0; i < 30; i++) {
      const spark = this.add.text(this.goalCharacter.x, this.goalCharacter.y, ['✨', '💖', '⭐'][i % 3], {
        fontSize: '24px',
      });

      this.tweens.add({
        targets: spark,
        x: spark.x + (Math.random() - 0.5) * 260,
        y: spark.y - Math.random() * 220,
        alpha: 0,
        angle: Math.random() * 540 - 270,
        duration: 1300,
        onComplete: () => spark.destroy(),
      });
    }

    const victoryText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, 'You made it through the maze 💞', {
      fontSize: '26px',
      fontFamily: 'var(--font-press-start)',
      color: '#FF69B4',
      stroke: '#FFFFFF',
      strokeThickness: 4,
    });
    victoryText.setOrigin(0.5);
    victoryText.setAlpha(0);
    victoryText.setDepth(200);

    this.tweens.add({
      targets: victoryText,
      alpha: 1,
      scale: 1.08,
      duration: 500,
      yoyo: true,
      repeat: 2,
    });

    this.time.delayedCall(2500, () => {
      this.cameras.main.fadeOut(900, 255, 182, 193);
    });

    this.time.delayedCall(3400, () => {
      if (this.onComplete) this.onComplete();
    });
  }
}
