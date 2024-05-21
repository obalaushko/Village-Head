import { Game } from '@/services/GameService.ts';
import React, { useState } from 'react';

const ControlPanel: React.FC = () => {
	const [game, setGame] = useState<Game | null>(null);

	const createNewGame = () => {
		const newGame = new Game();
		newGame.startGame();
		setGame(newGame);
	};

	const handleNewGame = () => {
		console.log('New Game');
		if (game) {
			game.pauseGame();
			setGame(null);

			createNewGame();
		} else {
			createNewGame();
		}
	};

	const handlePauseGame = () => {
		console.log('Pause Game');
		game?.pauseGame();
	};

	const handleToggleTimers = () => {
		game?.toggleShowTimers();
	};

	const handleResumeGame = () => {
		console.log('Resume Game');
		game?.resumeGame();
	};

	return (
		<div className="control-panel__content">
			<h2>Control Panel</h2>
			<div className="control-panel__buttons">
				<button
					className="button primary"
					onClick={() => handleNewGame()}
				>
					Нова гра
				</button>
				<button
					className="button primary"
					onClick={() => handlePauseGame()}
				>
					Пауза
				</button>
				<button
					className="button primary"
					onClick={() => handleResumeGame()}
				>
					Відновити
				</button>
				<button
					className="button primary"
					onClick={() => handleToggleTimers()}
				>
					Таймери
				</button>
			</div>
		</div>
	);
};

export default ControlPanel;
