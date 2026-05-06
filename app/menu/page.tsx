'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Gamepad2, Trophy, LogOut, Zap } from 'lucide-react'

export default function MenuPage() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-card flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <Zap className="w-12 h-12 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Wormzone
            </h1>
            <p className="text-muted-foreground text-sm">Welcome, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Choose Your Game Mode</h2>
          <p className="text-muted-foreground text-lg">Master the snake, climb the leaderboard!</p>
        </div>

        {/* Game Modes Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Classic Mode */}
          <Link href="/game/classic">
            <Card className="h-full hover:shadow-2xl hover:border-primary transition-all duration-300 cursor-pointer group">
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition">
                    <Gamepad2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Classic</h3>
                  <p className="text-muted-foreground">
                    The timeless mode. Grow your snake, avoid obstacles, and survive as long as you can.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <Button className="w-full" variant="default">
                    Play Now
                  </Button>
                </div>
              </div>
            </Card>
          </Link>

          {/* Timed Mode */}
          <Link href="/game/timed">
            <Card className="h-full hover:shadow-2xl hover:border-accent transition-all duration-300 cursor-pointer group border-accent/50">
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/30 transition">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Timed</h3>
                  <p className="text-muted-foreground">
                    Beat the clock! Maximize your score in just 60 seconds. Speed and strategy matter.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <Button className="w-full" variant="default">
                    Play Now
                  </Button>
                </div>
              </div>
            </Card>
          </Link>

          {/* Survival Mode */}
          <Link href="/game/survival">
            <Card className="h-full hover:shadow-2xl hover:border-secondary transition-all duration-300 cursor-pointer group border-secondary/50">
              <div className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition">
                    <Trophy className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Survival</h3>
                  <p className="text-muted-foreground">
                    Ultimate challenge! More powerups, wrapping edges, and infinite possibilities.
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <Button className="w-full" variant="default">
                    Play Now
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/leaderboard">
            <Card className="hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer p-6 flex items-center gap-4">
              <Trophy className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-bold text-lg">Leaderboard</h3>
                <p className="text-muted-foreground text-sm">See where you stand globally</p>
              </div>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="hover:shadow-lg hover:border-accent transition-all duration-300 cursor-pointer p-6 flex items-center gap-4">
              <Gamepad2 className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-bold text-lg">Your Stats</h3>
                <p className="text-muted-foreground text-sm">Track your progress and achievements</p>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
