// SymptomTrackerCategoryView.jsx [Not in scope for iSchool dev team]
// 
// A row component that displays a category from the symptom tracker 


import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import * as Theme from '../../theme';
import { redChevronUp, grayChevronDown } from '../../constants';

import ExpandableView from '../EditDailyGoals/ExpandableView';
import QuestionView from './QuestionView';


export default function SymptomTrackerCategoryView( { symptomSet } ) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={{...Theme.addDataRowStyle, padding: 24, marginBottom: 20}}>
            {/* Symptom tracker category main button - click to expand and see all symptoms with sliders */}
            <TouchableOpacity 
                style={{flexDirection: 'row'}} 
                onPress={() => { setIsExpanded(!isExpanded) }}
            >
                <Text style={{...Theme.headline, paddingBottom: isExpanded? 16 : 0}}>{symptomSet.category}</Text>

                <View style={{flex: 1}} />
                {isExpanded ? redChevronUp : grayChevronDown}
            </TouchableOpacity>
            
            {/* Slider */}
            <ExpandableView 
                expanded={isExpanded} 
                expandedContent={
                    <View>
                        { symptomSet.symptoms.map((symptom, i) => (
                            <QuestionView key={i} symptom={symptom} />
                        )) }
                    </View>
            }/>
        </View>
    )
}