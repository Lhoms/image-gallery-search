const ErrorHandler = require('../utils/ErrorHandler');
const searchService = require('../service/searchService');

module.exports.search = async (req, res) => {
  try {
    const {searchTerm} = req.params;
    const result = await searchService.search(searchTerm);
    await res.json(result);
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
};
