import { Box } from '@mui/material';
import './GameViews.scss';
import SideBar from '../SideBar/SideBar.tsx';
import SettlementView from '../Settlement/Settlement.views.tsx';
import { observer } from 'mobx-react-lite';
import gameStore from '@/state/GameStore.ts';

const GameViews: React.FC = observer(() => {
	const { getGameId, getSettlementInfo } = gameStore;

	return (
		<Box className="game-views" sx={{ display: 'flex', height: '100%' }}>
			<SideBar />
			<Box className="game-views__content" sx={{ flex: 8 }}>
				{getGameId && (
					<SettlementView
						gameId={getGameId}
						getSettlementInfo={getSettlementInfo}
					/>
				)}
			</Box>
		</Box>
	);
});

export default GameViews;
