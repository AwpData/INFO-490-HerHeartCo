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
import DailyStat from './DailyStat';

// TODO: hard coding this for now, but there may be security concerns when we release the app
const fitbitConfig = {
  clientId: '23RTKC', // replace with your Fitbit app's client ID
  clientSecret: '3518afc3120b575c7370f51d12e208f5', // replace with your Fitbit app's client secret
  scopes: ['profile', 'activity', 'heartrate', 'nutrition'],
};

// const getFitbitAuthUrl = () => {
//   const baseUrl = 'https://www.fitbit.com/oauth2/authorize';
//   redirectUri;
  // const queryParams = qs.stringify({
  //   client_id: config.clientId,
  //   response_type: 'token',
  //   scope: config.scopes.join(' '),
  //   redirect_uri: redirectUri,
  //   expires_in: '31536000',
//   });

//   return `${baseUrl}?${queryParams}`;
// };

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

    console.log(fitbitConfig.scopes.join('+'));

    

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
      console.log('QUERY PARAMS: ', queryParams);

    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      // ex: exp://10.0.0.79:8081

    const authUrl = `https://www.fitbit.com/oauth2/authorize?${queryParams}`;
  
    try {
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
      const url = result.url;

      const authorizationCode = url.substring(url.indexOf('=') + 1, url.indexOf('#'));
      // ex: 326e6fc061158d3b8af7d682c62be99e06b443fd

      const requestProperties = JSON.stringify(`client_id=${fitbitConfig.clientId}&code=${authorizationCode}&code_verifier=${codeVerifier}&grant_type=authorization_code&expires_in=31536000&scope=profile+activity+heartrate+nutrition`);

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

          const responseData = await tokenResponse.json();
          return responseData;
        } catch(error) {
          console.log('Error logging in with Fitbit: ', error);
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

      async function getDailyWaterRequest(someData) {
        try {
          const bearer = 'Bearer ' + someData.access_token;
          console.log('Bearer: ', bearer);
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/foods/log/water/date/2024-02-09.json', {
            method: 'GET',
            headers: {
              'Authorization': bearer,
            },
          });
          console.log('Daily water token response: ', tokenResponse);

          const responseData = await tokenResponse.json();
          console.log('Daily water response data: ', responseData);
          return responseData;
        } catch(error) {
          console.log('error: ', error);
        }
      }

      async function getDailyStepGoalRequest(response) {
        try {
            const bearer = 'Bearer ' + response.access_token;
            const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/activities/goals/daily.json', {
            method: 'GET',
            headers: {
              'Authorization': bearer,
            },
          });

          const responseData = await tokenResponse.json();
          console.log('Daily Activity Goals request response data: ', responseData);
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

      async function getDailyWaterGoalRequest(response) {
        try {
          const bearer = 'Bearer ' + response.access_token;
          console.log('Bearer: ', bearer);
          const tokenResponse = await fetch('https://api.fitbit.com/1/user/-/foods/log/water/goal.json', {
            method: 'GET',
            headers: {
              'Authorization': bearer,
            },
          });
          console.log('Daily water goal response: ', tokenResponse);

          const responseData = await tokenResponse.json();
          console.log('Daily water goal request response data: ', responseData);
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
      makeFitbitLoginPostRequest(requestProperties)
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

          getDailyWaterRequest(responseData) 
          .then( dailyWaterData => {
            console.log('daily water: ', dailyWaterData.summary.water);
            setWater(dailyWaterData.summary.water);
          })

          getDailyActivitySummaryRequest(responseData)
          .then( dailySummaryData => {
            console.log('daily activity steps: ', dailySummaryData.summary.steps);
            setDailySteps(dailySummaryData.summary.steps);
          })
          .catch(error => console.log('error fetching daily summary data: ', error));

          getDailyStepGoalRequest(responseData)
          .then( dailyGoalData => {
            console.log('daily step goal: ', dailyGoalData.goals.steps);
            setDailyStepGoal(dailyGoalData.goals.steps);
          })
          .catch(error => console.log('Error fetching daily step goal: ', error));

          getDailyWaterGoalRequest(responseData)
          .then( dailyWaterGoalData => {
            console.log('daily water goal: ', dailyWaterGoalData.goal.goal);
            setDailyWaterGoal(dailyWaterGoalData.goal.goal);
          })
          .catch(error => console.log('Error fetching daily water goal: ', error));

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
    <ScrollView style={{backgroundColor: 'white', }}> 
      <View style={{ flex: 1, paddingBottom: 75}}>
      {name ? (
        <View>
          <View style={{margin: 20}}> 
            <Text style={Theme.pageTitle}>Good morning</Text>

            <View 
            style={{
                shadowRadius: 10, shadowOpacity: 0.2, shadowOffset: {height:3},
                backgroundColor: 'white', 
                padding: 20, borderRadius: 10, 
                marginVertical: 20,
                minWidth: '100%'
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 10 }}>Reminders / Alerts / Goals</Text>
            <Text style={{ fontSize: 16, paddingBottom: 5 }}>• Go to the gym</Text>
            <Text style={{ fontSize: 16, paddingBottom: 5 }}>• Make a new appointment</Text>
            <Text style={{ fontSize: 16, paddingBottom: 5 }}>• Run a mile</Text>
            <Text style={{ fontSize: 16, paddingBottom: 5 }}>• This is a super long goal to see how this looks on more than one line</Text>
          </View>

          <View style={{ fontSize: 16, paddingVertical: 10, alignItems: 'center', }}>
            <View style={{ borderColor: '#e0e0e0', borderWidth: 4, borderRadius: 250, height: 250, width: 250}}>
            </View>
          </View>

          </View>
          <View style={{
            flexDirection: 'row', justifyContent: 'center', 
            paddingVertical: 10, 
            }}> 

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
            <View 
              style={{
                  shadowRadius: 10, shadowOpacity: 0.2, shadowOffset: {height:3},
                  backgroundColor: 'white', 
                  padding: 20, borderRadius: 10, 
                  marginVertical: 20,
                  minWidth: '100%', }}>
              <Text style={{ fontSize: 20, paddingBottom: 5 }}>Heart Rate</Text>
              <Text style={{ fontSize: 16, paddingBottom: 5, color: 'gray'}}>in BPM</Text>

              {/* Placeholder space */}
              <View style={{ borderColor: '#e0e0e0', borderWidth: 4,height: 300, minWidth: '100%', marginVertical: 15 }}></View>
            </View>

            <View 
              style={{
                  shadowRadius: 5, shadowOpacity: 0.2, shadowOffset: {height:3},
                  backgroundColor: 'white', 
                  padding: 20, borderRadius: 10, 
                  marginVertical: 20,
                  minWidth: '100%', }}>
              <Text style={{ fontSize: 20, paddingBottom: 5 }}>Sleep Schedule</Text>
              <Text style={{ fontSize: 16, paddingBottom: 5, color: 'gray' }}>1/29/24 - 2/10/24</Text>

              {/* Placeholder space */}
              <View style={{ borderColor: '#e0e0e0', borderWidth: 4,height: 300, minWidth: '100%', marginVertical: 15  }}></View>
            </View>
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