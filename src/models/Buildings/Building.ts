import {
	SizeBuilding,
	HouseType,
	IBuilding,
	createBuildingType,
} from '@/types/Building.type.ts';
import { Villager } from '../Characters/Villager.ts';
import { getRandomInt } from '@/utils/utils.ts';
import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a building in the village.
 */
export class Building {
	/**
	 * The unique identifier of the building.
	 */
	protected readonly id: string;

	/**
	 * The type of the building (e.g., residential, commercial, industrial).
	 */
	public readonly type: HouseType;

	/**
	 * The maximum capacity of the building.
	 */
	public readonly capacity: number;

	/**
	 * The list of residents currently living in the building.
	 */
	public residents: Villager[];

	/**
	 * The size of the building.
	 */
	public size: SizeBuilding = { width: 0, height: 0, x: 0, y: 0 };

	/**
	 * The color of the building.
	 */
	public color: string;

	/**
	 * Creates a new instance of the Building class.
	 * @param type - The type of the building.
	 * @param capacity - The maximum capacity of the building.
	 */
	constructor({ type, capacity }: createBuildingType) {
		this.id = uuidv4();
		this.type = type;
		this.capacity = capacity;
		this.residents = [];
		this.color = this.generateColorByType();

		this.generateRandomSize();
	}

	/**
	 * Generates a random size for the building.
	 * The generated size will have a width and height between 50 and 100.
	 */
	protected generateRandomSize() {
		this.size = {
			width: getRandomInt(50, 100),
			height: getRandomInt(50, 100),
			x: 0,
			y: 0,
		};
	}

	/**
	 * Generates a color based on the type of the building.
	 * @returns The generated color.
	 */
	protected generateColorByType(): string {
		switch (this.type) {
			case 'residential':
				return '#1a787b';
			case 'commercial':
				return '#557fb1';
			case 'industrial':
				return '#7b5b5b';
			default:
				return '#a9a9a9';
		}
	}

	/**
	 * Updates the coordinates of the building.
	 * @param x - The new x-coordinate.
	 * @param y - The new y-coordinate.
	 */
	public updateCoordinates(x: number, y: number) {
		this.size.x = x;
		this.size.y = y;
	}

	/**
	 * Retrieves information about the building.
	 * @returns An object containing the building's information.
	 */
	public getHouseInfo(): IBuilding {
		return {
			id: this.id,
			type: this.type,
			capacity: this.capacity,
			residents: this.residents.map((resident) => resident),
			size: this.size,
			color: this.color,
		};
	}
}

export class Residential extends Building {
	constructor({
		capacity,
		type = 'residential',
	}: {
		id: string;
		capacity: number;
		type?: HouseType;
	}) {
		super({ capacity, type });
	}

	/**
	 * Adds a resident to the building.
	 * @param villager - The villager to add as a resident.
	 * @returns `true` if the resident was successfully added, `false` if the building is already at full capacity.
	 */
	public addResident(villager: Villager): boolean {
		if (this.residents.length < this.capacity) {
			this.residents.push(villager);
			return true;
		}
		return false;
	}
}

export class Commercial extends Building {
	constructor({
		capacity,
		type = 'commercial',
	}: {
		id: string;
		capacity: number;
		type?: HouseType;
	}) {
		super({ capacity, type });
	}

	protected generateRandomSize(): void {
		this.size = {
			width: getRandomInt(30, 80),
			height: getRandomInt(30, 80),
			x: 0,
			y: 0,
		};
	}
}

export class Industrial extends Building {
	constructor({
		capacity,
		type = 'industrial',
	}: {
		id: string;
		capacity: number;
		type?: HouseType;
	}) {
		super({ capacity, type });
	}
	protected generateRandomSize(): void {
		this.size = {
			width: getRandomInt(70, 150),
			height: getRandomInt(70, 150),
			x: 0,
			y: 0,
		};
	}
}
