import '../styles/globals.css';

import { ClerkProvider } from "@clerk/nextjs/app-beta";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}
