const imageRetrieverService = require('../service/imagesRetrieverService');
const db = require('./db');

let available = false;

module.exports.load = async () => {
  available = false;
  const imagesArray = await imageRetrieverService.load();
  db.save(imagesArray);
  available = true;
  console.log('Cache Loaded!');
};

module.exports.search = async (word) => {
  if(available) {
    const { data } = await db.get();
    return data.filter(x => filterCriteria(word, x));
  } else {
    throw new Error('Images repository not available. Try again.')
  }
};

const filterCriteria = () => {
  // TODO
};


