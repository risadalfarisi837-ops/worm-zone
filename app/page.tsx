'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              WORMZONE
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-2">The ultimate snake game with power-ups and multiple modes</p>
          <p className="text-sm text-muted-foreground/60">Made with ❤️ for snake lovers everywhere</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 border-primary/20 hover:border-primary/50 transition-colors">
            <div className="text-3xl mb-2">🎮</div>
            <h3 className="font-bold mb-2">Classic Mode</h3>
            <p className="text-sm text-muted-foreground">Grow as long as you can. Never hit the walls!</p>
          </Card>
          
          <Card className="p-6 border-secondary/20 hover:border-secondary/50 transition-colors">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="font-bold mb-2">Timed Mode</h3>
            <p className="text-sm text-muted-foreground">Survive 60 seconds and rack up the highest score</p>
          </Card>

          <Card className="p-6 border-accent/20 hover:border-accent/50 transition-colors">
            <div className="text-3xl mb-2">🌀</div>
            <h3 className="font-bold mb-2">Survival Mode</h3>
            <p className="text-sm text-muted-foreground">Infinite walls wrap around. Test your limits!</p>
          </Card>
        </div>

        <div className="space-y-3 mb-8">
          <Link href="/play" className="block">
            <Button className="w-full text-lg py-6">
              🚀 Play Now
            </Button>
          </Link>
          <div className="flex gap-3">
            <Link href="/leaderboard" className="flex-1">
              <Button variant="outline" className="w-full">
                📊 Leaderboard
              </Button>
            </Link>
            <Link href="/stats" className="flex-1">
              <Button variant="outline" className="w-full">
                📈 My Stats
              </Button>
            </Link>
          </div>
        </div>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-bold mb-3">✨ Features</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ 4 Unique Power-ups (Shield, Speed Boost, Slow-Mo, Double Points)</li>
            <li>✓ Multiple Game Modes with Different Challenges</li>
            <li>✓ Global Leaderboard (Coming Soon)</li>
            <li>✓ Personal Statistics & Best Scores (Coming Soon)</li>
            <li>✓ Mobile Responsive Controls</li>
            <li>✓ Smooth 60 FPS Gameplay</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
