-- Users table (managed by Supabase Auth)
-- We'll extend it with game-specific data in a profile table

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_color TEXT DEFAULT '#FF6B6B',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_scores table
CREATE TABLE IF NOT EXISTS game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK (mode IN ('classic', 'timed', 'survival')),
  score INTEGER NOT NULL DEFAULT 0,
  final_length INTEGER NOT NULL DEFAULT 3,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  powerups_used TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  INDEX (user_id),
  INDEX (mode),
  INDEX (score),
  INDEX (created_at)
);

-- Create leaderboard table (cached data)
CREATE TABLE IF NOT EXISTS leaderboard_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mode TEXT NOT NULL CHECK (mode IN ('classic', 'timed', 'survival')),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  score INTEGER NOT NULL,
  final_length INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  INDEX (mode),
  INDEX (rank),
  UNIQUE(mode, rank)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_cache ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for game_scores
CREATE POLICY "Users can view all game scores"
  ON game_scores FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own game scores"
  ON game_scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for leaderboard_cache
CREATE POLICY "Leaderboard is viewable by everyone"
  ON leaderboard_cache FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_game_scores_user_mode ON game_scores(user_id, mode);
CREATE INDEX IF NOT EXISTS idx_game_scores_mode_score ON game_scores(mode, score DESC);
