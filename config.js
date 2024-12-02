const path = require("path");

const config = {
  storage: {
    type: "disk", // 'disk' or 'cloud' (add cloud storage options later)
    path: path.join(__dirname, "uploads"), // Path to store files on disk
    maxSize: 100 * 1024 * 1024, // 10MB storage limit
  },
  // Add more configuration options as needed
};

module.exports = config;
  