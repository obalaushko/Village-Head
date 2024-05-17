export class Hero {
	id: string;
	name: string;
	health: number;
	energy: number;

	constructor(id: string, name: string, health: number, energy: number) {
		this.id = id;
		this.name = name;
		this.health = health;
		this.energy = energy;
	}

	// Метод для збільшення здоров'я
	increaseHealth(amount: number) {
		this.health += amount;
	}

	// Метод для зменшення здоров'я
	decreaseHealth(amount: number) {
		this.health -= amount;
	}

	// Метод для збільшення енергії
	increaseEnergy(amount: number) {
		this.energy += amount;
	}

	// Метод для зменшення енергії
	decreaseEnergy(amount: number) {
		this.energy -= amount;
	}

	// Інші методи, необхідні для логіки гри
}
