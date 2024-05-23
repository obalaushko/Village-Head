import { IPerson } from './Person.type.ts';
import { IBuilding } from './Building.type.ts';

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
