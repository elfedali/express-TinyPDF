# 📑 Tiny PDF Compressor API

A simple **PDF compression API** built with **Node.js, Express, and Multer**.  
This API allows users to **upload** a PDF file, compress it, and store the original & compressed files in an organized folder structure.

- It uses `compress-pdf` for high-efficiency PDF compression and `multer` for file uploads.
- It is based on `ghostscript` and it is a very efficient way to compress pdf files.

---

## 🚀 Features

✅ Upload PDF files via `POST /pdf`  
✅ Automatically creates a **unique folder (UUID)** for each upload  
✅ Stores the **original file** and a **compressed version** in a `compressed/` subfolder  
✅ Uses `compress-pdf` for **high-efficiency PDF compression**  
✅ Secure with **Helmet.js** and **CORS support**

---

![Alt text](screenshot.png?raw=true "Screenshot")

enjoy it! 🚀
