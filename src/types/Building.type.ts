import { Villager } from '@/models/Characters/Villager.ts';

export type createBuildingType = {
	id: string;
	type: HouseType;
	capacity: number;
};

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
