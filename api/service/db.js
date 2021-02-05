let db = {};

module.exports.save = (data) => {
  db.data = data;
};

module.exports.clear = () => {
  db.data = {};
};

module.exports.get = () => {
  return db;
};
