import { Villager } from '@/models/Characters/Villager.ts';
import { Settlement } from '@/models/Settlement/Settlement.ts';
import { GameSpeed } from '@/types/Game.ts';
import { getRandomInt } from '@/utils/utils.ts';
import { setInterval as workerSetInterval, clearInterval as workerClearInterval } from 'worker-timers';
export class Game {
	private timerInterval: number | null = null; // worker-timers return numbers
	private timeElapsed: number = 0; // Час, який пройшов в грі (у годинах)
	private readonly hoursInYear: number = 8760; // Кількість годин у одному році
	private timeMultiplier: GameSpeed = 1; // Множник швидкості часу (1: звичайна, 2: x2, 5: x5)
	private isPaused: boolean = false; // Прапорець, що вказує, чи встановлено гру на паузу
	private allVillagers: Villager[] = [];
	private newVillage: Settlement;
	private toogleTimes: boolean = true;
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
		this.updateTime(); // Оновлюємо час у грі

		// Перевіряємо, чи пройшов рік з моменту останнього оновлення віку
		if (this.timeElapsed - this.lastAgeUpdateTime >= this.hoursInYear) {
			this.updateVillagersAge();
			this.lastAgeUpdateTime = this.timeElapsed; // Оновлюємо час останнього оновлення віку
		}

		if (!this.isPaused) {
			// Якщо гра не на паузі
			// Інші дії, які повинні відбуватися з плином часу
			console.log(this.newVillage.getHousesInfo());

			if (this.toogleTimes) {
				console.log({
					timeElapsed: this.timeElapsed,
					timeMultiplier: this.timeMultiplier,
				});
			}
		}
	}

	// Метод для оновлення часу у грі
	private updateTime() {
		// Оновлюємо час з урахуванням множника швидкості часу
		this.timeElapsed += 1 * this.timeMultiplier; // Наприклад, кожну секунду у грі дорівнює 1 годині
	}

	/**
	 * Updates the time multiplier for the game.
	 * @param multiplier - The new game speed multiplier.
	 */
	public updateMultiplier(multiplier: GameSpeed) {
		this.timeMultiplier = multiplier;
	}

	public toggleShowTimers() {
		this.toogleTimes = !this.toogleTimes;
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
	private updateVillagersAge() {
		for (const villager of this.allVillagers) {
			villager.incrementAge(); // Викликаємо метод для збільшення віку у сільського жителя
		}
	}
}
