const imageRetrieverService = require('../service/imagesRetrieverService');
const db = require('./db');

let available = false;

module.exports.save = async (imagesArray) => {
  available = false;
  db.save(imagesArray);
  available = true;
};

module.exports.get = async () => {
  if (available) {
    const {data} = await db.get();
    return data;
  } else {
    throw new Error('Images repository not available. Try again.')
  }
};

