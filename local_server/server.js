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
    // Generate ID baru (ID terakhir + 1)
    newData.id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
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
    // Cari index data berdasarkan ID
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    // Update data
    data[index] = { ...data[index], ...updatedData };
    writeData(data);
    res.json({ message: 'Data berhasil diupdate!', data: data[index] });
});

// Endpoint untuk menghapus data
app.delete('/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = readData();
    // Cari index data berdasarkan ID
    const index = data.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
    }
    // Hapus data
    const deletedData = data.splice(index, 1);
    writeData(data);
    res.json({ message: 'Data berhasil dihapus!', data: deletedData });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});