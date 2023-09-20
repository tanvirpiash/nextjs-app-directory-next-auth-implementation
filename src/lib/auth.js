import CredentialsProvider from 'next-auth/providers/credentials';
import accessToken from './accessToken';
import refetchAccessToken from './refetchAccessToken';
export const authOptions = {
   session: {
      strategy: 'jwt',
   },
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            username: {
               label: 'username',
               type: 'text',
            },
            password: { label: 'Password', type: 'password' },
         },
         async authorize(credentials) {
            return await accessToken(credentials);
         },
      }),
   ],
   callbacks: {
      jwt: async ({ token, user }) => {
         if (user) {
            token.access_token = user?.access_token;
            token.expires_in = Math.floor(Date.now() / 1000) + user?.expires_in;
            token.roles = user?.roles;
            token.refresh_token = user?.refresh_token;
            token.ref_expires_in = Math.floor(Date.now() / 1000) + user?.ref_expires_in;
            token.FullName = user?.FullName;
         }
         let shouldRefreshTime = token?.expires_in - Math.floor(Date.now() / 1000) - 30;
         if (shouldRefreshTime > 0) {
            return Promise.resolve(token);
         }
         return await refetchAccessToken(token);
      },
      redirect: async ({ url, baseUrl }) => {
         return `/`;
      },
      session: async ({ session, token }) => {
         session.access_token = token?.access_token;
         session.expires_in = token?.expires_in;
         session.roles = token?.roles;
         session.refresh_token = token?.refresh_token;
         session.ref_expires_in = token?.ref_expires_in;
         session.FullName = token?.FullName;
         return Promise.resolve(session);
      },
   },
};
