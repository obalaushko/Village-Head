import Dexie from 'dexie';
import { Hero } from '../models/Hero';
import { LogInfo } from '@/models/Logger.ts';
import { Villager } from '@/models/Villager.ts';

class GameDatabase extends Dexie {
	heroes: Dexie.Table<Hero, string>;
	villager: Dexie.Table<Villager, string>;
	logger: Dexie.Table<LogInfo, string>;

	constructor() {
		super('GameDatabase');
		this.version(1).stores({
			heroes: 'id, name, health, energy',
			villager: 'id, name, health, happiness, food',
			logger: 'id, name, time',
		});
		this.heroes = this.table('heroes');
		this.villager = this.table('villager');
		this.logger = this.table('logger');
	}
}

export const db = new GameDatabase();
