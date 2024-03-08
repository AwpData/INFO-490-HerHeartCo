// QuestionView.jsx [Not in scope for iSchool dev team]
// 
// Row of a symptom with its slider


import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Slider,  } from '@react-native-assets/slider';

import * as Theme from '../../theme';


const styles = StyleSheet.create({
    questionText: {
        fontSize: 18, 
        color: Theme.primaryTint, 
        paddingTop: 24, 
        fontFamily: Platform.select({
            android: 'Lato_400Regular',
            ios: 'Lato_400Regular'
        })
    },
    trackNumber: {
        position: 'absolute',
        top: '150%', fontWeight: 'bold', fontSize: 20, marginLeft: -5
    }, 
    trackMarker: {
        width: 3,
        height: 20,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.primaryTint
    }, 
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 50
    }, 
    thumbStyle: {
        backgroundColor: Theme.secondaryTint, 
        width: 34, height: 24, 
        borderRadius: 10,
    },
    sliderWrapping: {
        width: '100%',
        height: '240%',
    }
})

const CustomMark = ({ value }) => {
  return <View style={styles.trackMarker}>
    <Text style={styles.trackNumber}>{value}</Text>
  </View>
}

export default function QuestionView( {symptom} ) {
    const [value, setValue] = useState(0);
    
    return (
    <View style={{padding: 10, position: 'relative'}}>
        <View style={{width: '100%', borderWidth: 0.5, borderColor: Theme.primaryGray}}/>
        
        <Text style={styles.questionText}>{symptom}</Text>
        <View style={styles.sliderContainer}>
            <Slider
                style={styles.sliderWrapping}
                minimumValue={0}
                maximumValue={5}
                value={value}
                onValueChange={setValue}
                step={1}
                CustomMark={CustomMark}
                trackStyle={{backgroundColor: Theme.primaryTint, height: 3}}
                thumbStyle={styles.thumbStyle} />
        </View>
    </View>
  );
}