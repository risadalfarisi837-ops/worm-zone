import { NextRequest, NextResponse } from 'next/server'

interface GameScore {
  mode: string
  score: number
  length: number
  duration: number
  powerups: string[]
  timestamp: string
}

// In-memory storage for demo (replace with database in production)
const scores: GameScore[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mode, score, length, duration, powerups } = body

    if (!mode || score === undefined || !length || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const gameScore: GameScore = {
      mode,
      score,
      length,
      duration,
      powerups: powerups || [],
      timestamp: new Date().toISOString(),
    }

    scores.push(gameScore)

    return NextResponse.json(
      { success: true, scoreId: scores.length - 1 },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Score API error:', error)
    return NextResponse.json(
      { error: 'Failed to save score' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode')
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    let filteredScores = scores

    if (mode) {
      filteredScores = scores.filter((s) => s.mode === mode)
    }

    // Sort by score descending
    filteredScores.sort((a, b) => b.score - a.score)

    // Add rank
    const rankedScores = filteredScores.slice(0, limit).map((s, idx) => ({
      ...s,
      rank: idx + 1,
    }))

    return NextResponse.json(
      { success: true, scores: rankedScores, total: filteredScores.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Leaderboard API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
