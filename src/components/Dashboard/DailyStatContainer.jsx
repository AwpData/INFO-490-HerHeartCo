import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import DailyStat from './DailyStat';
import * as Theme from '../../theme';

import { exerciseIcon, goalsIcon, hrvTrainingIcon, sleepIcon, stepsIcon, waterIcon,  } from '../../constants';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDailyGoalsModal from './SelectDailyGoalsModal';

export default function DailyStatContainer( {
    // heartRate, 
    dailySteps, dailyStepGoal, 
    sleep, sleepGoal, 
    dailyWaterSummary, dailyWaterGoal
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

    return (
      <View style={{flexDirection: 'column', margin: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={{fontSize: 28, fontWeight: 'bold'}}>My Goals</Text>
          <TouchableOpacity onPress={openModal}>
            <MaterialCommunityIcons name='plus-circle' color={Theme.secondaryTint} size={30} />
          </TouchableOpacity>
        </View>
        <View style={Theme.dailyStatsSection}> 
            {/* TODO: get BPM */}
            {/* <DailyStat 
              statTitle='Heart Rate' 
              measurement={90} 
              goal={1} 
              icon={<FontAwesome5 name="heartbeat" color='#f69880' size={25} />} 
              unit='BPM' /> */}
            <DailyStat 
              statTitle='Exercise' 
              measurement={dailySteps} 
              goal={dailyStepGoal} 
              icon={exerciseIcon} 
              unit='times' />

            <DailyStat 
              statTitle='Steps' 
              measurement={dailySteps} 
              goal={dailyStepGoal} 
              icon={stepsIcon} 
              unit='steps' />

            {/* TODO: get sleep */}
            <DailyStat 
              statTitle='HRV Training' 
              measurement={sleep} 
              goal={sleepGoal} 
              icon={hrvTrainingIcon} 
              unit={(sleep % 60).toString() + 'min'} />

            <DailyStat 
              statTitle='Water Intake' 
              measurement={Math.ceil(dailyWaterSummary / 29.6)} 
              goal={Math.ceil(dailyWaterGoal / 29.6)} 
              icon={waterIcon} 
              unit='oz' />
          </View>
          <SelectDailyGoalsModal visible={modalVisible} onRequestClose={closeModal} />
        </View>
    );
}