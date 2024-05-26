import { IBuilding } from '@/types/Building.type.ts';
import { Box } from '@mui/material';
import ResidentialIcon from '@assets/residential.svg?react';
import CommercialIcon from '@assets/commercial.svg?react';
import IndustrialIcon from '@assets/industrial.svg?react';

const BuildingBlock = ({ block }: { block: IBuilding; index: number }) => {
	const { size, color, id, type } = block;

	let IconComponent;
	switch (type) {
		case 'residential':
			IconComponent = ResidentialIcon;
			break;
		case 'commercial':
			IconComponent = CommercialIcon;
			break;
		case 'industrial':
			IconComponent = IndustrialIcon;
			break;
		default:
			IconComponent = null;
	}

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
			{IconComponent && (
				<IconComponent
					width={size.width}
					height={size.height}
					fill={color}
				/>
			)}
		</Box>
	);
};

export default BuildingBlock;
