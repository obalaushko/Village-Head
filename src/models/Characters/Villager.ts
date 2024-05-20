import { createPersonType } from '@/types/Person.ts';
import { Person } from './Person.ts';
/**
 * Represents a villager character.
 */
export class Villager extends Person {
	/**
	 * Creates a new instance of the Villager class.
	 * @param fullName - The full name of the villager.
	 * @param age - The age of the villager.
	 * @param sex - The sex of the villager.
	 */
	constructor(PersonData: createPersonType) {
		super(PersonData);

		this.setRandomValues();
		this.calculateHappiness();
	}

	/**
	 * Overrides the setHealth method to add additional functionality.
	 * @param value - The health value to set.
	 */
	protected setHealth(value: number) {
		super.setHealth(value);

		this.calculateHappiness();
	}

	/**
	 * Overrides the setFood method to add additional functionality.
	 * @param value - The food value to set.
	 */
	protected setFood(value: number) {
		super.setFood(value);

		this.calculateHappiness();
	}

	/**
	 * Overrides the setMoney method to add additional functionality.
	 * @param value - The money value to set.
	 */
	protected setMoney(value: number) {
		super.setMoney(value);

		this.calculateHappiness();
	}

	/**
	 * Updates the food amount of the villager.
	 * @param foodAmount - The amount of food to update.
	 */
	public updateFood(foodAmount: number) {
		this.setFood(this.food + foodAmount);
	}

	/**
	 * Updates the money amount of the villager.
	 * @param moneyAmount - The amount of money to update.
	 */
	public updateMoney(moneyAmount: number) {
		this.setMoney(this.money + moneyAmount);
	}

	/**
	 * Sets random values for health, money, and food.
	 */
	private setRandomValues() {
		this.setHealth(this.getRandomInt(70, this.MAX_HEALTH));
		this.setMoney(this.getRandomInt(20, 100));
		this.setFood(this.getRandomInt(30, 120));
	}

	/**
	 * Generates a random integer between min and max (inclusive).
	 * @param min - The minimum value.
	 * @param max - The maximum value.
	 * @returns The random integer.
	 */
	private getRandomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Calculates the happiness of the villager based on health, money, and food.
	 */
	protected calculateHappiness() {
		// Example weight coefficients: 50% health, 30% money, 20% food
		const healthWeight = 0.5;
		const moneyWeight = 0.3;
		const foodWeight = 0.2;

		// Normalize values
		const normalizedHealth = (this.health / this.MAX_HEALTH) * 100;
		const normalizedMoney = Math.min(this.money / 100, 1) * 100; // Assuming 100 units of money is 100% happiness
		const normalizedFood = Math.min(this.food / 100, 1) * 100; // Assuming 100 units of food is 100% happiness

		// Calculate happiness
		const happiness =
			normalizedHealth * healthWeight +
			normalizedMoney * moneyWeight +
			normalizedFood * foodWeight;
		this.setHappiness(Math.floor(happiness));
	}
}
