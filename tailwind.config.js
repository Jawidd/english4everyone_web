/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Derived from the large logo colour extraction
        brand: {
          50:  '#fff4f2',
          100: '#ffe4de',
          200: '#ffc5bb',
          300: '#ff9a8a',
          400: '#f96b55',
          500: '#ec2904',  // Primary logo red-orange
          600: '#d42200',
          700: '#b01c00',
          800: '#8f1a04',
          900: '#2c2e4b',  // Deep navy from logo
          950: '#1a1b2e',
        },
        navy: {
          50:  '#f0f1f5',
          100: '#d9dbe8',
          500: '#677994',  // Muted slate from logo
          700: '#2c2e4b',
          900: '#1a1b2e',
        },
        coral: {
          100: '#fde8e4',
          400: '#e55d44',  // Warm coral from logo
          500: '#ec2904',
        },
      },
    },
  },
  plugins: [],
}
