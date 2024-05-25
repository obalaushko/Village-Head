import { IBuilding } from '@/types/Building.type.ts';
import { Box } from '@mui/material';
import ResidentialIcon from '@assets/residential.svg?react';

const Residential = ({ block }: { block: IBuilding; index: number }) => {
	const { size, color, id } = block;

	// TODO: Replace IBuilding to Building for using getHouseInfo() method
	return (
		<Box
			id={id}
			style={{
				position: 'absolute',
				width: size.width,
				height: size.height,
				top: size.y,
				left: size.x,
				// backgroundColor: color,
				borderRadius: '5px',
				// padding: '5px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{/* ID: {index + 1} <br />
			{residents.length} */}
			<ResidentialIcon
				width={size.width}
				height={size.height}
				fill={color}
			/>
		</Box>
	);
};

export default Residential;
