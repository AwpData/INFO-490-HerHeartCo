import * as React from 'react';
import { Button, Text, View, ScrollView, useEffect, Modal, Image, TouchableOpacity } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import pkceChallenge from 'react-native-pkce-challenge';
import Base64 from 'react-native-base64';
import qs from 'qs';
import { format } from 'date-fns';

import * as Theme from '../../theme';
import { circlePlaceholder, rectPlaceholder, sampleGoals } from '../../constants';
import ShadowBox from '../general/ShadowBox';
import DailyStatContainer from './DailyStatContainer';
import { useSelector, useDispatch } from 'react-redux';
import LandingPage from './LandingPage';
import authorizeProfile from '../fitbitAPI/read/authorizeProfile';
import { editSleep } from '../../redux/actions';

import { VictoryPie, VictoryLabel } from "victory-native";



// TODO: hard coding this for now, but there may be security concerns when we release the app
// OPTION 1: 
// const fitbitConfig = {
//   clientId: '23RTKC', // replace with your Fitbit app's client ID
//   clientSecret: '3518afc3120b575c7370f51d12e208f5', // replace with your Fitbit app's client secret
//   scopes: ['profile', 'activity', 'heartrate', 'nutrition', 'sleep'], // TODO: temperature
// };
// OPTION 2: - switch between the 2 if you run out of API calls 
const fitbitConfig = {
  clientId: '23RVLG', // replace with your Fitbit app's client ID
  clientSecret: 'bc5a3f429816d44b1b1b7ca2f71ab8b0', // replace with your Fitbit app's client secret
  scopes: ['profile', 'activity', 'heartrate', 'nutrition', 'sleep'], // TODO: temperature, heartrate, sleep
};

export default function Home() {
  // TODO: look into using redux to handle state across the app 
  const [name, setName] = React.useState('');
  const [dailySteps, setDailySteps] = React.useState('');
  const [dailyStepGoal, setDailyStepGoal] = React.useState('');
  const [water, setWater] = React.useState(325);
  const [dailyWaterGoal, setDailyWaterGoal] = React.useState('');
  const [dailyHRV, setDailyHRV] = React.useState('');
  const [dailySleep, setDailySleep] = React.useState('');

  const sleep = useSelector(state => state.editGoalsReducer.sleep);
  const glucose = useSelector(state => state.editGoalsReducer.glucose);
  const dispatch = useDispatch();

  const date = new Date(); 
  const todayDateString = format(date, 'yyyy-MM-dd');

  // useEffect(() => {
  //   dispatch(authorizeProfile());
  // }, [])
  
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
          const tokenResponse = await fetch(`https://api.fitbit.com/1/user/-/activities/date/${todayDateString}.json`, {
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

      async function getDailyHRVRequest(tokenEndpoint) {
        try {
          const accessToken = 'Bearer ' + tokenEndpoint.access_token;
          const tokenResponse = await fetch(`https://api.fitbit.com/1/user/-/hrv/date/${todayDateString}.json`, {
            method: 'GET',
            headers: {
              'Authorization': accessToken,
            },
          });

          const tokenJSON = await tokenResponse.json();
          return tokenJSON;
        } catch(error) {
          console.log('Error in GET request for daily HRV: ', error);
        }
      }

      async function getDailySleepRequest(tokenEndpoint) {
        try {
          const accessToken = 'Bearer ' + tokenEndpoint.access_token;
          const tokenResponse = await fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${todayDateString}.json`, {
            method: 'GET',
            headers: {
              'Authorization': accessToken,
            },
          });

          const tokenJSON = await tokenResponse.json();
          return tokenJSON;
        } catch(error) {
          console.log('Error in GET request for daily sleep: ', error);
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
          console.log('tokenJSON: ', tokenJSON);
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
              // setHeight(profileData.user.height);
              // setWeight(profileData.user.weight);
            }
          )
          .catch(error => console.log('Error fetching profile data: ', error));

          // getLifetimeActivityPostRequest(tokenEndpoint)
          // .then(lifeTimeData => {
          //   setLifetimeSteps(lifeTimeData.lifetime.total.steps);
          // })
          // .catch(error => console.log('Error fetching lifetime activity data: ', error));

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

          getDailyHRVRequest(tokenEndpoint)
          .then( dailyHRVData => {
            setDailyHRV(dailyHRVData.hrv[0].value.dailyRmssd);
          })
          .catch(error => console.log('Error fetching daily HRV: ', error));

          getDailySleepRequest(tokenEndpoint)
          .then( dailySleepData => {
            dispatch(editSleep(dailySleepData.summary.totalMinutesAsleep));  
            setDailySleep(dailySleepData.summary.totalMinutesAsleep);
          })
          .catch(error => console.log('Error fetching daily sleep: ', error));
          
        })
        .catch(error =>
          console.log('Error making login request: ', error)
        );
    } catch (error) {
      // Handle authentication errors
      console.log('Error in auth URL: ', error);
    }
  }

  const allGoals = useSelector(state => state.userReducer);
  function glucoseScale(measurement) {
    if (measurement > 180) {
      return {scale: 'High', color: Theme.secondaryTint};
    } else if (measurement > 120) {
      return {scale: 'Poor', color: Theme.red};
    } else if (measurement > 70) {
      return {scale: 'Perfect', color: Theme.pigmentGreen};
    } else { // 0-70
      return {scale: 'Low', color: Theme.darkYellow};
    }
  }

  function sleepScale(min) {
    if (min / 420 > 0.9) {
      return {scale: 'Perfect', color: Theme.pigmentGreen};
    } else if (min / 420 > 0.8) {
      return {scale: 'Good', color: Theme.green};
    } else if (min / 420 > 0.6) {
      return {scale: 'Fair', color: Theme.darkYellow};
    } else { // < 0.6
      return {scale: 'Low', color: Theme.secondaryTint};
    }
  }

  function hrvScale(measurement) {
    if (measurement > 70) {
      return {scale: 'Excellent', color: Theme.pigmentGreen};
    } else if (measurement > 40) {
      return {scale: 'Perfect', color: Theme.green};
    } else { // < 40
      return {scale: 'Low', color: Theme.secondaryTint};
    }
  }

  function calculatePercentage(stat, unit) {
    let goal = 1

    switch(unit) {
      case('Sleep'): 
        goal = 420;
        break; 
      case ('HRV'): 
        goal = 70; 
        break; 
      case ('Glucose'):
        goal = 70;
        break; 
      default: break; 
    }

    let percentage = (stat / goal) > 1 ? 1 : (stat / goal);
    return percentage;
  }


  return (
    <ScrollView style={{backgroundColor: Theme.secondaryBackground, }}> 
      <View style={{ flex: 1, paddingTop: 50, paddingBottom: 75, }}>
      {name ? (
        <View style={{margin: 20}}>
          <Text style={Theme.pageTitle}>Good Morning!</Text>

          <View style={{position: 'relative', alignSelf: 'center', justifyContent: 'center',}}>
            <View style={{ position: 'absolute', marginTop: 20, marginBottom: 50, alignSelf: 'center', borderColor: Theme.secondaryGray, borderWidth: 4, borderRadius: 250, height: 250, width: 250 , }}>
              <View style={{ position: 'absolute', left: '50%', height: '100%', width: 1, borderColor: Theme.secondaryGray, borderWidth: 1 }} />
              <View style={{ position: 'absolute', top: '50%', width: '100%', height: 1, borderColor: Theme.secondaryGray, borderWidth: 1 }} />
            </View>
            <View>
              <VictoryPie
                radius={({ datum }) => (calculatePercentage(datum.stat, datum.label)) * 121 }
                data={[
                  { label: 'Sleep', x: 1, y: 1, stat: sleep, goal: 420},
                  { label: 'HRV', x: 1, y: 1, stat: dailyHRV, goal: 70 },
                  { label: 'Glucose', x:1, y: 1, stat: glucose, goal: 70 },
                  { label: 'Temp', x: 1, y: 1, stat: 89, goal: 89 },
                ]}
                colorScale={[
                  sleepScale(sleep).color, // Sleep
                  hrvScale(dailyHRV).color, // HRV
                  glucoseScale(glucose).color, // Glucose
                  Theme.pigmentGreen // Temp
                ]}
                cornerRadius={10}
                
                height={350}
                // labelPosition={10}

                labelComponent={
                  <VictoryLabel 
                    style={ 
                      [{fontSize: 20, fontFamily:'sans-serif', fontWeight: 'bold'}, ] } 
                    // text={({ datum }) => [`${datum.label}`, `${datum.status}`]}
                  />
                }
                labelRadius={150}
              />
            </View>
            <View style={{position: 'absolute'}}>
              <VictoryPie
                radius={({ datum }) => (datum.stat / datum.goal) * 121 }
                data={[
                  { label: sleepScale(sleep).scale, x: 1, y: 1, }, // sleep
                  { label: hrvScale(dailyHRV).scale, x: 1, y: 1, }, // HRV
                  { label: glucoseScale(glucose).scale, x:1, y: 1,}, // glucose 
                  { label: 'Perfect', x: 1, y: 1, }, // temp 
                ]}
                height={350}
                labelComponent={<VictoryLabel transform={'translate(0, 25)'}
                  style={[{fontSize: 18, fill: Theme.red, fontFamily:'sans-serif', fontWeight: 'bold'}, 
                  ] } />}
                labelRadius={150}
              />
            </View>
            <View style={{position: 'absolute', alignSelf: 'center', backgroundColor: Theme.primaryBackground, height: 90, width: 90, borderRadius: 100, justifyContent: 'center', shadowRadius: 10, shadowOpacity: 0.4, shadowOffset: { height: 3 }}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 36}}>
                {Math.ceil((
                  (calculatePercentage(sleep, 'Sleep') + 
                  calculatePercentage(dailyHRV, 'HRV') + 
                  calculatePercentage(glucose, 'Glucose') + 
                  1 ) / 4) 
                  * 100)}
              </Text>
            </View>
          </View>

          {/* Container for daily stats (4 circles) */}
          <DailyStatContainer 
            dailySteps={dailySteps} dailyStepGoal={dailyStepGoal}
            sleep={sleep} sleepGoal='420' // in minutes
            dailyWaterSummary={water} dailyWaterGoal={dailyWaterGoal} />

          <ShadowBox 
              primaryTitle='Reminders' 
              isBold={true} 
              secondaryTitle='' 
              content={
                allGoals.map((item, i) => { 
                  return item.isSelected ? ( 
                    <Text key={i} style={{ fontSize: 16, paddingBottom: 5, color: Theme.primaryTint}}>• {item.recommendation}</Text>
                  ) : null }) } />


          {/* HRV graph */}
          <ShadowBox 
            primaryTitle='Heart Rate' 
            // isBold={false} 
            secondaryTitle='in BPM' 
            content={ rectPlaceholder } />

          {/* Sleep schedule graph */}
          <ShadowBox 
            primaryTitle='Sleep Schedule' 
            // isBold={false} 
            secondaryTitle='1/29/24 - 2/10/24' // placeholder date range
            content={ <Image source={require('../../../assets/sample_sleep.png')} style={{resizeMode: 'contain', height: 260, margin: 20}} />  } />



          <Button title="Authorize Fitbit" onPress={handleFitbitLogin} />
        </View>
      ) : 
        <LandingPage handleFitbitLogin={handleFitbitLogin} />
      }
      </View>
    </ScrollView>
  );
}