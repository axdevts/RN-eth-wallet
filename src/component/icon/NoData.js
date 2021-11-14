import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function NoData(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prefix__sc-1fvnadz-1 prefix__cnWwkh"
            color="#888d9b"
            {...props}
        >
            <Circle cx={12} cy={12} r={10} />
            <Path d="M4.93 4.93l14.14 14.14" />
        </Svg>
    )
}

export default NoData
