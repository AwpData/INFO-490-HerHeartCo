export const pageTitle = {
    fontSize: 36, 
    fontWeight: 'bold'
}

export const dailyStatContainer = {
    alignItems:'center', 
    minWidth: 100,
}

export const dailyStatTitle = {
    fontWeight: 'bold', 
    paddingBottom: 10,
}

export const dailyStat = {
    fontWeight: 'bold', 
    fontSize: 20
}

export const dailyStatLabel = {
    fontSize: 14
}

export const dailyStatLayers = {
    flex: 1, 
    justifyContent: 'center',
    flexDirection: 'column', alignItems:'center', 
}

export const dailyStatIcon = {
    position: 'absolute', 
    flexDirection: 'column', alignItems:'center', 
}


function DailyStat( { 
    statTitle, measurement, goal, icon, unit
} ) {

    return (
        <View style={Theme.dailyStatContainer}> 
            <Text style={dailyStatTitle}>{statTitle}</Text>
            <View 
                style={Theme.dailyStatLayers}> 
                
                <AnimatedCircularProgress
                    size={90}
                    width={5}
                    fill={measurement  * 100 / goal}
                    rotation={0}
                    tintColor="#cc3533"
                    backgroundColor="#e0e0e0" 
                />
                <View style={Theme.dailyStatIcon}> 
                    {icon}
                    {/* <FontAwesome5 name="heartbeat" color='#CC3533' size={25} /> */}
                    <Text style={Theme.dailyStat}>{measurement}</Text>
                    <Text style={Theme.dailyStatLabel}>{unit}</Text>
                </View>            
            </View>
        </View>
    );
}