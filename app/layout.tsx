import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BORMM | Back Out Roommate',
  description: 'Find Housing. Find Help. Find Hope.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
