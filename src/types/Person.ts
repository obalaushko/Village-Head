export type sexType = 'чоловік' | 'жінка';

export type createPersonType = {
	fullName: string;
	age: number;
	sex: sexType;
}

export type jobType = {
	name: string;
	salary: number;
	location: string;
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
	request: string[];
	job: jobType;
	clothes: number;
	entertainment: boolean;
}
