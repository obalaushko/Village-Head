import { House } from '@/models/Buildings/Building.ts';
import { VillagerWithIssues } from '@/models/Characters/VillagerWithIssues.ts';
import { createPersonType, sexType } from '@/types/Person.ts';
import villagersData from '@/mock/villagers.json';

export class Game {
	private villagers: VillagerWithIssues[] = [];
	private houses: House[] = [];

	public startNewGame(numberOfHouses: number) {
		this.createVillage(numberOfHouses);
	}

	private createVillage(numberOfHouses: number) {
		this.createHouses(numberOfHouses);
		this.createVillagers();
		this.assignVillagersToHouses();
	}

	private createHouses(numberOfHouses: number) {
		for (let i = 0; i < numberOfHouses; i++) {
			const house = new House(
				`house-${i + 1}`,
				'residential', // Наприклад, всі будинки житлові
				this.getRandomInt(1, 7), // Рандомна кількість місць у будинку
			);
			this.houses.push(house);
		}
	}

	private createVillagers() {
		for (const house of this.houses) {
			for (let i = 0; i < house.capacity; i++) {
				const villager = new VillagerWithIssues(
					this.generateRandomPersonData(),
				);
				this.villagers.push(villager);
			}
		}
	}

	private assignVillagersToHouses() {
		let villagerIndex = 0;
		for (const house of this.houses) {
			while (
				house.residents.length < house.capacity &&
				villagerIndex < this.villagers.length
			) {
				const villager = this.villagers[villagerIndex];
				house.addResident(villager);
				villagerIndex++;
			}
		}
	}

	private validateSex(sex: string): sexType {
		if (sex === 'чоловік' || sex === 'жінка') {
			return sex;
		}
		throw new Error(`Invalid sex type: ${sex}`);
	}

	private generateRandomPersonData(): createPersonType {
		const randomIndex = this.getRandomInt(0, villagersData.length - 1);
		const villager = villagersData[randomIndex];
		const age = this.getRandomInt(18, 60);
		const sex = this.validateSex(villager.sex);
		return { fullName: villager.fullName, age, sex };
	}

	private getRandomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	public getVillagersInfo() {
		return this.villagers.map((villager) => villager.getPersonInfo());
	}

	public getHousesInfo() {
		return this.houses.map((house) => house.getHouseInfo());
	}
}
