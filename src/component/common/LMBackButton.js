import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Back from '../icon/Back';

export default function LMBackButton({ ...rest }) {
	const { label, labelStyle, style, color } = { ...rest };
	return (
		<TouchableOpacity style={[styles.container, style]} {...rest}>
			<Back color={color} />
		</TouchableOpacity>

	);
}
const styles = StyleSheet.create({
	container: {
		height: 50,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		color: 'white',
		fontSize: 16,
		lineHeight: 22
	}
});
