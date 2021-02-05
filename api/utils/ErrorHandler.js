module.exports.handle = (res, e) => {
  const errorMessage = e.message ? e.message : 'Generic error';
  const errorCode = e.code ? e.code : 500;
  res.status(errorCode).json({ error: errorMessage });
};
