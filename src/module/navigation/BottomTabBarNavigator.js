import * as React from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from '../../screen/main/MainScreen';
import {primary, green, black} from '../../component/common/LMStyle';
import WalletListScreen from '../../screen/wallet/WalletListScreen';
import {useDispatch, useSelector} from 'react-redux';
import Home from '../../component/icon/Home';
import Wallet from '../../component/icon/Wallet';
import Contact from '../../component/icon/Contact';
import ContactListScreen from '../../screen/contact/ContactListScreen';
import UniswapScreen from '../../screen/uniswap/UniswapScreen';
import Swap from '../../component/icon/Swap';


const Tab = createBottomTabNavigator();

export default function BottomTabBarNavigator() {
    const {language} = useSelector(state => state.LanguageReducer)
    useEffect(async () => {

    },[])
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: 'lightgray',
            }}
        >
            <Tab.Screen name="MainScreen" component={MainScreen} options={{
                tabBarLabel: ({ focused }) => {
                    let color = black;
                    if(focused){
                        color = primary;
                    }
                    return (
                        <Text style={[styles.label,{color : color}]}>{language.home}</Text>
                    );
                },
                tabBarIcon: ({focused}) => (
                    <Home focused={focused}/>
                ),
            }}/>
            <Tab.Screen name="Wallet" component={WalletListScreen} options={{
                tabBarLabel: ({ focused }) => {
                    let color = black;
                    if(focused){
                        color = primary;
                    }
                    return (
                        <Text style={[styles.label,{color : color}]}>{language.wallet}</Text>
                    );
                },
                tabBarIcon: ({focused}) => (
                    <Wallet focused={focused}/>
                ),
            }}/>
            {/* <Tab.Screen name="UniswapScreen" component={UniswapScreen} options={{
                tabBarLabel: ({ focused }) => {
                    let color = black;
                    if(focused){
                        color = primary;
                    }
                    return (
                        <Text style={[styles.label,{color : color}]}>{language.swap}</Text>
                    );
                },
                tabBarIcon: ({focused}) => (
                    <Swap focused={focused}/>
                ),
            }}/> */}

            <Tab.Screen name="ContactListScreen" component={ContactListScreen} options={{
                tabBarLabel: ({ focused }) => {
                    let color = black;
                    if(focused){
                        color = primary;
                    }
                    return (
                        <Text style={[styles.label,{color : color}]}>{language.contact}</Text>
                    );
                },
                tabBarIcon: ({focused}) => (
                    <Contact focused={focused}/>
                ),
            }}/>
        </Tab.Navigator>

    );
}
const styles = StyleSheet.create({
    label : {fontSize : 10}
});
