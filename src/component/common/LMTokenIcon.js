import React from 'react';
import _ from 'lodash';
import { SvgUri } from 'react-native-svg';
import NoData from '../icon/NoData';
import LMImage from './LMImage';
export default function LMTokenIcon({ ...rest }) {
	const { uri } = { ...rest };
	if (_.isNil(uri) || uri.includes('ipfs')) {
		return <NoData />
	}
	if (uri.includes('svg')) {
		return (
			<SvgUri
				width="24"
				height="24"
				{...rest}
			/>
		);
	}
	return <LMImage source={{ uri: uri }} style={{ width: 24, height: 24 }} resizeMode={'cover'} />
}
