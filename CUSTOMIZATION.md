# 📁 Project Structure & Customization Guide

## Directory Structure

```
romantic-pixelart-app/
├── app/
│   ├── components/         # All React components
│   │   ├── PasswordScreen.tsx      # Entry password screen
│   │   ├── TimelineSection.tsx     # 9-month timeline
│   │   ├── GameBoard.tsx           # Phaser game container
│   │   └── FinalMessage.tsx        # Ending screen
│   │
│   ├── game/               # Phaser.js game code
│   │   └── GameScene.ts            # Main game logic & mechanics
│   │
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts                # Type definitions
│   │
│   ├── utils/              # Helper functions & constants
│   │   ├── constants.ts            # Timeline data, colors, game settings
│   │   └── helpers.ts              # Utility functions
│   │
│   ├── globals.css         # Global styles & animations
│   ├── layout.tsx          # Root layout with fonts
│   └── page.tsx            # Main page (orchestrates all screens)
│
├── public/                 # Static assets
│   └── pixels/             # Folder for custom pixel art
│
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript config
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies
└── README.md               # Documentation
```

## Key Files to Customize

### 1. **Password** - `app/utils/constants.ts`

```typescript
export const APP_PASSWORD = "yourSecretPassword";
```

**Tips:**
- Make it meaningful (inside joke, important date, pet's name)
- Keep it memorable!
- Case-sensitive by default

### 2. **Timeline Events** - `app/utils/constants.ts`

```typescript
export const TIMELINE_EVENTS = [
  {
    id: 1,
    month: 1,
    title: "Your Event Title",
    description: "What happened that month",
    emoji: "💕",           // Use any emoji
    color: "pixel-pink",   // Choose from available colors
  },
  // ... 9 events total (one per month)
];
```

**Available Colors:**
- `pixel-pink`, `pixel-dark-pink`, `pixel-lavender`, `pixel-light-lavender`
- `pixel-blue`, `pixel-light-blue`, `pixel-cream`, `pixel-white`
- `pixel-peach`, `pixel-mint`, `pixel-yellow`

### 3. **Final Message** - `app/components/FinalMessage.tsx`

Find this section and customize:

```typescript
const message = `
  Your personal message here!
  Can span multiple lines...
  Include emojis if you want! 💕
`;
```

### 4. **Colors & Styling** - `tailwind.config.ts`

Modify the entire color scheme:

```typescript
colors: {
  "pixel-pink": "#FFB6C1",      // Your pink
  "pixel-lavender": "#E6B3E1",  // Your purple
  // ... customize all colors
}
```

### 5. **Fonts** - `app/globals.css`

Change pixel fonts by updating the Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap');
```

**Font Suggestions:**
- Press Start 2P (pixel title font)
- Pixelify Sans (readable pixel body)
- Silkscreen (modern pixel)
- JetBrains Mono (tech pixel)

### 6. **Game Parameters** - `app/utils/constants.ts`

```typescript
export const GRAVITY = 300;       // How strongly gravity pulls down
export const JUMP_VELOCITY = -400; // How high player jumps

// Game window size
export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
```

## Component Details

### PasswordScreen Component

**Props:**
- `onPasswordCorrect: () => void` - Called when correct password entered

**What to modify:**
- Error message ("Oops! Wrong password...")
- Hint text
- Decorative elements (emoji)
- Animation effects

### TimelineSection Component

**Props:**
- `onScrollComplete: () => void` - Called when user clicks "Play The Game"

**What to modify:**
- "Our 9 Month Journey" title
- Event descriptions and emojis
- Timeline colors
- Animation speeds

### GameBoard Component

Wraps Phaser and manages game lifecycle.

**Game Objective:** Collect 5 hearts to win

**Controls:**
- Arrow keys or A/D to move
- Space or W to jump
- Collect hearts by walking over them

### FinalMessage Component

**Props:**
- `onRestart: () => void` - Called when user clicks back button

**Customize:**
- Main message
- Celebration emojis
- Stats display (months, forever, love %)
- button text

## Advanced Customization

### Change Game Win Condition

In `app/game/GameScene.ts`, modify:

```typescript
if (this.score >= 5) {  // Change 5 to any number
  this.winGame();
}
```

### Add Background Music

1. Place MP3 file in `public/audio/`
2. Add this to `app/page.tsx` in `useEffect`:

```typescript
useEffect(() => {
  const audio = new Audio('/audio/your-song.mp3');
  audio.loop = true;
  audio.volume = 0.3;
  audio.play();
}, []);
```

### Modify Game Difficulty

In `app/game/GameScene.ts`:

```typescript
// Make player faster
this.player.setVelocityX(-200);  // was -160

// Make less gravity
(this.physics.world as any).gravity.y = 200;  // was 300

// Make jump higher
this.player.setVelocityY(-500);  // was -400
```

### Add More Platforms

In `app/game/GameScene.ts`, in `create()` method:

```typescript
this.platforms.create(x_position, y_position);
```

Adjust positions to create your custom platform layout.

### Customize Button Styles

In `app/globals.css`, modify `.pixel-button`:

```css
.pixel-button {
  background: #FFB6C1;    // Your color
  font-size: 14px;        // Larger/smaller text
  padding: 1rem 2rem;     // More/less padding
}
```

## Color Reference

All available pastel colors:

| Color Name | Hex | RGB |
|---|---|---|
| pixel-pink | #FFB6C1 | 255, 182, 193 |
| pixel-dark-pink | #FF69B4 | 255, 105, 180 |
| pixel-lavender | #E6B3E1 | 230, 179, 225 |
| pixel-light-lavender | #F0D9F7 | 240, 217, 247 |
| pixel-blue | #ADD8E6 | 173, 216, 230 |
| pixel-light-blue | #B0E0E6 | 176, 224, 230 |
| pixel-cream | #FFFDD0 | 255, 253, 208 |
| pixel-peach | #FFDAB9 | 255, 218, 185 |
| pixel-mint | #C1FFC1 | 193, 255, 193 |

## Testing Locally

```bash
# Development mode with hot reload
npm run dev

# Access at http://localhost:3000
```

## Building for Production

```bash
# Create optimized build
npm run build

# Test production build locally
npm start
```

---

**Pro Tips:**
- Use emojis liberally—they're the soul of this app!
- Keep the tone playful and personal
- Test changes locally before deploying
- Remember: this is made with love 💕

