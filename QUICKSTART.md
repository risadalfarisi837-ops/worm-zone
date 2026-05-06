# 🚀 Quick Start Guide - Wormzone

## 1️⃣ Installation (2 minutes)

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Then open **http://localhost:3000** in your browser.

## 2️⃣ Playing the Game

### Choose Your Mode
1. Click **"🚀 Play Now"** on the home page
2. Select from 3 game modes:
   - **🎮 Classic**: Grow as long as possible without hitting walls
   - **⏱️ Timed (60s)**: Score as many points as you can in 60 seconds
   - **🌀 Survival**: Infinite wraparound grid - no walls!

### Controls
- **Arrow Keys** or **WASD** to move
- **⏸️ Pause** button to pause the game
- **🏠 Menu** button to return to mode selection

### Gameplay Tips
- ✅ Eat the **green food** to grow and score points
- ✅ Collect **power-ups** for temporary advantages
- ✅ Plan your path to avoid collisions
- ✅ Go for **longer snakes** to earn more points

## 3️⃣ Game Features

### Power-ups
- 🛡️ **Shield**: Protects from one wall collision
- ⚡ **Speed Boost**: Move faster temporarily
- 🐌 **Slow-Mo**: Game slows down for easier control
- 2️⃣ **Double Points**: Earn 2x points for 10 seconds

### Game Modes
| Mode | Challenge | Best For |
|------|-----------|----------|
| **Classic** | Walls everywhere | Beginners |
| **Timed** | Beat the clock | Quick play |
| **Survival** | Wraparound walls | High scores |

### Tracking Scores
- Your score displays during gameplay
- Game over screen shows final score
- Play multiple games to build up your stats
- (Coming soon: Cloud saves with Supabase)

## 4️⃣ Navigate the App

| Page | What's There | How to Access |
|------|----------|----------|
| **Home** | Game mode selection | `http://localhost:3000` |
| **Play** | Game canvas & controls | Click "🚀 Play Now" |
| **Leaderboard** | Top scores by mode | Click "📊 Leaderboard" |
| **My Stats** | Your stats & progress | Click "📈 My Stats" |

## 5️⃣ Scoring System

- **Food**: +10 points per piece
- **With Double Points**: +20 points per piece
- **Bonus**: Score increases as snake gets longer
- **Best Score**: Your highest score in each mode

## 6️⃣ Troubleshooting

### Game won't load?
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Controls not working?
- Click the game canvas first to focus it
- Try refreshing the page
- Clear your browser cache (Ctrl+Shift+Delete)

### Need help?
- Check the full **README.md** for detailed documentation
- Press **F12** to open Developer Tools and check Console for errors
- Refresh the page if something looks broken

## 🎯 Tips for High Scores

### Classic Mode
1. Keep the snake moving in smooth patterns
2. Avoid corners - they're trap zones
3. Plan several moves ahead
4. Use shields strategically on walls

### Timed Mode
1. Food appears frequently - stay aggressive
2. Don't wait too long between moves
3. Take calculated risks
4. Use power-ups to maintain high speed

### Survival Mode
1. Use the wraparound to your advantage
2. Build long snakes in the corners
3. Space-filling curves work well
4. Focus on score multipliers with length

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ↑ ↓ ← → | Move snake |
| W A S D | Move snake (alternate) |
| Space | Pause (coming soon) |
| ESC | Return to menu (coming soon) |

## 📱 Mobile Play

The game is fully responsive!
- Touch controls work on mobile
- Swipe gestures for direction
- Optimized for all screen sizes
- Works on phones and tablets

## 🔄 What's Next?

After you play a few games:
1. **View Leaderboard** - See where you rank
2. **Check Stats** - Track your progress
3. **Try All Modes** - Each one is unique
4. **Beat Your Best** - Compete against yourself

## 💡 Pro Tips

- 🎯 **Study the patterns** - Predict food spawns
- 🛡️ **Use power-ups wisely** - Save shields for emergencies
- 📈 **Build long snakes** - Score multipliers are huge
- ⏱️ **Speed management** - Don't go too fast
- 🧠 **Plan ahead** - Look several moves ahead

## 🚀 Ready to Play?

Start the game:
```bash
pnpm dev
```

Then visit: **http://localhost:3000**

**Good luck, and have fun! 🎮**

---

*Questions? Check the full README.md for complete documentation.*
