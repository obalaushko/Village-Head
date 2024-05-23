import { Block } from '@/types/Building.type.ts';
import { Box } from '@mui/material';

const Residential = ({ block, index }: { block: Block; index: number }) => {
	return (
		<Box
			style={{
				position: 'absolute',
				width: block.width,
				height: block.height,
				top: block.y,
				left: block.x,
				backgroundColor: 'rgba(0, 150, 255, 0.5)',
			}}
		>
			Block {index + 1}
		</Box>
	);
};

export default Residential;
