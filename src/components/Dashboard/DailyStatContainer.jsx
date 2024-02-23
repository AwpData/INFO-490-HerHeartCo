import { View, } from 'react-native';

import DailyStat from './DailyStat';
import * as Theme from '../../theme';

import { exerciseIcon, goalsIcon, sleepIcon, stepsIcon, waterIcon,  } from '../../constants';

export default function DailyStatContainer( {
    // heartRate, 
    dailySteps, dailyStepGoal, 
    sleep, sleepGoal, 
    dailyWaterSummary, dailyWaterGoal
}) {
    return (
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
              unit='min' />

            <DailyStat 
              statTitle='Steps' 
              measurement={dailySteps} 
              goal={dailyStepGoal} 
              icon={stepsIcon} 
              unit='steps' />

            {/* TODO: get sleep */}
            <DailyStat 
              statTitle='Sleep' 
              measurement={sleep} 
              goal={sleepGoal} 
              icon={sleepIcon} 
              unit={(sleep % 60).toString() + 'm'} />

            <DailyStat 
              statTitle='Water Intake' 
              measurement={Math.ceil(dailyWaterSummary / 29.6)} 
              goal={Math.ceil(dailyWaterGoal / 29.6)} 
              icon={waterIcon} 
              unit='oz' />
          </View>
    );
}