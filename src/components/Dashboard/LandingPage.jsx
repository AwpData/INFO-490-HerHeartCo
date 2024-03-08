// LandingPage.jsx [Not in scope for iSchool dev team]
//
// Landing page that prompts user to register/login upon opening the app for the first time
// Currently is a placeholder screen that works for the frontend of the MVP


import { View, Modal, TouchableOpacity, Text } from 'react-native';

import * as Theme from '../../theme';
import HHC_01_Component from '../../../assets/HHC-01-Component';


export default function LandingPage({handleFitbitLogin}) {
    return (
        <View style={{flex: 1, backgroundColor: Theme.primaryBackground, height: '100%'}}> 
            <Modal 
              animationType="slide"
              transparent={false}
              visible={true}
              presentationStyle='fullScreen'
            > 
              <View style={{
                flexDirection: 'column', 
                flex: 1, 
                paddingTop: 70, 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: Theme.primaryBackground
              }}>
                {/* Logo */}
                <HHC_01_Component width={370} height={200}/>

                {/* Create an Account button */}
                <TouchableOpacity style={{
                  backgroundColor: Theme.secondaryBackground, 
                  padding: 20, 
                  borderRadius: 15, 
                  marginTop: 200,
                  shadowColor: '#000000', shadowOffset: {
                    width: 0, 
                    height: 1
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                }}>
                  <Text style={Theme.boldBody}> 
                    Create an account
                  </Text>
                </TouchableOpacity>

                  {/* Fitbit Auth button */}
                <TouchableOpacity 
                  onPress={handleFitbitLogin} 
                  style={{
                    backgroundColor: Theme.primaryTint, 
                    padding: 20, 
                    borderRadius: 15, 
                    marginTop: 20,
                    shadowColor: '#000000', 
                    shadowOffset: {
                      width: 0, 
                      height: 1
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                  }}
                >
                  <Text style={Theme.boldBodyLight}>Sign in with Fitbit</Text>
                </TouchableOpacity>
                  
                {/* Manual Sign in button */}
                <View style={{
                  flexDirection: 'row', 
                  alignItems: 'baseline', 
                  shadowColor: '#000000', 
                  shadowOffset: {
                    width: 0, 
                    height: 1
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  marginTop: 50
                }}>
                  <Text style={Theme.body}>Already have an account?</Text>
                  <TouchableOpacity style={{
                    backgroundColor: Theme.secondaryBackground, 
                    paddingTop: 10, 
                    paddingBottom: 10, 
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 15, 
                    marginLeft: 10
                  }}>
                    <Text style={Theme.boldBody}>
                      Sign in
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
          </Modal>
        </View>
    );
}