import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { primary } from '../common/LMStyle';


function Swap(props) {
	const { focused } = props;
	let bg = "none";
	let stroke = "#bbbbbb";
	if (focused) {
		bg = primary;
		stroke = primary;
	}
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill='none'
			stroke={stroke}
			strokeWidth={1}
			strokeLinecap="round"
			strokeLinejoin="round"
			className="prefix__feather prefix__feather-repeat"
			{...props}
		>
			<Path d="M17 1l4 4-4 4" />
			<Path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" />
			<Path d="M21 13v2a4 4 0 01-4 4H3" />
		</Svg>
	);
}

export default Swap;
