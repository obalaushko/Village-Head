import { IGameTime, ISettlement } from '@/types/Game.type';
import { makeAutoObservable, autorun } from 'mobx';

class GameStore {
	curreentGameTime: IGameTime = {
		day: 0,
		month: 0,
		year: 0,
	};
	showLogs: boolean = false;
	settlement: ISettlement = {
		villagers: [],
		buildings: [],
	};

	constructor() {
		makeAutoObservable(this);
	}

	updateGameTime = (gameTime: IGameTime) => {
		this.curreentGameTime = gameTime;
	};

	toggleLogs = () => {
		this.showLogs = !this.showLogs;
	};

	updateSettlement = ({ villagers, buildings }: ISettlement) => {
		this.settlement.villagers = villagers;
		this.settlement.buildings = buildings;
	};
}

const gameStore = new GameStore();

autorun(() => {
	if (gameStore.showLogs) {
		const { year, month, day } = gameStore.curreentGameTime;
		console.log('Game time:', `${year} year, ${month} month, ${day} day`);
	}
});

export default gameStore;
