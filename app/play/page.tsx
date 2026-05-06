'use client'

import { useState } from 'react'
import { GameCanvas } from '@/components/game-canvas'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PlayPage() {
  const [gameMode, setGameMode] = useState<'classic' | 'timed' | 'survival' | null>(null)
  const [gameActive, setGameActive] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handleGameEnd = (finalScore: number, length: number, duration: number, powerups: string[]) => {
    setScore(finalScore)
    setGameActive(false)
    console.log('[v0] Game ended:', { finalScore, length, duration, powerups })
  }

  const startGame = (mode: 'classic' | 'timed' | 'survival') => {
    setGameMode(mode)
    setGameActive(true)
    setScore(0)
    setIsPaused(false)
  }

  if (!gameActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center p-4">
        {score > 0 && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="p-8 max-w-md w-full">
              <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
              <div className="mb-6">
                <p className="text-muted-foreground mb-2">Your Score</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {score}
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => { setScore(0); startGame(gameMode as any); }} className="flex-1">
                  Play Again
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Home
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}

        {!gameMode && (
          <div className="max-w-2xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Choose Your Mode
                </span>
              </h1>
              <p className="text-muted-foreground">Pick a game mode and start playing!</p>
            </div>

            <div className="grid gap-4">
              <Card className="p-6 hover:border-primary/50 transition-all cursor-pointer border-primary/20" onClick={() => startGame('classic')}>
                <h3 className="text-2xl font-bold mb-2">🎮 Classic</h3>
                <p className="text-muted-foreground mb-4">Grow as long as possible without hitting the walls</p>
                <div className="text-sm text-accent">Difficulty: Easy → Hard</div>
              </Card>

              <Card className="p-6 hover:border-secondary/50 transition-all cursor-pointer border-secondary/20" onClick={() => startGame('timed')}>
                <h3 className="text-2xl font-bold mb-2">⏱️ Timed (60s)</h3>
                <p className="text-muted-foreground mb-4">Score as many points as possible in 60 seconds</p>
                <div className="text-sm text-secondary">Difficulty: Medium</div>
              </Card>

              <Card className="p-6 hover:border-accent/50 transition-all cursor-pointer border-accent/20" onClick={() => startGame('survival')}>
                <h3 className="text-2xl font-bold mb-2">🌀 Survival</h3>
                <p className="text-muted-foreground mb-4">Infinite grid with wraparound. How long can you survive?</p>
                <div className="text-sm text-accent">Difficulty: Hard</div>
              </Card>
            </div>

            <Link href="/" className="block mt-8">
              <Button variant="outline" className="w-full">
                ← Back
              </Button>
            </Link>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold capitalize">
              {gameMode} Mode
            </h1>
            <p className="text-muted-foreground">Score: <span className="text-primary font-bold">{score}</span></p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsPaused(!isPaused)} variant="outline">
              {isPaused ? '▶️ Resume' : '⏸️ Pause'}
            </Button>
            <Button onClick={() => { setGameActive(false); setGameMode(null); }} variant="outline">
              🏠 Menu
            </Button>
          </div>
        </div>

        <Card className="p-4 bg-card/50">
          <GameCanvas 
            mode={gameMode as any} 
            onGameEnd={handleGameEnd} 
            isPaused={isPaused}
          />
        </Card>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Use Arrow Keys or WASD to move • ESC to pause</p>
        </div>
      </div>
    </div>
  )
}
