import { Villager } from '@/models/Characters/Villager.ts';
import { Settlement } from '@/models/Settlement/Settlement.ts';
import { GameSpeed } from '@/types/Game.type';
import { getRandomInt } from '@/utils/utils.ts';
import { workerClearInterval, workerSetInterval } from '@/utils/workerTimer.ts';

import gameStore from '@/state/GameStore';
import { v4 as uuidv4 } from 'uuid';
/**
 * Represents a game instance.
 */
export class Game {
	public readonly gameId: string;
	private timerInterval: number | null = null; // The timer interval ID for the game loop
	private timeElapsed: number = 0; // The time that has elapsed in the game (in hours)
	private readonly hoursInYear: number = 87600; // The number of hours in a year
	private readonly hoursInDay: number = 24; // The number of hours in a day
	private readonly monthsInYear: number = 12; // The number of months in a year
	private readonly daysInYear: number = 365; // The number of days in a year (excluding leap years)
	private timeMultiplier: GameSpeed = 1; // The time speed multiplier (1: normal, 2: x2, 5: x5)
	private isPaused: boolean = false; // Indicates whether the game is paused or not
	private allVillagers: Villager[] = []; // An array of all the villagers in the village
	private settlement: Settlement | null = null; // The instance of the Settlement class representing the village
	private lastAgeUpdateTime: number = 0; // The time when the age of villagers was last updated

	constructor(timeMultiplier: GameSpeed = 1) {
		this.gameId = uuidv4();
		this.settlement = new Settlement();
		this.settlement.createVillage(getRandomInt(5, 12));
		this.allVillagers = this.settlement.getVillagers();
		this.timeMultiplier = timeMultiplier;

		this.startGame();
		gameStore.isInitialized = true;

		console.log(`Start Game ${this.gameId}`);
	}
	/**
	 * Starts the game by initializing the game loop.
	 * If the game is already running, this method does nothing.
	 */
	private startGame() {
		if (!this.timerInterval) {
			this.timerInterval = workerSetInterval(() => this.gameLoop(), 100);
		}
	}

	/**
	 * Ends the game and resets all game-related properties.
	 */
	public endGame() {
		this.pauseGame();
		this.timeElapsed = 0;
		this.isPaused = false;
		this.allVillagers = [];
		this.settlement = null;
		this.lastAgeUpdateTime = 0;

		// Clear store
		gameStore.resetGameData();

		console.log(`End Game ${this.gameId}`);
	}

	/**
	 * Executes the game loop, updating the game state with the passage of time.
	 */
	private gameLoop() {
		if (this.timeMultiplier === 0) return;

		this.timeElapsed += 0.1 * this.timeMultiplier; // Update game time (0.1 if 100ms interval)

		const yearsElapsed = Math.floor(this.timeElapsed / this.hoursInYear);
		if (
			yearsElapsed > Math.floor(this.lastAgeUpdateTime / this.hoursInYear)
		) {
			this.updateVillagersAge();
			this.lastAgeUpdateTime = this.timeElapsed;
		}

		if (!this.isPaused) {
			this.getCurrentGameDate(); // Update the game date
		}
	}

	/**
	 * Updates the time multiplier for the game.
	 * @param multiplier - The new game speed multiplier.
	 */
	public updateMultiplier(multiplier: GameSpeed) {
		this.timeMultiplier = multiplier;

		gameStore.timeMultiplier = multiplier;
	}

	/**
	 * Pauses the game by clearing the timer interval and setting the game state to paused.
	 */
	public pauseGame() {
		if (this.timerInterval) {
			workerClearInterval(this.timerInterval);
			this.timerInterval = null;
			this.isPaused = true;

			gameStore.isPaused = true;
			console.log('pauseGame');
		}
	}

	/**
	 * Resumes the game by starting the game loop and setting the game state to not paused.
	 */
	public resumeGame() {
		if (this.isPaused) {
			this.startGame();
			this.isPaused = false;

			gameStore.isPaused = false;
			console.log(`resumeGame, gameSpeed: ${this.timeMultiplier}`);
		}
	}

	/**
	 * Updates the age of all villagers in the village.
	 * Increments the age of each villager by calling their `incrementAge` method.
	 */
	private updateVillagersAge() {
		for (const villager of this.allVillagers) {
			villager.incrementAge();
		}
	}

	/**
	 * Retrieves the current game date based on the elapsed time.
	 */
	private getCurrentGameDate() {
		const totalDaysElapsed = Math.floor(this.timeElapsed / this.hoursInDay);
		const currentYear = Math.floor(totalDaysElapsed / this.daysInYear);
		const remainingDays = totalDaysElapsed % this.daysInYear;

		const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		let currentMonth = 0;
		let currentDay = remainingDays;

		for (let i = 0; i < this.monthsInYear; i++) {
			if (currentDay < daysInMonth[i]) {
				currentMonth = i + 1;
				break;
			}
			currentDay -= daysInMonth[i];
		}
		gameStore.setGameTime = {
			year: currentYear,
			month: currentMonth,
			day: currentDay + 1,
		};
	}
}
