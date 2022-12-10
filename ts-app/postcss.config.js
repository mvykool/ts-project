module.exports = {
     plugins: {
     tailwindcss: {
        content: [
          "./index.html",
          "./src/**/*.{vue,js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {},
       },
       plugins: [
         require('@tailwindcss/forms'),
       ],
     },
     autoprefixer: {},
   },
 }