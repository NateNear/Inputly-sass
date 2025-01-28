"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

type Position = {
  x: number;
  y: number;
};

export const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<string>('RIGHT');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    generateFood();
    setIsPaused(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return prevSnake;
      }

      
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 1);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, generateFood, isPaused]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': setDirection(prev => prev !== 'DOWN' ? 'UP' : prev); break;
        case 'ArrowDown': setDirection(prev => prev !== 'UP' ? 'DOWN' : prev); break;
        case 'ArrowLeft': setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev); break;
        case 'ArrowRight': setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev); break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center space-y-4 py-8 px-4">
      <BlurFade delay={0.25 * 1} inView>
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl font-bold">Take a Break with Snake</h2>
          <p className="text-gray-500">Play while you wait!</p>
        </div>
      </BlurFade>

      <BlurFade delay={0.25 * 2} inView>
      <div className="relative">
        <div 
          className="grid bg-gray-900 border-2 border-gray-700 rounded-lg overflow-hidden"
          style={{ 
            width: GRID_SIZE * CELL_SIZE, 
            height: GRID_SIZE * CELL_SIZE,
            gridTemplate: `repeat(${GRID_SIZE}, 1fr) / repeat(${GRID_SIZE}, 1fr)`
          }}
        >
          {snake.map((segment, index) => (
            <div
              key={index}
              className="bg-green-500 rounded-sm"
              style={{
                gridColumn: segment.x + 1,
                gridRow: segment.y + 1,
              }}
            />
          ))}
          <div
            className="bg-red-500 rounded-full"
            style={{
              gridColumn: food.x + 1,
              gridRow: food.y + 1,
            }}
          />
        </div>
        

        {gameOver && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Game Over!</h3>
              <Button onClick={resetGame} variant="secondary">
                <RotateCcw className="mr-2 h-4 w-4" />
                Play Again
              </Button>
            </div>
          </div>
        )}
      </div>
      </BlurFade>

      <div className="flex items-center gap-4">
        <div className="text-lg font-semibold">Score: {score}</div>
        <Button
          onClick={() => setIsPaused(!isPaused)}
          variant="outline"
          size="icon"
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
        <Button
          onClick={resetGame}
          variant="outline"
          size="icon"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
    
  );
};