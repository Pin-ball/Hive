/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '1': 1
      },
      colors: {
        'c-gray-0': '#fff',
        'c-gray-50': '#e9ebf0',
        'c-gray-100': '#cbced4',
        'c-gray-200': '#a4a9b3',
        'c-gray-300': '#858b94',
        'c-gray-400': '#6a6f76',
        'c-gray-500': '#5c6066',
        'c-gray-600': '#3c3f43',
        'c-gray-700': '#292d33',
        'c-gray-800': '#1a1d24',
        'c-gray-900': '#0f131a',

        'c-blue-100': '#ccf3ff',
        'c-blue-200': '#a6e9ff',
        'c-blue-300': '#80ddff',
        'c-blue-400': '#59d0ff',
        'c-blue-500': '#34c3ff',
        'c-blue-600': '#25b3f5',
        'c-blue-700': '#169de0',
        'c-blue-800': '#0a81c2',
        'c-blue-900': '#006199',

        'c-red-50': '#ffeded',
        'c-red-100': '#fccaca',
        'c-red-200': '#faa9a7',
        'c-red-300': '#f58884',
        'c-red-400': '#f26a63',
        'c-red-500': '#f04f43',
        'c-red-600': '#e63f30',
        'c-red-700': '#d12f1d',
        'c-red-800': '#b3200c',
        'c-red-900': '#8a1200',
      },
    },
  },
  plugins: [],
}