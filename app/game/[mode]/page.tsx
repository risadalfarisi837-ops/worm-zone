'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { GameCanvas } from '@/components/game-canvas'
import { saveGameScore } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GameMode } from '@/lib/game-logic'
import { ArrowLeft, Pause, Play } from 'lucide-react'

export default function GamePage() {
  const router = useRouter()
  const params = useParams()
  const { user, loading } = useAuth()
  const [gameStarted, setGameStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [finalLength, setFinalLength] = useState(0)
  const [duration, setDuration] = useState(0)
  const [powerupsUsed, setPowerupsUsed] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const mode = (params.mode as GameMode) || 'classic'

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleGameEnd = async (score: number, length: number, dur: number, powerups: string[]) => {
    setFinalScore(score)
    setFinalLength(length)
    setDuration(dur)
    setPowerupsUsed(powerups)
    setGameEnded(true)

    if (user) {
      setSaving(true)
      await saveGameScore(user.id, mode, score, length, dur, powerups)
      setSaving(false)
    }
  }

  const handlePlayAgain = () => {
    setGameStarted(false)
    setGameEnded(false)
    setIsPaused(false)
    setFinalScore(0)
    setFinalLength(0)
    setDuration(0)
    setPowerupsUsed([])
  }

  const handleBackToMenu = () => {
    router.push('/menu')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const modeNames: Record<GameMode, string> = {
    classic: 'Classic Mode',
    timed: 'Timed Mode (60s)',
    survival: 'Survival Mode',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBackToMenu}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-primary">{modeNames[mode]}</h1>
          </div>
          <Button variant="outline" onClick={() => setIsPaused(!isPaused)} disabled={!gameStarted || gameEnded}>
            {isPaused ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                Resume
              </>
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Game Area */}
        <div className="flex flex-col items-center gap-8">
          {!gameStarted && !gameEnded && (
            <Card className="w-full max-w-md p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
              <div className="space-y-4 mb-6">
                <div className="text-left space-y-2">
                  <h3 className="font-semibold">Controls:</h3>
                  <p className="text-sm text-muted-foreground">Arrow Keys or WASD to move</p>
                  <p className="text-sm text-muted-foreground">Collect food to grow and earn points</p>
                  <p className="text-sm text-muted-foreground">Grab power-ups for special abilities</p>
                </div>
              </div>
              <Button className="w-full text-lg py-6" onClick={() => setGameStarted(true)}>
                Start Game
              </Button>
            </Card>
          )}

          {gameStarted && !gameEnded && <GameCanvas mode={mode} onGameEnd={handleGameEnd} isPaused={isPaused} />}

          {gameEnded && (
            <Card className="w-full max-w-md p-8">
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
                  <p className="text-muted-foreground">{saving ? 'Saving your score...' : 'Score saved!'}</p>
                </div>

                <div className="space-y-3 bg-card p-4 rounded-lg border border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Score:</span>
                    <span className="font-bold text-primary">{finalScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Snake Length:</span>
                    <span className="font-bold text-accent">{finalLength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-bold text-secondary">{duration}s</span>
                  </div>
                  {powerupsUsed.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Power-ups:</span>
                      <span className="font-bold text-sm">{powerupsUsed.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Button className="w-full" onClick={handlePlayAgain} disabled={saving}>
                    Play Again
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleBackToMenu} disabled={saving}>
                    Back to Menu
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Tips Section */}
        {!gameStarted && !gameEnded && (
          <div className="mt-12 grid md:grid-cols-4 gap-4">
            <Card className="p-4">
              <h3 className="font-bold mb-2">🛡️ Shield</h3>
              <p className="text-sm text-muted-foreground">Protect from one collision</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-bold mb-2">⏱️ Slowmo</h3>
              <p className="text-sm text-muted-foreground">Slow down the game speed</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-bold mb-2">🧲 Magnet</h3>
              <p className="text-sm text-muted-foreground">Pull food towards you</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-bold mb-2">📈 Growth</h3>
              <p className="text-sm text-muted-foreground">Instantly grow 3 segments</p>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
