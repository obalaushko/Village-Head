interface IPerson {
	id: string;
	fullName: string;
	age: number;
	sex: string;
	health: number;
	happinnes: number;
	food: number;
	money: number;
}

export class Person {
	protected readonly MAX_HEALTH: number = 100;
	protected readonly MAX_HAPPINESS: number = 100;
	protected readonly id: string;
	protected fullName: string;
	protected age: number;
	protected sex: string;
	protected health: number = 0;
	protected happiness: number = 0;
	protected food: number = 0;
	protected money: number = 0;

	constructor(fullName: string, age: number, sex: string) {
		this.id = Date.now().toString();
		this.fullName = fullName;
		this.age = age;
		this.sex = sex;
	}
	// Getters
	public get getPersonInfo(): IPerson {
		return {
			id: this.id,
			fullName: this.fullName,
			age: this.age,
			sex: this.sex,
			health: this.health,
			happinnes: this.happiness,
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
