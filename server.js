const express = require('express');
const path = require('path');
const app = express();

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Route for download test (send big file data)
app.get('/download', (req, res) => {
  const sizeInBytes = 10 * 1024 * 1024; // 10MB
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Length', sizeInBytes);
  
  const chunk = Buffer.alloc(1024 * 1024, 'a'); // 1MB chunk
  for (let i = 0; i < 10; i++) {
    res.write(chunk);
  }
  res.end();
});

// Route for upload test
app.post('/upload', express.raw({ limit: '50mb', type: '*/*' }), (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
