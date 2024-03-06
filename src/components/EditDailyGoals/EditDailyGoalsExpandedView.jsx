import React, { useState } from 'react';
import { View, Button, Text, TextInput, Pressable, TouchableOpacity, Keyboard } from 'react-native';

import { useSelector, useDispatch, connect } from 'react-redux';
import { addWater, addWaterLog, editSleep, updateGlucose, addHRV, deleteWaterLog } from '../../redux/actions';

import * as Theme from '../../theme';
import { closeCircleFilledIconSmall } from '../../constants';


export default function EditDailyGoalsExpandedView({unit}) {
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const dispatch = useDispatch();

    const waterLog = useSelector(state => state.userReducer.waterLog);

    function primaryButtonText() {
        switch(unit) {
            case('water'):
                return 'Add';
            case('glucose'):
                return 'Update';
            case ('hrv'):  
                return 'Add';
            case ('sleep'): 
                return 'Update';
            default: return;
        }
    }

    function unitLabel() {
        switch(unit) {
            case('water'):
                return 'Cups';
            case('glucose'):
                return 'mg/dL';
            case ('hrv'):  
                return 'Minutes';
            default: return;
        }
    }

    function editAction() {
        switch(unit) {
            case('water'): 
                let newEntry = Number(inputValue)
                dispatch(addWater(newEntry || 0));
                if (newEntry !== 0) {
                    dispatch(addWaterLog(newEntry));
                }
                break;
            case('glucose'): 
                dispatch(updateGlucose(Number(inputValue) || 0));
                break;
            case ('hrv'): 
                dispatch(addHRV(Number(inputValue) || 0)); 
                break; 
            case ('sleep'): 
                let totalSleepMin = (Number(inputValue) * 60) + (Number(inputValue2));
                dispatch(editSleep(totalSleepMin || 0)); 
                break;
            default: break; 
        }
        setInputValue('');
    }

    // TODO: refactor style

    return (
        <View>
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '90%', marginBottom: 20}} />
            { unit != 'sleep' ? (
                <View style={{flexDirection: 'column', alignItems: 'center'}} >
                    <TextInput
                        style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray}}
                        value={inputValue.toString()}
                        onChangeText={setInputValue}
                        placeholder="0"
                        keyboardType={"number-pad"}
                        returnKeyType='done'
                        clearTextOnFocus={true}
                    />

                    <Text style={{fontSize: 18, paddingTop: 10, fontWeight: 'bold', color: Theme.primaryTint}}>{unitLabel() }</Text>
                    { unit == 'water' && 
                        <Text style={{fontSize: 18, paddingTop: 10, fontWeight: 'bold', color: Theme.primaryGray}}>1 cup = 8 oz = 237 mL</Text>
                    }
                </View>
            ) : (
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10}} >
                        <TextInput
                            style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray}}
                            value={inputValue.toString()}
                            onChangeText={setInputValue}
                            placeholder="0"
                            keyboardType={"number-pad"}
                            returnKeyType='done'
                            clearTextOnFocus={true}
                        />
                        <View style={{justifyContent:'center', paddingRight: 15}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: Theme.primaryTint, paddingLeft: 5, paddingTop: 10}}>Hours</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', alignItems: 'center', marginHorizontal: 10}} >
                        <TextInput
                            style={{backgroundColor: 'white', fontSize: 48, fontWeight: 'bold', padding: 15, minWidth: 100, textAlign: 'center', borderRadius: 15, borderWidth: 3, borderColor: Theme.secondaryGray}}
                            value={inputValue2.toString()}
                            onChangeText={setInputValue2}
                            placeholder="0"
                            keyboardType={"number-pad"}
                            returnKeyType='done'
                            clearTextOnFocus={true}
                        />
                        <View style={{justifyContent:'center', paddingLeft: 5}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: Theme.primaryTint, justifyContent:'center', paddingTop: 10 }}>Minutes</Text>
                        </View>
                    </View>
                </View>
            )}
            
        
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 15}} >
                <TouchableOpacity onPress={ () => { 
                        setInputValue(''); 
                        Keyboard.dismiss(); }} 
                        style={{
                            marginRight: 50
                    }}>
                    <Text style={{color: Theme.primaryTint, fontSize: 20, paddingVertical: 10, paddingHorizontal: 20}}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={ () => {
                    editAction()
                    setInputValue('');
                    Keyboard.dismiss();
                    }}
                    style={{
                        marginLeft: 50
                }}>
                    <Text style={{color: Theme.primaryTint, fontSize: 20, fontWeight: 'bold', paddingVertical: 10, paddingHorizontal: 20}}>
                        {primaryButtonText()}
                    </Text>
                </TouchableOpacity> 
            </View> 

            {console.log(waterLog)}

            
        </View>
        
        { unit == 'water' && waterLog.length > 0 && 
            <View style={{alignContent: 'flex-start', paddingBottom: 20}}>
                <TouchableOpacity>
                    <Text style={{color: Theme.primaryGray, fontWeight: 'bold', fontSize: 20, paddingBottom: 10}}>Water log</Text>
                </TouchableOpacity>
                { waterLog.map((entry) => (
                        <View key={entry.id} style={{flexDirection: 'row', paddingVertical: 5}}>
                            <TouchableOpacity onPress={() => {dispatch(deleteWaterLog(entry))}}>
                                {closeCircleFilledIconSmall}
                            </TouchableOpacity>
                            
                            <View style={{justifyContent: 'center'}}>
                                <Text style={{color: Theme.primaryTint, fontWeight: 'bold', fontSize: 20, paddingLeft: 10}}>{entry} cups</Text>
                            </View>
                        </View>
                    ))
                }
            </View>
        }   
        </View>
    );
}