/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", ],
  theme: {
    
    backgroundImage: theme => ({
      'custom-gradient': 'linear-gradient(to bottom, #540D6E 0%, #CA9BDD 100%)',
    }),
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
      'lila-primary':'#540D6E',
      'lila-secondary':'#ca9bdd',
      'amarillo' : '#FFC401',
      'rosa':'#EE4266',
      'dark-grey':'#232323',
      'grey':'#B6B6B6',
      'light-grey':'#F3F3F3',
      'white':'#ffffff',
      'black':'#000000',
      'red':'#ff0000',
      'red-dark':'#B90000',
      'green':'#30BD57',
      'cyan':'#E2F4FF',

    },
      
    },
  },
  plugins: [],
}

