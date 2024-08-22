/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'orange': '#FF6B35',
        'red': '#BF211E',
        'peach': '#F7C59F',
        'cream': '#EFEFD0',
        'blue': '#004E89',
        'light-blue': '#075FA2',
        'dark-blue': '#041725',
        'picton-blue': '#38B6FF',
        'opac-picton-blue': '#38B6FF96',
        'yellow':'#EAC435',
        'green':'#78EE74'
      },
      fontFamily:{
        'poppins': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}