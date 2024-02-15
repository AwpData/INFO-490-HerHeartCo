import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { View, } from 'react-native';


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
    <View style={{ borderColor: '#e0e0e0', borderWidth: 4, height: 300, minWidth: '100%', marginVertical: 15  }}>
    </View>
)

export const goalsIcon = (
    <MaterialIcons name='flag' color='black' size={35} />
);

export const waterIcon = (
    <MaterialCommunityIcons name='cup-water' color='black' size={30} />
);

export const foodIcon = (
    <MaterialCommunityIcons name='silverware-fork-knife' color='black' size={30} />
);

export const glucoseIcon = (
    <View style={{ alignItems: 'center', }}>
        <MaterialCommunityIcons 
            name='water' 
            color='black' 
            size={25} 
            style={{ position: 'absolute', paddingTop: 7, paddingLeft: 14, }} />
        <MaterialCommunityIcons 
            name='water-outline' 
            color='black' 
            size={50} 
            style={{paddingRight: 50}} />
        <FontAwesome 
            name="plus" 
            color='black' 
            size={12} 
            style={{ position: 'absolute', paddingTop: 22}} />
    </View>
)

export const bpIcon = (
    <FontAwesome5 name='heartbeat' color='black' size={30} />
)

export const grayChevronRight = (
    <MaterialIcons name='chevron-right' color='#e0e0e0' size={30} />
);

export const redChevronRight = (
    <MaterialIcons name='chevron-right' color='#cc3533' size={30} />
);

export const redChevronLeft = (
    <MaterialIcons name='chevron-left' color='#cc3533' size={30} />
);

export const redChevronDown = (
    <MaterialCommunityIcons name='chevron-down' color='#cc3533' size={30} />
);