import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/styles/mantineTheme';

import './globals.css';
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Epub Size Reducer',
  description: 'Reduce the size of your epubs and send them to your Kindle',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} p-4 text-white h-screen bg-slate-800`}
      >
        <Toaster position="top-right" />
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
