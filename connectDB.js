const mongoose = require("mongoose");

const connectTodb = async (uri) => {
  return mongoose.connect(uri);
};

module.exports = connectTodb;
