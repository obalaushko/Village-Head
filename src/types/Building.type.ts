import { Villager } from '@/models/Characters/Villager.ts';

export type createBuildingType = {
	id: string;
	type: HouseType;
	capacity: number;
};

export type SizeBuilding = {
	width: number;
	height: number;
};
export interface IBuilding {
	id: string;
	type: HouseType;
	capacity: number;
	residents: Villager[];
	size: SizeBuilding;
}
export type HouseType = 'residential' | 'commercial' | 'industrial';

export interface Block {
	x: number;
	y: number;
	width: number;
	height: number;
}
