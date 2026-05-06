import { supabase } from './supabase'

export async function signUp(email: string, password: string, username: string) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    if (authData.user) {
      // Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        username,
        avatar_color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      })

      if (profileError) throw profileError
    }

    return { success: true, data: authData }
  } catch (error) {
    return { success: false, error }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  } catch (error) {
    return null
  }
}

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()

    if (error) throw error
    return data
  } catch (error) {
    return null
  }
}

export async function saveGameScore(
  userId: string,
  mode: 'classic' | 'timed' | 'survival',
  score: number,
  finalLength: number,
  durationSeconds: number,
  powerupsUsed: string[]
) {
  try {
    const { data, error } = await supabase.from('game_scores').insert({
      user_id: userId,
      mode,
      score,
      final_length: finalLength,
      duration_seconds: durationSeconds,
      powerups_used: powerupsUsed,
    })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

export async function getLeaderboard(mode: 'classic' | 'timed' | 'survival', limit: number = 50) {
  try {
    const { data, error } = await supabase
      .from('game_scores')
      .select(
        `
        id,
        user_id,
        score,
        final_length,
        duration_seconds,
        created_at,
        profiles(username)
      `
      )
      .eq('mode', mode)
      .order('score', { ascending: false })
      .limit(limit)

    if (error) throw error

    // Add rank
    const ranked = data.map((item, index) => ({
      ...item,
      rank: index + 1,
    }))

    return { success: true, data: ranked }
  } catch (error) {
    return { success: false, error }
  }
}

export async function getUserStats(userId: string) {
  try {
    const { data, error } = await supabase
      .from('game_scores')
      .select('mode, score, final_length, duration_seconds')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    const stats = {
      totalGames: data.length,
      bestClassic: 0,
      bestTimed: 0,
      bestSurvival: 0,
      totalScore: 0,
      averageLength: 0,
    }

    data.forEach((game) => {
      stats.totalScore += game.score
      if (game.mode === 'classic' && game.score > stats.bestClassic) {
        stats.bestClassic = game.score
      } else if (game.mode === 'timed' && game.score > stats.bestTimed) {
        stats.bestTimed = game.score
      } else if (game.mode === 'survival' && game.score > stats.bestSurvival) {
        stats.bestSurvival = game.score
      }
    })

    stats.averageLength = data.length > 0 ? data.reduce((sum, g) => sum + g.final_length, 0) / data.length : 0

    return { success: true, data: stats }
  } catch (error) {
    return { success: false, error }
  }
}
