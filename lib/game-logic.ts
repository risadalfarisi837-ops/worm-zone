export type GameMode = 'classic' | 'timed' | 'survival'

export interface PowerUp {
  type: 'shield' | 'slowmo' | 'magnet' | 'growth'
  duration: number
  x: number
  y: number
  size: number
  color: string
}

export interface Segment {
  x: number
  y: number
  color?: string
}

export interface GameState {
  snake: Segment[]
  food: { x: number; y: number; color: string }
  powerups: PowerUp[]
  score: number
  gameOver: boolean
  mode: GameMode
  timeLeft?: number
  activePowerups: {
    shield?: number
    slowmo?: number
    magnet?: number
    growth?: number
  }
}

export const CANVAS_WIDTH = 800
export const CANVAS_HEIGHT = 600
export const GRID_SIZE = 20
export const INITIAL_SPEED = 100 // ms per move

export const COLORS = {
  snake: '#06b6d4',
  food: '#10b981',
  powerUpShield: '#fbbf24',
  powerUpSlowmo: '#6366f1',
  powerUpMagnet: '#ec4899',
  powerUpGrowth: '#f97316',
  background: '#0f0f1e',
  grid: '#1a1a2e',
}

export const POWERUP_COLORS = {
  shield: '#fbbf24',
  slowmo: '#6366f1',
  magnet: '#ec4899',
  growth: '#f97316',
}

export function createInitialGameState(mode: GameMode): GameState {
  const startX = Math.floor(CANVAS_WIDTH / GRID_SIZE / 2) * GRID_SIZE
  const startY = Math.floor(CANVAS_HEIGHT / GRID_SIZE / 2) * GRID_SIZE

  return {
    snake: [
      { x: startX, y: startY, color: '#06b6d4' },
      { x: startX - GRID_SIZE, y: startY, color: '#06b6d4' },
      { x: startX - GRID_SIZE * 2, y: startY, color: '#06b6d4' },
    ],
    food: {
      x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)) * GRID_SIZE,
      y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE)) * GRID_SIZE,
      color: '#10b981',
    },
    powerups: [],
    score: 0,
    gameOver: false,
    mode,
    timeLeft: mode === 'timed' ? 60 : undefined,
    activePowerups: {},
  }
}

export function generateRandomFood(snakePositions: Set<string>): { x: number; y: number; color: string } {
  let x, y
  do {
    x = Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)) * GRID_SIZE
    y = Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE)) * GRID_SIZE
  } while (snakePositions.has(`${x},${y}`))

  return {
    x,
    y,
    color: '#10b981',
  }
}

export function generatePowerUp(): PowerUp {
  const types: Array<PowerUp['type']> = ['shield', 'slowmo', 'magnet', 'growth']
  const type = types[Math.floor(Math.random() * types.length)]

  return {
    type,
    duration: 10000, // 10 seconds
    x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)) * GRID_SIZE,
    y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE)) * GRID_SIZE,
    size: GRID_SIZE,
    color: POWERUP_COLORS[type],
  }
}

export function checkCollision(head: Segment, body: Segment[]): boolean {
  for (let i = 1; i < body.length; i++) {
    if (head.x === body[i].x && head.y === body[i].y) {
      return true
    }
  }
  return false
}

export function getGameDifficulty(score: number): number {
  // Increase difficulty based on score
  const baseSpeed = INITIAL_SPEED
  const reduction = Math.floor(score / 100) * 5
  return Math.max(baseSpeed - reduction, 40)
}
