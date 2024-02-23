import React, { useEffect, useState } from "react";
import {  View,  Animated,} from "react-native";

import * as Theme from '../../theme';

// TODO: determine if we have to pass in a height (depending on the amount of content we want to edit)
export default function ExpandableView ({ expanded = false, expandedContent }) {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: !expanded ? 0 : 180,
      duration: 150,
      useNativeDriver: false
    }).start();
  }, [expanded, height]);

  return (
    <Animated.View style={{ height, alignItems: 'center', backgroundColor: Theme.secondaryBackground, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}>
        {expanded ? expandedContent : (<View></View>)}
    </Animated.View>
  );
};