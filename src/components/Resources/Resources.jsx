import * as React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';

export default function Resources() {

  return (
    <ScrollView style={{backgroundColor: '#fef7f4', }}> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Resources will be inserted on this page</Text>
      </View>
    </ScrollView>
  );

}