import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(request, _next) {
   const token = await getToken({ req: request });
   if (!token || Math.floor(Date.now() / 1000) > token.ref_expires_in) {
      return NextResponse.redirect(
         new URL('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F', request.url)
      );
   }
}

export const config = {
   matcher: ['/'],
};
