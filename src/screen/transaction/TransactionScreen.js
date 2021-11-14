import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {defaultBackground, gray} from '../../component/common/LMStyle';
import {useDispatch, useSelector} from 'react-redux';
import LMBackButton from '../../component/common/LMBackButton';
import LMFlatList from '../../component/common/LMFlatList';
import LMCrypto from '../../component/common/LMCrypto';
import {WalletAction} from '../../persistent/wallet/WalletAction';

export default function TransactionScreen({navigation,lang}){
    const {activeWallet,transactions} = useSelector(state => state.WalletReducer);
    const dispatch = useDispatch();
    const [isRefreshing,setIsRefreshing] = useState(false);
    useEffect(()=>{

    },[]);
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.item} key={item.blockHash} onPress={()=>{
                navigation.navigate("TransactionDetailScreen",{
                    transaction : item
                });
            }}>
                <View style={{position: 'absolute'}}>
                    <Text style={{color:gray, fontSize : 12}}>{item.date}</Text>
                </View>
                <View style={styles.activityIconContainer}>
                    <Image source={item.icon} style={styles.activityIcon} resizeMode={'stretch'}/>
                </View>
                <View style={styles.leftActivityItem}>
                    <Text style={{fontSize : 14}}>{item.sentOrReceived}</Text>
                    <Text style={{fontSize : 12, marginTop: 5, color: item.color, fontWeight : 'bold'}}>{item.status}</Text>
                </View>
                <View style={styles.rightActivityItem}>
                    <LMCrypto value={item.etherValue}/>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <LMBackButton color={'black'} onPress={() => {
                    navigation.goBack();
                }}/>
                <View style={{flex:1, justifyContent : 'center', alignItems : 'center'}}>
                    <Text style={{fontSize: 16, textAlign: 'center', fontWeight : 'bold'}}>{lang.history}</Text>
                </View>
                <View style={{width : 40}}>

                </View>
            </View>
            <View style={styles.contentContainer}>
                <LMFlatList
                    data={transactions}
                    keyExtractor={item=>item.blockHash}
                    renderItem={renderItem}
                    onRefresh={() => {
                        dispatch(WalletAction.getTransactions(activeWallet.address)).then(()=>{
                            setIsRefreshing(false);
                        })
                    }}
                    refreshing={isRefreshing}
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
    item : {
        width : '100%',
        height : 80,
        borderBottomWidth : 0.5,
        borderBottomColor : '#e2e2e2',
        flexDirection:  'row'
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
    contentContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
});
