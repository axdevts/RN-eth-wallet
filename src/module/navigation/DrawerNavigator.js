import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainStackNavigator from './MainStackNavigator';
import { gray, secondBackground } from '../../component/common/LMStyle';
import { useDispatch } from 'react-redux';
import User from '../../component/icon/User';
import ChevronRight from '../../component/icon/ChevronRight';
import Privacy from '../../component/icon/Privacy';
import Help from '../../component/icon/Help';
import Exit from '../../component/icon/Exit';
import LMAlert from '../../component/common/LMAlert';
import { UserAction } from '../../persistent/user/UserAction';
import Network from '../../component/icon/Network';

const Drawer = createDrawerNavigator();
const DrawerContent = ({ navigation, lang }) => {
	const dispatch = useDispatch();
	return (
		<SafeAreaView style={{
			flex: 1,
		}}>
			<View style={{ height: 100, alignItems: 'center', width: '100%' }}>
				<Image source={require('../../../assets/profile_bg.png')} style={{ position: 'absolute', width: '100%', height: 300 }} resizeMode={'stretch'} />
				<Image source={require('../../../assets/logo_small.png')} style={{ width: 150, height: 100 }} resizeMode={'stretch'} />
			</View>
			<View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', paddingLeft: 10, paddingRight: 10, borderRadius: 15, paddingTop: 15 }}>
				<TouchableOpacity style={styles.menuItem} onPress={() => {
					navigation.navigate("PersonalScreen");
				}}>
					<View style={styles.menuIcon}>
						<User />
					</View>
					<View style={styles.menuTitle}>
						<Text style={{ fontWeight: 'bold' }}>{lang.personal}</Text>
					</View>
					<View style={styles.menuIcon}>
						<ChevronRight />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.menuItem} onPress={() => {
					navigation.navigate("PrivacyScreen");
				}}>
					<View style={styles.menuIcon}>
						<Privacy />
					</View>
					<View style={styles.menuTitle}>
						<Text style={{ fontWeight: 'bold' }}>{lang.privacyAndSecurity}</Text>
					</View>
					<View style={styles.menuIcon}>
						<ChevronRight />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.menuItem} onPress={() => {
					navigation.navigate("NetworkListScreen");
				}}>
					<View style={styles.menuIcon}>
						<Network />
					</View>
					<View style={styles.menuTitle}>
						<Text style={{ fontWeight: 'bold' }}>{lang.network}</Text>
					</View>
					<View style={styles.menuIcon}>
						<ChevronRight />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.menuItem}>
					<View style={styles.menuIcon}>
						<Help />
					</View>
					<View style={styles.menuTitle}>
						<Text style={{ fontWeight: 'bold' }}>{lang.help}</Text>
					</View>
					<View style={styles.menuIcon}>
						<ChevronRight />
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.menuItem} onPress={() => {
					LMAlert.show({
						message: lang.doYouReallyWantToLogOut,
						onOkPress: async () => {
							dispatch(UserAction.signOut());
						}
					});
				}}>
					<View style={styles.menuIcon}>
						<Exit />
					</View>
					<View style={styles.menuTitle}>
						<Text style={{ fontWeight: 'bold' }}>{lang.logOut}</Text>
					</View>
					<View style={styles.menuIcon}>
						<ChevronRight />
					</View>
				</TouchableOpacity>
				<Text style={{ position: 'absolute', bottom: 0, color: gray, fontSize: 10 }}>
					Powered by Etherscan.io APIs
				</Text>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	text: { fontSize: 12, fontWeight: '400' },
	drawerStyles: { flex: 1, width: '60%', backgroundColor: 'transparent' },
	menuItem: {
		width: '100%', height: 50, flexDirection: 'row', marginBottom: 5
	},
	menuIcon: {
		width: 24, height: 50, justifyContent: 'center', alignItems: 'center'
	},
	menuTitle: {
		paddingLeft: 16, flex: 1, justifyContent: 'center'
	}
});

export default function DrawerNavigator(props) {
	const [progress, setProgress] = useState(new Animated.Value(0));
	const { lang } = props;
	const scale = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [1, 0.7],
	});
	const borderRadius = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [0, 16],
	});
	const animatedStyle = { borderRadius, transform: [{ scale: scale }] };

	return (
		<Drawer.Navigator
			initialRouteName="Showing"
			drawerType="slide"
			overlayColor="transparent"
			drawerStyle={styles.drawerStyles}
			contentContainerStyle={{ flex: 1, backgroundColor: secondBackground }}
			drawerContentOptions={{
				activeBackgroundColor: 'transparent',
				activeTintColor: 'white',
				inactiveTintColor: 'white',
			}}
			sceneContainerStyle={{ backgroundColor: secondBackground }}
			drawerContent={props => {
				setProgress(props.progress);
				return <DrawerContent {...props} lang={lang} />;
			}}
		>
			<Drawer.Screen name="Screens">
				{props => {
					return <MainStackNavigator {...props} lang={lang} style={animatedStyle} />;
				}}
			</Drawer.Screen>
		</Drawer.Navigator>

	);
}


