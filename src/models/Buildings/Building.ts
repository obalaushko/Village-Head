import { VillagerWithIssues } from "../Characters/VillagerWithIssues.ts";


export interface IHouse {
	id: string;
	type: HouseType;
	capacity: number;
	residents: VillagerWithIssues[];
}

export type HouseType = 'residential' | 'commercial' | 'industrial';

export class House implements IHouse {
	public readonly id: string;
	public readonly type: HouseType;
	public readonly capacity: number;
	public residents: VillagerWithIssues[];

	constructor(id: string, type: HouseType, capacity: number) {
		this.id = id;
		this.type = type;
		this.capacity = capacity;
		this.residents = [];
	}

	public addResident(villager: VillagerWithIssues): boolean {
		if (this.residents.length < this.capacity) {
			this.residents.push(villager);
			return true;
		}
		return false;
	}

	public getHouseInfo() {
		return {
			id: this.id,
			type: this.type,
			capacity: this.capacity,
			residents: this.residents.map(resident => resident.getPersonInfo()),
		};
	}
}
