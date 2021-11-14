import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UserAction } from '../../persistent/user/UserAction';
import DrawerNavigator from './DrawerNavigator';
import { secondBackground } from '../../component/common/LMStyle';
import AuthStackNavigator from './AuthStackNavigator';
import { CurrencyAction } from '../../persistent/currency/CurrencyAction';
import { NetworkAction } from '../../persistent/network/NetworkAction';
import { LanguageAction } from '../../persistent/language/LanguageAction';

function ApplicationNavigator() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const { passwordConfirmed } = useSelector(state => state.UserReducer);
	const { language } = useSelector(state => state.LanguageReducer);
	const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
	useEffect(() => {
		dispatch(UserAction.rememberMe()).then(async () => {
			dispatch(CurrencyAction.getCurrency());
			dispatch(NetworkAction.list());
			dispatch(LanguageAction.set()),
				await sleep(2000)//how many seconds for splash screen
			setLoading(false);
		});
	}, []);
	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				{/*replace logo.png by your photo*/}
				<Image source={require('../../../assets/logo.png')} style={{ width: 200, height: 300 }} resizeMode={'stretch'} />
			</View>
		)

	}
	return (
		<NavigationContainer>
			<View style={{ flex: 1, backgroundColor: secondBackground }}>
				{
					passwordConfirmed ? <DrawerNavigator lang={language} /> : <AuthStackNavigator lang={language} />
				}
			</View>
		</NavigationContainer>

	);
}
export default ApplicationNavigator;
