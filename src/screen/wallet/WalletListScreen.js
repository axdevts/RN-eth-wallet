import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {darkBlue, defaultBackground, gray, green} from '../../component/common/LMStyle';
import {useDispatch, useSelector} from 'react-redux';
import LMFlatList from '../../component/common/LMFlatList';
import LMCurrency from '../../component/common/LMFiat';
import Jazzicon from 'react-native-jazzicon';
import {WalletAction} from '../../persistent/wallet/WalletAction';
import LMCrypto from '../../component/common/LMCrypto';
import LMFiat from '../../component/common/LMFiat';


export default function WalletListScreen({navigation,route}){
    const dispatch = useDispatch();
    const {activeWallet, wallets} = useSelector(state => state.WalletReducer);
    useEffect(()=>{
        dispatch(WalletAction.getWallets())
    },[]);
    const renderItem = ({item})=>{
        return (
            <TouchableOpacity style={styles.item} onPress={() => {
                navigation.navigate("ViewWalletScreen",{wallet : item})
            }}>
                <View style={{width: 60, height: 60, justifyContent: 'center', alignItems: 'center'}}>
                    <Jazzicon size={32} address={item.address} />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 14}}>{item.name}</Text>
                    <LMCrypto value={item.balance}/>
                    <LMFiat value={item.balance}/>
                </View>
                <View style={{width: 60, height: 60, justifyContent: 'center', alignItems: 'center'}}>
                    {
                        activeWallet.address == item.address &&
                        <View style={{width: 16, height: 16, backgroundColor: darkBlue, borderColor: gray, borderRadius: 32}}>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../../assets/logo_small.png')} style={styles.logo} resizeMode={'stretch'}/>
                <TouchableOpacity style={[styles.logo,{alignItems : 'flex-end', justifyContent : 'center'}]} onPress={()=>{
                    navigation.navigate("AddWalletScreen");
                }}>
                    <Image source={require('../../../assets/plus.png')} style={styles.icon} resizeMode={'cover'}/>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                <LMFlatList
                    data={wallets}
                    keyExtractor={item=>item.address}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultBackground,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
    },
    header: {
        height: 50,
        width: '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingRight: 10,
    },
    logo : {
        width : 50,
        height : 50
    },
    accountContainer : {
      marginTop : 24,
      height : 50,
        flexDirection : 'row'
    },
    operationContainer : {
        marginTop : 24,
        height : 84,
        backgroundColor: green,
        borderRadius : 10,
        padding: 8,
        flexDirection: 'row'
    },
    operationItem : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    operationIcon : {
        width : 32,
        height : 32
    },
    div : {
        width : 1,
        height : 57
    },
    contentContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop : 10
    },
    activityContainer : {
        marginTop : 24,
        height : 275
    },
    title : {
        fontSize : 18, fontWeight : 'bold'
    },
    activityItem : {
        width : '100%',
        height : 60,
        marginTop : 1,
        flexDirection : 'row'
    },
    activityIconContainer : {
        width : 32,
        justifyContent: 'center',
        alignItems : 'center'
    },
    activityIcon : {
        width : 24,
        height : 24
    },
    leftActivityItem : {
        flex : 4,
        justifyContent: 'center',
    },
    rightActivityItem : {
        flex:2,
        justifyContent: 'center',
        alignItems : 'flex-end'
    },
    promotionContainer : {
        marginTop : 24,
        height : 170
    },
    promotionItem : {
        width : 318,
        height : 170,
        marginRight : 5
    },
    icon : {width : 32, height:32, backgroundColor : darkBlue, borderRadius : 5},
    item : {
        width : '100%',
        height : 70,
        borderBottomWidth : 0.5,
        borderBottomColor : '#e2e2e2',
        flexDirection:  'row'
    }
});
