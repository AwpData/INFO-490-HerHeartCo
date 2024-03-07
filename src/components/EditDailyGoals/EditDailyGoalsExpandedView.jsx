import React, { useState } from 'react';
import { Platform, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import { addWater, addWaterLog, editSleep, updateGlucose, addHRV, addGlucoseLog, } from '../../redux/actions';
import * as Theme from '../../theme';
import ExpandedLog from './ExpandedLog';


export default function EditDailyGoalsExpandedView( { type } ) {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');

    const waterLog = useSelector(state => state.userReducer.waterLog);
    const glucoseLog = useSelector(state => state.userReducer.glucoseLog);
    const [glucoseTime, setGlucoseTime] = useState(new Date());

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || glucoseTime; 
        setGlucoseTime(currentTime);
    }

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
                let totalSleepMin = (Number(inputValue) * 60) + (Number(inputValue2));
                dispatch(editSleep(totalSleepMin || 0)); 
                break;
            default: break; 
        }
        setInputValue('');
    }

    // TODO: refactor style

    return (
        <>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
                <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '90%', marginBottom: 20}} />

                { type == 'Sleep' ? (
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10}} >
                            <TextInput
                                style={{
                                    backgroundColor: 'white', 
                                    fontSize: 48, fontWeight: 'bold', 
                                    padding: 15, minWidth: 100, textAlign: 'center', 
                                    borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray,
                                    fontFamily: Platform.select({
                                        android: 'Lato_900Black',
                                        ios: 'Lato_900Black'
                                    }), marginBottom: 10 }}
                                value={inputValue.toString()}
                                onChangeText={setInputValue}
                                placeholder="0"
                                keyboardType={"number-pad"}
                                returnKeyType='done'
                                clearTextOnFocus={true}
                            />
                            <View style={{justifyContent:'center', paddingRight: 15}}>
                                <Text style={Theme.buttonText}>Hours</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10}} >
                            <TextInput
                                style={{
                                    backgroundColor: 'white', 
                                    fontSize: 48, fontWeight: 'bold', 
                                    padding: 15, minWidth: 100, textAlign: 'center', 
                                    borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray,
                                    fontFamily: Platform.select({
                                        android: 'Lato_900Black',
                                        ios: 'Lato_900Black'
                                    }), marginBottom: 10 }}
                                value={inputValue2.toString()}
                                onChangeText={setInputValue2}
                                placeholder="0"
                                keyboardType={"number-pad"}
                                returnKeyType='done'
                                clearTextOnFocus={true}
                            />
                            <View style={{justifyContent:'center', paddingLeft: 5}}>
                                <Text style={Theme.buttonText}>Minutes</Text>
                            </View>
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
                        { type == 'Water' && 
                            <Text style={Theme.grayButtonText}>1 cup = 8 oz = 237 mL</Text>
                        }
                    </View>
                )) }

                <View style={{flexDirection: 'row', justifyContent: 'space-between', }} >
                    <TouchableOpacity 
                        onPress={ () => { 
                            setInputValue(''); 
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
                            marginVertical: 30}} >
                        <Text style={Theme.buttonText}>
                            {primaryButtonText()}
                        </Text>
                    </TouchableOpacity> 
                </View> 
            </View>

            <ExpandedLog type="Water" log={waterLog} />
            <ExpandedLog type="Glucose" log={glucoseLog} />
        </>
    );
}