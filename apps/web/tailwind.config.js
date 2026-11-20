/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          900: '#312e81',
        },
      },
      fontSize: {
        '2xs': '0.75rem', // 12
        xs: '0.875rem',   // 14
        sm: '1rem',       // 16
        base: '1.125rem', // 18
        lg: '1.5rem',     // 24
        xl: '2rem',       // 32
      },
    },
  },
  plugins: [],
};
