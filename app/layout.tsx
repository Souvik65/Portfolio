import type {Metadata} from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Souvik\'s Portfolio',
  description: 'Portfolio showcasing my Software Developer work.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark`}>
      <body className="relative bg-background text-on-background font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden" suppressHydrationWarning>
        <div className="fixed inset-0 z-[100] grain-overlay opacity-5 pointer-events-none mix-blend-overlay"></div>
        {children}
      </body>
    </html>
  );
}
