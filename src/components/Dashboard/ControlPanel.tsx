import {
	Box,
	Button,
	Container,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import { GameSpeed } from '@/types/Game.type';

// Icons
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import AssistWalkerRoundedIcon from '@mui/icons-material/AssistWalkerRounded';
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import gameStore from '@/state/GameStore.ts';
import { observer } from 'mobx-react-lite';

const ControlPanel: React.FC = observer(() => {
	const {
		isInitialized,
		timeMultiplier,
		updateGameSpeed,
		isPaused,
		togglePauseGame,
		initGame,
		endGame,
	} = gameStore;

	const handleChangeTimeMultiplier = (
		_event: React.MouseEvent<HTMLElement>,
		multiplier: GameSpeed,
	) => {
		updateGameSpeed(multiplier);
	};

	return (
		<Container
			className="control-panel__content"
			style={{
				display: 'flex',
			}}
		>
			<Box className="control-panel__buttons" sx={{ margin: '20px 0' }}>
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => initGame()}
				>
					Нова гра
				</Button>

				<Button
					variant="outlined"
					color={isPaused ? 'success' : 'warning'}
					disabled={!isInitialized}
					onClick={() => togglePauseGame()}
					startIcon={
						isPaused ? (
							<PlayArrowRoundedIcon />
						) : (
							<PauseRoundedIcon />
						)
					}
				>
					{isPaused ? 'Відновити' : 'Зупинити'}
				</Button>
				<Button
					variant="outlined"
					color="error"
					disabled={!isInitialized}
					onClick={() => endGame()}
				>
					Закінчити гру
				</Button>
				<ToggleButtonGroup
					value={timeMultiplier}
					disabled={isPaused || !isInitialized}
					exclusive
					onChange={handleChangeTimeMultiplier}
				>
					<ToggleButton value={1} aria-label="1x">
						<AssistWalkerRoundedIcon />
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
});

export default ControlPanel;
