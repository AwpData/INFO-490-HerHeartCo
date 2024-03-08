// DailyStat.jsx 
// 
// A component that shows a progress ring of a user's selected goal with measurement and labels


import { Text, View, } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import * as Theme from '../../theme';


export default function DailyStat( { 
    statTitle, measurement, goal, icon, unit
} ) {
    return (
        <View style={Theme.dailyStatContainer}> 
            <Text style={Theme.captionBold}>{statTitle}</Text>
            <View style={Theme.dailyStatLayers}> 
                
                {/* Progress ring */}
                <AnimatedCircularProgress
                    size={90}
                    width={5}
                    fill={measurement  * 100 / goal}
                    rotation={0}
                    tintColor={Theme.secondaryTint}
                    backgroundColor={Theme.secondaryGray} 
                />

                {console.log(statTitle, ' ', measurement)}
                
                {/* Overlay for stat count and unit label */}
                <View style={Theme.dailyStatIcon}> 
                    {icon}
                    { statTitle != 'Exercise' && (
                        <Text style={Theme.buttonText}>
                        {statTitle != 'Sleep' ? 
                            measurement : 
                            Math.floor(measurement / 60).toString() + ' h' }
                        </Text> ) }
                    <Text style={Theme.caption}>{unit}</Text>
                </View>           
            </View>
        </View>
    );
}