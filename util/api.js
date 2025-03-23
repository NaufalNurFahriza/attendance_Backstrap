// Fungsi untuk mengambil semua data
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/data');
        if (!response.ok) {
            throw new Error('Gagal mengambil data');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Fungsi untuk mengambil data berdasarkan ID
async function fetchDataById(id) {
    try {
        const response = await fetch(`http://localhost:3000/data/${id}`);
        if (!response.ok) {
            throw new Error('Gagal mengambil data');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching data by ID:', error);
        return null;
    }
}

// Fungsi untuk menambahkan data baru
async function addData(newData) {
    try {
        const response = await fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData),
        });
        if (!response.ok) {
            throw new Error('Gagal menambahkan data');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error adding data:', error);
        return null;
    }
}

// Fungsi untuk mengupdate data
async function updateData(id, updatedData) {
    try {
        const response = await fetch(`http://localhost:3000/data/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error('Gagal mengupdate data');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating data:', error);
        return null;
    }
}

// Fungsi untuk menghapus data
async function deleteData(id) {
    try {
        const response = await fetch(`http://localhost:3000/data/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Gagal menghapus data');
        }
        const result = await response.json();
        return result; // Pastikan backend mengembalikan respons yang valid
    } catch (error) {
        console.error('Error deleting data:', error);
        return null;
    }
}