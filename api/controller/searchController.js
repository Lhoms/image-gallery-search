const ErrorHandler = require('../utils/ErrorHandler');
const imageRepository = require('../repository/imageRepository');

module.exports.search = async (req, res) => {
  try {
    const {searchTerm} = req.params;
    const result = await imageRepository.search(searchTerm);
    await res.json(result);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};
