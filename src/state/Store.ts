import { makeAutoObservable, autorun } from 'mobx';

interface IGameTime {
	year: number;
	month: number;
	day: number;
}
class Store {
	curreentGameTime: IGameTime = {
		day: 0,
		month: 0,
		year: 0,
	};
	showLogs: boolean = true;

	constructor() {
		makeAutoObservable(this);
	}

	updateGameTime = (gameTime: IGameTime) => {
		this.curreentGameTime = gameTime;
	};

	toggleLogs = () => {
		this.showLogs = !this.showLogs;
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
