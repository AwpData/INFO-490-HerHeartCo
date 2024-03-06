import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { LineChart } from 'react-native-chart-kit';

import { View, Text, Dimensions} from 'react-native';

import * as Theme from './theme';


export const activeHomeIcon = (<Fontisto name="home" color='white' size={30} />);
export const inactiveHomeIcon = (<SimpleLineIcons name="home" color='white' size={30} />);

export const activeCalendarIcon = (<Ionicons name="calendar-sharp" color='white' size={30} />);
export const inactiveCalendarIcon = (<Ionicons name="calendar-outline" color='white' size={30} />);

export const activeResourcesIcon = (<FontAwesome5 name="book-medical" color='white' size={30} />);
export const inactiveResourcesIcon = (
    <View style={{ flexDirection: 'column', alignItems: 'center', position: 'absolute', }}>
        <Feather 
            name="book" color='white' size={30} style={{flex: 1}}/>
        <MaterialCommunityIcons 
            name="plus-thick" color='white' size={30 / 2.1} 
            style={{flex: 0.5,position: 'absolute', top: 5, left: 8 }}/>
    </View>
);

export const activeProfileIcon = (<Ionicons name="person" color='white' size={30} />);
export const inactiveProfileIcon = (<Ionicons name="person-outline" color='white' size={30} />)

export const sampleGoalsIcons = [
    {id: 1, icon: (<MaterialCommunityIcons name="weight-lifter" color='black' size={50}/>), title: 'Exercise for 3 times/ Week'},
    {id: 2, icon: (
        <FontAwesome6 name="person-walking" color={Theme.red} size={50} />
    ), title: 'Move 10,000 Steps/ Daily'},
    {id: 3, icon: (
        <MaterialCommunityIcons name='cup-water' color={Theme.blue} size={50} />
    ), title: 'Drink 7 Glasses of Water / Daily'},
    {id: 4, icon: (
        <MaterialCommunityIcons name="power-sleep" color={Theme.purple} size={50} />
    ), title: 'Sleep 7 hours/ Daily'},
    {id: 5, icon: (
        <MaterialCommunityIcons name="heart-pulse" color={Theme.lightRed} size={50} />
    ), title: 'Meditate for 15mins / Daily'},
]

export const allGoals = [ 
    {id: 1, category: 'EXERCISE', title: 'Exercise for 3 times/ Week', isSelected: false}, 
    {id: 2, category: 'STEPS', title: 'Move 10,000 Steps/ Daily', isSelected: false},
    {id: 3, category: 'WATER', title: 'Drink 7 Glasses of Water / Daily', isSelected: false},
    {id: 4, category: 'Sleep', title: 'Sleep 7 hours/ Daily', isSelected: false},
    {id: 5, category: 'HRV', title: 'Meditate for 15mins / Daily', isSelected: false},
]

export const GoalCategory = Object.freeze( {
    EXERCISE: 'exercise', 
    STEPS: 'steps',
    WATER: 'water',
    SLEEP: 'sleep',
    HRV: 'hrv'
});

export const ViewDateRange = Object.freeze( {
    TODAY: 'Today', 
    WEEKLY: 'Weekly', 
    MONTHLY: 'Monthly'
});

export const circlePlaceholder = (
    <View style={{ marginVertical: 20, alignSelf: 'center', borderColor: Theme.secondaryGray, borderWidth: 4, borderRadius: 250, height: 250, width: 250 }}>
    </View>
);

export const rectPlaceholder = (
    <View style={{ borderColor: Theme.secondaryGray, marginVertical: 15, borderWidth: 2}}>
        <LineChart
            data={{
            labels: ["5:00", "5:05", "5:10", "5:15", "5:20", "5:25"],
            datasets: [
                {
                data: [
                    75, 
                    Math.random() * (150 - 100 + 1) + 100,
                    Math.random() * (150 - 100 + 1) + 100,
                    Math.random() * (150 - 100 + 1) + 100,
                    Math.random() * (150 - 100 + 1) + 100,
                    150
                ]
                }
            ]
            }}
            width={300} // from react-native
            height={250}
            segments={4}
            yAxisSuffix=" BPM"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(16,82,106, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(16,82,106,${opacity})`,
            style: {
                borderRadius: 10,
            },
            propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#10526A"
            },
            }}
        />
    </View>
)

export const exerciseIcon = (
    <MaterialCommunityIcons name="weight-lifter" color='black' size={35}/>
);

export const goalsIcon = (
    <MaterialIcons name='flag' color={Theme.secondaryTint} size={35} />
);

export const stepsIcon = (
    <FontAwesome6 name="person-walking" color={Theme.red} size={30} />
)

export const sleepIcon = (
    // <MaterialCommunityIcons name="power-sleep" color={Theme.purple} size={30} />
    <Ionicons name="moon" color={Theme.purple} size={30} />
);

export const hrvTrainingIcon = (
    <MaterialCommunityIcons name="heart-pulse" color={Theme.lightRed} size={35 } />
);

export const reduceFatIcon = (
    <Ionicons name='scale-sharp' color={Theme.primaryGray} size={30} />
);

export const waterIcon = (
    <MaterialCommunityIcons name='cup-water' color={Theme.blue} size={30} />
);

export const exerciseIconLarge = (
    <MaterialCommunityIcons name="weight-lifter" color='black' size={50}/>
);


export const stepsIconLarge = (
    <FontAwesome6 name="person-walking" color={Theme.red} size={50} />
)

export const sleepIconLarge = (
    <MaterialCommunityIcons name="power-sleep" color={Theme.yellow} size={50} />
);

export const hrvTrainingIconLarge = (
    <MaterialCommunityIcons name="heart-pulse" color={Theme.lightRed} size={50} />
);

export const reduceFatIconLarge = (
    <Ionicons name='scale-sharp' color={Theme.primaryGray} size={50} />
);

export const waterIconLarge = (
    <MaterialCommunityIcons name='cup-water' color={Theme.blue} size={50} />
);

export const foodIcon = (
    <MaterialCommunityIcons name='silverware-fork-knife' color={Theme.brown} size={30} />
);

export const glucoseIcon = (
    <MaterialCommunityIcons name='water-plus' color={Theme.lightRed} size={35} />
)

export const grayChevronRight = (
    <MaterialIcons name='chevron-right' color={Theme.secondaryGray} size={30} />
);

export const grayChevronDown = (
    <MaterialCommunityIcons name='chevron-down' color={Theme.secondaryGray} size={30} />
);

export const redChevronRight = (
    <MaterialIcons name='chevron-right' color={Theme.secondaryTint} size={30} />
);

export const redChevronLeft = (
    <MaterialIcons name='chevron-left' color={Theme.secondaryTint} size={30} />
);

export const redChevronDown = (
    <MaterialCommunityIcons name='chevron-down' color={Theme.secondaryTint} size={30} />
);

export const redChevronUp = (
    <MaterialCommunityIcons name='chevron-up' color={Theme.secondaryTint} size={30} />
);

export const checkboxTrue = (
    <MaterialCommunityIcons name='checkbox-marked' color={Theme.secondaryTint} size={40} />
); 

export const checkboxFalse = (
    <MaterialCommunityIcons name='checkbox-blank-outline' color={Theme.secondaryTint} size={40} />
); 

export const plusFilled = (
    <MaterialCommunityIcons name='plus-circle-outline' color={Theme.primaryTint} size={60} />
);

export const imageIcon = (
    <FontAwesome6 name='image' color='black' size={30} />
);

export const infoIcon = (
    <MaterialCommunityIcons name='information-outline' color={Theme.primaryTint} size={25} />
);

export const closeCircleFilledIconSmall = (
    <MaterialCommunityIcons name='close-circle' color={Theme.secondaryTint} size={30} />
)

export const closeCircleFilledIconLarge = (
    <MaterialCommunityIcons name='close-circle' color={Theme.secondaryTint} size={40} />
)