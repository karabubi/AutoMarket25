//Users/salehalkarabubi/works/project/AutoMarket25/server/src/utils/token.js

// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// module.exports = generateToken;


//-------update 


//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/server/src/utils/token.js

const jwt = require('jsonwebtoken');

const generateToken = (userOrId) => {
  if (typeof userOrId === 'object' && userOrId !== null) {
    // New usage: full user object
    return jwt.sign(
      {
        id: userOrId.id,
        email: userOrId.email,
        is_admin: userOrId.is_admin || false,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  } else {
    // Legacy usage: just the user ID
    return jwt.sign({ id: userOrId }, process.env.JWT_SECRET, { expiresIn: '30d' });
  }
};

module.exports = generateToken;
