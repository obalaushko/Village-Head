import { Villager } from '@/models/Characters/Villager.ts';
import { Settlement } from '@/models/Settlement/Settlement.ts';
export class Game {
	private timerInterval: NodeJS.Timeout | null = null;
	private timeElapsed: number = 0; // Час, який пройшов в грі (у годинах)
	private readonly hoursInYear: number = 8760; // Кількість годин у одному році
	private timeMultiplier: number = 5; // Множник швидкості часу (1: звичайна, 2: x2, 5: x5)
	private isPaused: boolean = false; // Прапорець, що вказує, чи встановлено гру на паузу
	private allVillagers: Villager[] = [];
	private newVillage: Settlement;
	private toogleTimes: boolean = true;
	private lastAgeUpdateTime: number = 0; // Час, коли останній раз оновлювався вік персонажів

	constructor() {
		// Ініціалізація гри
		const village = new Settlement();
		this.newVillage = village;
		this.newVillage.createVillage(5);
		this.allVillagers = this.newVillage.getVillagers();
	}

	// Метод для запуску гри або продовження з паузи
	public startGame() {
		if (!this.timerInterval) {
			this.timerInterval = setInterval(() => this.gameLoop(), 1000); // Таймер кожну секунду (або відповідно до вашого потреб)
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
			console.log(this.newVillage.getVillagersInfo());

			if (this.toogleTimes) {
				console.log({
					timeElapsed: this.timeElapsed,
					timeMultiplier: this.timeMultiplier,
				});
			}
		}
	}

	public toggleShowTimers() {
		this.toogleTimes = !this.toogleTimes;
	}

	// Метод для призупинення гри
	public pauseGame() {
		if (this.timerInterval) {
			clearInterval(this.timerInterval); // Призупиняємо таймер
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

	// Метод для оновлення часу у грі
	private updateTime() {
		// Оновлюємо час з урахуванням множника швидкості часу
		this.timeElapsed += 1 * this.timeMultiplier; // Наприклад, кожну секунду у грі дорівнює 1 годині
	}

	// Метод для оновлення віку всіх сільських жителів
	private updateVillagersAge() {
		for (const villager of this.allVillagers) {
			villager.incrementAge(); // Викликаємо метод для збільшення віку у сільського жителя
		}
	}
}
