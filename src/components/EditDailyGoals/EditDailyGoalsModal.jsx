import { Text, View, Modal, ScrollView } from 'react-native';
import { format } from 'date-fns';
import EditDailyGoalsNavBar from './EditDailyGoalsNavBar';
import { redChevronRight, redChevronLeft } from '../../constants';
import * as Theme from '../../theme';

const todayDate = new Date();

export default function EditDailyGoalsModal ({ 
    children, visible, onRequestClose 
}) {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={onRequestClose}
            presentationStyle='pageSheet'
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.primaryBackground, }}>
                <EditDailyGoalsNavBar onRequestClose={onRequestClose} onSubmitClose={onRequestClose} />
                
                <ScrollView automaticallyAdjustKeyboardInsets={true}>
                    {/* TODO: export the date navigator to a separate component  */}
                    <View style={{padding: 20, alignItems: 'center'}}>
                        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> */}
                            {/* TODO: make chevrons as functional buttons  */}
                            {/* {redChevronLeft} */}
                            <Text style={Theme.addPageDateFormat}>{format(todayDate, 'EEEE, MMMM dd')}</Text>
                            {/* {redChevronRight} */}
                        {/* </View> */}

                        {children}
                    </View>
                </ScrollView>
            </View>
        </Modal>
        
    );
};