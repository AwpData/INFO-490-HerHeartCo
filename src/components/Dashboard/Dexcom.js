// Dexcom.js
// 
// ** API calls not working - console logs error {"errors": [{"code": "invalid_client", "title": "max user count exceeded"}], "message": "max user count exceeded"} after logging in



// import React, { useState, useEffect } from 'react';
// import { Platform, Button, Text, View, ScrollView, Modal, Image, TouchableOpacity } from 'react-native';
// import * as AuthSession from 'expo-auth-session';
// import * as WebBrowser from 'expo-web-browser';
// import qs from 'qs';
// import moment from 'moment';



// export default Dexcom = () => {
//     const [name, setName] = useState('');
//     const [dataRange, setDataRange] = useState();
//     const [cgm, setCGM] = useState();


//     const config = {
//         clientId: '9iV4g71nAd9Jilrz2uZWc1gKyWMS8zJt',
//         redirectUrl: 'exp://10.0.0.79:8081', 
//         clientSecret: '4HKFPcFe2Xi2kzrE', 
//         clientAuthMethod: 'post', 
//         responseType: 'code', 
//         useNonce: false,
//         usePKCE: false, 
//         skipCodeExchange: true, 
//         additionalParameters: {
//             grant_type: 'authorization_code',
//         },
//         scopes: ['offline_access'], 
//         serviceConfiguration: {
//             authorizationEndpoint: 'https://api.dexcom.com/v2/oauth2/login', 
//             tokenEndpoint: 'https://api.dexcom.com/v2/oauth2/token'
//         },
//     };

//     const handleDexcomLogin = async () => {
//         const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

//         const queryParams = qs.stringify({
//             client_id: config.clientId, 
//             client_secret: config.clientSecret, 
//             grant_type: 'authorization_code',
//             redirect_uri: redirectUri,
//             response_type: 'code', 
//             scope: config.scopes[0]
//         }); 

//         const authUrl = `https://api.dexcom.com/v2/oauth2/login?${queryParams}`;

//         try {
//             const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
//             const url = result.url;
//             console.log('result: ', result); 
//             console.log('url: ', url);

//             const authorizationCode = url.split('=')[1]; 
//             console.log('authorization code: ', authorizationCode);

//             const requestProperties = {
//                 grant_type: 'authorization_code',
//                 code: authorizationCode,
//                 client_id: config.clientId, 
//                 client_secret: config.clientSecret, 
//                 redirect_uri: config.redirectUrl,
//                 // response_type: 'code', 
//             // scope: config.scopes[0]
//                 // expires_in: 31536000, 
//             }; 

//             async function makeDexcomLoginPostRequest(properties) {
//                 try {
//                     console.log('properties: ', properties);
//                     const tokenResponse = await fetch(`https://api.dexcom.com/v2/oauth2/token`, {
//                         method: 'POST', 
//                         headers: {
//                             'Content-Type': 'application/x-www-form-urlencoded'
//                         },
//                         body: new URLSearchParams(properties).toString(),
//                     })
//                     const tokenJSON = await tokenResponse.json();
//                     setName(tokenJSON);
//                     console.log(tokenJSON);
//                     return tokenJSON;
//                 } catch(error) {
//                     console.log('Error in POST request for logging in with Dexcom: ', error);
//                 }
//             }

//             async function getDataRange(tokenEndpoint) {
//                 try {
//                     const accessToken = 'Bearer ' + tokenEndpoint.access_token; 
//                     const tokenResponse = await fetch('https://api.dexcom.com/v2/users/self/dataRange', {
//                         method: 'GET', 
//                         headers: {
//                             'Authorization': accessToken
//                         }
//                     });

//                     const tokenJSON = await tokenResponse.json(); 
//                     console.log('Data range json: ', tokenJSON);
//                     return tokenJSON;
//                 } catch (error) {
//                     console.log('Error in GET request for data range: ', error);
//                 }
//             }

//             async function getCGMData(tokenEndpoint) {
//                 const startDate = moment().subtract(6, 'hours').format('YYYY-MM-DDTHH:mm:ss');
//                 const endDate = moment().subtract(3, 'hours').format('YYYY-MM-DDTHH:mm:ss');
    
//                 try {
//                     const accessToken = 'Bearer ' + tokenEndpoint.access_token; 
//                     const tokenResponse = await fetch(`https://api.dexcom.com/v2/users/self/egvs?startDate=${startDate}&endDate=${endDate}`, {
//                         method: 'GET', 
//                         headers: {
//                             'Authorization': accessToken,
//                         }
//                     });
    
//                     const tokenJSON = await tokenResponse.json(); 

//                     console.log('CGM json: ', tokenJSON);
//                     return tokenJSON;
//                 } catch (error) {
//                     console.log('Error in GET request for Dexcom glucose: ', error);
//                 }
//             }
    
//             makeDexcomLoginPostRequest(requestProperties)
//                 .then(tokenEndpoint => {
//                     console.log('request properties: ', requestProperties);
//                     getDataRange(tokenEndpoint)
//                     .then(response => {
//                         setDataRange(response.data);
//                     })
//                     .catch(error => console.log('Error fetching data range: ', error)); 
    
//                     getCGMData(tokenEndpoint)
//                     .then(response => {
//                         setCGM(response.data);
//                     })
//             })
//         }
//         catch (error) {
//             console.log('Error authenticating dexcom login: ', error);
//         }
//     } 

//     return(
//         <View>
//             { name ? (
//                 <View> 
//                     <Text>datarange: {dataRange}</Text>
//                     <Text>cgm: {cgm}</Text>

//                     <TouchableOpacity onPress={handleDexcomLogin}>
//                         <Text style={{fontSize: 36, }}>Login</Text>
//                     </TouchableOpacity>
//                 </View>
//             ) : (
//                 <TouchableOpacity onPress={handleDexcomLogin}>
//                     <Text style={{fontSize: 36, }}>Login</Text>
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// }