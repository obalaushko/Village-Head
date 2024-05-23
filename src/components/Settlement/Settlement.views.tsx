import { Box } from '@mui/material';
import Residential from '../Building/Residential.tsx';
import { useEffect, useRef, useState } from 'react';
import { Block } from '@/types/Building.type.ts';
import { observer } from 'mobx-react-lite';
import gameStore from '@/state/GameStore.ts';
import { generateRandomCoordinate, isOverlapping } from '@/utils/utils.ts';

interface ContainerSize {
	width: number;
	height: number;
}

const SettlementView: React.FC = observer(() => {
	const [containerSize, setContainerSize] = useState<ContainerSize | null>(
		null,
	);
	const [blocks, setBlocks] = useState<Block[]>([]);
	const refContainer = useRef<HTMLDivElement | null>(null);
	const {
		settlement: { buildings },
		isInitialized,
		isLaunched,
	} = gameStore;

	const numBlocks = buildings.length; // Кількість блоків

	// Обробник подій resize
	useEffect(() => {
		setContainerSize({
			width: refContainer.current?.clientWidth || 0,
			height: refContainer.current?.clientHeight || 0,
		});
		const handleResize = () => {
			setContainerSize({
				width: refContainer.current?.clientWidth || 0,
				height: refContainer.current?.clientHeight || 0,
			});
		};

		window.addEventListener('resize', handleResize);

		// Прибираємо обробник при розмонтуванні компонента
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const createBlocks = () => {
			const newBlocks = [];
			if (!containerSize) return;

			for (let i = 0; i < numBlocks; i++) {
				const block: Block = {
					width: buildings[i].size.width,
					height: buildings[i].size.height,
					x: generateRandomCoordinate(containerSize.width),
					y: generateRandomCoordinate(containerSize.height),
				};

				// Перевірка, щоб блок не виходив за межі контейнера
				if (block.x + block.width > containerSize.width) {
					block.x = containerSize.width - (block.width + 5);
				}
				if (block.y + block.height > containerSize.height) {
					block.y = containerSize.height - (block.height + 5);
				}

				// Пошук валідної позиції для блоку
				let isValid = false;
				let attempts = 0;
				while (!isValid && attempts < 1000) {
					isValid = newBlocks.every(
						(existingBlock) => !isOverlapping(block, existingBlock),
					);
					attempts++;
				}

				if (isValid) {
					newBlocks.push(block);
				} else {
					console.log(
						'Не вдалося знайти позицію для блоку після 1000 спроб',
					);
				}
			}
			setBlocks(newBlocks);
			gameStore.launchGame();
		};
		if (isInitialized && !isLaunched) {
			createBlocks();
		}
	}, [buildings, containerSize, numBlocks, isLaunched, isInitialized]);

	return (
		<Box
			ref={refContainer}
			className="settlement__container"
			sx={{
				position: 'relative',
				width: '100%',
				height: '100%',
			}}
		>
			{blocks.map((block, index) => (
				<Residential block={block} index={index} key={index} />
			))}
		</Box>
	);
});

export default SettlementView;
