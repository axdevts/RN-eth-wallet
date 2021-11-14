import * as React from "react"
import Svg, { Path } from "react-native-svg"

function User(props) {
	return (
		<Svg
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<Path
				d="M16.486 6c-.2 2.478-2.243 4.5-4.486 4.5S7.71 8.479 7.514 6C7.31 3.422 9.298 1.5 12 1.5s4.69 1.969 4.486 4.5z"
				fill="#4CD080"
				stroke="#4CD080"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M12 13.5c-4.078 0-8.217 2.7-8.983 7.796-.092.614.197 1.204.733 1.204h16.5c.536 0 .826-.59.734-1.204C20.217 16.2 16.078 13.5 12 13.5z"
				fill="#4CD080"
				stroke="#4CD080"
				strokeWidth={1.5}
				strokeMiterlimit={10}
			/>
		</Svg>
	)
}

export default User
