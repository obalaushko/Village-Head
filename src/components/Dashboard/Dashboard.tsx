import React from 'react';
import './Dashboard.scss';
import GameWindow from './GameWindow.tsx';
import ControlPanel from './ControlPanel.tsx';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="game-window">
        <GameWindow />
      </div>
      <div className="control-panel">
        <ControlPanel />
      </div>
    </div>
  );
};

export default Dashboard;
