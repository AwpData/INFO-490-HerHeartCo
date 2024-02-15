import React, { useState } from 'react';
import { View, Button, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { addAmount, currWater } from '../fitbitAPI/write/addWater';

import * as Theme from '../../theme';

export const AddWaterView = () => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();

    return (
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <TextInput
                style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, }}
                value={inputValue.toString()}
                onChangeText={setInputValue}
                placeholder="0"
                keyboardType={"number-pad"}
                clearTextOnFocus={true}
            />
            <TouchableOpacity onPress={() => {
                dispatch(addAmount(Number(inputValue) || 0))
                setInputValue('')
            }}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 15}}>Done</Text>
            </TouchableOpacity>            
        </View>
    );
}