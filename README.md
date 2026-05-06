# 🎮 Wormzone - Modern Snake Game

A full-stack, feature-rich Snake game built with Next.js, React, TailwindCSS, and shadcn/ui. Play in 3 unique game modes with power-ups, track scores, and compete on leaderboards!

## ✨ Features

### Game Modes
- **Classic Mode**: Grow as long as possible without hitting walls
- **Timed Mode (60s)**: Score as many points as possible in 60 seconds  
- **Survival Mode**: Infinite wraparound grid - test your limits!

### Power-ups
- 🛡️ **Shield**: Protects from one wall collision
- ⚡ **Speed Boost**: Temporarily increase movement speed
- 🐌 **Slow-Mo**: Reduce game speed for better control
- 2️⃣ **Double Points**: Earn 2x points on food consumption

### User Experience
- 📱 **Fully Responsive**: Play on desktop, tablet, or mobile
- 🎨 **Vibrant Colorful Design**: Modern gradient UI with smooth animations
- ⌨️ **Dual Controls**: Arrow keys or WASD
- 📊 **Score Tracking**: Save and view your best scores
- 🏆 **Leaderboard**: See top scores for each game mode
- 📈 **Statistics**: Track your gaming statistics and progress

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. **Clone or download the project**

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables** (optional - game works without them)
```bash
cp .env.example .env.local
```

4. **Run the development server**
```bash
pnpm dev
```

5. **Open your browser**
Navigate to `http://localhost:3000` and start playing!

## 📂 Project Structure

```
wormzone/
├── app/
│   ├── page.tsx              # Home page / Game selector
│   ├── play/
│   │   └── page.tsx          # Main game interface
│   ├── leaderboard/
│   │   └── page.tsx          # Global leaderboard
│   ├── stats/
│   │   └── page.tsx          # User statistics
│   ├── api/
│   │   └── scores/
│   │       └── route.ts      # Score API endpoints
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles with design tokens
├── components/
│   └── game-canvas.tsx       # Core game rendering & logic
├── lib/
│   ├── game-logic.ts         # Game state & mechanics
│   └── supabase.ts           # Database client (optional)
└── public/                   # Static assets
```

## 🎮 How to Play

### Controls
- **Arrow Keys** or **WASD** to move
- **Mouse** or **Touch** for mobile controls
- **Spacebar** or **P** to pause (coming soon)
- **ESC** to exit to menu

### Game Mechanics

#### Classic Mode
- Move around and eat food (green squares)
- Each food increases your length by 1
- Avoid hitting walls - game ends on wall collision
- Difficulty increases as you grow longer

#### Timed Mode
- You have 60 seconds to score points
- Food appears more frequently
- Shield power-ups are more common
- Can't hit walls - that ends the game

#### Survival Mode
- Infinite wraparound - walls wrap to opposite side
- No wall collisions possible
- Focus on growing long and scoring
- Best mode for high scores

## 🎯 Game Mechanics

### Scoring System
- **Basic Food**: +10 points
- **With Double Points**: +20 points
- **Length Bonus**: Score increases with snake length
- **Multiplier**: Longer streaks = higher multipliers

### Power-up System
- Power-ups appear randomly on the grid
- Collect by moving through them
- Duration: Each power-up lasts 10-15 seconds
- Visual indicator shows active power-ups

### Difficulty
- Speed increases every 5 seconds in Classic mode
- More obstacles and power-ups in higher difficulties
- Game gets progressively harder to maintain challenge

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TailwindCSS v4** - Utility-first CSS
- **shadcn/ui** - High-quality React components
- **Canvas API** - Game rendering

### Backend (Optional - for full features)
- **Supabase** - PostgreSQL database + Auth
- **Node.js** - Runtime
- **TypeScript** - Type safety

### Deployment
- **Vercel** - Recommended deployment platform

## 📊 API Endpoints

### Save Score
```bash
POST /api/scores
Content-Type: application/json

{
  "mode": "classic",
  "score": 1500,
  "length": 45,
  "duration": 120,
  "powerups": ["shield", "speed_boost"]
}
```

### Get Leaderboard
```bash
GET /api/scores?mode=classic&limit=10
```

Response:
```json
{
  "success": true,
  "scores": [
    {
      "mode": "classic",
      "score": 15420,
      "length": 120,
      "duration": 245,
      "rank": 1,
      "timestamp": "2026-05-06T..."
    }
  ],
  "total": 42
}
```

## 🎨 Customization

### Colors
Edit the color scheme in `/app/globals.css`:
```css
:root {
  --primary: #6366f1;      /* Main brand color */
  --secondary: #ec4899;    /* Accent color */
  --accent: #06b6d4;       /* Highlight color */
  /* ... more colors ... */
}
```

### Game Difficulty
Adjust in `/lib/game-logic.ts`:
```typescript
export const INITIAL_SPEED = 100        // ms per move
export const CANVAS_WIDTH = 800
export const CANVAS_HEIGHT = 600
export const GRID_SIZE = 20
```

### Power-up Settings
Modify power-up types, durations, and spawn rates in:
`/lib/game-logic.ts` and `/components/game-canvas.tsx`

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Environment Variables
For database features (optional):
```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 📈 Future Enhancements

- [ ] User authentication & cloud saves
- [ ] Multiplayer real-time matches
- [ ] Custom skins & themes
- [ ] Sound effects & background music
- [ ] Mobile app versions
- [ ] Achievement/badge system
- [ ] Daily challenges
- [ ] Social sharing integration
- [ ] Advanced AI opponents
- [ ] Replay system

## 🐛 Troubleshooting

### Game not loading?
- Ensure Node.js 18+ is installed
- Try `pnpm install` again
- Clear browser cache (Ctrl+Shift+Delete)
- Check console for errors (F12)

### Scores not saving?
- Game scores are stored locally in the current session
- For persistent storage, set up Supabase
- Check browser's local storage in DevTools

### Controls not working?
- Ensure focus is on the game canvas
- Try clicking the game area first
- Check if ESC or other keys are bound to browser shortcuts

### Performance issues?
- Reduce browser tab count
- Close background apps
- Disable browser extensions
- Try incognito/private mode

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

We welcome contributions! Feel free to:
1. Report bugs via issues
2. Suggest features
3. Submit pull requests
4. Improve documentation

## 🎉 Credits

Built with ❤️ by the Wormzone team using modern web technologies.

---

**Start playing now!** Go to `http://localhost:3000` and enjoy! 🐛🎮
