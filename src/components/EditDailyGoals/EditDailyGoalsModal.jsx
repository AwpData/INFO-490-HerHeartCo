// EditDailyGoalsModal.jsx
// 
// Modal view that displays all rows of daily goals to edit


import React from 'react';
import { useSelector, } from 'react-redux';
import { Text, View, Modal, ScrollView, } from 'react-native';
import { format } from 'date-fns';

import * as Theme from '../../theme';
import { exerciseIcon, waterIcon, foodIcon, glucoseIcon, sleepIcon, hrvTrainingIcon } from '../../constants';

import EditDailyGoalsNavBar from './EditDailyGoalsNavBar';
import DailyExerciseRow from './DailyExerciseRow';
import DailyGoalsRow from './DailyGoalsRow';
import EditDailyGoalsExpandedView from './EditDailyGoalsExpandedView';
import SelectDailyGoalsExpandedView from './SelectDailyGoalsExpandedView';
import SelectMealPicturesView from './SelectMealPicturesView';


const todayDate = new Date();

export default function EditDailyGoalsModal ({ 
    visible, onRequestClose, goalsOpen
}) {
    const exercise = useSelector(state => state.userReducer.exercise);
    const water = useSelector(state => state.userReducer.totalWater);
    const glucose = useSelector(state => state.userReducer.glucose);
    const hrv = useSelector(state => state.userReducer.totalHRVMin);
    const sleep = useSelector(state => state.userReducer.sleep);

    const breakfast = useSelector(state => state.userReducer.meals.breakfast);
    const lunch = useSelector(state => state.userReducer.meals.lunch);
    const dinner = useSelector(state => state.userReducer.meals.dinner);

    // Function to determine number of meals based on whether or not a picture has been uploaded for that neal
    function calculateMeals() {
        let total = 0; 

        if (breakfast != undefined) {
            total++; 
        }

        if (lunch != undefined) {
            total++;
        }

        if (dinner != undefined) {
            total++;
        }

        return total;
    }

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onRequestClose}
            presentationStyle='fullScreen'
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.primaryBackground, paddingTop: 40}}>
                <EditDailyGoalsNavBar onRequestClose={onRequestClose} onSubmitClose={onRequestClose} />
                
                <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps='handled' >
                    <View style={{padding: 20, alignItems: 'center'}}>
                        <Text style={Theme.title2Bold}>{format(todayDate, 'EEEE, MMMM dd')}</Text>

                        <View style={{alignItems: 'center', marginVertical: 40, }}>
                            <SelectDailyGoalsExpandedView goalsOpen={goalsOpen} />

                            <View style={{borderColor: Theme.secondaryGray, borderWidth: 0.5, minWidth: '95%', marginVertical: 20, marginBottom: 30}} />

                            <DailyExerciseRow 
                                icon={exerciseIcon}
                                title='Exercise' />
                            <DailyGoalsRow
                                icon={waterIcon} title='Hydration' value={water} goal={7} unit='cups'
                                expandedContent={ <EditDailyGoalsExpandedView type='Water' />} />
                            <DailyGoalsRow
                                icon={foodIcon} title='Food' value={calculateMeals()} goal={3} unit='meals'
                                expandedContent={<SelectMealPicturesView />}/>
                            <DailyGoalsRow 
                                icon={glucoseIcon} title='Glucose' value={glucose} unit='mg/dL'
                                expandedContent={ <EditDailyGoalsExpandedView type='Glucose' />} />
                            <DailyGoalsRow
                                icon={sleepIcon} title='Sleep' value={sleep} goal={7} unit='h'
                                expandedContent={<EditDailyGoalsExpandedView type='Sleep' />}/>
                            <DailyGoalsRow
                                icon={hrvTrainingIcon} title='HRV Training' value={hrv} goal={15} unit='min'
                                expandedContent={<EditDailyGoalsExpandedView type='HRV' />}/>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
        
    );
};