// theme.js
// 
// HHC application themes (text hierarchies, colors, layouts)


import { Platform } from 'react-native';


// Off-white pink
export const primaryBackground = '#FEF7F4';
export const secondaryBackground = 'white';

// Dark blue
export const primaryTint = '#10526A';
// Red with good contrast
export const secondaryTint = '#E84E4E'; 

// Dark gray
export const primaryGray = 'gray';
// Light gray
export const secondaryGray = '#E0E0E0';

// Bright red
export const red = '#FF5E03';
// Light red 
export const lightRed = '#FC6B6D';
// Gold 
export const gold = '#E2AD47';
// Yellow 
export const yellow = '#FFC90C';
// Purple
export const purple = '#6E5597'
// Green
export const green = '#45B957';
// Blue
export const blue = '#1EA7F4';
// Brown 
export const brown = '#D38003';
// Pigment Green - Dashboard
export const pigmentGreen = '#1AA82F';
// Dark goldenrod - Dashboard
export const darkYellow = '#AD8800';


export const header = {
    color: primaryTint, 
    fontSize: 40,
    fontFamily: Platform.select({
        android: 'Lato_900Black',
        ios: 'Lato_900Black'
    })
};

export const title1 = {
    color: primaryTint, 
    fontSize: 36,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
})};

export const title2 = {
    color: primaryTint, 
    fontSize: 30,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    }), 
    paddingBottom: 5
};

export const title2V2 = {
    color: secondaryTint, 
    fontSize: 30,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    }), 
    paddingBottom: 5
};

export const title2Bold = {
    color: primaryTint, 
    fontSize: 30,
    fontFamily: Platform.select({
        android: 'Lato_900Black',
        ios: 'Lato_900Black'
    }),
    paddingBottom: 5
};

export const headline = {
    color: primaryTint, 
    fontSize: 24,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    }),
};

export const headlineV2 = {
    color: secondaryTint, 
    fontSize: 24,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    }),
    paddingBottom: 10
};

export const lightButtonText = {
    color: primaryBackground, 
    fontSize: 18,
    fontFamily: Platform.select({
        android: 'Lato_900Black',
        ios: 'Lato_900Black'
    }),
};

export const buttonText = {
    color: primaryTint, 
    fontSize: 18,
    fontFamily: Platform.select({
        android: 'Lato_900Black',
        ios: 'Lato_900Black'
    }),
};

export const buttonTextV2 = {
    color: secondaryTint, 
    fontSize: 18,
    fontFamily: Platform.select({
        android: 'Lato_900Black',
        ios: 'Lato_900Black'
    }),
};

export const grayButtonText = {
    color: primaryGray, 
    fontSize: 18,
    fontFamily: Platform.select({
        android: 'Lato_900Black',
        ios: 'Lato_900Black'
    }),
    padding: 10
};

export const boldBody = {
    color: primaryTint, 
    fontSize: 16,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    })
};

export const grayBoldBody = {
    color: primaryGray, 
    fontSize: 16,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    })
};

export const boldBodyLight = {
    color: primaryBackground, 
    fontSize: 16,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    })
};

export const body = {
    color: primaryTint, 
    fontSize: 16,
    fontFamily: Platform.select({
        android: 'Lato_400Regular',
        ios: 'Lato_400Regular'
    }), 
};

export const grayBody = {
    color: primaryGray, 
    fontSize: 16,
    fontFamily: Platform.select({
    android: 'Lato_400Regular',
    ios: 'Lato_400Regular'
})};

export const caption = {
    color: primaryTint, 
    fontSize: 14,
    fontFamily: Platform.select({
        android: 'Lato_400Regular',
        ios: 'Lato_400Regular'
    })
};

export const captionBold = {
    color: primaryTint, 
    fontSize: 14,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    }),
    paddingBottom: 10
};

export const whiteCaption = {
    color: secondaryBackground, 
    fontSize: 14,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    }),
    paddingBottom: 10
};


export const goalsRowSmall = {
    color: primaryTint, 
    fontSize: 20,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    }), 
};

export const goalsRowLarge = {
    color: primaryTint, 
    fontSize: 30,
    fontFamily: Platform.select({
        android: 'Lato_700Bold',
        ios: 'Lato_700Bold'
    }),
};


export const dailyStatsSection = {
    flexDirection: 'row', 
    justifyContent: 'center', 
    paddingVertical: 20, 
}

export const dailyStatContainer = {
    alignItems:'center', 
    justifyContent: 'flex-end',
    minWidth: 90,
    maxWidth: 90, 
    flexWrap: 'wrap', 
    marginHorizontal: 5
}

export const dailyStatLayers = {
    flexDirection: 'column',
    flex: 1, 
    justifyContent: 'center',
    alignItems:'center', 
}

export const dailyStatIcon = {
    flexDirection: 'column',
    position: 'absolute', 
    alignItems:'center', 
}

export const shadowBoxStyle = {
    shadowRadius: 10, shadowOpacity: 0.2, shadowOffset: { height: 3 },
    backgroundColor: primaryBackground, 
    padding: 20, borderRadius: 10, 
    marginVertical: 20,
    minWidth: '100%',
    color: primaryTint
}

export const addDataRowStyle = {
    backgroundColor: secondaryBackground,
    borderColor: secondaryGray, 
    borderWidth: 2, 
    minWidth: '100%', 
    borderRadius: 15, 
    marginBottom: 10,
    color: primaryTint
}

export const addDataNavBarStyle = {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent: 'space-between', 
    backgroundColor: primaryBackground, 
    minWidth: '100%', height: 60, 
    padding: 20,
    color: primaryTint
}