import { Game } from '@/services/GameService.ts';
import { GameSpeed, IGameTime, ISettlement } from '@/types/Game.type';
import { makeAutoObservable, autorun, runInAction } from 'mobx';

class GameStore {
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
	isInitialized: boolean = false;
	isLaunched: boolean = false;
	isPaused: boolean = false;
	gameLink: Game | null = null;
	timeMultiplier: GameSpeed = 1;

	constructor() {
		makeAutoObservable(this);
	}

	private linkNewGame = (game: Game) => {
		runInAction(() => {
			this.gameLink = game;
		});
	};

	// Game --> Store
	updateGameTime = (gameTime: IGameTime) => {
		this.curreentGameTime = gameTime;
	};

	toggleLogs = () => {
		this.showLogs = !this.showLogs;
	};

	// Game --> Store
	updateSettlement = ({ villagers, buildings }: ISettlement) => {
		this.settlement.villagers = villagers;
		this.settlement.buildings = buildings;
	};

	initGame = () => {
		if (this.gameLink) {
			this.endGame();
		}

		const newGame = new Game();
		this.linkNewGame(newGame);

		this.isInitialized = true;

		console.log('Init New Game');
	};

	launchGame = () => {
		this.isLaunched = true;

		this.gameLink?.startGame();
	};

	updateGameSpeed = (speed: GameSpeed) => {
		this.timeMultiplier = speed;
		this.gameLink?.updateMultiplier(speed);
	};

	togglePauseGame = () => {
		this.isPaused
			? this.gameLink?.resumeGame()
			: this.gameLink?.pauseGame();
		this.isPaused = !this.isPaused;
	};

	endGame = () => {
		this.gameLink?.endGame();

		runInAction(() => {
			this.gameLink = null;
			this.isInitialized = false;
			this.isLaunched = false;
			this.timeMultiplier = 1;
			this.curreentGameTime = { day: 0, month: 0, year: 0 };
		});
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
