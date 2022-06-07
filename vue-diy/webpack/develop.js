const path = require("path");
const resolve = path.resolve;

module.exports = {
  // mode: "development",
  entry: resolve(__dirname, "../src/index"),
  output: {
    clean: true,
  },
};
