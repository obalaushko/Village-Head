import { Hero } from '@/models/Hero.ts';
import { Villager } from '@/models/Villager.ts';
import { addHero, getHeroes } from '@/services/heroService.ts';
import React, { useState } from 'react';

const ControlPanel: React.FC = () => {
	const [log, setLog] = useState<React.ReactNode[]>([]);

	const handleButtonClick = (message: string) => {
		const villager = new Villager('Stepan', 20, 'чоловік');
		villager.updateFood(10);
		console.log(villager);
		const info = new Date().toLocaleTimeString();
		const InfoElement = (
			<>
				<span>{message}</span> : <span>{info}</span>
			</>
		);
		setLog((prevLog) => [InfoElement, ...prevLog]);
	};

	const handleCreateVillageHead = async () => {
		// Створення сільського голови
		const heroExists = await getHeroes();
		if (heroExists.length > 0) {
			const info = new Date().toLocaleTimeString();
			const InfoElement = (
				<>
					<span>Сільський голова вже створений</span> :{' '}
					<span>{info}</span>
				</>
			);
			setLog((prevLog) => [InfoElement, ...prevLog]);
			return;
		}
		const newHero = {
			name: 'Місций господарник',
			health: 100,
			energy: 100,
		};
		await addHero(
			new Hero(
				Date.now().toString(),
				newHero.name,
				newHero.health,
				newHero.energy,
			),
		);
		const info = new Date().toLocaleTimeString();
		const InfoElement = (
			<>
				<span>Created Hero: {newHero.name}</span> : <span>{info}</span>
			</>
		);
		setLog((prevLog) => [InfoElement, ...prevLog]);
	};

	const handleNewGame = () => {
		console.log('New Game');
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
