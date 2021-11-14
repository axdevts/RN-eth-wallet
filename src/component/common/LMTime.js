import { Text } from 'react-native';
import React from 'react';
import moment from 'moment';
import { ApplicationProperties } from '../../ApplicationProperties';

function LMTime({ ...rest }) {
	const { children } = { ...rest };
	return (
		<Text {...rest}>{moment.utc(children, 'YYYY-MM-DD HH:mm:ss a').local().format(ApplicationProperties.TIME_FORMAT)}</Text>
	);
}
export default LMTime;
