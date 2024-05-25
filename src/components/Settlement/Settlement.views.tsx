import { Box } from '@mui/material';
import Residential from '../Building/Residential.tsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Block, IBuilding } from '@/types/Building.type.ts';
import { observer } from 'mobx-react-lite';
import {
	generateRandomCoordinate,
	isOutOfBounds,
	isOverlapping,
} from '@/utils/utils.ts';
import { IPerson } from '@/types/Person.type.ts';

interface ContainerSize {
	width: number;
	height: number;
}

interface SettlementViewProps {
	gameId: string | undefined;
	getSettlementInfo: () => { buildings: IBuilding[]; villagers: IPerson[] };
}

const SettlementView: React.FC<SettlementViewProps> = observer(
	({ gameId, getSettlementInfo }) => {
		const [containerSize, setContainerSize] =
			useState<ContainerSize | null>(null);
		const [blocks, setBlocks] = useState<IBuilding[]>([]);
		const refContainer = useRef<HTMLDivElement | null>(null);

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

		const placeBlockRandomly = (
			containerWidth: number,
			containerHeight: number,
			block: Block,
		): Block => {
			block.x = generateRandomCoordinate(containerWidth, block.width);
			block.y = generateRandomCoordinate(containerHeight, block.height);
			return block;
		};

		const placeBlocks = useCallback(
			(
				containerWidth: number,
				containerHeight: number,
				blocks: IBuilding[],
			) => {
				const placedBlocks: IBuilding[] = [];

				for (let i = 0; i < blocks.length; i++) {
					const block = blocks[i];
					let placed = false;

					while (!placed) {
						placeBlockRandomly(
							containerWidth,
							containerHeight,
							block.size,
						);

						// Перевірити, чи не виходить блок за межі контейнера
						if (
							isOutOfBounds(
								block.size,
								containerWidth,
								containerHeight,
							)
						) {
							continue;
						}

						// Перевірити, чи не перетинається блок з іншими блоками
						let overlapping = false;
						for (let j = 0; j < placedBlocks.length; j++) {
							if (
								isOverlapping(block.size, placedBlocks[j].size)
							) {
								overlapping = true;
								break;
							}
						}

						// Якщо блок не перетинається і не виходить за межі, розмістити його
						if (!overlapping) {
							placedBlocks.push({ ...block });
							placed = true;
						}
					}
				}

				setBlocks(placedBlocks);
			},
			[setBlocks],
		);

		useEffect(() => {
			if (!containerSize) return;
			if (gameId) {
				placeBlocks(
					containerSize.width,
					containerSize.height,
					getSettlementInfo().buildings,
				);
			}
		}, [containerSize, placeBlocks, gameId, getSettlementInfo]);

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
	},
);

export default SettlementView;
