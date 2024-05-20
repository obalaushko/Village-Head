import { IPerson, createPersonType, sexType } from "@/types/Person.ts";

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
	protected problems: string[] = [];

	/**
	 * Creates a new instance of the Person class.
	 * @param fullName - The full name of the person.
	 * @param age - The age of the person.
	 * @param sex - The sex of the person.
	 */
	constructor({ fullName, age, sex }: createPersonType) {
		this.id = Date.now().toString();
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
}
