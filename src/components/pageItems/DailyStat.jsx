import { Text, View, } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Theme from '../../theme';

export default function DailyStat( { 
    statTitle, measurement, goal, icon, unit
} ) {

    return (
        <View style={Theme.dailyStatContainer}> 
            <Text style={Theme.dailyStatTitle}>{statTitle}</Text>
            <View 
                style={Theme.dailyStatLayers}> 
                
                <AnimatedCircularProgress
                    size={90}
                    width={5}
                    fill={measurement  * 100 / goal}
                    rotation={0}
                    tintColor="#cc3533"
                    backgroundColor="#e0e0e0" 
                />
                <View style={Theme.dailyStatIcon}> 
                    {icon}
                    <Text style={Theme.dailyStat}>{measurement}</Text>
                    <Text style={Theme.dailyStatLabel}>{unit}</Text>
                </View>            
            </View>
        </View>
    );
}