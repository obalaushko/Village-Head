import { Block } from '@/types/Building.type.ts';

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns A random integer between the minimum and maximum values.
 */
export const getRandomInt = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


/**
 * Generates a random coordinate within a given range.
 * @param max - The maximum value for the coordinate.
 * @param blockSize - The size of the block within which the coordinate should be generated.
 * @returns A random coordinate within the specified range.
 */
export const generateRandomCoordinate = (max: number, blockSize: number): number =>
    Math.floor(Math.random() * (max - blockSize));

/**
 * Checks if two blocks are overlapping.
 * @param block1 - The first block.
 * @param block2 - The second block.
 * @returns True if the blocks are overlapping, false otherwise.
 */
export const isOverlapping = (block1: Block, block2: Block) => {
	return !(
		block1.x + block1.width <= block2.x ||
		block2.x + block2.width <= block1.x ||
		block1.y + block1.height <= block2.y ||
		block2.y + block2.height <= block1.y
	);
};

/**
 * Checks if a block is out of bounds within a given container.
 * @param block - The block to check.
 * @param containerWidth - The width of the container.
 * @param containerHeight - The height of the container.
 * @returns True if the block is out of bounds, false otherwise.
 */
export const isOutOfBounds = (
	block: Block,
	containerWidth: number,
	containerHeight: number,
) => {
	return (
		block.x < 0 ||
		block.y < 0 ||
		block.x + block.width > containerWidth ||
		block.y + block.height > containerHeight
	);
};
