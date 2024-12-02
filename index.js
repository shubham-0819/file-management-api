const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fileStorage = require("./utils/file-storage");

const app = express();
const port = 3000;

// Multer setup
const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({ storage });

// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  next();
});

// File upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filename = `${uuidv4()}-${req.file.originalname}`; // Generate unique filename
    try {
      const savedFilename = await fileStorage.saveFile(
        req.file.buffer,
        filename,
      );
      res.json({
        message: "File uploaded successfully",
        filename: savedFilename,
      });
    } catch (error) {
      if (error.message === "File size exceeds the storage limit") {
        return res
          .status(413)
          .json({ error: "File size exceeds the storage limit" });
      }
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

// Get list of uploaded files route
app.get("/files", async (req, res) => {
  try {
    // You'll need to implement logic to list files from the storage (disk or cloud)
    // For now, let's assume you have a function to get all files from the storage
    const files = await fileStorage.getAllFiles(); // Replace with your actual logic
    res.json({ files });
  } catch (error) {
    console.error("Error getting files:", error);
    res.status(500).json({ error: "Failed to get files" });
  }
});

// Get a file route
app.get("/files/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    const fileData = await fileStorage.getFile(filename);
    // res.setHeader('Content-Type', fileData.mimetype);
    res.send(fileData);
  } catch (error) {
    console.error("Error getting file:", error);
    res.status(500).json({ error: "Failed to get file" });
  }
});

// Delete a file route
app.delete("/files/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    await fileStorage.deleteFile(filename);
    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
