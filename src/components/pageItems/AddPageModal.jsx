import { Text, View, Modal, } from 'react-native';
import { format } from 'date-fns';
import AddDataNavBar from './AddDataNavBar';
import { redChevronRight, redChevronLeft } from '../constants';
import * as Theme from '../../theme';

const todayDate = new Date();

export default function AddPageModal ({ 
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
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <AddDataNavBar onRequestClose={onRequestClose} />
                
                {/* TODO: export the date navigator to a separate component  */}
                <View style={{padding: 20, }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        {/* TODO: make chevrons as functional buttons  */}
                        {redChevronLeft}
                        <Text style={Theme.addPageDateFormat}>{format(todayDate, 'EEEE, MMMM dd')}</Text>
                        {redChevronRight}
                    </View>
                    
                    {children}
                </View>
                
                {/* Placeholder for now until we add more items/fix layout */}
                <View style={{flex: 1}} />
            </View>
        </Modal>
    );
};