import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JEE Study Tracker',
  description: 'A comprehensive study tracking application for JEE 2027 preparation',
  keywords: ['JEE', 'Study', 'Tracker', 'Productivity', 'Education'],
  authors: [{ name: 'JEE Tracker' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
