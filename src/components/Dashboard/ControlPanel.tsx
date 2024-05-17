import React, { useState } from 'react';

const ControlPanel: React.FC = () => {
	const [log, setLog] = useState<React.ReactNode[]>([]);

	const handleButtonClick = (message: string) => {
		const info = new Date().toLocaleTimeString();
		const InfoElement = (
			<>
				<span>{message}</span> : <span>{info}</span>
			</>
		);
		setLog((prevLog) => [InfoElement, ...prevLog]);
	};
	const handleClearLog = () => {
		setLog([]);
	};

	return (
		<div className="control-panel__content">
			<h2>Control Panel</h2>
			<div className="control-panel__buttons">
				<button
					className="button primary"
					onClick={() => handleButtonClick('Button 1 clicked')}
				>
					Button 1
				</button>
				<button
					className="button primary"
					onClick={() => handleButtonClick('Button 2 clicked')}
				>
					Button 2
				</button>
				<button
					className="button warning"
					onClick={() => handleClearLog()}
				>
					Clear Log
				</button>
			</div>
			<div className="log">
				{log.map((entry, index) => (
					<p className="text primary" key={index}>
						{entry}
					</p>
				))}
			</div>
		</div>
	);
};

export default ControlPanel;
