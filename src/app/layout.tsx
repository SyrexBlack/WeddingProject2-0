import type { Metadata } from 'next';
import { calmius } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Анна & Михаил',
  description: 'Анна & Михаил приглашают вас разделить с ними этот особенный день',
  openGraph: {
    title: 'Анна & Михаил',
    description: 'Анна & Михаил приглашают вас разделить с ними этот особенный день',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={calmius.variable}>
      <body className="font-calmius">
        {children}
      </body>
    </html>
  );
}
