const express = require('express');
const multer = require('multer');
const ftp = require('basic-ftp');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Temp directory to store uploaded files

// Enable CORS to allow requests from the React frontend
app.use(cors());

// FTP configuration
const ftpConfig = {
  host: import.meta.env.FTP_HOST, 
  user: import.meta.env.FTP_USERNAME,
  password: import.meta.env.FTP_PASSWORD,
};

// Route to handle image uploads
app.post('/upload', upload.array('images', 10), async (req, res) => {
  const client = new ftp.Client();
  client.ftp.verbose = true; // Enable verbose logging for debugging

  try {
    await client.access(ftpConfig); // Connect to the FTP server

    const uploadedUrls = []; // Store the URLs of uploaded images

    for (const file of req.files) {
      // Construct the target path for the file on the server
      const targetPath = `/public_html/assets/${file.originalname}`;
      await client.uploadFrom(file.path, targetPath);
      uploadedUrls.push(`https://${import.meta.env.FTP_HOST}/assets/${file.originalname}`);
    }

    res.json({ message: 'Files uploaded successfully', urls: uploadedUrls });
  } catch (err) {
    console.error('FTP upload failed:', err);
    res.status(500).json({ message: 'FTP upload failed', error: err.message });
  } finally {
    client.close();
  }
});

// Start the server
app.listen(3001, () => {
  console.log('FTP upload server is running on http://localhost:3001');
});
