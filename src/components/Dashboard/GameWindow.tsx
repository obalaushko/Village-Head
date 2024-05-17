import React from 'react';
import { GameViews } from '../GameViews';

const GameWindow: React.FC = () => {
	return (
		<div className="game-window-content">
			<GameViews />
		</div>
	);
};

export default GameWindow;
