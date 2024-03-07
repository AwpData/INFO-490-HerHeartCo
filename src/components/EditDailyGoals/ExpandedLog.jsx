import React, { useState } from 'react';
import { Platform, View, Text, TouchableOpacity, } from 'react-native';
import { useSelector, useDispatch, } from 'react-redux';

import ExpandableView from './ExpandableView';
import { deleteWaterLog, deleteGlucoseLog } from '../../redux/actions';
import * as Theme from '../../theme';
import { closeCircleFilledIconSmall, darkGrayChevronDown, redChevronUp, } from '../../constants';

export default function ExpandedLog( { type, log, } ) {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    function logLabel(entry) {
        switch (type) {
            case ('Water'): 
                return `${entry} cups`;
            case ('Glucose'):
                return `${entry.time}       ${entry.glucose} mg/dL`;
            default: return;
        }
    }

    function deleteFunction( entry ) {
        switch (type) {
            case ('Water'): 
                return dispatch(deleteWaterLog(entry));
            case ('Glucose'): 
                return dispatch(deleteGlucoseLog(entry));
        }
    }
    return ( log.length > 0 && 
        <View style={{alignContent: 'flex-start', paddingBottom: 20}}>
            <TouchableOpacity onPress={() => { setIsExpanded(!isExpanded) }} style={{flexDirection: 'row', alignItems: 'center'}} >
                <Text style={{...Theme.grayButtonText, color: isExpanded ? Theme.secondaryTint : Theme.primaryGray}}>{type} Log</Text>
                {isExpanded ? redChevronUp : darkGrayChevronDown}

            </TouchableOpacity>

            <ExpandableView key={log.id} expanded={isExpanded} expandedContent={
                log.map((entry) => (
                    <View key={entry.id} style={{flexDirection: 'row', paddingVertical: 5, alignSelf: 'flex-start'}} >
                        <TouchableOpacity 
                            onPress={() => {deleteFunction(entry)}}
                            style={{paddingRight: 10 }}>
                            {closeCircleFilledIconSmall}
                        </TouchableOpacity>
                        
                        <View style={{justifyContent: 'center'}}>
                            <Text style={Theme.buttonText}>{logLabel(entry)}</Text>
                        </View>
                    </View>
                ))
            }/>
        </View> 
    );
}