# 📑 Tiny PDF Compressor API

A simple **PDF compression API** built with **Node.js, Express, and Multer**.  
This API allows users to **upload** a PDF file, compress it, and store the original & compressed files in an organized folder structure.

---

## 🚀 Features

✅ Upload PDF files via `POST /pdf`  
✅ Automatically creates a **unique folder (UUID)** for each upload  
✅ Stores the **original file** and a **compressed version** in a `compressed/` subfolder  
✅ Uses `compress-pdf` for **high-efficiency PDF compression**  
✅ Secure with **Helmet.js** and **CORS support**

---

## 📂 Folder Structure

After uploading a PDF, the files are stored as follows:
