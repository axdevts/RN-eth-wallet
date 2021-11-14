import React from 'react';
import _ from 'lodash';
import {SvgUri} from 'react-native-svg';
import NoData from '../icon/NoData';
export default function LMSvg({...rest}) {
    const {uri} = {...rest};
    if(_.isNil(uri) || uri.includes('ipfs')){
        return <NoData/>
    }
    return (
        <SvgUri
            width="24"
            height="24"
            {...rest}
        />
    );
}
