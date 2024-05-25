import { IBuilding } from '@/types/Building.type.ts';
import { Box } from '@mui/material';

const Residential = ({ block, index }: { block: IBuilding; index: number }) => {
	const { size, residents, color } = block;

	return (
		<Box
			style={{
				position: 'absolute',
				width: size.width,
				height: size.height,
				top: size.y,
				left: size.x,
				backgroundColor: color,
			}}
		>
			{index + 1} <br />
			{residents.length}
		</Box>
	);
};

export default Residential;
