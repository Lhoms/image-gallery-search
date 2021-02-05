const imageRepository = require('../repository/imageRepository');

module.exports.search = async (word) => {
    const data = await imageRepository.get();
    return data.filter(x => filterCriteria(word, x));
};

// Photo can be matched by: author, camera and tags
const filterCriteria = (word, {author, camera, tags}) => matchAuthor(author, word) || matchCamera(camera, word) || matchTags(tags, word);

const matchAuthor = (author, word) => author && author.includes(word);
const matchCamera = (camera, word) => camera && camera.includes(word);
const matchTags = (tags, word) => tags && tags.includes(word);
