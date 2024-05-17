import { LogInfo } from '@/models/Logger.ts';
import { db } from '../db/indexedDB.ts';

export const addLog = async (log: LogInfo) => {
	await db.logger.add(log);
};

export const getLog = async (): Promise<LogInfo[]> => {
	return await db.logger.toArray();
};

export const deleteAllLog = async () => {
	await db.logger.clear();
};
