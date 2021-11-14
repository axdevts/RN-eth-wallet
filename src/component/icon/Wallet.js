import * as React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';
import {primary} from '../common/LMStyle';


function Wallet(props) {
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
            className="prefix__feather prefix__feather-credit-card"
            {...props}
        >
            <Rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
            <Path d="M1 10h22" />
        </Svg>
    );
}

export default Wallet;
