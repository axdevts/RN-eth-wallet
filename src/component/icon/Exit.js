import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Exit(props) {
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
                d="M7.5 12a.75.75 0 01.75-.75H15V6.375c0-1.5-1.584-2.625-3-2.625H4.875A2.628 2.628 0 002.25 6.375v11.25a2.628 2.628 0 002.625 2.625h7.5A2.627 2.627 0 0015 17.625V12.75H8.25A.75.75 0 017.5 12zM21.53 11.47l-3.75-3.75a.75.75 0 00-1.06 1.06l2.47 2.47H15v1.5h4.19l-2.47 2.47a.75.75 0 101.06 1.06l3.75-3.75a.75.75 0 000-1.06z"
                fill="#4CD080"
            />
        </Svg>
    )
}

export default Exit
