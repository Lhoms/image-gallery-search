const rest = require('./restService');
const db = require('./db');

const images_url = 'http://interview.agileengine.com/images';

module.exports.retrieve = async () => {
  try {
    const allPicturesCropped = await retrieveAllCropped();
    const ids = allPicturesCropped.map(x => x.id);
    const imagesArray = await retrieveImagesFullData(ids);
    db.save(imagesArray);
  } catch (e) {
    console.error(e);
  }
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
  const { data } = await rest.get(`${images_url}?page=${page}`);
  return data;
}

async function retrieveCroppedPictures (page) {
  const { data } = await rest.get(`${images_url}?page=${page}`);
  return data.pictures;
}

async function retrieveImagesFullData (ids) {
  const requests = ids.map(retrieveImageFullData);
  return Promise.all(requests);
}

async function retrieveImageFullData (id) {
  const { data } = await rest.get(`${images_url}/${id}`);
  return data;
}
