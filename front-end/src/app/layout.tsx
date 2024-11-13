import '~/styles/globals.css';
import {Inter as FontSans} from 'next/font/google';
import {type Metadata} from 'next';
import Navbar from '~/components/navbar';
import {cn} from '~/lib/utils';
import Footer from '~/components/footer';
import {Analytics} from '@vercel/analytics/react';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: 'Collegiate Fencing Results by Nonstop Fencing - NCAA Fencing',
    description: 'See meet results and browse top fencers, teams, and squads - NCAA / Collegiate Fencing',
    metadataBase: new URL('https://collegefencing.net'),
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en" className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
            <body className="flex h-screen flex-col justify-between">
                <div>
                    <Navbar />
                    {children}
                    <Analytics />
                </div>
                <Footer />
            </body>
        </html>
    );
}
