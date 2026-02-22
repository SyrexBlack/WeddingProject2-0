import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        alexandrite: {
          DEFAULT: '#598c74',
          light: 'rgba(89, 140, 116, 0.15)',
          medium: 'rgba(89, 140, 116, 0.3)',
        },
        chocolate: {
          DEFAULT: '#3C1518',
          light: 'rgba(60, 21, 24, 0.6)',
        },
        cream: {
          DEFAULT: '#FFF8F0',
          dark: '#FFF5E9',
        },
        sand: '#F5E6D3',
        error: '#C4463A',
      },
      fontFamily: {
        calmius: ['var(--font-calmius)', 'serif'],
      },
      borderRadius: {
        card: '10px',
      },
      maxWidth: {
        content: '768px',
      },
    },
  },
  plugins: [],
};

export default config;
