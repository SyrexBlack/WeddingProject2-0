import type { Metadata } from 'next';
import { calmius } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://wedding-project2-0.vercel.app'),
  title: 'Анна & Михаил — Приглашение на свадьбу',
  description: '15 августа 2026 · Усадьба «Архангельское»',
  openGraph: {
    title: 'Анна & Михаил — Приглашение на свадьбу',
    description: '15 августа 2026 · Усадьба «Архангельское»',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Анна & Михаил — Приглашение на свадьбу',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Анна & Михаил — Приглашение на свадьбу',
    description: '15 августа 2026 · Усадьба «Архангельское»',
    images: ['/api/og'],
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
