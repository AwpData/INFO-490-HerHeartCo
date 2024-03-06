import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from "react-native";

import * as Theme from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { checkboxFalse, checkboxTrue } from '../../constants';
import { toggleExercise } from '../../redux/actions';


export default function CheckExercise({icon, title}) {
    const exercise = useSelector(state => state.userReducer.exercise);
    const [inputValue, setInputValue] = useState(exercise);
    const dispatch = useDispatch()
    

    return (
        <View style={Theme.addDataRowStyle}>
        <TouchableOpacity onPress={ () => {
                setInputValue(!inputValue);
                dispatch(toggleExercise(!inputValue));
        }} style={{justifyContent: 'center', padding: 15}} >
            <View style={{flexDirection: 'row', alignItems: 'center', }}>
                <View style={{maxWidth: 35, minWidth: 35, alignItems: 'center', }}>
                    {icon}
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: Theme.primaryTint, paddingHorizontal: 15,}}>{title}</Text>

                <View style={{flex: 1}} />
                { exercise ? checkboxTrue : checkboxFalse }
            </View>
            
        </TouchableOpacity>

      </View>
    );
}