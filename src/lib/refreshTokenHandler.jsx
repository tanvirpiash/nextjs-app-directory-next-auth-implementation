'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const RefreshTokenHandler = ({ setInterval }) => {
   const { data: session } = useSession();
   useEffect(() => {
      if (!!session) {
         let timeRemaining = session.expires_in - Math.floor(Date.now() / 1000) - 15;
         setInterval(timeRemaining > 0 ? timeRemaining : 0);
      }
   }, [session, setInterval]);

   return null;
};

export default RefreshTokenHandler;
