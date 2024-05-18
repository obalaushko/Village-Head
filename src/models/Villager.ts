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

	// Setters
	protected set setHealth(value: number) {
		this.health = Math.min(value, this.MAX_HEALTH);
	}

	protected set setHappiness(value: number) {
		this.happiness = Math.min(value, this.MAX_HAPPINESS);
	}

	protected set setFood(value: number) {
		this.food = value;
	}

	protected set setMoney(value: number) {
		this.money = value;
	}
}

export class Villager extends Person {
	constructor(fullName: string, age: number, sex: string) {
		super(fullName, age, sex);

		this.setRandomValues();
		this.calculateHappiness();
	}

	// Setters
	protected set setHealth(value: number) {
		super.setHealth = value;

		this.calculateHappiness();
	}

	protected set setFood(value: number) {
		super.setFood = value;

		this.calculateHappiness();
	}

	protected set setMoney(value: number) {
		super.setMoney = value;

		this.calculateHappiness();
	}

	public updateFood(foodAmount: number) {
		this.setFood = this.food + foodAmount;
	}

	public updateMoney(moneyAmount: number) {
		this.setMoney = this.money + moneyAmount;
	}

	private setRandomValues() {
		this.health = this.getRandomInt(70, this.MAX_HEALTH);
		this.money = this.getRandomInt(20, 100);
		this.food = this.getRandomInt(30, 120);
	}

	private getRandomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	private calculateHappiness() {
		// Приклад вагових коефіцієнтів: 50% здоров'я, 30% грошей, 20% їжі
		const healthWeight = 0.5;
		const moneyWeight = 0.3;
		const foodWeight = 0.2;

		// Нормалізація значень
		const normalizedHealth = (this.health / this.MAX_HEALTH) * 100;
		const normalizedMoney = Math.min(this.money / 100, 1) * 100; // припускаємо, що 100 одиниць грошей це 100% щастя
		const normalizedFood = Math.min(this.food / 100, 1) * 100; // припускаємо, що 100 одиниць їжі це 100% щастя

		// Розрахунок щастя
		const happiness =
			normalizedHealth * healthWeight +
			normalizedMoney * moneyWeight +
			normalizedFood * foodWeight;
		this.setHappiness = Math.floor(happiness);
	}
}
