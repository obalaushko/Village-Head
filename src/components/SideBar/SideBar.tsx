import gameStore from '@/state/GameStore.ts';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

const SideBar: React.FC = observer(() => {
	const {
		curreentGameTime: { year, month, day },
	} = gameStore;
	return (
		<Box className="game-views__sidebar sidebar" sx={{ flex: 2 }}>
			<Box className="sidebar__timer">
				Рік {year} <br />
				Місяць {month} <br />
				День {day}
			</Box>
		</Box>
	);
});

export default SideBar;
