import React, { useState } from 'react';
import { View, Animated, Text, TextInput } from 'react-native';
import { foodIcon, glucoseIcon, goalsIcon, waterIcon, bpIcon } from '../../constants';
import AddDataRow from './DailyGoalsRow';
import NavBarAddButton from '../NavigationBar/NavBarAddButton';
import EditDailyGoalsModal from './EditDailyGoalsModal';
import SelfLogHealthData from './SelfLogHealthData';
import * as Theme from '../../theme';
import AddDataExpandedView from './EditDailyGoalsExpandedView';
import { useSelector, useDispatch } from 'react-redux';


export default function DailyGoalsContainer() {
    const [modalVisible, setModalVisible] = useState(false);
    // const newWater = useSelector( state => state.water.value );
    // const newGlucose = useSelector( state => state.glucose.value );

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
                <AddDataRow
                  icon={goalsIcon} title='Goals' value={8} goal={8} unit='goals'
                  expandedContent={<Text>Expanded goals</Text>} />
                <AddDataRow
                  // icon={waterIcon} title='Hydration' value={newWater} goal={64} unit='oz'
                  icon={waterIcon} title='Hydration' value={12} goal={64} unit='oz'
                  expandedContent={ <AddDataExpandedView unit='water' />} />
                <AddDataRow
                  icon={foodIcon} title='Food' value={3} goal={3} unit='meals'
                  expandedContent={<Text>Expanded food</Text>}/>
                <SelfLogHealthData 
                  // icon={glucoseIcon} title='Glucose' value1={newGlucose} unit='mg/dL'
                  icon={glucoseIcon} title='Glucose' value1={105} unit='mg/dL'
                  expandedContent={ <AddDataExpandedView unit='glucose' />} />
            </View>
        </EditDailyGoalsModal>
    </View>
  );
}
  
