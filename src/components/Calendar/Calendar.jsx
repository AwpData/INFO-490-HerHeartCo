// Calendar.jsx [Not in scope for iSchool dev team]
// 
// Will show a calendar with a record of the user's goals 
// Symptom tracker is displayed here for now, as the flow has not been finalized


import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, } from 'react-native';
import Modal from 'react-native-modal';

// import Dexcom from '../Dashboard/Dexcom';
import * as Theme from '../../theme';
import { closeIconRedLarge, questionIconSmall } from '../../constants';

import symptomTrackerQuestions from '../SymptomTracker/symptomTrackerQuestions';
import SymptomTrackerCategoryView from '../SymptomTracker/SymptomTrackerCategoryView';


const symptomScale = ["Not present", "Weak", "Mild", "Moderate", "Strong", "Severe"];

export default function Calendar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ScrollView style={{backgroundColor: Theme.primaryBackground, }}> 
      {/* <Dexcom /> */}

      {/* Symptom tracker */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, marginBottom: 60 }}>
        <View style={{flexDirection: 'row', padding: 30, justifyContent: 'center'}}>
          <Text style={{...Theme.title2, }}>Symptom Tracker</Text>
          <TouchableOpacity 
            onPress={() => setIsModalOpen(!isModalOpen)}
            style={{justifyContent: 'center', margin: 8}}>
            {questionIconSmall}
          </TouchableOpacity>
        </View>
        { symptomTrackerQuestions.map((symptomSet, i) => (
            <SymptomTrackerCategoryView key={i} symptomSet={symptomSet} />
          )) }
      </View>

      {/* Pop up to display symptom tracker instructions */}
      <Modal 
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() => setIsModalOpen(!isModalOpen)}
        isVisible={isModalOpen}
        width={'80%'}
        style={{alignSelf: 'center'}}
        >
        <View style={{ 
          backgroundColor: '#FFF',
          padding: 20, paddingBottom: 60, borderRadius: 20, flexDirection: 'column'
        }} >
        <>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, padding: 20}} />
            <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}>
              {closeIconRedLarge}
            </TouchableOpacity>
          </View>
          <View style={{padding: 10}}>
          <Text style={{...Theme.headline, paddingBottom: 15}}>Please rate your symptom experiences</Text>
          { symptomScale.map((symptom, i) => (
              <Text style={{...Theme.body, fontSize: 20}}>{i} = {symptom}</Text>
            )) }
          </View>
        </>
        </View>
      </Modal>
    </ScrollView>
  );
}