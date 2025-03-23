const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Baca data dari data.json
function readData() {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
}

// Tulis data ke data.json
function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Endpoint untuk mendapatkan semua data
app.get('/data', (req, res) => {
    const data = readData();
    res.json(data);
});

// Endpoint untuk menambahkan data baru
app.post('/data', (req, res) => {
    const newData = req.body;
    const data = readData();
    data.push(newData);
    writeData(data);
    res.json({ message: 'Data berhasil ditambahkan!', data: newData });
});

// Endpoint untuk mendapatkan data berdasarkan ID
app.get('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readData();
    const item = data.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    res.json(item);
});

// Endpoint untuk mengupdate data
app.put('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    const data = readData();
    data[id] = updatedData;
    writeData(data);
    res.json({ message: 'Data berhasil diupdate!', data: updatedData });
});

// Endpoint untuk menghapus data
app.delete('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readData();
    const deletedData = data.splice(id, 1);
    writeData(data);
    res.json({ message: 'Data berhasil dihapus!', data: deletedData });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});