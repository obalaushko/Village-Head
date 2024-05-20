import { Villager } from '@/models/Characters/Villager.ts';
import { Game } from '@/services/GameService.ts';
import React, { useState } from 'react';

const ControlPanel: React.FC = () => {
	const [log, setLog] = useState<React.ReactNode[]>([]);

	const handleButtonClick = (message: string) => {
		const villager = new Villager({fullName: 'John Doe', age: 30, sex: 'чоловік'})
		// villager.updateFood(10);
		// villager.updateMoney(100);
		console.log(villager.getPersonInfo());
		const info = new Date().toLocaleTimeString();
		const InfoElement = (
			<>
				<span>{message}</span> : <span>{info}</span>
			</>
		);
		setLog((prevLog) => [InfoElement, ...prevLog]);
	};


	const handleNewGame = () => {
		console.log('New Game');
		const newGame = new Game();
		newGame.startNewGame(25);
		console.log(newGame.getVillagersInfo());
		console.log(newGame.getHousesInfo());
	};

	const handleClearLog = () => {
		setLog([]);
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
					onClick={() => handleButtonClick('Button 2 clicked')}
				>
					Button 2
				</button>
				<button
					className="button warning"
					onClick={() => handleClearLog()}
				>
					Clear Log
				</button>
			</div>
			<div className="log">
				{log.map((entry, index) => (
					<p className="text primary" key={index}>
						{entry}
					</p>
				))}
			</div>
		</div>
	);
};

export default ControlPanel;
