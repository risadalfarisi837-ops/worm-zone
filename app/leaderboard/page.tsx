'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function LeaderboardPage() {
  const mockLeaderboard = [
    { rank: 1, name: 'ProGamer2000', score: 15420, mode: 'Classic' },
    { rank: 2, name: 'SnakeKing', score: 14850, mode: 'Classic' },
    { rank: 3, name: 'WormMaster', score: 13200, mode: 'Classic' },
    { rank: 4, name: 'You', score: 0, mode: 'Classic', isYou: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              🏆 Leaderboard
            </span>
          </h1>
          <p className="text-muted-foreground">Top scores across all players (Coming Soon!)</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-3">
            {mockLeaderboard.map((player) => (
              <div key={player.rank} className={`flex items-center gap-4 p-4 rounded-lg ${player.isYou ? 'bg-primary/10 border border-primary/20' : 'bg-card/50'}`}>
                <div className="text-2xl font-bold text-muted-foreground min-w-fit">#{player.rank}</div>
                <div className="flex-1">
                  <p className={`font-bold ${player.isYou ? 'text-primary' : ''}`}>{player.name}</p>
                  <p className="text-sm text-muted-foreground">{player.mode}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-secondary">{player.score.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Link href="/">
          <Button className="w-full" variant="outline">
            ← Back Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
