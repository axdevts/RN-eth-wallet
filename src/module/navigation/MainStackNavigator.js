import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import Animated from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import BottomTabBarNavigator from './BottomTabBarNavigator';
import AddWalletScreen from '../../screen/wallet/AddWalletScreen';
import ViewWalletScreen from '../../screen/wallet/ViewWalletScreen';
import TopUpScreen from '../../screen/transaction/TopUpScreen';
import ScannerScreen from '../../screen/transaction/ScannerScreen';
import TransferScreen from '../../screen/transaction/TransferScreen';
import TransactionScreen from '../../screen/transaction/TransactionScreen';
import TransactionDetailScreen from '../../screen/transaction/TransactionDetailScreen';
import AddContactScreen from '../../screen/contact/AddContactScreen';
import UpdateContactScreen from '../../screen/contact/UpdateContactScreen';
import PersonalScreen from '../../screen/setting/PersonalScreen';
import PrivacyScreen from '../../screen/setting/PrivacyScreen';
import NetworkListScreen from '../../screen/network/NetworkListScreen';
import AddNetworkScreen from '../../screen/network/AddNetworkScreen';
import UpdateNetworkScreen from '../../screen/network/UpdateNetworkScreen';
import ChangePasswordScreen from '../../screen/setting/ChangePasswordScreen';
import TokenScreen from '../../screen/uniswap/TokenScreen';
import AddTokenScreen from '../../screen/uniswap/AddTokenScreen';
import ERC20TransferScreen from '../../screen/transaction/ERC20TransferScreen';

const Stack = createStackNavigator();

function MainStackNavigator({style, lang}) {
    useEffect(() => {
    }, []);
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen name="BottomTabBarNavigator" component={BottomTabBarNavigator}/>
                <Stack.Screen name="AddWalletScreen" component={(props) => {
                    return <AddWalletScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="ViewWalletScreen" component={(props) => {
                    return <ViewWalletScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="TopUpScreen" component={(props) => {
                    return <TopUpScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="TransferScreen" component={(props) => {
                    return <TransferScreen {...props} lang={lang}/>;
                }}/>
				<Stack.Screen name="ERC20TransferScreen" component={(props) => {
					return <ERC20TransferScreen {...props} lang={lang}/>;
				}}/>
                <Stack.Screen name="ScannerScreen" component={(props) => {
                    return <ScannerScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="TransactionScreen" component={(props) => {
                    return <TransactionScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="TransactionDetailScreen" component={(props) => {
                    return <TransactionDetailScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="AddContactScreen" component={(props) => {
                    return <AddContactScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="UpdateContactScreen" component={(props) => {
                    return <UpdateContactScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="PersonalScreen" component={PersonalScreen}/>
                <Stack.Screen name="PrivacyScreen" component={(props) => {
                    return <PrivacyScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="NetworkListScreen" component={(props) => {
                    return <NetworkListScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="AddNetworkScreen" component={(props) => {
                    return <AddNetworkScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="UpdateNetworkScreen" component={(props) => {
                    return <UpdateNetworkScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="ChangePasswordScreen" component={(props) => {
                    return <ChangePasswordScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="TokenScreen" component={(props) => {
                    return <TokenScreen {...props} lang={lang}/>;
                }}/>
                <Stack.Screen name="AddTokenScreen" component={(props) => {
                    return <AddTokenScreen {...props} lang={lang}/>;
                }}/>

            </Stack.Navigator>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
    },
});
export default MainStackNavigator;
