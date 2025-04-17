import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        sm: '40rem', // 640px
        md: '48rem', // 768px
        lg: '64rem', // 1024px
        xl: '80rem', // 1280px
        '2xl': '96rem' // 1536px
      }
    }
  },
  plugins: []
}

export default config
