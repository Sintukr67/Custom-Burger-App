/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8F0',
          100: '#FFECD1',
          200: '#FFD4A3',
          300: '#FFB366',
          400: '#FF8B2D',
          500: '#FF6B35',
          600: '#E55A2B',
          700: '#CC4A21',
          800: '#B33A17',
          900: '#99330F',
        },
        secondary: {
          50: '#F7F3F0',
          100: '#E8DDD6',
          200: '#D4C4B8',
          300: '#B5967F',
          400: '#8B4513',
          500: '#7A3C11',
          600: '#6B340F',
          700: '#5C2C0D',
          800: '#4D240B',
          900: '#3E1C09',
        },
        accent: {
          50: '#F0FFF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#32CD32',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        gold: {
          50: '#FFFDF0',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEE58',
          500: '#FFD700',
          600: '#FFC107',
          700: '#FF8F00',
          800: '#FF6F00',
          900: '#E65100',
        }
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
};