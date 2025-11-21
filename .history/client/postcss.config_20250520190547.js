
//Users/salehalkarabubi/works/project/AutoMarket25/client/postcss.config.js
// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };


// export default {
//   plugins: {
//     "postcss-import": {},
//     tailwindcss: {},
//     autoprefixer: {},
//     "@tailwindcss/postcss": {},
//   },
// };


//Users/salehalkarabubi/works/project/AutoMarket25/client/postcss.config.js


import tailwindcssPostcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: {
    '@tailwindcss/postcss': tailwindcssPostcss,
    autoprefixer,
  },
};
