'use client';

import { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';
import { GameScene } from '@/app/game/GameScene';
import { GAME_WIDTH, GAME_HEIGHT } from '@/app/utils/constants';

interface GameBoardProps {
  onGameComplete: () => void;
}

export default function GameBoard({ onGameComplete }: GameBoardProps) {
  const gameref = useRef<Phaser.Game | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const horizontalPadding = 32;
      const verticalPadding = 96;
      const availableWidth = Math.max(window.innerWidth - horizontalPadding, 280);
      const availableHeight = Math.max(window.innerHeight - verticalPadding, 280);
      const nextScale = Math.min(availableWidth / GAME_WIDTH, availableHeight / GAME_HEIGHT, 1);
      setScale(Number.isFinite(nextScale) ? nextScale : 1);
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  useEffect(() => {
    if (gameref.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 300 },
          debug: false,
        } as any,
      },
      scene: GameScene,
      render: {
        pixelArt: true,
        antialias: true,
      },
      parent: 'game-container',
      callbacks: {
        postBoot: (game) => {
          // Set callback after game boots
          const scene = game.scene.getScene('GameScene') as GameScene;
          if (scene) {
            scene.setOnComplete(onGameComplete);
          }
        },
      },
    };

    const game = new Phaser.Game(config);
    gameref.current = game;

    return () => {
      if (gameref.current) {
        gameref.current.destroy(true);
        gameref.current = null;
      }
    };
  }, [onGameComplete]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 md:px-8 py-6 md:py-8 bg-gradient-to-br from-pixel-light-lavender to-pixel-cream overflow-hidden">
      <div
        className="origin-center"
        style={{
          width: `${GAME_WIDTH}px`,
          height: `${GAME_HEIGHT}px`,
          transform: `scale(${scale})`,
        }}
      >
        <div
          id="game-container"
          className="flex items-center justify-center"
          style={{
            width: `${GAME_WIDTH}px`,
            height: `${GAME_HEIGHT}px`,
          }}
        />
      </div>
    </div>
  );
}
