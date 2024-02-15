import { View, } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import DailyStat from './DailyStat';
import * as Theme from '../../theme';

export default function DailyStatContainer( {
    // heartRate, 
    dailySteps, dailyStepGoal, 
    sleep, sleepGoal, 
    dailyWaterSummary, dailyWaterGoal
}) {
    return (
        <View style={Theme.dailyStatsSection}> 
            {/* TODO: get BPM */}
            <DailyStat 
              statTitle='Heart Rate' 
              measurement={90} 
              goal={1} 
              icon={<FontAwesome5 name="heartbeat" color='#f69880' size={25} />} 
              unit='BPM' />

            <DailyStat 
              statTitle='Steps' 
              measurement={dailySteps} 
              goal={dailyStepGoal} 
              icon={<MaterialCommunityIcons 
                name="shoe-sneaker" color='#f69880' size={30} 
                style={{
                    right: 2,
                    transform: [{ rotate: '-30deg'}] }}/>} 
              unit='steps' />

            {/* TODO: get sleep */}
            <DailyStat 
              statTitle='Sleep' 
              measurement={sleep} 
              goal={sleepGoal} 
              icon={<Feather name="moon" color='#f69880' size={30} />} 
              unit={(sleep % 60).toString() + 'm'} />

            <DailyStat 
              statTitle='Water Intake' 
              measurement={Math.ceil(dailyWaterSummary / 29.6)} 
              goal={Math.ceil(dailyWaterGoal / 29.6)} 
              icon={<MaterialCommunityIcons name="cup-water" color='#f69880' size={30} />} 
              unit='oz' />
          </View>
    );
}