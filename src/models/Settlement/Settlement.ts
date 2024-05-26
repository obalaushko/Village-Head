import { IPerson, createPersonType, sexType } from '@/types/Person.type.ts';
import { Villager } from '../Characters/Villager.ts';
import villagersData from '@/mock/villagers.json';
import { getRandomInt, isResidential } from '@/utils/utils.ts';
import { Commercial, Industrial, Residential } from '../Buildings/Building.ts';
import { BuildingsType, IBuilding } from '@/types/Building.type.ts';
import gameStore from '@/state/GameStore.ts';
import { ISettlement } from '@/types/Game.type.ts';

/**
 * Represents a settlement with houses and villagers.
 */
export class Settlement implements ISettlement {
	public villagers: Villager[] = [];
	public buildings: BuildingsType[] = [];

	/**
	 * Creates a village by creating houses, villagers, and assigning villagers to houses.
	 * @param numberOfBuilding - The number of houses to create.
	 */
	public createVillage(numberOfBuilding: number) {
		this.createHouses(numberOfBuilding);
		this.createVillagers();
		this.assignVillagersToHouses();

		gameStore.settlement = {
			buildings: this.buildings,
			villagers: this.villagers,
		};
	}

	/**
	 * Creates the specified number of houses and adds them to the settlement.
	 * @param numberOfBuilding - The number of houses to create.
	 */
	private createHouses(numberOfBuilding: number) {
		// Пропорції для кожного типу будинків
		const residentialRatio = 0.6;
		const commercialRatio = 0.3;
		// const industrialRatio = 0.1;

		// Розрахунок кількості будинків кожного типу
		const residentialCount = Math.floor(
			numberOfBuilding * residentialRatio,
		);
		const commercialCount = Math.floor(numberOfBuilding * commercialRatio);
		const industrialCount =
			numberOfBuilding - residentialCount - commercialCount;

		// Створення житлових будинків
		for (let i = 0; i < residentialCount; i++) {
			const house = new Residential({
				id: `residential-${i + 1}`,
				capacity: getRandomInt(2, 5),
			});
			this.buildings.push(house);
		}

		// Створення комерційних будинків
		for (let i = 0; i < commercialCount; i++) {
			const commercialBuilding = new Commercial({
				id: `commercial-${i + 1}`,
				capacity: getRandomInt(1, 3),
			});
			this.buildings.push(commercialBuilding);
		}

		// Створення індустріальних будинків
		for (let i = 0; i < industrialCount; i++) {
			const industrialBuilding = new Industrial({
				id: `industrial-${i + 1}`,
				capacity: getRandomInt(1, 2),
			});
			this.buildings.push(industrialBuilding);
		}
	}

	/**
	 * Creates villagers and adds them to the settlement.
	 */
	private createVillagers() {
		for (const house of this.buildings) {
			// const { capacity } = house.getHouseInfo();
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
		for (const house of this.buildings) {
			if (!isResidential(house)) return; // Assign only to residential buildings
			// const { capacity, residents } = house.getHouseInfo();
			while (
				house.residents.length < house.capacity &&
				villagerIndex < this.villagers.length
			) {
				const villager = this.villagers[villagerIndex];

				if (isResidential(house)) {
					house.addResident(villager);
					villagerIndex++;
				}
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
	public getVillagersInfo(): IPerson[] {
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
	 * Retrieves information about the buildings in the settlement.
	 * @returns An array of building information.
	 */
	public getBuildingInfo(): IBuilding[] {
		return this.buildings.map((building) => building.getHouseInfo());
	}

	/**
	 * Retrieves the buildings in the settlement.
	 * @returns An array of IBuilding objects representing the buildings in the settlement.
	 */
	public getBuilding() {
		return this.buildings;
	}
}
