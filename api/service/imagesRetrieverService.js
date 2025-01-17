require('dotenv').config();
const rest = require('./restService');
const imageRepository = require('../repository/imageRepository');

const images_url = 'http://interview.agileengine.com/images';

module.exports.load = async () => {
  try {
    const allPicturesCropped = await retrieveAllCropped();
    const ids = allPicturesCropped.map(x => x.id);
    const imagesArray = await retrieveImagesFullData(ids);
    await imageRepository.save(imagesArray);
    console.log('Cache Loaded!');
  } catch (e) {
    console.error(e);
  }
};

module.exports.setupLoadAndRefresh = () => {
  const time = process.env.RELOAD_TIME_SEC;

  setTimeout(this.load, 0);
  setInterval(this.load, time * 1000);
  console.log(`Cache refresh configured each: ${time} seconds`);
};

async function retrieveAllCropped () {
  let allPicturesCropped = [];

  // First page.
  const { pictures, pageCount } = await retrieveCroppedData(1);
  allPicturesCropped = allPicturesCropped.concat(pictures);

  // Next pages now knowing how many they are.
  const requests = [];
  for(let i = 2; i <= pageCount; i++) {
    requests.push(retrieveCroppedPictures(i));
  }

  // Waiting promises, flat and add.
  const resolvedRequests = await Promise.all(requests);
  allPicturesCropped = allPicturesCropped.concat(resolvedRequests.flat());

  return allPicturesCropped;
}

async function retrieveCroppedData (page) {
  const { data } = await rest.retryGet(`${images_url}?page=${page}`);
  return data;
}

async function retrieveCroppedPictures (page) {
  const { data } = await rest.retryGet(`${images_url}?page=${page}`);
  return data.pictures;
}

async function retrieveImagesFullData (ids) {
  const requests = ids.map(retrieveImageFullData);
  return Promise.all(requests);
}

async function retrieveImageFullData (id) {
  const { data } = await rest.retryGet(`${images_url}/${id}`);
  return data;
}
