import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import CreateMnemonicsScreen from '../../screen/wallet/CreateMnemonicsScreen';
import ConfirmMnemonicsScreen from '../../screen/wallet/ConfirmMnemonicsScreen';
import CreateWalletScreen from '../../screen/wallet/CreateWalletScreen';
import CreatePasswordScreen from '../../screen/wallet/CreatePasswordScreen';
import TermsAndConditionsScreen from '../../screen/wallet/TermsAndConditionsScreen';
import { useSelector } from 'react-redux';
import WalletLoginScreen from '../../screen/wallet/WalletLoginScreen';
import ImportWalletScreen from '../../screen/wallet/ImportWalletScreen';


const Stack = createStackNavigator();
function AuthStackNavigator(props) {
	const { lang } = props;
	const { loggedIn } = useSelector(state => state.UserReducer);
	useEffect(() => {

	}, [])
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
			initialRouteName={loggedIn ? "WalletLoginScreen" : "CreateWalletScreen"}>
			<Stack.Screen name="CreateWalletScreen" component={(props) => { return <CreateWalletScreen {...props} lang={lang} /> }} />
			<Stack.Screen name="CreatePasswordScreen" component={(props) => { return <CreatePasswordScreen {...props} lang={lang} /> }} />
			<Stack.Screen name="CreateMnemonicsScreen" component={(props) => { return <CreateMnemonicsScreen {...props} lang={lang} /> }} />
			<Stack.Screen name="ConfirmMnemonicsScreen" component={(props) => { return <ConfirmMnemonicsScreen {...props} lang={lang} /> }} />
			<Stack.Screen name="TermsAndConditionsScreen" component={(props) => { return <TermsAndConditionsScreen {...props} lang={lang} /> }} />
			<Stack.Screen name="WalletLoginScreen" component={(props) => { return <WalletLoginScreen {...props} lang={lang} /> }} />
			<Stack.Screen name="ImportWalletScreen" component={(props) => { return <ImportWalletScreen {...props} lang={lang} /> }} />
		</Stack.Navigator>
	);
}
export default AuthStackNavigator;
