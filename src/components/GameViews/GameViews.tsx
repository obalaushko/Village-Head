import { Box } from '@mui/material';
import './GameViews.scss';
import { observer } from 'mobx-react-lite';
import React from 'react';
import SideBar from '../SideBar/SideBar.tsx';
import GameCanvas from './Canvas/GameCanvas.tsx';

const GameViews: React.FC = observer(() => {

	return (
		<Box className="game-views" sx={{ display: 'flex', height: '100%' }}>
			<SideBar />
			<Box className="game-views__content" sx={{ flex: 8 }}>
				{/* {settlement.buildings.map((building) => (
					<div key={building.id}>
						<p>
							{building.type}; {building.capacity};{' '}
							{building.size.width + ' - ' + building.size.height}
							;
						</p>
						{building.residents.map((resident) => (
							<p key={resident.getPersonInfo().id}>
								{resident.getPersonInfo().fullName};{' '}
								{resident.getPersonInfo().age};
							</p>
						))}
					</div>
				))} */}
				<GameCanvas />
			</Box>
		</Box>
	);
});

export default GameViews;
