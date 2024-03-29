// DailyStatContainer.jsx
// 
// "Goals Progress" section of the dashboard for users to see progress on selected goals 
// [To be finalized] Users can select a daily/weekly/monthly view that aggregates their progress over a time range


import React, { useState } from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { useSelector, } from 'react-redux';

import * as Theme from '../../theme';
import { 
  exerciseIcon, 
  hrvTrainingIcon, 
  stepsIcon, 
  waterIcon, 
  sleepIcon, 
  plusFilled  } from '../../constants';

import DailyStat from './DailyStat';
import OnboardingGoalsView from './OnboardingGoalsView';
import EditDailyGoalsModal from '../EditDailyGoals/EditDailyGoalsModal';


export default function DailyStatContainer( {
    dailySteps, dailyStepGoal, 
    sleep, sleepGoal, 
    dailyWaterSummary, dailyWaterGoal
}) {
  const [selectDailyGoalsModalVisible, setSelectDailyGoalsModalVisible] = useState(true);
  const [editDailyGoalsModalVisible, setEditDailyGoalsModalVisible] = useState(false);
  const [goalsOpen, setGoalsOpen] = useState(false);

  const allGoals = useSelector(state => state.userReducer.allGoals);
  const exercise = useSelector(state => state.userReducer.exercise);
  const totalWater = useSelector(state => state.userReducer.totalWater);
  // const sleep = useSelector(state => state.userReducer.sleep);
  const totalHRVMin = useSelector(state => state.userReducer.totalHRVMin); 

  const dateRangeOptions = ['Today', 'Week', 'Month'];
  const [selectedDateOption, setSelectedDateOption] = useState('Today');

  const openSelectDailyGoalsModal = () => {
    setSelectDailyGoalsModalVisible(true);
  };

  const closeSelectDailyGoalsModal = () => {
    setSelectDailyGoalsModalVisible(false);
  };

  const openEditDailyGoalsModal = () => {
    setGoalsOpen(true);
    setEditDailyGoalsModalVisible(true);
  };

  const closeEditDailyGoalsModal = () => {
    setEditDailyGoalsModalVisible(false);
    setGoalsOpen(false);
  };

  return (
    <View style={{flexDirection: 'column', marginTop: 20}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15}}>
        <Text style={{...Theme.headline, paddingBottom: 10}}>Goal Progress</Text>
      </View>

      {/* Selection of Today/Week/Month view for Goal Progress */}
      <View style={{flexDirection: 'column'}} >
        {allGoals.filter(goal => goal.isSelected === false).length < 5 && 
          <View style={{
            flexDirection: 'row', alignSelf: 'center', 
            backgroundColor: Theme.primaryBackground, 
            borderRadius: 20, borderWidth: 0.5, borderColor: Theme.primaryGray, 
            marginVertical: 5}} 
          >
            { dateRangeOptions.map((selection, j) => {
              return (
                <TouchableOpacity 
                  key={j} 
                  onPress={() => { setSelectedDateOption(selection) }} 
                  style={{
                    backgroundColor: selectedDateOption === selection ? Theme.primaryTint : Theme.primaryBackground, 
                    fontFamily: Platform.select({
                      android: 'Lato_900Black',
                      ios: 'Lato_900Black'
                    }),
                    borderRadius: 30, 
                    width: '28%',
                    padding: 10, 
                    alignItems: 'center'}}
                >
                  <Text 
                    style={{
                      color: selectedDateOption === selection ? Theme.primaryBackground : Theme.primaryTint, 
                      fontFamily: Platform.select({
                        android: 'Lato_900Black',
                        ios: 'Lato_900Black'
                    }),
                      fontWeight: 'bold', fontSize: 16
                  }}>{selection}</Text>
                </TouchableOpacity> )
              })
            }
          </View>
        }
        
        {/* Display the goal that are selected */}
        <View style={Theme.dailyStatsSection}> 
            { allGoals.map((goal) => {
              if (goal.isSelected) {
                switch (goal.category) {
                  case('EXERCISE'): 
                      return (
                        <DailyStat 
                          key={goal.id}
                          statTitle='Exercise' 
                          measurement={exercise ? 1 : 0} 
                          goal={1} 
                          icon={exerciseIcon} 
                          unit={exercise ? 'Complete' : 'Incomplete'} />
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
                        sleep % 60 != 0 ? (
                          <DailyStat 
                          key={goal.id}
                          statTitle='Sleep' 
                          measurement={Number(sleep)} 
                          goal={420} 
                          icon={sleepIcon} 
                          unit={`${sleep % 60}m`} />
                        ) : (
                          <DailyStat 
                          key={goal.id}
                          statTitle='Sleep' 
                          measurement={Number(sleep)} 
                          goal={420} 
                          icon={sleepIcon} 
                          unit={''} />
                        )
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
          })}

          {/* If # of selected goals is < 4, display + for the user to select more */}
          {allGoals.filter(goal => goal.isSelected === true).length < 4 && 
            allGoals.filter(goal => goal.isSelected === true).length > 0 && 
              <TouchableOpacity 
                style={{padding: 10, justifyContent: 'center'}} 
                onPress={openEditDailyGoalsModal} 
              >
                {plusFilled}
            </TouchableOpacity>
          }
          </View>
        </View>

        {/* Placeholder for front-end MVP onboarding; open upon loading app for the first time */}
        <OnboardingGoalsView 
          visible={selectDailyGoalsModalVisible} 
          onRequestClose={closeSelectDailyGoalsModal} />
        
        {/* Modal for selecting additional goals when pressing + button in Goal Progress */}
        <EditDailyGoalsModal 
          visible={editDailyGoalsModalVisible} 
          onRequestClose={closeEditDailyGoalsModal} 
          goalsOpen={goalsOpen} />
      </View>
  );
}