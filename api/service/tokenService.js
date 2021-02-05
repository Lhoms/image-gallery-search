const axios = require('axios');

const auth_url = 'http://interview.agileengine.com/auth';
const API_KEY = '23567b218376f79d9415';
let token = '';

module.exports.get = async () => {
  if(!token) {
    await this.renew();
  } else {
    return token;
  }
  return token;
};

module.exports.renew = async () => {
  const { data } = await axios.post(auth_url, { "apiKey": API_KEY });
  if (data.auth) {
    token = data.token;
  }
};
