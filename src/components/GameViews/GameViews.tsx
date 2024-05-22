import { Box } from '@mui/material';
import './GameViews.scss';
import { observer } from 'mobx-react-lite';
import store from '@/state/Store.ts';
// import GameCanvas from './Canvas/GameCanvas.tsx';

const GameViews = observer(() => {
	const {
		curreentGameTime: { year, month, day },
		settlement,
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
			<Box className="game-views__content" sx={{ flex: 8 }}>
				{settlement.buildings.map((building) => (
					<div key={building.id}>
						<p>
							{building.type}; {building.capacity};{' '}
							{building.coordinates.x +
								' - ' +
								building.coordinates.y}
							;
						</p>
						{building.residents.map((resident) => (
							<p key={resident.getPersonInfo().id}>
								{resident.getPersonInfo().fullName};{' '}
								{resident.getPersonInfo().age};
							</p>
						))}
					</div>
				))}
				{/* <GameCanvas /> */}
			</Box>
		</Box>
	);
});

export default GameViews;
