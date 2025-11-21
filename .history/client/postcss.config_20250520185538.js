
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

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
