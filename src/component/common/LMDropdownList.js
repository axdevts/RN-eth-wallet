import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, ColorPropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { black, grey, red } from './LMStyle';
import Icon from "react-native-vector-icons/FontAwesome";
import { Dropdown, MultiselectDropdown, GroupDropdown } from "sharingan-rn-modal-dropdown";
//import DropDownPicker from "react-native-dropdown-picker";
import SelectDropdown from 'react-native-select-dropdown';
import { stripZeros } from "@ethersproject/bytes";

export default function LMDropdownList({ ...rest }) {
    const { error, label, labelStyle, style, hint, onHintPress, editable, placeholder, contacts } = { ...rest };
    const isErrorVisible = error !== undefined ? true : false;

    const [item, setItem] = useState('');
    // const selectRef = createRef();
    const selectRef = useRef({});  
    return (
        <View style={styles.container}>
            {
                label && (
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.label, labelStyle]}>{label}</Text>
                        {
                            hint &&
                            <TouchableOpacity onPress={onHintPress}>
                                <Text style={[styles.hint]}>{hint}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                )
            }
            <SelectDropdown {...rest} 
                buttonStyle={styles.dropdownBTNStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                data={contacts}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                dropdownOverlayColor={styles.dropdownOverlayColor}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                ref={selectRef}
                renderDropdownIcon={() => {
                    return (
                        <Icon name="chevron-down" color={"#444"} size={12} />
                    );
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem.name
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.name
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 75,
        justifyContent: 'center',
        marginTop: 5,
    },
    textInput: {
        paddingLeft: 5,
        width: '100%',
        height: 50,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#d5d5d5',
        backgroundColor: 'white',
        
    },
    label: { color: 'black', fontWeight: 'bold' },
    hint: { marginLeft: 5, color: grey, fontWeight: 'bold', fontStyle: 'italic', fontSize: 10 },
    error: { color: 'red', fontWeight: 'bold'},
    dropdownBTNStyle: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#d5d5d5',
        width: '100%',
        height: 50,
        backgroundColor: "transparent",
    },
    dropdown1BtnTxtStyle: {
        textAlign: 'left',
        marginLeft: -2,
        fontSize: 14.5,
    },
    dropdown1DropdownStyle: {
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#d5d5d5",
        textAlign: "center"
    },
    dropdownOverlayColor: {
        
    },
    dropdown1RowTxtStyle : {
        fontSize: 14.5,
        textAlign:"left"
    },
    
});


