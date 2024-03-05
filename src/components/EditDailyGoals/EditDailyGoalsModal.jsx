import React, { useState } from 'react';

import { Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import EditDailyGoalsNavBar from './EditDailyGoalsNavBar';
import { exerciseIcon, waterIcon, foodIcon, glucoseIcon, sleepIcon, hrvTrainingIcon } from '../../constants';
import * as Theme from '../../theme';
import { useSelector, useDispatch } from 'react-redux';
import ExpandableView from './ExpandableView';
import CheckExercise from './CheckExercise';
import DailyGoalsRow from './DailyGoalsRow';
import EditDailyGoalsExpandedView from './EditDailyGoalsExpandedView';
import SelfLogHealthData from './SelfLogHealthData';
import SelectGoalsToView from './SelectGoalsToView';
import InsertMealPicture from './InsertMealPicture';


const todayDate = new Date();

export default function EditDailyGoalsModal ({ 
    visible, onRequestClose, goalsOpen
}) {
    const exercise = useSelector(state => state.editGoalsReducer.exercise);
    const water = useSelector(state => state.editGoalsReducer.totalWater);
    const glucose = useSelector(state => state.editGoalsReducer.glucose);
    const hrv = useSelector(state => state.editGoalsReducer.totalHRVMin);
    const sleep = useSelector(state => state.editGoalsReducer.sleep);

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onRequestClose}
            presentationStyle='pageSheet'
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.primaryBackground, }}>
                <EditDailyGoalsNavBar onRequestClose={onRequestClose} onSubmitClose={onRequestClose} />
                
                <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps='handled' >
                    <View style={{padding: 20, alignItems: 'center'}}>
                        <Text style={Theme.addPageDateFormat}>{format(todayDate, 'EEEE, MMMM dd')}</Text>

                        <View style={{alignItems: 'center', marginVertical: 40, }}>
                            <SelectGoalsToView goalsOpen={goalsOpen} />

                            <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '95%', marginVertical: 20, marginBottom: 30}} />

                            <CheckExercise 
                                icon={exerciseIcon}
                                title='Exercise' />
                            <DailyGoalsRow
                                icon={waterIcon} title='Hydration' value={water} goal={7} unit='glasses'
                                expandedContent={ <EditDailyGoalsExpandedView unit='water' />} />
                            <DailyGoalsRow
                                icon={foodIcon} title='Food' value={3} goal={3} unit='meals'
                                expandedContent={<InsertMealPicture />}/>
                            <SelfLogHealthData 
                                icon={glucoseIcon} title='Glucose' value1={glucose} unit='mg/dL'
                                expandedContent={ <EditDailyGoalsExpandedView unit='glucose' />} />
                            <DailyGoalsRow
                                icon={sleepIcon} title='Sleep' value={sleep} goal={7} unit='h'
                                expandedContent={<EditDailyGoalsExpandedView unit='sleep' />}/>
                            <DailyGoalsRow
                                icon={hrvTrainingIcon} title='HRV Training' value={hrv} goal={15} unit='min'
                                expandedContent={<EditDailyGoalsExpandedView unit='hrv' />}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
        
    );
};