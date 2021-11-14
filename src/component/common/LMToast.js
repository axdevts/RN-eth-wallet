import React from 'react';
import {Popup, Toast} from 'popup-ui';
import {BackHandler, Image} from 'react-native';
import { primary } from './LMStyle';
function  backAction(){
    return true;
}
const LMToast = {
    success : (data) => {
        Toast.show({
            title: data.title,
            text: data.text,
            color: primary,
            timing: 2000,
            icon: (
                <Image
                    source={require('../../../assets/close.png')}
                    style={{width: 15, height: 15}}
                    resizeMode="contain"
                />
            ),
        })
    },
    error : (data) => {
        Toast.show({
            title: data.title,
            text: data.text,
            color: '#e74c3c',
            timing: 2000,
            icon: (
                <Image
                    source={require('../../../assets/close.png')}
                    style={{width: 15, height: 15}}
                    resizeMode="contain"
                />
            ),
        })
    },
    popupSuccess : (data) => {
        const {
            title,
            message,
            buttonText,
            callback
        } = data;
        BackHandler.addEventListener("hardwareBackPress", backAction);
        Popup.show({
            type: 'Success',
            title: title,
            button: true,
            textBody: message,
            buttontext: buttonText,
            autoClose: false,
            callback: ()=>{
                if(callback){
                    callback();
                }
                Popup.hide();
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            },
        })
    },
    popupError : (data) => {
        const {
            title,
            message,
            buttonText,
            callback
        } = data;
        BackHandler.addEventListener("hardwareBackPress", backAction);
        Popup.show({
            type: 'Danger',
            title: title,
            button: true,
            textBody: message,
            buttontext: buttonText,
            autoClose: true,
            callback: ()=>{
                if(callback){
                    callback();
                }
                Popup.hide();
                BackHandler.removeEventListener("hardwareBackPress", backAction);
            },
        })
    }
};
export default LMToast;
