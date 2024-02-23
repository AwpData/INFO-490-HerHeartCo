import { Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import * as Theme from '../../theme';
import EditDailyGoalsNavBar from '../EditDailyGoals/EditDailyGoalsNavBar'

import { sampleGoals } from '../../constants';


export default function SelectDailyGoalsModal ({ 
    visible, onRequestClose 
}) {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onRequestClose}
            presentationStyle='pageSheet'
        >
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: Theme.primaryBackground, }}>
                <EditDailyGoalsNavBar onRequestClose={onRequestClose} />
                <Text style={Theme.h1}>Select your goals</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignSelf: 'center', marginHorizontal: 18}}>
                    {sampleGoals.map((item) => ( 
                        <TouchableOpacity key={item.id} style={{
                            borderWidth: 3, borderColor: Theme.secondaryTint, 
                            paddingVertical: 40, paddingHorizontal: 20, 
                            width: '43%', 
                            height: '28%',
                            borderRadius: 20, margin: 10, 
                            alignItems: 'center', justifyContent: 'center',
                            backgroundColor: Theme.secondaryBackground}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10}}>{item.title}</Text>
                                {item.icon}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal>
    );
};