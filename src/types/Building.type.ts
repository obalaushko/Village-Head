import { Villager } from '@/models/Characters/Villager.ts';

export type createBuildingType = {
	id: string;
	type: HouseType;
	capacity: number;
};

export type SizeBuilding = {
	width: number;
	height: number;
	x: number;
	y: number;
};
export interface IBuilding {
	id: string;
	type: HouseType;
	capacity: number;
	residents: Villager[];
	size: SizeBuilding;
}
export type HouseType = 'residential' | 'commercial' | 'industrial';

export interface Block { // TODO: remove (duplicate of SizeBuilding)
	x: number;
	y: number;
	width: number;
	height: number;
}
