import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {primary} from '../common/LMStyle';


function Home(props) {
    const {focused} = props;
    let bg = "none";
    let stroke = "#bbbbbb";
    if(focused){
        bg = primary;
        stroke = "white";
    }
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill={bg}
            stroke={stroke}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="prefix__feather prefix__feather-home"
            {...props}
        >
            <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <Path d="M9 22V12h6v10" />
        </Svg>
    );
}

export default Home;
