import * as React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import pkceChallenge from 'react-native-pkce-challenge';
import Base64 from 'react-native-base64';
import qs from 'qs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import * as Theme from '../theme';
import { circlePlaceholder, rectPlaceholder, sampleGoals } from './constants';
import DailyStat from './pageItems/DailyStat';
import ShadowBox from './pageItems/ShadowBox';

// TODO: hard coding this for now, but there may be security concerns when we release the app
const fitbitConfig = {
  clientId: '23RTKC', // replace with your Fitbit app's client ID
  clientSecret: '3518afc3120b575c7370f51d12e208f5', // replace with your Fitbit app's client secret
  scopes: ['profile', 'activity', 'heartrate', 'nutrition'], // TODO: temperature
};

export default function Home() {
  const [authToken, setAuthToken] = React.useState('');
  const [name, setName] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [lifetimeSteps, setLifetimeSteps] = React.useState('')
  const [dailySteps, setDailySteps] = React.useState('');
  const [dailyStepGoal, setDailyStepGoal] = React.useState('');
  const [heartRate, setHeartRate] = React.useState('');
  const [water, setWater] = React.useState('');
  const [dailyWaterGoal, setDailyWaterGoal] = React.useState('');
  
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

      // Login
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

      // TODO: get heart rate data 

      // Not used right now but this request is to get a summary of all of the user's Fitbit data ever. Can delete later if we don't need it
      async function getLifetimeActivityPostRequest(tokenEndpoint) {
        try {
          const accessToken = 'Bearer ' + tokenEndpoint.access_token;
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/activities.json', {
            method: 'GET',
            headers: {
              'Authorization': accessToken,
            },
          });

          const tokenJSON = await tokenResponse.json();
          return tokenJSON;
        } catch(error) {
          console.log('Error in GET request for activities: ', error);
        }
      }

      // GET request for user's logged water in the Fitbit app. TODO: write this data 
      async function getDailyWaterRequest(tokenEndpoint) {
        try {
          const accessToken = 'Bearer ' + tokenEndpoint.access_token;
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/foods/log/water/date/2024-02-09.json', {
            method: 'GET',
            headers: {
              'Authorization': accessToken,
            },
          });

          const tokenJSON = await tokenResponse.json();
          return tokenJSON;
        } catch(error) {
          console.log('Error in GET request for water: ', error);
        }
      }

      async function getDailyStepGoalRequest(tokenEndpoint) {
        try {
          const accessToken = 'Bearer ' + tokenEndpoint.access_token;
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/activities/goals/daily.json', {
            method: 'GET',
            headers: {
              'Authorization': accessToken,
            },
          });

          const tokenJSON = await tokenResponse.json();
          return tokenJSON;
        } catch(error) {
            console.log('Error in GET request for daily step goal: ', error);
          }
      }

      async function getDailyActivitySummaryRequest(tokenEndpoint) {
        try {
          const accessToken = 'Bearer ' + tokenEndpoint.access_token;
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/activities/date/2021-07-01.json', {
            method: 'GET',
            headers: {
              'Authorization': accessToken,
            },
          });

          const tokenJSON = await tokenResponse.json();
          return tokenJSON;
        } catch(error) {
          console.log('Error in GET request for daily activity: ', error);
        }
      }

      async function getDailyWaterGoalRequest(tokenEndpoint) {
        try {
          const accessToken = 'Bearer ' + tokenEndpoint.access_token;
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/foods/log/water/goal.json', {
            method: 'GET',
            headers: {
              'Authorization': accessToken,
            },
          });

          const tokenJSON = await tokenResponse.json();
          return tokenJSON;
        } catch(error) {
          console.log('Error in GET request for daily water goal: ', error);
        }
      }

      // Get Profile data 
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
      makeFitbitLoginPostRequest(requestProperties)
        .then(tokenEndpoint => {
          // Make the request to fetch profile data 
          getProfilePostRequest(tokenEndpoint)
          .then(profileData => {
              setName(profileData.user.firstName);
              setHeight(profileData.user.height);
              setWeight(profileData.user.weight);
            }
          )
          .catch(error => console.log('Error fetching profile data: ', error));

          getLifetimeActivityPostRequest(tokenEndpoint)
          .then(lifeTimeData => {
            setLifetimeSteps(lifeTimeData.lifetime.total.steps);
          })
          .catch(error => console.log('Error fetching lifetime activity data: ', error));

          getDailyWaterRequest(tokenEndpoint) 
          .then( dailyWaterData => {
            setWater(dailyWaterData.summary.water);
          })

          getDailyActivitySummaryRequest(tokenEndpoint)
          .then( dailySummaryData => {
            setDailySteps(dailySummaryData.summary.steps);
          })
          .catch(error => console.log('Error fetching daily activity summary data: ', error));

          getDailyStepGoalRequest(tokenEndpoint)
          .then( dailyGoalData => {
            setDailyStepGoal(dailyGoalData.goals.steps);
          })
          .catch(error => console.log('Error fetching daily step goal: ', error));

          getDailyWaterGoalRequest(tokenEndpoint)
          .then( dailyWaterGoalData => {
            setDailyWaterGoal(dailyWaterGoalData.goal.goal);
          })
          .catch(error => console.log('Error fetching daily water goal: ', error));
        })
        .catch(error =>
          console.log('Error making login request: ', error)
        );
    } catch (error) {
      // Handle authentication errors
      console.log('Error in auth URL: ', error);
    }
  }

  return (
    <ScrollView style={{backgroundColor: 'white', }}> 
      <View style={{ flex: 1, paddingBottom: 75}}>
      {name ? (
        <View>
          <View style={{margin: 20}}> 
            <Text style={Theme.pageTitle}>Good morning</Text>

            <ShadowBox 
              primaryTitle='Reminders / Goals / Alerts' 
              isBold={true} 
              secondaryTitle='' 
              content={
                sampleGoals.map((item, i) => {
                  return (
                    <Text key={i} style={{ fontSize: 16, paddingBottom: 5 }}>• {item}</Text>
                  ) }) } />

            {/* Circle summary graph  */}
            { circlePlaceholder }
          </View>

          {/* Container for daily stats (4 circles) */}
          <View style={Theme.dailyStatsSection}> 

            {/* 1 */}
            {/* TODO: get BPM */}
            <DailyStat 
              statTitle='Heart Rate' 
              measurement={90} 
              goal={1} 
              icon={<FontAwesome5 name="heartbeat" color='#CC3533' size={25} />} 
              unit='BPM' />


            {/* 2 */}
            <DailyStat 
              statTitle='Steps' 
              measurement={dailySteps} 
              goal={dailyStepGoal} 
              icon={<MaterialCommunityIcons 
                name="shoe-sneaker" color='#CC3533' size={30} 
                style={{
                    right: 2,
                    transform: [{ rotate: '-30deg'}] }}/>} 
              unit='steps' />

            {/* 3 */}
            {/* TODO: get sleep */}
            <DailyStat 
              statTitle='Sleep' 
              measurement='7' 
              goal={8} 
              icon={<Feather name="moon" color='#CC3533' size={30} />} 
              unit='48m' />

            {/* 4 */}
            <DailyStat 
              statTitle='Water Intake' 
              measurement={Math.ceil(water / 29.6)} 
              goal={Math.ceil(dailyWaterGoal / 29.6)} 
              icon={<MaterialCommunityIcons name="cup-water" color='#CC3533' size={30} />} 
              unit='oz' />
          </View>

          {/* Container for graphs  */}
          <View style={{margin: 20}}> 

            {/* HRV graph */}
            <ShadowBox 
              primaryTitle='Heart Rate' 
              isBold={false} 
              secondaryTitle='in BPM' 
              content={ rectPlaceholder } />

            {/* Sleep schedule graph */}
            <ShadowBox 
              primaryTitle='Sleep Schedule' 
              isBold={false} 
              secondaryTitle='1/29/24 - 2/10/24' // placeholder date range
              content={ rectPlaceholder } />
          </View>

          <Button title="Authorize Fitbit" onPress={handleFitbitLogin} />
        </View>
      ) : (
        <Button title="Authorize Fitbit" onPress={handleFitbitLogin} />
      )}
      </View>
    </ScrollView>
  );
}