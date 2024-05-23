import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Встановлюємо розміри Canvas
    const width = canvas.width;
    const height = canvas.height;

    // Очищення canvas
    context.clearRect(0, 0, width, height);


    // Дані для квадрата
    const squareData = [{ x: 50, y: 50, width: 100, height: 100, color: 'red' }];

    // Використання D3 для обробки даних
    d3.select(canvas)
      .datum(squareData[0])
      .each(function (d) {
        context.fillStyle = d.color;
        context.fillRect(d.x, d.y, d.width, d.height);
      });

  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default GameCanvas;
