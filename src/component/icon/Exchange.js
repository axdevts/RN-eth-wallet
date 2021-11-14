import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Exchange(props) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={16}
			height={16}
			viewBox="0 0 24 24"
			fill="#f7f8fa"
			stroke="#000"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<Path d="M12 5v14M19 12l-7 7-7-7" />
		</Svg>
	)
}

export default Exchange
