import { Cormorant_Garamond } from 'next/font/google';

// TODO: Replace with local Calmius Extra Light when font files provided
// Using Cormorant Garamond weight 300 as a visually similar serif stand-in
// Calmius Extra Light is not available on Google Fonts — requires next/font/local
const calmius = Cormorant_Garamond({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--font-calmius',
  display: 'swap',
});

export { calmius };
