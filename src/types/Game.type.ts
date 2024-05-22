
import { Villager } from '@/models/Characters/Villager.ts';
import { IPerson } from './Person.type.ts';

export type GameSpeed = 1 | 5 | 10; // Швидкість гри (1: звичайна, 5: x5, 10: x10)

export interface IGameTime {
	year: number;
	month: number;
	day: number;
}

export interface ISettlement {
	villagers: IPerson[];
	buildings: IBuilding[];
}


export type Coordinates = {
	x: number;
	y: number;
};
export interface IBuilding {
	id: string;
	type: HouseType;
	capacity: number;
	residents: Villager[];
	coordinates: Coordinates;
}
export type HouseType = 'residential' | 'commercial' | 'industrial';
