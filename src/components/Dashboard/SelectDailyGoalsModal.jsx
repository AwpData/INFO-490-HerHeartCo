import { Text, View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import * as Theme from '../../theme';
import EditDailyGoalsNavBar from '../EditDailyGoals/EditDailyGoalsNavBar';


import { useSelector, useDispatch } from 'react-redux';
import { setGoals } from '../../redux/actions';
import { addNewWater } from '../fitbitAPI/write/addWater';
import { editNewGlucose } from '../fitbitAPI/write/editGlucose';
import { goals } from '../editGoalActions/goals';

import { exerciseIconLarge, sampleGoals, sampleGoalsIcons } from '../../constants';


export default function SelectDailyGoalsModal ({ 
    visible, onRequestClose 
}) {
    const allGoals = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const handleSelectGoal = (objectId) => {
        dispatch(toggleObjectBoolean(objectId));
    };

    const renderIcon = (goal) => {
        if (goal.iconName && goal.iconLibrary) {
        //   return <goal.iconLibrary name={goal.iconName} />;
            return sampleGoalsIcons[goal.id-1].icon;
            return exerciseIconLarge;
        } // else if (goal.iconSource) {
        //   return <Image source={{ uri: iconData.iconSource }} style={styles.iconStyle} />;
        // }
        return null; // Handle the case where no icon data is available
      };

    // const handleDeselectGoal = (goal) => {
    //     dispatch({ type: 'DESELECT_GOAL', payload: goal.id });
    // };

    // const selectedGoals = useSelector(initialState => initialState.selectedGoals);

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
                    { allGoals.map((item) => ( 
                        <TouchableOpacity key={item.id} 
                            onPress={() => {
                                dispatch({
                                    type: 'TOGGLE_BOOLEAN', 
                                    payload: item
                                });
                            }}
                            style={{
                                borderWidth: 3, borderColor: item.isSelected ? Theme.secondaryTint : Theme.secondaryBackground, 
                                paddingVertical: 40, paddingHorizontal: 20, 
                                width: '43%', 
                                height: '28%',
                                borderRadius: 20, margin: 10, 
                                alignItems: 'center', justifyContent: 'center',
                                backgroundColor: Theme.secondaryBackground}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10}}>{item.title}</Text>
                                {sampleGoalsIcons[item.id-1].icon}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal>
    );
};

