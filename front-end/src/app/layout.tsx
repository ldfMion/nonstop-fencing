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
    title: 'Collegiate Fencing Results by Nonstop Fencing',
    description: 'Browse top NCAA Fencers, Teams, and Squads',
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
