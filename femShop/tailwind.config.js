/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", ],
  theme: {
    colors: {
      'lila-primary':'#540D6E',
      'lila-secundary':'#ca9bdd',
      'amarillo' : '#FFC401',
      'rosa':'#EE4266',
      'dark-grey':'#4A4A4A',
      'grey':'#B6B6B6',
   

    },
    backgroundImage: theme => ({
      'custom-gradient': 'linear-gradient(to bottom, #540D6E 0%, #CA9BDD 100%)',
    }),
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

