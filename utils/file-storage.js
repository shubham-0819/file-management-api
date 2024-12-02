const fs = require("fs");
const { promisify } = require("util");
const config = require("../config");
const path = require("path");

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const readFile = promisify(fs.readFile);

class FileStorage {
  constructor() {
    this.storageType = config.storage.type;
    this.storagePath = config.storage.path;
    this.maxSize = config.storage.maxSize;
  }

  // Disk storage methods (you'll need to implement cloud storage methods if you choose that option)
  async createStorageDir() {
    try {
      await mkdir(this.storagePath, { recursive: true });
      console.log("Storage directory created successfully.");
    } catch (error) {
      console.error("Error creating storage directory:", error);
      throw error;
    }
  }

  getAllFiles() {
    try {
      const files = fs.readdirSync(this.storagePath);
      return files;
    } catch (error) {
      console.error("Error getting files:", error);
      throw error;
    }
  }

  async saveFile(fileData, filename) {
    try {
      await this.createStorageDir(); // Ensure directory exists

      const filePath = path.join(this.storagePath, filename);

      // Check file size
      if (fileData.length > this.maxSize) {
        throw new Error("File size exceeds the storage limit.");
      }

      await writeFile(filePath, fileData);
      console.log(`File ${filename} saved successfully.`);
      return filename; // Return the saved filename
    } catch (error) {
      console.error("Error saving file:", error);
      throw error;
    }
  }

  async getFile(filename) {
    try {
      const filePath = path.join(this.storagePath, filename);
      const fileData = await readFile(filePath);
      return fileData;
    } catch (error) {
      console.error("Error getting file:", error);
      throw error;
    }
  }

  async deleteFile(filename) {
    try {
      const filePath = path.join(this.storagePath, filename);
      await unlink(filePath);
      console.log(`File ${filename} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }
}

module.exports = new FileStorage(); // Export a single instance
