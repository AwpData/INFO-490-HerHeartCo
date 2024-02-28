// import * as AuthSession from 'expo-auth-session';
// import * as WebBrowser from 'expo-web-browser';
// import pkceChallenge from 'react-native-pkce-challenge';
// import Base64 from 'react-native-base64';
// import qs from 'qs';

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { login } from "./actions";

// export const loginWithFitbit = createAsyncThunk(
//     LOGIN_REQUEST, 
//     async(properties, { rejectWithValue }) => {
//         const challenge = pkceChallenge();
//         const codeChallenge = challenge.codeChallenge; 
//         // ex: jK8r4S0lO-YyuhDdJs7m-HJsogX1emthpexyAT--qyA
//         const codeVerifier = challenge.codeVerifier; 
//         // ex: M4VgxTlKxiEsEORQhQ289HgdrP3pYqe5WoCvEVOOxaHrga1AH5cartlBVWHkI6Prwg9AUGjHQzhNR4yOuPhkMUQnF7rTJPJlVxvAyB8ZYmR88wEd-tcn_ZXPZX2Uf8Gw

//         const queryParams = qs.stringify({
//             client_id: fitbitConfig.clientId,
//             response_type: 'code',
//             code_challenge: codeChallenge,
//             code_challenge_method: 'S256',
//             grant_type: 'authorization_code',
//         }) + '&scope=' + fitbitConfig.scopes.join('+');
//         // ex: client_id=23RTKC&response_type=code&code_challenge=ZPTnKa4D8CXuLosJEuvdXBh4d0_Y-S1NnJ_OV_CKmAI&code_challenge_method=S256&grant_type=authorization_code&scope=profile+activity+heartrate+nutrition

//         const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
//         // ex: exp://10.0.0.79:8081

//         const authUrl = `https://www.fitbit.com/oauth2/authorize?${queryParams}`;

//         try {
//             const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
//             const url = result.url;
      
//             const authorizationCode = url.substring(url.indexOf('=') + 1, url.indexOf('#'));
//             // ex: 326e6fc061158d3b8af7d682c62be99e06b443fd
      
//             const properties = qs.stringify({
//               client_id: fitbitConfig.clientId,
//               code: authorizationCode,
//               code_verifier: codeVerifier,
//               grant_type: 'authorization_code',
//               expires_in: 31536000,
//             }) + '&scope=' + fitbitConfig.scopes.join('+');
//             // ex: client_id=23RTKC&response_type=code&code_challenge=ZPTnKa4D8CXuLosJEuvdXBh4d0_Y-S1NnJ_OV_CKmAI&code_challenge_method=S256&grant_type=authorization_code&scope=profile+activity+heartrate+nutrition
      
//             const basicToken = 'Basic ' + Base64.encode(fitbitConfig.clientId + ':' + fitbitConfig.clientSecret);
            
//             const tokenResponse = await fetch('https://api.fitbit.com/oauth2/token', {
//               method: 'POST',
//               headers: {
//                 'Authorization': basicToken,
//                 'Content-Type': 'application/x-www-form-urlencoded',
//               },
//               body: properties,
//             });

//             if (!tokenResponse.ok) {
//                 throw new Error('Login failed');
//             }
  
//             const tokenJSON = await tokenResponse.json();
//             return tokenJSON;
//           } catch(error) {
//             return rejectWithValue(error);
//           }
//     }
// )

// const initialState = {
//     accessToken: null, 
//     isLoading: false,
//     error: null,
//     steps: null,
// };

// const fitbitReducer = (state = initialState, action) => {
//     switch(action.type) {
//         case LOGIN_REQUEST: 
//             return { 
//                 ...state, 
//                 isLoading: true, 
//                 error: null
//             }
//         case LOGIN_SUCCESS:
//             return {
//                 ...state, 
//                 isLoading: false, 
//                 accessToken: action.payload.accessToken
//             }
//         default: 
//             return state; 
//     }
// }

// export default fitbitReducer; 