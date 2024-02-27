import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import DailyStat from './DailyStat';
import * as Theme from '../../theme';

import { exerciseIcon, hrvTrainingIcon, reduceFatIcon, stepsIcon, waterIcon, sleepIcon, ViewDateRange  } from '../../constants';
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

  const dateRangeOptions = ['Today', 'Weekly', 'Monthly'];
  const [selectedDateOption, setSelectedDateOption] = useState('Today');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const date = moment();
  const now = date.format('ddd MMM DD');
  const startOfWeek = date.startOf('week').format('ddd MMM DD');
  const startOfMonth = date.startOf('month').format('ddd MMM DD');

  function displayDateSubtitle(dateOption) {
    switch (dateOption) {
      case ('Weekly'): 
        return (<Text style={{fontSize: 16, fontWeight: 'bold', color: Theme.secondaryTint, textAlign: 'center', marginTop: 10}}>{`${startOfWeek} - Today, ${now}`}</Text>);
      case ('Monthly'): 
        return (<Text style={{fontSize: 16, fontWeight: 'bold', color: Theme.secondaryTint, textAlign: 'center', marginTop: 10}}>{`${startOfMonth} - Today, ${now}`}</Text>)
      default: 
        return; 
    }
  }

    return (
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', color: Theme.primaryTint, }}>My Goals</Text>
          <TouchableOpacity onPress={openModal}>
            <MaterialCommunityIcons name='plus-circle' color={Theme.secondaryTint} size={30} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column'}} >
          {allGoals.filter(goal => goal.isSelected === false).length < 5 && 
            <View style={{flexDirection: 'row', alignSelf: 'center'}} >
              { dateRangeOptions.map((selection, j) => {
                return (
                  <TouchableOpacity key={j} onPress={() => { setSelectedDateOption(selection) }} style={{backgroundColor: selectedDateOption === selection ? Theme.primaryTint : Theme.primaryBackground, borderRadius: 30, padding: 10, paddingHorizontal: 24, alignItems: 'center'}}>
                    <Text style={{color: selectedDateOption === selection ? Theme.primaryBackground : Theme.primaryTint, fontWeight: 'bold', fontSize: 16}}>{selection}</Text>
                  </TouchableOpacity> )
              })
              
              }
            </View>
          }
          {displayDateSubtitle(selectedDateOption)}
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
                    case('SLEEP'): 
                        return ( 
                          <DailyStat 
                            key={goal.id}
                            statTitle='Sleep' 
                            measurement={1} 
                            goal={1} 
                            icon={sleepIcon} 
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
          </View>
          <SelectDailyGoalsModal visible={modalVisible} onRequestClose={closeModal} />
        </View>
    );
}