import axios from 'axios';

export default async function accessToken(credentials) {
   try {
      const user = await axios.post(
         process.env.NEXT_PUBLIC_AUTH_BASE_URL + 'connect/token',
         {
            username: credentials?.username,
            password: credentials?.password,
            grant_type: process.env.GRANT_TYPE,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            scope: process.env.SCOPE,
         },
         {
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               Authorization: '',
            },
         }
      );
      if (user.data.access_token) {
         return user.data;
      }
      return null;
   } catch (err) {
      console.log(err);
      return null;
   }
}
