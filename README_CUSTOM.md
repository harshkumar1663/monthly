# 💕 Eternal Pixels - A Romantic Pixel-Art Web Experience

A cute pixel-art themed romantic web app celebrating 9 months together. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Phaser.js for the mini-game.

## 🎨 Features

- **Password-Protected Landing Screen**: Enter your personal password to unlock the experience
- **9-Month Timeline**: Beautifully animated scroll-through of relationship milestones
- **2D Platformer Mini-Game**: Collect hearts while platforms move—powered by Phaser.js
- **Emotional Final Message**: Heartfelt message celebrating your relationship
- **Cute Pixel-Art Aesthetic**: Pastel colors, pixel fonts, floating hearts and sparkles
- **Mobile-First Design**: Responsive and works on all devices
- **Fully Frontend**: Deployable on Vercel with no backend requirements

## 🎯 Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Game**: Phaser.js
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Password Setup

Edit the password in `app/utils/constants.ts`:

```typescript
export const APP_PASSWORD = "yourSecretPassword";
```

### Suggested Passwords
- "ourStory"
- "9monthsLater"
- "foreverEndsHere"
- Or make it personal!

## 🎮 Game Instructions

1. **Use Arrow Keys** or **A/D keys** to move left/right
2. **Press Space** or **W** to jump
3. **Collect 5 hearts** to complete the game
4. Fall off the bottom and you'll respawn at the start

The game is designed to be cute and playful—not difficult!

## 📝 Customization

### Change Timeline Events
Edit `app/utils/constants.ts` and modify the `TIMELINE_EVENTS` array:

```typescript
{
  id: 1,
  month: 1,
  title: "Your Event Title",
  description: "Your event description",
  emoji: "💕",
  color: "pixel-pink",
}
```

### Update Final Message
Edit `app/components/FinalMessage.tsx` and modify the `message` variable.

### Customize Colors
Edit `tailwind.config.ts` to change the pastel palette in the `colors` section.

### Change Fonts
Fonts are imported in `app/globals.css`:
- **Titles**: Press Start 2P (pixel font)
- **Body**: Pixelify Sans (readable pixel font)

You can swap these for other Google Fonts like:
- "Silkscreen"
- "Inconsolata"
- "JetBrains Mono"

## 🎨 Design Features

### Color Palette
- `pixel-pink`: #FFB6C1
- `pixel-dark-pink`: #FF69B4
- `pixel-lavender`: #E6B3E1
- `pixel-blue`: #ADD8E6
- `pixel-cream`: #FFFDD0

### Animations
- Floating hearts and clouds
- Bouncing UI elements
- Smooth transitions between screens
- Pulse effects on hearts
- Particle effects in the game

## 🌐 Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourname%2Fromantic-pixelart-app)

### Manual Deploy

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

The app will be available at `<project>.vercel.app`

### Environment Variables
No environment variables needed! This is a fully frontend-only app.

## 📱 Mobile Optimization

- **Mobile-first design** - Works great on phones and tablets
- **Touch-friendly buttons** - Large hit targets
- **Responsive layout** - Scales to any screen size
- **Game touchscreen support** - Can be extended to support touch controls

## 🛠️ File Structure

```
app/
├── components/
│   ├── PasswordScreen.tsx      # Password entry screen
│   ├── TimelineSection.tsx     # 9-month timeline
│   ├── GameBoard.tsx           # Phaser game wrapper
│   └── FinalMessage.tsx        # Emotional finale
├── game/
│   └── GameScene.ts            # Phaser game logic
├── types/
│   └── index.ts                # TypeScript types
├── utils/
│   ├── constants.ts            # Configuration & timeline
│   └── helpers.ts              # Helper functions
├── globals.css                 # Global styles
├── layout.tsx                  # Root layout
└── page.tsx                    # Main page component

public/
└── pixels/                     # Asset folder (for future pixel art)
```

## 🎵 Adding Background Music (Optional)

To add background music, create an `audio` folder in `public/` and import audio in `app/page.tsx`:

```typescript
// Add at top of Home component
useEffect(() => {
  const audio = new Audio('/audio/romantic-bgm.mp3');
  audio.loop = true;
  audio.volume = 0.3;
  audio.play();
  return () => audio.pause();
}, []);
```

## 🐛 Troubleshooting

### Game not loading?
- Clear browser cache
- Check browser console for errors
- Ensure Phaser.js is properly installed

### Password not working?
- Check the password in `app/utils/constants.ts`
- Passwords are case-sensitive by default
- Clear localStorage: `localStorage.removeItem('pixelAppState')`

### Animations are laggy?
- Check browser performance
- Try using a modern browser (Chrome, Firefox, Safari)
- Disable background applications

## 💝 Tips for Personalization

1. **Make the password meaningful** - Use an inside joke or important date
2. **Customize the timeline** - Add your real relationship moments
3. **Change the final message** - Write something personal
4. **Adjust the emoji** - Use your partner's favorite emojis
5. **Tweak the colors** - Match your aesthetic

## 📄 License

MIT License - Feel free to use and modify for personal use.

## 💕 Made With Love

This app is designed for sharing a special moment. Send it to someone you care about!

---

**Remember**: The best part about web apps is sharing them with the people you love. Make it personal, make it memorable! ✨💕

