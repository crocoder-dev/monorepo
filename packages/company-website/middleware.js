import { geolocation } from '@vercel/edge';

const BLOCKED_COUNTRY = 'HR';

/* export const config = {
  // Only run the middleware on the home route
  matcher: '^(?!/blocked).*$',
}; */

export default function middleware(request) {
  const url = new URL(request.url);

  const { country } = geolocation(request);

  console.log(country, request.url);

  if (country === BLOCKED_COUNTRY) {
    url.pathname = '/blocked';
    return Response.redirect(url);
  }
}
