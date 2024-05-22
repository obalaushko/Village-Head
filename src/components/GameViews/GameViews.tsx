import { Box } from '@mui/material';
import './GameViews.scss';
import { observer } from 'mobx-react-lite';
import store from '@/state/Store.ts';

const GameViews = observer(() => {
	const {
		curreentGameTime: { year, month, day },
	} = store;
	return (
		<Box className="game-views" sx={{ display: 'flex', height: '100%' }}>
			<Box className="game-views__sidebar sidebar" sx={{ flex: 2 }}>
				<Box className="sidebar__timer">
					Рік {year} <br />
					Місяць {month} <br />
					День {day}
				</Box>
			</Box>
			<Box className="game-views__content" sx={{ flex: 8 }}></Box>
		</Box>
	);
});

export default GameViews;
