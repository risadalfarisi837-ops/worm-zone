'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              📈 My Statistics
            </span>
          </h1>
          <p className="text-muted-foreground">Track your progress and achievements</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="p-6 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Games</p>
            <p className="text-3xl font-bold text-primary">0</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-muted-foreground text-sm mb-2">Best Score</p>
            <p className="text-3xl font-bold text-accent">0</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Time</p>
            <p className="text-3xl font-bold text-secondary">0h</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-muted-foreground text-sm mb-2">Avg Length</p>
            <p className="text-3xl font-bold text-accent">0</p>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Game Mode Stats</h2>
          <div className="space-y-4">
            {['Classic', 'Timed', 'Survival'].map((mode) => (
              <div key={mode} className="pb-4 border-b border-border last:border-0">
                <p className="font-semibold mb-2">{mode}</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Games</p>
                    <p className="font-bold">0</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Best</p>
                    <p className="font-bold">0</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg</p>
                    <p className="font-bold">0</p>
                  </div>
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
