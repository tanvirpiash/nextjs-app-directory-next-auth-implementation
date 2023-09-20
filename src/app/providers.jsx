'use client';

import RefreshTokenHandler from '@/lib/refreshTokenHandler';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

export const NextAuthProvider = ({ children }) => {
   const [interval, setInterval] = useState(0);
   return (
      <SessionProvider refetchInterval={interval} refetchOnWindowFocus={false}>
         {children}
         <RefreshTokenHandler setInterval={setInterval} />
      </SessionProvider>
   );
};
