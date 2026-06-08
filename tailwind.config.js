/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './**/*.html',
    './assets/js/**/*.js',
    './scripts/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#302858',
          navy: '#383060',
          light: '#E8E8E8',
          teal: '#D85860',
          tealHover: '#B84A52',
          tealLight: '#F5DDE0',
          blue: '#506878'
        },
        saude: { light: '#F5DDE0', dark: '#D85860' },
        vida: { light: '#E8E8E8', dark: '#888888' },
        qualidade: { light: '#D8D8D8', dark: '#5A5A5A' },
        neutral: { light: '#E8E8E8', dark: '#302858' },
        sec: {
          yellow: '#FBBF24',
          orange: '#F97316',
          red: '#D85860',
          green: '#10B981',
          blue: '#506878',
          purple: '#383060'
        },
        palette: {
          50: '#FFFFFF',
          100: '#F2F2F2',
          200: '#E8E8E8',
          300: '#D8D8D8',
          400: '#888888',
          500: '#5A5A5A'
        }
      },
      backgroundImage: {
        'gradient-saude': 'linear-gradient(135deg, #F5DDE0 0%, #D85860 100%)',
        'gradient-vida': 'linear-gradient(135deg, #E8E8E8 0%, #888888 100%)',
        'gradient-qualidade': 'linear-gradient(135deg, #D8D8D8 0%, #5A5A5A 100%)',
        'gradient-neutral': 'linear-gradient(135deg, #E8E8E8 0%, #302858 100%)'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      }
    }
  },
  plugins: []
};
