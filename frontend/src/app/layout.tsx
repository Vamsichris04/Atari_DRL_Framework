import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { DataProvider } from '@/providers/data';
import { Navigation } from '@/components/navigation';

export const metadata: Metadata = {
  title: 'Atari DRL',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <div className="w-full mb-14 p-2">{children}</div>
          <Navigation />
        </DataProvider>
      </body>
    </html>
  );
}
