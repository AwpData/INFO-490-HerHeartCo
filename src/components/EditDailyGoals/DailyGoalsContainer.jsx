import React, { useState } from 'react';
import { View, Animated, Text, TextInput } from 'react-native';
import { foodIcon, glucoseIcon, goalsIcon, waterIcon, bpIcon, sleepIcon, hrvTrainingIcon, exerciseIcon } from '../../constants';
import AddDataRow from './DailyGoalsRow';
import NavBarAddButton from '../NavigationBar/NavBarAddButton';
import EditDailyGoalsModal from './EditDailyGoalsModal';
import SelfLogHealthData from './SelfLogHealthData';
import * as Theme from '../../theme';
import DailyGoalsRow from './DailyGoalsRow';
import EditDailyGoalsExpandedView from './EditDailyGoalsExpandedView';
import { useSelector, useDispatch } from 'react-redux';
import CheckExercise from './CheckExercise';


export default function DailyGoalsContainer() {
    const [modalVisible, setModalVisible] = useState(false);
    const exercise = useSelector(state => state.editGoalsReducer.exercise);
    const water = useSelector(state => state.editGoalsReducer.totalWater);
    const glucose = useSelector(state => state.editGoalsReducer.glucose);
    const hrv = useSelector(state => state.editGoalsReducer.totalHRVMin);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // TODO: use real data, make buttons editable

  return (
    <View style={{ flexDirection: 'column', alignItems: 'center', position: 'absolute', backgroundColor: '#fef7f4', }}>
        <NavBarAddButton openModal={openModal} />
        <EditDailyGoalsModal visible={modalVisible} onRequestClose={closeModal}>
            <View style={{alignItems: 'center', marginVertical: 40, }}>
                {/* <DailyGoalsRow
                  icon={goalsIcon} title='Goals' value={8} goal={8} unit='goals'
                  expandedContent={<Text>Expanded goals</Text>} /> */}
                {/* <DailyGoalsRow
                  icon={exerciseIcon} title='Exercise' value={exercise} goal={1} unit='time'
                  expandedContent={ <CheckExercise />} /> */}
                  <CheckExercise 
                    icon={exerciseIcon}
                    title='Exercise'
                  />
                <DailyGoalsRow
                  icon={waterIcon} title='Hydration' value={water} goal={7} unit='glasses'
                  expandedContent={ <EditDailyGoalsExpandedView unit='water' />} />
                <DailyGoalsRow
                  icon={foodIcon} title='Food' value={3} goal={3} unit='meals'
                  expandedContent={<Text>Expanded food</Text>}/>
                <SelfLogHealthData 
                  icon={glucoseIcon} title='Glucose' value1={glucose} unit='mg/dL'
                  expandedContent={ <EditDailyGoalsExpandedView unit='glucose' />} />
                <DailyGoalsRow
                  icon={sleepIcon} title='Sleep' value={3} goal={3} unit='min'
                  expandedContent={<Text>Expanded sleep</Text>}/>
                <DailyGoalsRow
                  icon={hrvTrainingIcon} title='HRV Training' value={hrv} goal={15} unit='min'
                  expandedContent={<EditDailyGoalsExpandedView unit='hrv' />}/>
            </View>
        </EditDailyGoalsModal>
    </View>
  );
}
  
