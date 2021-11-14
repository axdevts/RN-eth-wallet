import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { primary } from '../common/LMStyle';


function Contact(props) {
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
			fill={bg}
			stroke={stroke}
			strokeWidth={0.8}
			strokeLinecap="round"
			strokeLinejoin="round"
			className="prefix__feather prefix__feather-user-plus"
			{...props}
		>
			<Path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
			<Circle cx={8.5} cy={7} r={4} />
			<Path d="M20 8v6M23 11h-6" />
		</Svg>
	);
}

export default Contact;
