import { Hero } from '@/models/Hero.ts';
import { db } from '../db/indexedDB.ts';

export const addHero = async (hero: Hero) => {
  await db.heroes.add(hero);
};

export const getHeroes = async (): Promise<Hero[]> => {
  return await db.heroes.toArray();
};

export const updateHero = async (hero: Hero) => {
  await db.heroes.put(hero);
};

export const deleteHero = async (id: string) => {
  await db.heroes.delete(id);
};
