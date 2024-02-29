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
  const exercise = useSelector(state => state.editGoalsReducer.exercise);
  const totalWater = useSelector(state => state.editGoalsReducer.totalWater);
  // const sleep = useSelector(state => state.editGoalsReducer.sleep);
  const totalHRVMin = useSelector(state => state.editGoalsReducer.totalHRVMin); 

  const dateRangeOptions = ['Today', 'Week', 'Month'];
  const [selectedDateOption, setSelectedDateOption] = useState('Today');

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


    return (
      <View style={{flexDirection: 'column', marginTop: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15}}>
          <Text style={{fontSize: 28, fontWeight: 'bold', color: Theme.primaryTint, }}>My Goals</Text>
          <TouchableOpacity onPress={openModal}>
            <MaterialCommunityIcons name='plus-circle' color={Theme.secondaryTint} size={30} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column'}} >
          {allGoals.filter(goal => goal.isSelected === false).length < 5 && 
            <View style={{flexDirection: 'row', alignSelf: 'center', backgroundColor: Theme.primaryBackground, borderRadius: 20, borderWidth: 0.5, borderColor: Theme.primaryGray, marginVertical: 5}} >
              { dateRangeOptions.map((selection, j) => {
                return (
                  <TouchableOpacity key={j} onPress={() => { setSelectedDateOption(selection) }} style={{backgroundColor: selectedDateOption === selection ? Theme.primaryTint : Theme.primaryBackground, borderRadius: 30, padding: 10, paddingHorizontal: 24, alignItems: 'center'}}>
                    <Text style={{color: selectedDateOption === selection ? Theme.primaryBackground : Theme.primaryTint, fontWeight: 'bold', fontSize: 16}}>{selection}</Text>
                  </TouchableOpacity> )
                })
              }
            </View>
          }
          
          <View style={Theme.dailyStatsSection}> 
              { allGoals.map((goal) => {
                if (goal.isSelected) {
                  switch (goal.category) {
                    case('EXERCISE'): 
                        return (
                          <DailyStat 
                            key={goal.id}
                            statTitle='Exercise' 
                            measurement={1} 
                            goal={1} 
                            icon={exerciseIcon} 
                            unit='Complete' />
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
                          measurement={totalWater} 
                          goal={7} 
                          icon={waterIcon} 
                          unit='glasses' />
                      );
                    case('SLEEP'): 
                        return ( 
                          <DailyStat 
                            key={goal.id}
                            statTitle='Sleep' 
                            measurement={Number(sleep)} 
                            goal={420} 
                            icon={sleepIcon} 
                            unit={`${sleep % 60}m`} />
                        );
                    case('HRV'): 
                      return (
                        <DailyStat 
                          key={goal.id}
                          statTitle='HRV Training' 
                          measurement={totalHRVMin} 
                          goal={15} 
                          icon={hrvTrainingIcon} 
                          unit={'min'} />
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