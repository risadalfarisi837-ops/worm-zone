'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { GameMode, GameState, createInitialGameState, generateRandomFood, generatePowerUp, checkCollision, getGameDifficulty, CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE, INITIAL_SPEED, COLORS, POWERUP_COLORS } from '@/lib/game-logic'

interface GameCanvasProps {
  mode: GameMode
  onGameEnd: (score: number, finalLength: number, duration: number, powerupsUsed: string[]) => void
  isPaused: boolean
}

export function GameCanvas({ mode, onGameEnd, isPaused }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<GameState>(createInitialGameState(mode))
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 })
  const gameLoopRef = useRef<NodeJS.Timeout>()
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>(Date.now())
  const powerupUsedRef = useRef<Set<string>>(new Set())

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return

      const key = e.key.toLowerCase()
      if (key === 'arrowup' || key === 'w') {
        if (direction.y === 0) setNextDirection({ x: 0, y: -1 })
      } else if (key === 'arrowdown' || key === 's') {
        if (direction.y === 0) setNextDirection({ x: 0, y: 1 })
      } else if (key === 'arrowleft' || key === 'a') {
        if (direction.x === 0) setNextDirection({ x: -1, y: 0 })
      } else if (key === 'arrowright' || key === 'd') {
        if (direction.x === 0) setNextDirection({ x: 1, y: 0 })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [direction, isPaused])

  // Main game loop
  const updateGame = useCallback(() => {
    setGameState((prevState) => {
      if (prevState.gameOver) return prevState

      let newState = { ...prevState }

      // Update active powerups
      Object.entries(newState.activePowerups).forEach(([key, value]) => {
        if (value && value > 0) {
          newState.activePowerups[key as keyof typeof newState.activePowerups] = value - 1
        }
      })

      // Update time left for timed mode
      if (mode === 'timed' && newState.timeLeft !== undefined) {
        newState.timeLeft -= 0.1
        if (newState.timeLeft <= 0) {
          newState.gameOver = true
          return newState
        }
      }

      // Apply slowmo powerup
      let speedMultiplier = 1
      if (newState.activePowerups.slowmo && newState.activePowerups.slowmo > 0) {
        speedMultiplier = 0.5
      }

      // Move snake
      direction.x = nextDirection.x
      direction.y = nextDirection.y

      const head = { ...newState.snake[0] }
      head.x += direction.x * GRID_SIZE
      head.y += direction.y * GRID_SIZE

      // Wraparound for survival mode
      if (mode === 'survival') {
        head.x = (head.x + CANVAS_WIDTH) % CANVAS_WIDTH
        head.y = (head.y + CANVAS_HEIGHT) % CANVAS_HEIGHT
      }

      // Check wall collision
      if (mode !== 'survival') {
        if (head.x < 0 || head.x >= CANVAS_WIDTH || head.y < 0 || head.y >= CANVAS_HEIGHT) {
          if (!newState.activePowerups.shield || newState.activePowerups.shield <= 0) {
            newState.gameOver = true
            return newState
          } else {
            newState.activePowerups.shield = 0
            head.x = (head.x + CANVAS_WIDTH) % CANVAS_WIDTH
            head.y = (head.y + CANVAS_HEIGHT) % CANVAS_HEIGHT
          }
        }
      }

      // Check self collision
      if (checkCollision(head, newState.snake)) {
        if (!newState.activePowerups.shield || newState.activePowerups.shield <= 0) {
          newState.gameOver = true
          return newState
        } else {
          newState.activePowerups.shield = 0
        }
      }

      head.color = '#06b6d4'
      newState.snake = [head, ...newState.snake]

      // Check food collision
      if (head.x === newState.food.x && head.y === newState.food.y) {
        newState.score += 10
        newState.food = generateRandomFood(new Set(newState.snake.map((s) => `${s.x},${s.y}`)))

        // Spawn powerup randomly
        if (Math.random() < 0.1) {
          newState.powerups.push(generatePowerUp())
        }
      } else {
        newState.snake.pop()
      }

      // Check powerup collision
      newState.powerups = newState.powerups.filter((powerup) => {
        if (head.x === powerup.x && head.y === powerup.y) {
          powerupUsedRef.current.add(powerup.type)
          newState.activePowerups[powerup.type] = powerup.duration
          if (powerup.type === 'growth') {
            for (let i = 0; i < 3; i++) {
              newState.snake.push({ ...newState.snake[newState.snake.length - 1] })
            }
          }
          return false
        }
        return true
      })

      // Magnet powerup pulls nearby food
      if (newState.activePowerups.magnet && newState.activePowerups.magnet > 0) {
        const dx = newState.food.x - head.x
        const dy = newState.food.y - head.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < GRID_SIZE * 5) {
          if (Math.abs(dx) > Math.abs(dy)) {
            newState.food.x += dx > 0 ? GRID_SIZE : -GRID_SIZE
          } else {
            newState.food.y += dy > 0 ? GRID_SIZE : -GRID_SIZE
          }
        }
      }

      // Survival mode: increase powerup spawn rate
      if (mode === 'survival' && Math.random() < 0.05) {
        newState.powerups.push(generatePowerUp())
      }

      return newState
    })
  }, [mode, direction, nextDirection])

  // Game loop with difficulty scaling
  useEffect(() => {
    if (gameState.gameOver || isPaused) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      return
    }

    const difficulty = getGameDifficulty(gameState.score)
    gameLoopRef.current = setInterval(updateGame, difficulty)

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [gameState.score, gameState.gameOver, isPaused, updateGame, mode])

  // Handle game end
  useEffect(() => {
    if (gameState.gameOver) {
      const duration = Math.floor((Date.now() - startTimeRef.current) / 1000)
      onGameEnd(gameState.score, gameState.snake.length, duration, Array.from(powerupUsedRef.current))
    }
  }, [gameState.gameOver, gameState.score, gameState.snake.length, onGameEnd])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = COLORS.background
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw grid
    ctx.strokeStyle = COLORS.grid
    ctx.lineWidth = 0.5
    for (let x = 0; x < CANVAS_WIDTH; x += GRID_SIZE) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, CANVAS_HEIGHT)
      ctx.stroke()
    }
    for (let y = 0; y < CANVAS_HEIGHT; y += GRID_SIZE) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(CANVAS_WIDTH, y)
      ctx.stroke()
    }

    // Draw food
    ctx.fillStyle = gameState.food.color
    ctx.beginPath()
    ctx.arc(gameState.food.x + GRID_SIZE / 2, gameState.food.y + GRID_SIZE / 2, GRID_SIZE / 2.5, 0, Math.PI * 2)
    ctx.fill()

    // Draw powerups
    gameState.powerups.forEach((powerup) => {
      ctx.fillStyle = powerup.color
      ctx.shadowColor = powerup.color
      ctx.shadowBlur = 10
      ctx.fillRect(powerup.x + 2, powerup.y + 2, GRID_SIZE - 4, GRID_SIZE - 4)
      ctx.shadowBlur = 0

      // Draw powerup icon
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 10px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const icons: Record<string, string> = {
        shield: '🛡',
        slowmo: '⏱',
        magnet: '🧲',
        growth: '📈',
      }
      ctx.fillText(icons[powerup.type], powerup.x + GRID_SIZE / 2, powerup.y + GRID_SIZE / 2)
    })

    // Draw snake
    gameState.snake.forEach((segment, index) => {
      const isHead = index === 0
      if (isHead) {
        ctx.fillStyle = '#06b6d4'
        ctx.shadowColor = '#06b6d4'
        ctx.shadowBlur = 15
      } else {
        ctx.fillStyle = '#06b6d4'
        ctx.shadowBlur = 0
      }
      ctx.fillRect(segment.x + 1, segment.y + 1, GRID_SIZE - 2, GRID_SIZE - 2)

      // Draw eyes on head
      if (isHead) {
        ctx.fillStyle = '#fff'
        const eyeSize = 4
        ctx.fillRect(segment.x + 6, segment.y + 6, eyeSize, eyeSize)
        ctx.fillRect(segment.x + GRID_SIZE - 10, segment.y + 6, eyeSize, eyeSize)
      }
      ctx.shadowBlur = 0
    })

    // Draw active powerup indicators
    ctx.fillStyle = '#fff'
    ctx.font = '12px Arial'
    ctx.textAlign = 'left'
    let yOffset = 10
    if (gameState.activePowerups.shield && gameState.activePowerups.shield > 0) {
      ctx.fillText(`🛡 ${Math.ceil(gameState.activePowerups.shield / 100)}s`, 10, yOffset)
      yOffset += 20
    }
    if (gameState.activePowerups.slowmo && gameState.activePowerups.slowmo > 0) {
      ctx.fillText(`⏱ ${Math.ceil(gameState.activePowerups.slowmo / 100)}s`, 10, yOffset)
      yOffset += 20
    }
    if (gameState.activePowerups.magnet && gameState.activePowerups.magnet > 0) {
      ctx.fillText(`🧲 ${Math.ceil(gameState.activePowerups.magnet / 100)}s`, 10, yOffset)
      yOffset += 20
    }
    if (gameState.activePowerups.growth && gameState.activePowerups.growth > 0) {
      ctx.fillText(`📈 ${Math.ceil(gameState.activePowerups.growth / 100)}s`, 10, yOffset)
    }

    animationRef.current = requestAnimationFrame(() => {})
  }, [gameState])

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-2 border-primary rounded-lg shadow-2xl"
        style={{ background: COLORS.background }}
      />
    </div>
  )
}
