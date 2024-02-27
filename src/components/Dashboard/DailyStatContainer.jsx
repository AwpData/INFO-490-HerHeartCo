import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import DailyStat from './DailyStat';
import * as Theme from '../../theme';

import { exerciseIcon, hrvTrainingIcon, reduceFatIcon, stepsIcon, waterIcon,  } from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDailyGoalsModal from './SelectDailyGoalsModal';

export default function DailyStatContainer( {
    // heartRate, 
    dailySteps, dailyStepGoal, 
    sleep, sleepGoal, 
    dailyWaterSummary, dailyWaterGoal
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const allGoals = useSelector(state => state.userReducer);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={{fontSize: 28, fontWeight: 'bold'}}>My Goals</Text>
          <TouchableOpacity onPress={openModal}>
            <MaterialCommunityIcons name='plus-circle' color={Theme.secondaryTint} size={30} />
          </TouchableOpacity>
        </View>
        <View style={Theme.dailyStatsSection}> 
            { allGoals.map((goal) => {
              if (goal.isSelected) {
                switch (goal.category) {
                  case('EXERCISE'): 
                      return (
                        <DailyStat 
                          key={goal.id}
                          statTitle='Exercise' 
                          measurement={0} 
                          goal={3} 
                          icon={exerciseIcon} 
                          unit='times' />
                      );
                  case('STEPS'): 
                      return (
                        <DailyStat 
                          key={goal.id}
                          statTitle='Steps' 
                          measurement={dailySteps} 
                          goal={dailyStepGoal / 2} 
                          icon={stepsIcon} 
                          unit='steps' />
                      );
                  case('WATER'): 
                    return (
                      <DailyStat 
                        key={goal.id}
                        statTitle='Water Intake' 
                        measurement={Math.ceil(dailyWaterSummary / 29.6)} 
                        goal={Math.ceil(dailyWaterGoal / 29.6)} 
                        icon={waterIcon} 
                        unit='oz' />
                    );
                  case('FAT'): 
                      return ( 
                        <DailyStat 
                          key={goal.id}
                          statTitle='Fat' 
                          measurement={1} 
                          goal={1} 
                          icon={reduceFatIcon} 
                          unit='%' />
                      );
                  case('HRV'): 
                    return (
                      <DailyStat 
                        key={goal.id}
                        statTitle='HRV Training' 
                        measurement={sleep} 
                        goal={sleepGoal} 
                        icon={hrvTrainingIcon} 
                        unit={(sleep % 60).toString() + 'min'} />
                    );
                  default: 
                    return;    
              }
            } else {
              return;
            }
          })
          }
          { allGoals.filter(goal => goal.isSelected === false).length === 5 &&
            <TouchableOpacity onPress={openModal} style={{backgroundColor: Theme.secondaryTint, padding: 15, borderRadius: 15,}}>
              <Text style={{color: Theme.secondaryBackground, fontWeight: 'bold'}}>No goals selected. Select goals to start tracking</Text>
            </TouchableOpacity>
          }
          </View>
          <SelectDailyGoalsModal visible={modalVisible} onRequestClose={closeModal} />
        </View>
    );
}