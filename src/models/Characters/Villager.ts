import { Person } from './Person.ts';
export class Villager extends Person {
	constructor(fullName: string, age: number, sex: string) {
		super(fullName, age, sex);

		this.setRandomValues();
		this.calculateHappiness();
	}

	// Override methods to add additional functionality
	protected setHealth(value: number) {
		super.setHealth(value);

		this.calculateHappiness();
	}

	protected setFood(value: number) {
		super.setFood(value);

		this.calculateHappiness();
	}

	protected setMoney(value: number) {
		super.setMoney(value);

		this.calculateHappiness();
	}

	public updateFood(foodAmount: number) {
		this.setFood(this.food + foodAmount);
	}

	public updateMoney(moneyAmount: number) {
		this.setMoney(this.money + moneyAmount);
	}

	private setRandomValues() {
		this.setHealth(this.getRandomInt(70, this.MAX_HEALTH));
		this.setMoney(this.getRandomInt(20, 100));
		this.setFood(this.getRandomInt(30, 120));
	}

	private getRandomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	protected calculateHappiness() {
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
		this.setHappiness(Math.floor(happiness));
	}
}
