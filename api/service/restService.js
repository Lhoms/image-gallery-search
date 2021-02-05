const axios = require('axios');
const token = require('./tokenService');

module.exports.get = async (url) => {
  return axios.get(url,
      {
        headers: {
          'Authorization': `Bearer ${await token.get()}`
        }
      })
};
