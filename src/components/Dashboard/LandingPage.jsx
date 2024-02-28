import { View, Modal, Image, TouchableOpacity, Text } from 'react-native';
import * as Theme from '../../theme';


export default function LandingPage({handleFitbitLogin}) {
    return (
        <View style={{flex: 1, backgroundColor: Theme.primaryBackground, height: '100%'}}> 
            <Modal animationType="slide"
              transparent={false}
              visible={true}
              presentationStyle='fullScreen'> 
              <View style={{flexDirection: 'column', flex: 1, paddingTop: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: Theme.primaryBackground}}>
                <Image source={require('../../../assets/HHC_Logo.png')} style={{resizeMode: 'contain', height: '12%', margin: 20}} />

                <TouchableOpacity onPress={handleFitbitLogin} style={{backgroundColor: Theme.primaryTint, padding: 20, borderRadius: 20, marginTop: 50}}>
                    <Text style={{color: Theme.primaryBackground, fontSize: 16, fontWeight: 'bold'}}>Sign in with Fitbit</Text>
                </TouchableOpacity>
              </View>
          </Modal>
        </View>
    );
}