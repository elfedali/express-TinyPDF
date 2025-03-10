const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { compress } = require("compress-pdf");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const sanitize = require("sanitize-filename");

const PORT = process.env.PORT || 3000;
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Helper function to create directories
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uuidFolder = path.join(UPLOADS_DIR, uuidv4());
    createDirectory(uuidFolder);
    req.uploadDir = uuidFolder;
    cb(null, uuidFolder);
  },
  filename: (req, file, cb) => {
    cb(null, sanitize(file.originalname));
  },
});

const upload = multer({ storage });

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

// Serve the uploaded files via HTTP
server.use("/uploads", express.static(UPLOADS_DIR));

server.get("/", (req, res) => {
  res.json({
    appName: process.env.APP_NAME || "PDF Compressor",
    status: "Server is running",
  });
});

// Helper function to compress a PDF
const compressPdf = async (inputFile, outputFolder) => {
  try {
    createDirectory(outputFolder);
    const outputFilePath = path.join(
      outputFolder,
      `compressed-${path.basename(inputFile)}`
    );
    const buffer = await compress(inputFile);
    await fs.promises.writeFile(outputFilePath, buffer);
    return outputFilePath;
  } catch (error) {
    throw new Error("Error compressing PDF: " + error.message);
  }
};

server.post("/pdf", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const compressedFolder = path.join(req.uploadDir, "compressed");
    const compressedFile = await compressPdf(req.file.path, compressedFolder);

    // Generate the public HTTP URLs for both the original and compressed files
    const originalFileUrl = `/uploads/${path.relative(
      UPLOADS_DIR,
      req.file.path
    )}`;
    const compressedFileUrl = `/uploads/${path.relative(
      UPLOADS_DIR,
      compressedFile
    )}`;

    res.json({
      message: "Compressed PDF file successfully",
      folder: req.uploadDir,
      original: originalFileUrl,
      compressed: compressedFileUrl,
    });
  } catch (error) {
    console.error("Error processing PDF:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
