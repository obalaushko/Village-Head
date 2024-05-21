import { createPersonType, sexType } from '@/types/Person.ts';
import { Villager } from '../Characters/Villager.ts';
import { House } from '../Buildings/Building.ts';
import villagersData from '@/mock/villagers.json';
import { getRandomInt } from '@/utils/utils.ts';

/**
 * Represents a settlement with houses and villagers.
 */
export class Settlement {
	private villagers: Villager[] = [];
	private houses: House[] = [];

	/**
	 * Creates a village by creating houses, villagers, and assigning villagers to houses.
	 * @param numberOfHouses - The number of houses to create.
	 */
	public createVillage(numberOfHouses: number) {
		this.createHouses(numberOfHouses);
		this.createVillagers();
		this.assignVillagersToHouses();
	}

	/**
	 * Creates the specified number of houses and adds them to the settlement.
	 * @param numberOfHouses - The number of houses to create.
	 */
	private createHouses(numberOfHouses: number) {
		for (let i = 0; i < numberOfHouses; i++) {
			const house = new House(
				`house-${i + 1}`,
				'residential', // For example, all houses are residential
				getRandomInt(2, 5), // Random number of seats in the house
			);
			this.houses.push(house);
		}
	}

	/**
	 * Creates villagers and adds them to the settlement.
	 */
	private createVillagers() {
		for (const house of this.houses) {
			for (let i = 0; i < house.capacity; i++) {
				const villager = new Villager(this.generateRandomPersonData());
				this.villagers.push(villager);
			}
		}
	}

	/**
	 * Assigns villagers to houses in the settlement.
	 */
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

	/**
	 * Validates the sex type.
	 * @param sex - The sex type to validate.
	 * @returns The validated sex type.
	 * @throws Error if the sex type is invalid.
	 */
	private validateSex(sex: string): sexType {
		if (sex === 'чоловік' || sex === 'жінка') {
			return sex;
		}
		throw new Error(`Invalid sex type: ${sex}`);
	}

	/**
	 * Generates random person data based on predefined data.
	 * @returns The generated person data.
	 */
	private generateRandomPersonData(): createPersonType {
		const randomIndex = getRandomInt(0, villagersData.length - 1);
		const villager = villagersData[randomIndex];
		const age = getRandomInt(18, 60);
		const sex = this.validateSex(villager.sex);
		return { fullName: villager.fullName, age, sex };
	}

	/**
	 * Gets information about the villagers in the settlement.
	 * @returns An array of villagers' information.
	 */
	public getVillagersInfo() {
		return this.villagers.map((villager) => villager.getPersonInfo());
	}

	/**
	 * Gets the villagers in the settlement.
	 * @returns An array of villagers.
	 */
	public getVillagers() {
		return this.villagers;
	}

	/**
	 * Gets information about the houses in the settlement.
	 * @returns An array of houses' information.
	 */
	public getHousesInfo() {
		return this.houses.map((house) => house.getHouseInfo());
	}
}
