// Profile.jsx [Not in scope for iSchool dev team]
// 
// User profile page; placeholder elements with information pulled from Fitbit API


import * as React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import pkceChallenge from 'react-native-pkce-challenge';
import Base64 from 'react-native-base64';

import * as Theme from '../../theme';

import ShadowBox from '../general/ShadowBox';


export default function Profile() {
  const [name, setName] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [age, setAge] = React.useState('');

  // Fitbit API calls 
  // TODO: export login into separate function
  const handleFitbitLogin = async () => {
    const challenge = pkceChallenge();
    const codeChallenge = challenge.codeChallenge; 
      // ex: jK8r4S0lO-YyuhDdJs7m-HJsogX1emthpexyAT--qyA
    const codeVerifier = challenge.codeVerifier; 
      // ex: M4VgxTlKxiEsEORQhQ289HgdrP3pYqe5WoCvEVOOxaHrga1AH5cartlBVWHkI6Prwg9AUGjHQzhNR4yOuPhkMUQnF7rTJPJlVxvAyB8ZYmR88wEd-tcn_ZXPZX2Uf8Gw

      const queryParams = qs.stringify({
        client_id: fitbitConfig.clientId,
        response_type: 'code',
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        grant_type: 'authorization_code',
      }) + '&scope=' + fitbitConfig.scopes.join('+');
      // ex: client_id=23RTKC&response_type=code&code_challenge=ZPTnKa4D8CXuLosJEuvdXBh4d0_Y-S1NnJ_OV_CKmAI&code_challenge_method=S256&grant_type=authorization_code&scope=profile+activity+heartrate+nutrition

    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      // ex: exp://10.0.0.79:8081

    const authUrl = `https://www.fitbit.com/oauth2/authorize?${queryParams}`;
  
    try {
      // Open in-app browser
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
      const url = result.url;

      const authorizationCode = url.substring(url.indexOf('=') + 1, url.indexOf('#'));
      // ex: 326e6fc061158d3b8af7d682c62be99e06b443fd

      const requestProperties = qs.stringify({
        client_id: fitbitConfig.clientId,
        code: authorizationCode,
        code_verifier: codeVerifier,
        grant_type: 'authorization_code',
        expires_in: 31536000,
      }) + '&scope=' + fitbitConfig.scopes.join('+');
      // ex: client_id=23RTKC&response_type=code&code_challenge=ZPTnKa4D8CXuLosJEuvdXBh4d0_Y-S1NnJ_OV_CKmAI&code_challenge_method=S256&grant_type=authorization_code&scope=profile+activity+heartrate+nutrition

      const basicToken = 'Basic ' + Base64.encode(fitbitConfig.clientId + ':' + fitbitConfig.clientSecret);

      // Fitbit login request
      async function makeFitbitLoginPostRequest(properties) {
        try {
          const tokenResponse = await fetch('https://api.fitbit.com/oauth2/token', {
            method: 'POST',
            headers: {
              'Authorization': basicToken,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: properties,
          });

          const tokenJSON = await tokenResponse.json();
          return tokenJSON;
        } catch(error) {
          console.log('Error in POST request for logging in with Fitbit: ', error);
        }
      }

      // Fitbit GET request for user's Fitbit profile data 
      async function getProfilePostRequest(tokenEndpoint) {
        try {
          const accessToken = 'Bearer ' + tokenEndpoint.access_token;
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/profile.json', {
            method: 'GET',
            headers: {
              'Authorization': accessToken,
            },
          });

          const tokenJSON = await tokenResponse.json();
          return tokenJSON;
        } catch(error) {
          console.log('Error in GET request for Fitbit profile data: ', error);
        }
      }
      
      // Make the request to login 
      makeFitbitLoginPostRequest(data)
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
          <Text style={{...Theme.header, textAlign: 'center'}}>Kristy</Text>

          <ShadowBox primaryTitle='My Measurements' content={
            <View style={{paddingBottom: 60, }}>
              <Text style={{...Theme.headline, paddingBottom: 10}}>Age: {age}</Text>
              <Text 
                  style={{...Theme.headline, paddingBottom: 10}}>Height: {Math.floor(height / 2.54 / 12)} ft {Math.ceil((height / 2.54) % 12)} in
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