const axios = require('axios');
const token = require('./tokenService');

module.exports.retryGet = async (url, retries = 3) => {
  try {
    return await this.get(url);
  } catch (e) {
    await handleError(e);
    return await this.retryGet(url, retries - 1);
  }
};

module.exports.get = async (url) => {
  return await axios.get(url,
        {
          headers: {
            'Authorization': `Bearer ${await token.get()}`
          }
        });
};

const handleError = async (e) => {
  if (e?.response?.status === 401) {
    // status 401 may be expired token
    await token.renew();
  }
};
