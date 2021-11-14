import React, { Component } from 'react';
import { Animated, Dimensions, Image, BackHandler, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LMButton from './LMButton';


const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

class LMAlert extends Component {
	static _ref = null;

	static setRef(ref = {}) {
		this._ref = ref;
	}

	static getRef() {
		return this._ref;
	}

	static clearRef() {
		this._ref = null;
	}
	constructor(props) {
		super(props);
		this.state = {
			positionView: new Animated.Value(HEIGHT),
			opacity: new Animated.Value(0),
			message: '',
			okLabel: 'OK',
			cancelLabel: 'Cancel',
			displayIcon: true,
			onCancelPress: () => { },
			onOkPress: () => { },
			content: () => { return <></> }
		};
	}
	_setState(reducer) {
		return new Promise((resolve) => this.setState(reducer, () => resolve()));
	}
	resetState() {
		this._setState({
			message: '',
			displayIcon: true,
			okLabel: 'OK',
			cancelLabel: 'Cancel',
			onCancelPress: () => { },
			onOkPress: () => { },
			content: () => { return <></> }
		});
	}
	show({ ...config }) {
		BackHandler.addEventListener("hardwareBackPress", this.backAction);
		const newConfig = { ...config };
		this._setState(newConfig);
		Animated.sequence([
			Animated.timing(this.state.positionView, {
				toValue: 0,
				duration: 100,
				useNativeDriver: false
			}),
			Animated.timing(this.state.opacity, {
				toValue: 1,
				duration: 100,
				useNativeDriver: false
			}),
		]).start();
	}
	backAction() {
		return true;
	}
	hide() {
		Animated.sequence([
			Animated.timing(this.state.opacity, {
				toValue: 0,
				duration: 100,
				useNativeDriver: false
			}),
			Animated.timing(this.state.positionView, {
				toValue: HEIGHT,
				duration: 100,
				useNativeDriver: false
			}),

		]).start();
		this.resetState();
		BackHandler.removeEventListener("hardwareBackPress", this.backAction);
	}
	static show({ ...config }) {
		this._ref.show({ ...config });
	}
	static hide() {
		this._ref.hide();
	}
	render() {
		return (
			<Animated.View
				style={[styles.container, {
					opacity: this.state.opacity,
					transform: [
						{ translateY: this.state.positionView }
					]
				}]}>
				<View style={styles.alertBoxContainer}>
					{
						this.state.displayIcon &&
						<View style={styles.titleContainer}>
							<View style={styles.imageContainer}>
								<Image
									source={require('../../../assets/warning.png')}
									resizeMode="contain"
									style={styles.image}
								/>
							</View>
							<View style={styles.messageContainer}>
								<Text style={{ color: 'red', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{this.state.message}</Text>
							</View>
						</View>
					}
					<View style={styles.contentContainer}>
						{this.state.content()}
					</View>
					<View style={styles.buttonContainer}>
						<LMButton style={[styles.button, { marginBottom: 5 }]} label={this.state.okLabel} onPress={() => {
							this.state.onOkPress().then(() => {
								this.hide();
							});
						}} />
						<LMButton labelStyle={{ color: 'black' }} style={[styles.button, { backgroundColor: 'white' }]} label={this.state.cancelLabel} onPress={() => {
							this.hide();
							this.state.onCancelPress();
						}} />
					</View>
				</View>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		zIndex: 99999,
		width: WIDTH,
		height: HEIGHT,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		top: 0,
		left: 0,
		paddingTop: getStatusBarHeight(),
		justifyContent: 'center',
		alignItems: 'center'
	},
	alertBoxContainer: {
		width: '80%',
		backgroundColor: 'white',
		borderRadius: 10,
		minHeight: 200,
	},
	titleContainer: {
		width: '100%',
		minHeight: 100,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	messageContainer: {
		marginTop: 25,
		minHeight: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonContainer: {
		width: '100%',
		minHeight: 60,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	button: {
		width: '100%',
		height: 50
	},
	imageContainer: {
		width: 50,
		height: 50,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: 25,
		height: 25,
	},
	contentContainer: {
		padding: 10
	}
})

export default LMAlert;
