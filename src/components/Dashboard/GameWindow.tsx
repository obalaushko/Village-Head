import React from 'react';
import { GameViews } from '../GameViews';
import { Box } from '@mui/system';

const GameWindow: React.FC = () => {
	return (
		<Box className="game-window-content" sx={{ height: '100%' }}>
			<GameViews />
		</Box>
	);
};

export default GameWindow;
