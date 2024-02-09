import * as React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import pkceChallenge from 'react-native-pkce-challenge';
import Base64 from 'react-native-base64';
import qs from 'qs';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const config = {
//   clientId: '23RTKC', // replace with your Fitbit app's client ID
//   scopes: ['heartrate', 'activity', 'profile', 'sleep'],
// };
// const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
// console.log(redirectUri);

// const getFitbitAuthUrl = () => {
//   const baseUrl = 'https://www.fitbit.com/oauth2/authorize';
//   redirectUri;
//   const queryParams = qs.stringify({
//     client_id: config.clientId,
//     response_type: 'token',
//     scope: config.scopes.join(' '),
//     redirect_uri: redirectUri,
//     expires_in: '31536000',
//   });

//   return `${baseUrl}?${queryParams}`;
// };

export default function Resources() {
  const [authToken, setAuthToken] = React.useState('');
  const [name, setName] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [lifetimeSteps, setLifetimeSteps] = React.useState('')
  const [dailySteps, setDailySteps] = React.useState('');
  const [heartRate, setHeartRate] = React.useState('');

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
    const authUrl = `https://www.fitbit.com/oauth2/authorize?client_id=${clientId}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256&grant_type=authorization_code&scope=profile+activity+heartrate`;
    console.log('authurl: ', authUrl);

    
    // concatenate this with the parsed result.url
  
    try {
      const result = await WebBrowser.openAuthSessionAsync(authUrl, 'exp://10.0.0.79:8081');
      const url = result.url;

      const startIndex = url.indexOf('=') + 1; // Start after the `=` symbol
      const endIndex = url.indexOf('#'); // End before the `#` symbol
      const authorizationCode = url.substring(startIndex, endIndex);

      console.log('Authorization code: ', authorizationCode);

      const data = JSON.stringify(`client_id=${clientId}&code=${authorizationCode}&code_verifier=${codeVerifier}&grant_type=authorization_code&expires_in=31536000&scope=profile+activity+heartrate`);

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

      async function getLifetimeActivityPostRequest(someData) {
        try {
          const bearer = 'Bearer ' + someData.access_token;
          console.log('Bearer: ', bearer);
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/activities.json', {
            method: 'GET',
            headers: {
              'Authorization': bearer,
            },
          });
          console.log('lifetime activity token response: ', tokenResponse);

          const responseData = await tokenResponse.json();
          console.log('Lifetime activity response data: ', responseData);
          return responseData;
        } catch(error) {
          console.log('error: ', error);
        }
      }

      async function getDailyActivitySummaryRequest(response) {
        try {
          const bearer = 'Bearer ' + response.access_token;
          console.log('Bearer: ', bearer);
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/activities/date/2021-07-01.json', {
            method: 'GET',
            headers: {
              'Authorization': bearer,
            },
          });
          console.log('Daily activity response: ', tokenResponse);

          const responseData = await tokenResponse.json();
          console.log('Daily Activity request response data: ', responseData);
          return responseData;
        } catch(error) {
          console.log('error: ', error);
        }
      }

      // async function getDailyHeartRate(response) {
      //   try {
      //     const bearer = 'Bearer ' + response.access_token;
      //     console.log('Bearer: ', bearer);
      //     const tokenResponse = await fetch('https://api.fitbit.com/1/user/[user-id]/activities/heart/date/2021-07-01/1d.json', {
      //       method: 'GET',
      //       headers: {
      //         'Authorization': bearer,
      //       },
      //     });
      //     console.log('Daily heart rate response: ', tokenResponse);

      //     const responseData = await tokenResponse.json();
      //     console.log('Daily heart rate request response data: ', responseData);
      //     return responseData;
      //   } catch(error) {
      //     console.log('error: ', error);
      //   }
      // }

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
              setHeight(profileData.user.height);
              setWeight(profileData.user.weight);
              // const profileString = JSON.stringify(profileData);
              // setAuthToken(profileString)
            }
          )
          .catch(error => console.log('error fetching profile data: ', error));

          getLifetimeActivityPostRequest(responseData)
          .then(lifeTimeData => {
            console.log('lifetime data: ', lifeTimeData);
            setLifetimeSteps(lifeTimeData.lifetime.total.steps);
          })
          .catch(error => console.log('error fetching lifetime data: ', error));

          getDailyActivitySummaryRequest(responseData)
          .then( dailySummaryData => {
            console.log('daily activity steps: ', dailySummaryData.summary.steps);
            setDailySteps(dailySummaryData.summary.steps);
          })
          .catch(error => console.log('error fetching daily summary data: ', error));

          // getDailyHeartRate(responseData)
          // .then(dailyHeartRateData => {
          //   console.log(dailyHeartRateData);
          // })
          // .catch(error => console.log('error fetching heart rate: ', error));

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
    <ScrollView> 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{height: 100}}></View>
      {name ? (
        <View>
          <Text>Welcome, {name}</Text>
          <Text>Height: {height}</Text>
          <Text>Weight: {weight}</Text>
          <Text>Lifetime steps: {lifetimeSteps}</Text>
          <Text>Steps on 2021-07-01: {dailySteps}</Text>
          <Button title="Authorize Fitbit" onPress={handleFitbitLogin} />
        </View>
      ) : (
        <Button title="Authorize Fitbit" onPress={handleFitbitLogin} />
      )}
      </View>
    </ScrollView>
  );

}