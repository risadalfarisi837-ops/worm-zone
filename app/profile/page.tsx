'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getUserStats } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Target, Zap, Clock } from 'lucide-react'

interface Stats {
  totalGames: number
  bestClassic: number
  bestTimed: number
  bestSurvival: number
  totalScore: number
  averageLength: number
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      const fetchStats = async () => {
        const { success, data } = await getUserStats(user.id)
        if (success && data) {
          setStats(data)
        }
        setLoadingStats(false)
      }
      fetchStats()
    }
  }, [user])

  if (loading || loadingStats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push('/menu')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold">Your Profile</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* User Info */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="space-y-2">
            <p className="text-muted-foreground">Logged in as</p>
            <h2 className="text-3xl font-bold">{user?.email}</h2>
            <p className="text-sm text-muted-foreground mt-4">Member since {new Date(user?.created_at || '').toLocaleDateString()}</p>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <p className="text-muted-foreground text-sm">Total Games</p>
                <p className="text-2xl font-bold">{stats?.totalGames || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Zap className="w-8 h-8 text-accent" />
              <div>
                <p className="text-muted-foreground text-sm">Total Score</p>
                <p className="text-2xl font-bold">{stats?.totalScore || 0}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-muted-foreground text-sm">Avg. Length</p>
                <p className="text-2xl font-bold">{Math.round(stats?.averageLength || 0)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Best Scores by Mode */}
        <h3 className="text-2xl font-bold mb-6">Best Scores by Mode</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border-primary/50">
            <div className="mb-4">
              <h4 className="font-bold text-lg mb-2">🎮 Classic</h4>
              <p className="text-muted-foreground text-sm">Your best score in classic mode</p>
            </div>
            <div className="text-3xl font-bold text-primary">{stats?.bestClassic || 0}</div>
          </Card>

          <Card className="p-6 border-accent/50">
            <div className="mb-4">
              <h4 className="font-bold text-lg mb-2">⏱️ Timed</h4>
              <p className="text-muted-foreground text-sm">Your best 60-second sprint</p>
            </div>
            <div className="text-3xl font-bold text-accent">{stats?.bestTimed || 0}</div>
          </Card>

          <Card className="p-6 border-secondary/50">
            <div className="mb-4">
              <h4 className="font-bold text-lg mb-2">🏆 Survival</h4>
              <p className="text-muted-foreground text-sm">Your best survival score</p>
            </div>
            <div className="text-3xl font-bold text-secondary">{stats?.bestSurvival || 0}</div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push('/menu')} className="gap-2">
            <Zap className="w-4 h-4" />
            Play More Games
          </Button>
          <Button onClick={() => router.push('/leaderboard')} variant="outline" className="gap-2">
            <Target className="w-4 h-4" />
            View Leaderboard
          </Button>
        </div>

        {/* Stats Tips */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h4 className="font-bold mb-2">📊 How Stats Work</h4>
            <p className="text-sm text-muted-foreground">
              Your stats track your overall performance across all three game modes. Focus on mastering each mode to improve your rankings.
            </p>
          </Card>
          <Card className="p-6">
            <h4 className="font-bold mb-2">🎯 Pro Tips</h4>
            <p className="text-sm text-muted-foreground">
              Use power-ups strategically, learn the map patterns, and practice consistency. Every game counts toward your global ranking!
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}
