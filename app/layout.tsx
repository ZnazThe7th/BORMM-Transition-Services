import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif', // Replaces --font-heading with serif font
});

export const metadata: Metadata = {
  title: 'BORMM Transition Services',
  description: 'Helping People Move From Disruption to Direction',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-[#F7F5F2] text-[#2D2D2D]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
