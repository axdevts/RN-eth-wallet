import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Down(props) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			stroke="gray"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className="prefix__feather prefix__feather-chevron-down"
			{...props}
		>
			<Path d="M6 9l6 6 6-6" />
		</Svg>
	)
}

export default Down
