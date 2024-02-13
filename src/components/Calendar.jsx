import * as React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';

export default function Calendar() {

  return (
    <ScrollView> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Calendar will be inserted on this page</Text>
      </View>
    </ScrollView>
  );

}