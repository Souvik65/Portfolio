import type {Metadata} from 'next';
import { Space_Grotesk, Inter, Anton } from 'next/font/google';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

export const metadata: Metadata = {
  title: 'Souvik Debnath — Software Developer & UI Engineer',
  description: 'Portfolio showcasing my Software Developer work.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${anton.variable} dark`}>
      <body className="relative bg-background text-on-background font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden" suppressHydrationWarning>
        <div className="fixed inset-0 z-[100] grain-overlay opacity-5 pointer-events-none mix-blend-overlay"></div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
