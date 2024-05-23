import {
	SizeBuilding,
	HouseType,
	IBuilding,
	createBuildingType,
} from '@/types/Building.type.ts';
import { Villager } from '../Characters/Villager.ts';

export class Building implements IBuilding {
	public readonly id: string;
	public readonly type: HouseType;
	public readonly capacity: number;
	public residents: Villager[];
	public size: SizeBuilding = { width: 0, height: 0 };

	constructor({ id, type, capacity }: createBuildingType) {
		this.id = id;
		this.type = type;
		this.capacity = capacity;
		this.residents = [];

		this.generateRandomSize();
	}

	protected generateRandomSize() {
		this.size = {
			width: Math.floor(Math.random() * 100),
			height: Math.floor(Math.random() * 100),
		};
	}

	public getHouseInfo() {
		return {
			id: this.id,
			type: this.type,
			capacity: this.capacity,
			residents: this.residents.map((resident) =>
				resident.getPersonInfo(),
			),
			coordinates: this.size,
		};
	}
}

export class Residential extends Building {
	constructor({
		id,
		capacity,
		type = 'residential',
	}: {
		id: string;
		capacity: number;
		type?: HouseType;
	}) {
		super({ id, capacity, type });
	}

	public addResident(villager: Villager): boolean {
		if (this.residents.length < this.capacity) {
			this.residents.push(villager);
			return true;
		}
		return false;
	}
}
