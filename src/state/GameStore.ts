import { Settlement } from '@/models/Settlement/Settlement.ts';
import { Game } from '@/services/GameService.ts';
import { GameSpeed, IGameTime, ISettlement } from '@/types/Game.type';
import { makeAutoObservable, autorun } from 'mobx';

class GameStore {
	private gameInstanse: Game | undefined;
	private settlementInstanse: Settlement | undefined;
	private gameId: string | undefined;
	settlement: ISettlement = { buildings: [], villagers: [] };
	curreentGameTime: IGameTime = {
		day: 0,
		month: 0,
		year: 0,
	};
	showLogs: boolean = true;
	isInitialized: boolean = false;
	isPaused: boolean = false;
	timeMultiplier: GameSpeed = 1;

	constructor() {
		makeAutoObservable(this);
	}

	public startGame = () => {
		if (this.isInitialized) {
			this.endGame();
		}

		this.gameInstanse = new Game();
		this.gameId = this.gameInstanse.gameId;

		console.log('Init New Game');
	};

	/**
	 * Gets the game ID.
	 * @returns The game ID.
	 */
	public get getGameId() {
		return this.gameId;
	}

	// Game --> Store
	updateGameTime = (gameTime: IGameTime) => {
		this.curreentGameTime = gameTime;
	};

	toggleLogs = () => {
		this.showLogs = !this.showLogs;
	};

	// Game --> Store
	// updateSettlement = ({ villagers, buildings }: ISettlement) => {
	// 	this.settlement.villagers = villagers;
	// 	this.settlement.buildings = buildings;
	// };

	/**
	 * Updates the game speed and performs necessary actions based on the speed value.
	 * @public Use in UI
	 * @param speed - The new game speed.
	 */
	public updateGameSpeed = (speed: GameSpeed) => {
		this.gameInstanse?.updateMultiplier(speed);
		if (speed === 0) {
			this.gameInstanse?.pauseGame();
		} else {
			this.gameInstanse?.resumeGame();
		}
	};

	public getSettlementInfo = () => {
		return {
			buildings: this.settlement?.buildings.map((building) =>
				building.getHouseInfo(),
			),
			villagers: this.settlement?.villagers.map((villager) =>
				villager.getPersonInfo(),
			),
		};
	};

	public endGame = () => {
		this.gameInstanse?.endGame();
	};

	resetGameData = () => {
		this.gameInstanse = undefined;
		this.gameId = undefined;
		this.settlement = { buildings: [], villagers: [] };
		this.curreentGameTime = { day: 0, month: 0, year: 0 };
		this.isInitialized = false;
		this.isPaused = false;
		this.timeMultiplier = 1;
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
