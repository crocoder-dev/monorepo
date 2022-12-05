import { geolocation } from '@vercel/edge';

export const config = {
  // Only run the middleware on the home route
  matcher: ['/', '/blog', '/blog/:any'],
};

// eslint-disable-next-line consistent-return
export default function middleware(request) {
  const url = new URL(request.url);

  const { country } = geolocation(request);

  if (country === 'RU' || country === 'BY') {
    url.pathname = '/blocked';
    return Response.redirect(url);
  }
}
