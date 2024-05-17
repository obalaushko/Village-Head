import Dexie from 'dexie';
import { Hero } from '../models/Hero';

class GameDatabase extends Dexie {
  heroes: Dexie.Table<Hero, string>;

  constructor() {
    super('GameDatabase');
    this.version(1).stores({
      heroes: 'id, name, health, energy',
    });
    this.heroes = this.table('heroes');
  }
}

export const db = new GameDatabase();
