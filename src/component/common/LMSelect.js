import React, {Component} from 'react';
import {Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LMBackButton from './LMBackButton';
import LMTextInput from './LMTextInput';
import {gray, green} from './LMStyle';
import LMFlatList from './LMFlatList';
import LMIcon from './LMIcon';
import _ from 'lodash';
const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

class LMSelect extends Component {
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
            data : [],
            filteredData : [],
            selected : {},
            key : 'key',
            label : 'label',
            onPress : ()=>{

            },
            keyword : '',
            renderItem : null
        };
    }
    _setState(reducer) {
        return new Promise((resolve) => this.setState(reducer, () => resolve()));
    }
    clearState(){
        this._setState({
            data : [],
            filteredData : [],
            selected : {},
            key : 'key',
            label : 'label',
            onPress : ()=>{

            },
            keyword : '',
            renderItem : null
        });
    }
    show({ ...config }) {
        const newConfig = {...config,filteredData : config.data,keyword : ''};
        this._setState(newConfig);
        Animated.sequence([
            Animated.timing(this.state.positionView, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }),
        ]).start();
    }

    hide() {
        Animated.sequence([
            Animated.timing(this.state.positionView, {
                toValue: HEIGHT,
                duration: 200,
                useNativeDriver: false
            }),
        ]).start();
        this.clearState();
    }
    static show({ ...config }){
        this._ref.show({ ...config });
    }
    static hide(){
        this._ref.hide();
    }
    defaultItem(item){
        return (
            <>
                <View style={{width: 60, height: 60, justifyContent: 'center', alignItems: 'center'}}>
                    <LMIcon hash={item[this.state.label]}/>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 14}}>{item[this.state.label]}</Text>
                </View>
                <View style={{width: 60, height: 60, justifyContent: 'center', alignItems: 'center'}}>
                    { this.state.selected[this.state.key] === item[this.state.key] &&
                    <View style={{width: 16, height: 16, backgroundColor: green, borderColor: gray, borderRadius: 32}}>

                    </View>}
                </View>
            </>
        )
    }
    renderItem({item}) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => {
                this.state.onPress(item);
                this.hide();
            }}>
                {
                    this.state.renderItem ? this.state.renderItem(item) : this.defaultItem(item)
                }
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <Animated.View
                style={[styles.Container, {
                    backgroundColor: 'white',
                    transform: [
                        { translateY: this.state.positionView }
                    ]
                }]}>
                <View style={styles.header}>
                    <View style={{width: 48}}>
                        <LMBackButton color={gray} onPress={()=>{
                            this.hide();
                        }}/>
                    </View>
                    <View style={{flex:1}}>
                        <LMTextInput
                            style={{borderWidth : 0, height : 40}}
                            placeholder={'Search...'}
                            onChangeText={value => {
                                const label = this.state.label;
                                let found = _.filter(this.state.data, function(data) {
                                    return data[label].includes(value);
                                });
                                this.setState({
                                    keyword : value,
                                    filteredData : found
                                });

                            }}
                            value={this.state.keyword}
                        />
                    </View>
                </View>
                <View style={styles.content}>
                    <LMFlatList
                        data={this.state.filteredData}
                        keyExtractor={item=>item[this.state.key]}
                        renderItem={(item)=> this.renderItem(item)}
                    />
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        position: 'absolute',
        zIndex: 99999,
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        top: 0,
        left: 0,
        paddingTop : getStatusBarHeight()
    },
    header : {
        height : 60,
        width : '100%',
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems : 'center',
        paddingLeft : 10,
        paddingRight : 10,
        borderBottomWidth : 0.5,
        borderBottomColor : '#e2e2e2'
    },
    content: {
        flex:1
    },
    item : {
        width : '100%',
        height : 70,
        borderBottomWidth : 0.5,
        borderBottomColor : '#e2e2e2',
        flexDirection:  'row'
    }

})

export default LMSelect;
