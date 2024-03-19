// EditDailyGoalsExpandedView.jsx
// 
// Parent container for the view that appears when users want to edit data for a goal 
// Will refactor


import React, { useState } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { Platform, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import * as Theme from '../../theme';
import { 
    addWater, addWaterLog, 
    editSleep, 
    updateGlucose, addGlucoseLog, 
    addHRV, } from '../../redux/actions';

import ExpandedLog from './ExpandedLog';


export default function EditDailyGoalsExpandedView( { type } ) {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const waterLog = useSelector(state => state.userReducer.waterLog);
    const glucoseLog = useSelector(state => state.userReducer.glucoseLog);
    const [glucoseTime, setGlucoseTime] = useState(new Date());

    const [selectedHours, setSelectedHours] = useState(0);
    const [selectedMinutes, setSelectedMinutes] = useState(0);

    const hoursArray = Array.from({ length: 24 }, (_, i) => i);
    const minutesArray = Array.from({ length: 60 }, (_, i) => i);

    // Handle time selection for glucose 
    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || glucoseTime; 
        setGlucoseTime(currentTime);
    }

    // Button text to display when updating data 
    function primaryButtonText() {
        switch(type) {
            case('Water'):
                return 'Add';
            case('Glucose'):
                return 'Update';
            case ('HRV'):  
                return 'Add';
            case ('Sleep'): 
                return 'Update';
            default: return;
        }
    }

    // Label underneath field to enter data 
    function typeLabel() {
        switch(type) {
            case('Water'):
                return 'Cups';
            case('Glucose'):
                return 'mg/dL';
            case ('HRV'):  
                return 'Minutes';
            default: return;
        }
    }

    // Redux action to perform to edit data 
    function editAction() {
        switch(type) {
            case('Water'): 
                let newWaterEntry = Number(inputValue);
                
                dispatch(addWater(newWaterEntry || 0));
                if (newWaterEntry !== 0) {
                    dispatch(addWaterLog(newWaterEntry));
                }
                break;
            case('Glucose'): 
                let newGlucose = Number(inputValue);
                let selectedTime = glucoseTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}); 
                let newGlucoseEntry = {glucose: newGlucose, time: selectedTime};
                
                dispatch(updateGlucose(Number(inputValue) || 0));
                if (newGlucose !== 0) {
                    dispatch(addGlucoseLog(newGlucoseEntry));
                }
                break;
            case ('HRV'): 
                dispatch(addHRV(Number(inputValue) || 0)); 
                break; 
            case ('Sleep'): 
                let totalSleepMin = Number(selectedHours * 60) + Number(selectedMinutes);
                dispatch(editSleep(totalSleepMin)); 
                break;
            default: break; 
        }
        setInputValue('');
    }

    // Show log based on goal type
    function showLog() {
        switch(type) {
            case ("Water"):
                return (<ExpandedLog type="Water" log={waterLog} />);
            case ("Glucose"): 
                return (<ExpandedLog type="Glucose" log={glucoseLog} />);
        }
    }

    // TODO: refactor style

    return (
        <>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '90%', marginBottom: 20}} />

                { type == 'Sleep' ? (
                        // Hours and minutes wheels 
                        <View style={{flexDirection: 'row', justifyContent: 'center', }}>
                            <Picker
                                selectedValue={selectedHours}
                                onValueChange={(itemValue) => setSelectedHours(itemValue)}
                                style={{width: '30%', }} 
                            >
                                {hoursArray.map((hour) => (
                                    <Picker.Item key={hour} label={`${hour}`} value={hour} />
                                ))}
                            </Picker>
                            <View style={{justifyContent: 'center', paddingHorizontal: 5}}>
                                <Text style={Theme.headline}>h</Text>
                            </View>
                            
                            <Picker
                                selectedValue={selectedMinutes}
                                onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
                                style={{width: '30%', }} 
                            >
                                {minutesArray.map((minute) => (
                                    <Picker.Item key={minute} label={`${minute.toString().padStart(2, '0')}`} value={minute} />
                                ))}
                            </Picker>
                            <View style={{justifyContent: 'center', paddingHorizontal: 5}}>
                                <Text style={Theme.headline}>min</Text>
                            </View>
                        </View>
                ) : ( type == 'Glucose' ? (
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}} >
                            <TextInput
                                style={{
                                    backgroundColor: 'white', 
                                    fontSize: 48, fontWeight: 'bold', 
                                    padding: 15, minWidth: 100, textAlign: 'center', 
                                    borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray,
                                    fontFamily: Platform.select({
                                        android: 'Lato_900Black',
                                        ios: 'Lato_900Black'
                                    }), marginBottom: 10}}
                                value={inputValue.toString()}
                                onChangeText={setInputValue}
                                placeholder="0"
                                keyboardType={"number-pad"}
                                returnKeyType='done'
                                clearTextOnFocus={true}
                            />

                            <Text style={Theme.buttonText}>{typeLabel() }</Text>
                        </View>

                        <Text style={{...Theme.boldBody, color: 'black', paddingLeft: 15, paddingRight: 5 , alignSelf: 'center'}}>at</Text>

                        {/* Time picker for glucose log */}
                        <DateTimePicker
                            mode="time"
                            value={glucoseTime}
                            onChange={onChangeTime}
                        />
                    </View>
                ) : ( // default: water, hrv
                    <View style={{flexDirection: 'column', alignItems: 'center'}} >
                        <TextInput
                            style={{
                                backgroundColor: 'white', 
                                fontSize: 48, fontWeight: 'bold', 
                                padding: 15, minWidth: 100, textAlign: 'center', 
                                borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray,
                                fontFamily: Platform.select({
                                    android: 'Lato_900Black',
                                    ios: 'Lato_900Black'
                                }), marginBottom: 10}}
                            value={inputValue.toString()}
                            onChangeText={setInputValue}
                            placeholder="0"
                            keyboardType={"number-pad"}
                            returnKeyType='done'
                            clearTextOnFocus={true}
                        />

                        <Text style={Theme.buttonText}>{typeLabel()}</Text>

                        {/* Show water unit conversion */}
                        { type == 'Water' && 
                            <Text style={Theme.grayButtonText}>1 cup = 8 oz = 237 mL</Text>
                        }
                    </View>
                )) }

                {/* Cancel and Add/Update buttons  */}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', }} >
                    <TouchableOpacity 
                        onPress={ () => { 
                            setInputValue(''); 
                            setSelectedHours(0);
                            setSelectedMinutes(0);
                            Keyboard.dismiss(); }} 
                        style={{
                            marginRight: 50,
                            marginVertical: 30
                    }}>
                        <Text style={Theme.body}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={ () => {
                            editAction()
                            setInputValue('');
                            Keyboard.dismiss(); }}
                        style={{
                            marginLeft: 50,
                            marginVertical: 30
                    }} >
                        <Text style={Theme.buttonText}>
                            {primaryButtonText()}
                        </Text>
                    </TouchableOpacity> 
                </View> 
            </View>

            {/* Display water log or glucose log */}
            <View style={{alignSelf: 'flex-start', paddingLeft: 20}}>
                { showLog() }
            </View>
        </>
    );
}