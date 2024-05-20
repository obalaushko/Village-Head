export type sexType = 'чоловік' | 'жінка';

export type createPersonType = {
	fullName: string;
	age: number;
	sex: sexType;
}

export interface IPerson {
	id: string;
	fullName: string;
	age: number;
	sex: sexType;
	health: number;
	happiness: number;
	food: number;
	money: number;
	problems?: string[];
}
