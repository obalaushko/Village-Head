import { Villager } from '@/models/Characters/Villager.ts';
import { Settlement } from '@/models/Settlement/Settlement.ts';
import { GameSpeed } from '@/types/Game.ts';
import { getRandomInt } from '@/utils/utils.ts';
import { workerClearInterval, workerSetInterval } from '@/utils/workerTimer.ts';

import store from '@/state/Store.ts';
export class Game {
	private timerInterval: number | null = null; // worker-timers return numbers
	private timeElapsed: number = 0; // Час, який пройшов в грі (у годинах)
	private readonly hoursInYear: number = 8760; // Кількість годин у одному році
	private readonly hoursInDay: number = 24; // Кількість годин у дні
	private readonly monthsInYear: number = 12; // Кількість місяців у році
	private readonly daysInYear: number = 365; // Кількість днів у році (не враховуючи високосний рік)
	private timeMultiplier: GameSpeed = 1; // Множник швидкості часу (1: звичайна, 2: x2, 5: x5)
	private isPaused: boolean = false;
	private allVillagers: Villager[] = [];
	private newVillage: Settlement;
	private lastAgeUpdateTime: number = 0; // Час, коли останній раз оновлювався вік персонажів

	constructor(timeMultiplier: GameSpeed = 1) {
		// Ініціалізація гри
		const village = new Settlement();
		this.newVillage = village;
		this.newVillage.createVillage(getRandomInt(5, 10));
		this.allVillagers = this.newVillage.getVillagers();
		this.timeMultiplier = timeMultiplier;
	}

	// Метод для запуску гри або продовження з паузи
	public startGame() {
		if (!this.timerInterval) {
			this.timerInterval = workerSetInterval(() => this.gameLoop(), 1000);
		}
	}

	// Основний цикл гри
	private gameLoop() {
		this.timeElapsed += 1 * this.timeMultiplier; // Оновлюємо час у грі

		const yearsElapsed = Math.floor(this.timeElapsed / this.hoursInYear);
		if (
			yearsElapsed > Math.floor(this.lastAgeUpdateTime / this.hoursInYear)
		) {
			this.updateVillagersAge(yearsElapsed);
			this.lastAgeUpdateTime = this.timeElapsed;
		}

		if (!this.isPaused) {
			// Інші дії, які повинні відбуватися з плином часу
			this.getCurrentGameDate();
		}
	}

	/**
	 * Updates the time multiplier for the game.
	 * @param multiplier - The new game speed multiplier.
	 */
	public updateMultiplier(multiplier: GameSpeed) {
		this.timeMultiplier = multiplier;
	}

	// Метод для призупинення гри
	public pauseGame() {
		if (this.timerInterval) {
			workerClearInterval(this.timerInterval); // Призупиняємо таймер
			this.timerInterval = null;
			this.isPaused = true; // Встановлюємо гру на паузу
		}
	}

	// Метод для відновлення гри з паузи
	public resumeGame() {
		if (this.isPaused) {
			this.startGame(); // Запускаємо або продовжуємо гру з паузи
			this.isPaused = false; // Знімаємо гру з паузи
		}
	}

	// Метод для оновлення віку всіх сільських жителів
	private updateVillagersAge(yearsElapsed: number) {
		for (const villager of this.allVillagers) {
			villager.incrementAge(yearsElapsed); // Викликаємо метод для збільшення віку у сільського жителя
		}
	}

	// Метод для отримання поточного ігрового року, місяця і дня
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

		store.updateGameTime({
			year: currentYear,
			month: currentMonth,
			day: currentDay + 1,
		});
	}
}
