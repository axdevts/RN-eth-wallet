import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Privacy(props) {
    return (
        <Svg
            width={18}
            height={24}
            viewBox="0 0 18 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M14.25 9h-.75V5.25a4.5 4.5 0 10-9 0V9h-.75a3.003 3.003 0 00-3 3v8.25a3.003 3.003 0 003 3h10.5a3.004 3.004 0 003-3V12a3.004 3.004 0 00-3-3zM12 9H6V5.25a3 3 0 116 0V9z"
                fill="#4CD080"
            />
        </Svg>
    )
}

export default Privacy
