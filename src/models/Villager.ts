export class Villager {
	private readonly MAX_HEALTH: number = 100;
	private readonly MAX_HAPPINESS: number = 100;
	private readonly id: string;
	private fullName: string;
	private age: number;
	private sex: string;
	private health: number = 0;
	private happiness: number = 0;
	private food: number = 0;
	private money: number = 0;

	constructor(fullName: string, age: number, sex: string) {
		this.id = Date.now().toString();
		this.fullName = fullName;
		this.age = age;
		this.sex = sex;
	}

	// Getters
	public get getVillagerInfo(): object {
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
	public get getId(): string {
		return this.id;
	}
	public get getFullName(): string {
		return this.fullName;
	}
	public get getAge(): number {
		return this.age;
	}
	public get getSex(): string {
		return this.sex;
	}
	public get getHealth(): number {
		return this.health;
	}
	public get getHappiness(): number {
		return this.happiness;
	}
	public get getFood(): number {
		return this.food;
	}
	public get getMoney(): number {
		return this.money;
	}

	// Setters
	private set setHealth(value: number) {
		if (value > this.MAX_HEALTH) {
			this.health = this.MAX_HEALTH;
		} else {
			this.health = value;
		}
	}
	private set setHappiness(value: number) {
		if (value > this.MAX_HAPPINESS) {
			this.happiness = this.MAX_HAPPINESS;
		} else {
			this.happiness = value;
		}
	}

	public updateFood(foodAmount: number) {
		this.food += foodAmount;
		this.calculateHappinessFromFood();
	}

	private calculateHappinessFromFood() {
		this.setHappiness += this.food * 5;
	}
}

// // Getters
// public get getHealth(): number {
// 	return this._health;
// }
// public get getHappiness(): number {
// 	return this._happiness;
// }

// // Setters
// set setHealth(value: number) {
// 	if (value > this.MAX_HEALTH) {
// 		this._health = this.MAX_HEALTH;
// 	} else {
// 		this._health = value;
// 	}
// }
// set setHappiness(value: number) {
// 	if (value > this.MAX_HAPPINESS) {
// 		this._happiness = this.MAX_HAPPINESS;
// 	} else {
// 		this._happiness = value;
// 	}
// }

// public updateFood(foodAmount: number) {
// 	this.food += foodAmount;
// 	this.calculateHappinessFromFood();
// }

// private calculateHappinessFromFood() {
// 	this.happiness += this.food * 5;
// }
