// ExpandableView.jsx
// 
// Container for any view that is hidden until expanded


import React, { useState, } from "react";
import {  View,  Animated,} from "react-native";

import * as Theme from '../../theme';


export default function ExpandableView ({ expanded = false, expandedContent }) {
  const [height] = useState(new Animated.Value(0));

  // Not sure if we can useEffect for fun sliding animation if we don't have a constant height :(
  // useEffect(() => {
  //   Animated.timing(height, {
  //     toValue: !expanded ? 0 : 180,
  //     duration: 150,
  //     useNativeDriver: false
  //   }).start();
  // }, [expanded, height]);

  return (
    <Animated.View 
      style={{ 
        height: 'auto', alignItems: 'center', 
        backgroundColor: Theme.secondaryBackground, 
        borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}>
        
        {expanded ? expandedContent : (<View></View>)}
    </Animated.View>
  );
};