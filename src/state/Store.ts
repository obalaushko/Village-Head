import { IGameTime, ISettlement } from '@/types/Game.type';
import { makeAutoObservable, autorun } from 'mobx';

class Store {
	curreentGameTime: IGameTime = {
		day: 0,
		month: 0,
		year: 0,
	};
	showLogs: boolean = true;
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

const store = new Store();

autorun(() => {
	if (store.showLogs) {
		const { year, month, day } = store.curreentGameTime;
		console.log('Game time:', `${year} year, ${month} month, ${day} day`);
	}
});

export default store;
