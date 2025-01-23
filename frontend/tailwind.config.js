/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-bg-img': "url('./src/assets/images/auth-img.png')",
        'profile-bg--img': "url('./src/assets/images/profile-img.png')"
      }
    },
  },
  plugins: [daisyui,],

  daisyui: {
    themes: [
      'valentine',
    ],

    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
}

