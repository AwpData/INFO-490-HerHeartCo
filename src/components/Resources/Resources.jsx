import * as React from 'react';
import { Button, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import * as Theme from '../../theme';
import { grayChevronRight } from '../../constants';

export default function Resources() {

  const connectionsButtonTitles = ['Community Connection', 'Clinician Connection'];
  const informationButtonTitles = ['Articles', 'Events'];

  return (
    <ScrollView style={{backgroundColor: Theme.secondaryBackground, }}> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left', padding: 20}}>

          <View style={{marginBottom: 20}}>
            <Text style={{color: Theme.primaryTint, fontWeight: 'bold', fontSize: 16, margin: 10}}>Connections</Text>
            {
              connectionsButtonTitles.map((title, i) => {
                return (<TouchableOpacity key={i} style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Theme.primaryBackground, padding: 20, borderRadius: 10, borderWidth: 2, borderColor: Theme.secondaryGray, width: '100%', marginBottom: 10}}>
                  <Text style={{color: Theme.primaryTint, fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center'}}>{title}</Text>
                  {grayChevronRight}
                </TouchableOpacity>)
              })
            }
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={{color: Theme.primaryTint, fontWeight: 'bold', fontSize: 16, margin: 10}}>Information</Text>
            {
              informationButtonTitles.map((title, i) => {
                return (<TouchableOpacity key={i} style={{flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Theme.primaryBackground, padding: 20, borderRadius: 10, borderWidth: 2, borderColor: Theme.secondaryGray, width: '100%', marginBottom: 10}}>
                  <Text style={{color: Theme.primaryTint, fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center'}}>{title}</Text>
                  {grayChevronRight}
                </TouchableOpacity>)
              })
            }
          </View>
          
          
      </View>
    </ScrollView>
  );

}