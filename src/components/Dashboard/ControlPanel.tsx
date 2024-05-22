import { Game } from '@/services/GameService.ts';
import {
	Box,
	Button,
	Container,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { GameSpeed } from '@/types/Game.type';

// Icons
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import BlindRoundedIcon from '@mui/icons-material/BlindRounded';
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';

const ControlPanel: React.FC = () => {
	const [game, setGame] = useState<Game | null>(null);
	const [paused, setPaused] = useState<boolean>(false);
	const [timeMultiplier, setTimeMultiplier] = useState<number>(1);

	const createNewGame = () => {
		const newGame = new Game(timeMultiplier as GameSpeed);
		newGame.startGame();
		setGame(newGame);
	};

	const handleNewGame = () => {
		console.log('New Game');
		if (game) {
			game.pauseGame();
			setGame(null); // Reset game state
			setPaused(false); // Reset paused state

			createNewGame();
		} else {
			createNewGame();
		}
	};

	const handleTogglePauseGame = () => {
		setPaused(!paused);
		paused ? handleResumeGame() : handlePauseGame();
	};

	const handlePauseGame = () => {
		console.log('Pause Game');
		game?.pauseGame();
	};

	const handleResumeGame = () => {
		console.log('Resume Game');
		game?.resumeGame();
	};

	const handleChangeTimeMultiplier = (
		_event: React.MouseEvent<HTMLElement>,
		multiplier: number,
	) => {
		setTimeMultiplier(multiplier);
		game?.updateMultiplier(multiplier as GameSpeed);
	};

	return (
		<Container
			className="control-panel__content"
			style={{
				display: 'flex',
			}}
		>
			<Box m={2}>
				<Typography variant="h5">Control Panel</Typography>
			</Box>
			<Box className="control-panel__buttons">
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => handleNewGame()}
				>
					Нова гра
				</Button>
				<Button
					variant="outlined"
					disabled={!game}
					onClick={() => handleTogglePauseGame()}
					startIcon={
						paused ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />
					}
				>
					{paused ? 'Відновити' : 'Зупинити'}
				</Button>
				<ToggleButtonGroup
					value={timeMultiplier}
					exclusive
					onChange={handleChangeTimeMultiplier}
				>
					<ToggleButton value={1} aria-label="1x">
						<BlindRoundedIcon />
					</ToggleButton>
					<ToggleButton value={5} aria-label="5x">
						<DirectionsWalkRoundedIcon />
					</ToggleButton>
					<ToggleButton value={10} aria-label="10x">
						<DirectionsRunRoundedIcon />
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
		</Container>
	);
};

export default ControlPanel;
