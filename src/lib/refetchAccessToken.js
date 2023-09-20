import axios from 'axios';

export default async function refetchAccessToken(tokenObject) {
   try {
      const tokenResponse = await axios.post(
         process.env.NEXT_PUBLIC_AUTH_BASE_URL + 'connect/token',
         {
            grant_type: 'refresh_token',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            scope: process.env.SCOPE,
            refresh_token: tokenObject?.refresh_token,
         },
         {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               Authorization: '',
            },
         }
      );
      return {
         ...tokenObject,
         access_token: tokenResponse.data?.access_token,
         expires_in: Math.round(Date.now() / 1000) + tokenResponse.data?.expires_in,
         refresh_token: tokenResponse.data?.refresh_token,
         ref_expires_in: Math.round(Date.now() / 1000) + tokenResponse.data.ref_expires_in,
         roles: tokenResponse.data?.roles,
         FullName: tokenResponse.data?.FullName,
      };
   } catch (error) {
      console.log(error);
      return {
         ...tokenObject,
         error: 'RefreshAccessTokenError',
      };
   }
}
