import type { Metadata } from 'next';
import { calmius } from '@/lib/fonts';
import './globals.css';

const ogImageUrl = '/api/og?v=20260302';

export const metadata: Metadata = {
  metadataBase: new URL('https://елкичус.рф'),
  title: 'Григорий & Полина — Приглашение на свадьбу',
  description: '16 мая 2026 · База отдыха «Ёлки»',
  openGraph: {
    title: 'Григорий & Полина — Приглашение на свадьбу',
    description: '16 мая 2026 · База отдыха «Ёлки»',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Григорий и Полина — Приглашение на свадьбу',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Григорий & Полина — Приглашение на свадьбу',
    description: '16 мая 2026 · База отдыха «Ёлки»',
    images: [ogImageUrl],
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
