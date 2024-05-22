import { House, IHouse } from '@/models/Buildings/Building.ts';
import { Villager } from '@/models/Characters/Villager.ts';
import store from '@/state/Store.ts';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';

const generateRandomCoordinate = (max: number) => Math.floor(Math.random() * max);

const GameCanvas: React.FC = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [selectedResident, setSelectedResident] = useState<Villager | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Генерація координат для будинків
    store.houses.forEach(house => {
      if (house.x === undefined || house.y === undefined) {
        house.x = generateRandomCoordinate(canvas.width - 50); // 50 - ширина будинку
        house.y = generateRandomCoordinate(canvas.height - 100); // 100 - приблизна висота з жителями
      }
    });

    // Очищення canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Відображення будинків
    store.houses.forEach(house => {
      context.fillStyle = 'blue';
      context.fillRect(house.x, house.y, 50, 50);

      // Відображення жителів
      house.residents.forEach((resident, index) => {
        context.beginPath();
        context.arc(house.x + 25, house.y + 60 + index * 20, 10, 0, 2 * Math.PI);
        context.fillStyle = 'green';
        context.fill();
        context.closePath();
      });
    });

    // Обробка кліків
    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      let clickedHouse: IHouse | null = null;
      let clickedResident: Villager | null = null;

      store.houses.forEach(house => {
        if (x >= house.x && x <= house.x + 50 && y >= house.y && y <= house.y + 50) {
          clickedHouse = house;
        }
        house.residents.forEach((resident, index) => {
          const cx = house.x + 25;
          const cy = house.y + 60 + index * 20;
          if (Math.sqrt((x - cx) ** 2 + (y - cy) ** 2) <= 10) {
            clickedResident = resident;
          }
        });
      });

      if (clickedHouse) {
        setSelectedHouse(clickedHouse);
        setSelectedResident(null);
      } else if (clickedResident) {
        setSelectedResident(clickedResident);
        setSelectedHouse(null);
      } else {
        setSelectedHouse(null);
        setSelectedResident(null);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={600} />
      {selectedHouse && (
        <div className="modal">
          <h2>{selectedHouse.id}</h2>
          <p>Residents:</p>
          <ul>
            {selectedHouse.residents.map(resident => (
              <li key={resident.getPersonInfo().fullName}>{resident.getPersonInfo().fullName} ({resident.getPersonInfo().age} years old)</li>
            ))}
          </ul>
          <button onClick={() => setSelectedHouse(null)}>Close</button>
        </div>
      )}
      {selectedResident && (
        <div className="modal">
          <h2>{selectedResident.getPersonInfo().fullName}</h2>
          <p>Age: {selectedResident.getPersonInfo().age}</p>
          <button onClick={() => setSelectedResident(null)}>Close</button>
        </div>
      )}
    </div>
  );
});

export default GameCanvas;
