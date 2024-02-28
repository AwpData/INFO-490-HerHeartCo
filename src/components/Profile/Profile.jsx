import ShadowBox from '../general/ShadowBox';
import * as Theme from '../../theme';
import * as React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import pkceChallenge from 'react-native-pkce-challenge';
import Base64 from 'react-native-base64';


// TODO: update fitbit auth like that in Home.jsx
export default function Profile() {
  const [name, setName] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [age, setAge] = React.useState('');

  const handleFitbitLogin = async () => {
    const challenge = pkceChallenge();
    const codeChallenge = challenge.codeChallenge;
    console.log('code challenge: ', codeChallenge);
    const codeVerifier = challenge.codeVerifier;
    console.log('challenge verifer: ', codeVerifier);

    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    console.log('redirecturi: ', redirectUri);
    const clientId = '23RTKC';

    // TODO: update scope 
    const authUrl = `https://www.fitbit.com/oauth2/authorize?client_id=${clientId}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256&grant_type=authorization_code&scope=profile+activity+heartrate+weight`;
    console.log('authurl: ', authUrl);
  
    try {
      // const result = await WebBrowser.openAuthSessionAsync(authUrl, 'exp://10.0.0.79:8081');
      const result = await WebBrowser.openAuthSessionAsync(authUrl, 'exp://10.19.122.27:8081');
      
      const url = result.url;

      const startIndex = url.indexOf('=') + 1; // Start after the `=` symbol
      const endIndex = url.indexOf('#'); // End before the `#` symbol
      const authorizationCode = url.substring(startIndex, endIndex);

      console.log('Authorization code: ', authorizationCode);

      const data = JSON.stringify(`client_id=${clientId}&code=${authorizationCode}&code_verifier=${codeVerifier}&grant_type=authorization_code&expires_in=31536000&scope=profile+activity+heartrate+weight`);

      const basicToken = 'Basic ' + Base64.encode(clientId + ':3518afc3120b575c7370f51d12e208f5');

      // Login
      async function makeFitbitPostRequest(someData) {
        try {
          const tokenResponse = await fetch('https://api.fitbit.com/oauth2/token', {
            method: 'POST',
            headers: {
              'Authorization': basicToken,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: someData,
          });

          const responseData = await tokenResponse.json();
          console.log('Post request response data: ', responseData);
          return responseData;
        } catch(error) {
          console.log('error: ', error);
        }
      }

      // Get Profile data 
      async function getProfilePostRequest(response) {
        try {
          console.log("Response at start of profile request: ", response);
          const bearer = 'Bearer ' + response.access_token;
          console.log('Bearer: ', bearer);
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/profile.json', {
            method: 'GET',
            headers: {
              'Authorization': bearer,
            },
          });
          console.log('token response: ', tokenResponse);

          const responseData = await tokenResponse.json();
          console.log('Profile request response data: ', responseData);
          return responseData;
        } catch(error) {
          console.log('error: ', error);
        }
      }
      

      // Make the request to login 
      makeFitbitPostRequest(data)
        .then(responseData => {
          // Make the request to fetch profile data 
          getProfilePostRequest(responseData)
          .then(profileData => {
              console.log('profile data: ', profileData);
              console.log(profileData.user.firstName);
              setName(profileData.user.firstName);
              setAge(profileData.user.age);
              setHeight(profileData.user.height);
              setWeight(profileData.user.weight);
            }
          )
          .catch(error => console.log('error fetching profile data: ', error));
        })
        .catch(error =>
          console.log('error making request: ', error)
        );
    } catch (error) {
      // Handle authentication errors
      console.log('error: ', error);
    }
  }

  return (
    <ScrollView style={{backgroundColor: Theme.secondaryBackground, }}> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, marginHorizontal: 0 }}>
        <View style={{height: 100}}></View>
      {name ? (
        <View>
          <Text style={Theme.profileName}>Kristy</Text>

          <ShadowBox primaryTitle='My Measurements' isLarge={true} content={
            <View style={{paddingBottom: 60, }}>
              <Text style={{fontSize: 22, fontWeight: 'bold', color: '#10526a'}}>Age: {age}</Text>
              <Text 
                  style={{
                      fontSize: 22, 
                      fontWeight: 'bold',
                      color: '#10526a'
                  }}>Height: {Math.floor(height / 2.54 / 12)} ft {Math.ceil((height / 2.54) % 12)} in
              </Text>
              {/* <Text style={{fontSize: 22, fontWeight: 'bold', color: '#10526a'}}>Weight: {Math.ceil(weight * 2.2)} lbs</Text> */}
            </View>
          } />
        </View>
      ) : (
        <Button title="Authorize Fitbit" onPress={handleFitbitLogin} />
      )}
      </View>
    </ScrollView>
  );
}