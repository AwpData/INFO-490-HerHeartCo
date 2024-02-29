import { Text, View, } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Theme from '../../theme';

export default function DailyStat( { 
    statTitle, measurement, goal, icon, unit
} ) {
    return (
        <View style={Theme.dailyStatContainer}> 
            <Text style={Theme.dailyStatTitle}>{statTitle}</Text>
            <View style={Theme.dailyStatLayers}> 
                <AnimatedCircularProgress
                    size={90}
                    width={5}
                    fill={measurement  * 100 / goal}
                    rotation={0}
                    tintColor={Theme.secondaryTint}
                    backgroundColor={Theme.secondaryGray} 
                />
                
                <View style={Theme.dailyStatIcon}> 
                    {icon}
                    { statTitle != 'Exercise' && (
                        <Text style={Theme.dailyStat}>
                        {statTitle != 'Sleep' ? 
                            measurement : 
                            Math.floor(measurement / 60).toString() + 'h' }
                        </Text> ) }
                    <Text style={Theme.dailyStatLabel}>{unit}</Text>
                </View>           
            </View>
        </View>
    );
}