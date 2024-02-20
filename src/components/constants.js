import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { LineChart } from 'react-native-chart-kit';

import { View, Text, Dimensions} from 'react-native';


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

export const sampleGoals = [
    'Go to the gym',
    'Make a new appointment',
    'Run a mile',
    'This is a super long goal to see how this looks on more than one line'
]

export const circlePlaceholder = (
    <View style={{ marginVertical: 20, alignSelf: 'center', borderColor: '#e0e0e0', borderWidth: 4, borderRadius: 250, height: 250, width: 250 }}>
    </View>
);

export const rectPlaceholder = (
    <View style={{ borderColor: '#e0e0e0', marginVertical: 15, borderWidth: 2}}>
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

export const goalsIcon = (
    <MaterialIcons name='flag' color='#f69880' size={35} />
);

export const waterIcon = (
    <MaterialCommunityIcons name='cup-water' color='#f69880' size={30} />
);

export const foodIcon = (
    <MaterialCommunityIcons name='silverware-fork-knife' color='#f69880' size={30} />
);

export const glucoseIcon = (
    <View style={{ alignItems: 'center', }}>
        <MaterialCommunityIcons 
            name='water' 
            color='#f69880' 
            size={25} 
            style={{ position: 'absolute', paddingTop: 7, paddingLeft: 14, }} />
        <MaterialCommunityIcons 
            name='water-outline' 
            color='#f69880' 
            size={50} 
            style={{paddingRight: 50}} />
        <FontAwesome 
            name="plus" 
            color='#f69880' 
            size={12} 
            style={{ position: 'absolute', paddingTop: 22}} />
    </View>
)

export const bpIcon = (
    <FontAwesome5 name='heartbeat' color='#f69880' size={30} />
)

export const grayChevronRight = (
    <MaterialIcons name='chevron-right' color='#e0e0e0' size={30} />
);

export const redChevronRight = (
    <MaterialIcons name='chevron-right' color='#f69880' size={30} />
);

export const redChevronLeft = (
    <MaterialIcons name='chevron-left' color='#f69880' size={30} />
);

export const redChevronDown = (
    <MaterialCommunityIcons name='chevron-down' color='#f69880' size={30} />
);