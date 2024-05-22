import { IPerson, createPersonType, jobType, sexType } from '@/types/Person.type.ts';
import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a person in the village.
 */
export class Person {
	/**
	 * The maximum health value a person can have.
	 */
	protected readonly MAX_HEALTH: number = 100;
	/**
	 * The maximum happiness value a person can have.
	 */
	protected readonly MAX_HAPPINESS: number = 100;
	protected readonly id: string;
	protected fullName: string;
	protected age: number;
	protected sex: string;
	protected health: number = 0;
	protected happiness: number = 0;
	protected food: number = 0;
	protected money: number = 0;
	protected request: string[] = [];
	protected job: jobType = {
		name: '',
		salary: 0,
		location: '',
	};
	protected clothes: number = 0;
	protected entertainment: boolean = false;

	/**
	 * Creates a new instance of the Person class.
	 * @param fullName - The full name of the person.
	 * @param age - The age of the person.
	 * @param sex - The sex of the person.
	 */
	constructor({ fullName, age, sex }: createPersonType) {
		this.id = uuidv4();
		this.fullName = fullName;
		this.age = age;
		this.sex = sex;
	}

	/**
	 * Returns the information of the person.
	 * @returns The information of the person.
	 */
	public getPersonInfo(): IPerson {
		return {
			id: this.id,
			fullName: this.fullName,
			age: this.age,
			sex: this.sex as sexType,
			health: this.health,
			happiness: this.happiness,
			food: this.food,
			money: this.money,
			clothes: this.clothes,
			job: this.job,
			request: this.request,
			entertainment: this.entertainment,
		};
	}

	protected setHealth(value: number) {
		this.health = Math.min(value, this.MAX_HEALTH);
	}

	protected setHappiness(value: number) {
		this.happiness = Math.min(value, this.MAX_HAPPINESS);
	}

	protected setFood(value: number) {
		this.food = value;
	}

	protected setMoney(value: number) {
		this.money = value;
	}

	protected setClothes(value: number) {
		this.clothes = value;
	}

	protected setEntertainment(value: boolean) {
		this.entertainment = value;
	}
	protected setAge(value: number) {
		this.age = value;
	}
}
