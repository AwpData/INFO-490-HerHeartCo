// ExpandedLog.jsx
// 
// View that shows the water/glucose log

import React, { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { View, Text, TouchableOpacity, } from 'react-native';

import * as Theme from '../../theme';
import { closeCircleFilledIconSmall, darkGrayChevronDown, darkGrayChevronUp, } from '../../constants';
import { deleteWaterLog, deleteGlucoseLog } from '../../redux/actions';

import ExpandableView from './ExpandableView';


export default function ExpandedLog( { type, log, } ) {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    // Labels to be added on to the entry
    function logLabel(entry) {
        switch (type) {
            case ('Water'): 
                return `${entry} cups`;
            case ('Glucose'):
                return `${entry.time}       ${entry.glucose} mg/dL`;
            default: return;
        }
    }

    // Determine which function to use when deleting an entry
    function deleteFunction( entry ) {
        switch (type) {
            case ('Water'): 
                return dispatch(deleteWaterLog(entry));
            case ('Glucose'): 
                return dispatch(deleteGlucoseLog(entry));
        }
    }

    // Log only appears when there has been at least one entry
    return ( log.length > 0 && 
        <View style={{alignContent: 'flex-start', paddingBottom: 20}}>

            {/* Button for the user to select whether or not to expand and view the log */}
            <TouchableOpacity 
                onPress={() => { setIsExpanded(!isExpanded) }} 
                style={{flexDirection: 'row', alignItems: 'center'}} 
            >
                <Text style={{...Theme.grayButtonText, color: Theme.primaryGray}}>{type} Log</Text>
                {isExpanded ? darkGrayChevronUp : darkGrayChevronDown}
            </TouchableOpacity>

            {/* Expanded view of log */}
            <ExpandableView expanded={isExpanded} expandedContent={
                log.map((entry, i) => (
                    <View 
                        key={i} 
                        style={{flexDirection: 'row', paddingVertical: 5, alignSelf: 'flex-start'}} 
                    >
                        {/* Button to delete entry */}
                        <TouchableOpacity 
                            onPress={() => {deleteFunction(entry)}}
                            style={{paddingRight: 10 }}>
                            {closeCircleFilledIconSmall}
                        </TouchableOpacity>
                        
                        {/* Log entry */}
                        <View style={{justifyContent: 'center'}}>
                            <Text style={Theme.buttonText}>{logLabel(entry)}</Text>
                        </View>
                    </View>
                ))
            }/>
        </View> 
    );
}