const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route utama: Cek status server
app.get('/', (req, res) => {
    res.json({
        status: "Online",
        message: "Node.js App on VPS is running smoothly!",
        memoryUsage: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
    });
});

// Route untuk cek status website lain
app.get('/check', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "Isi parameter url! Contoh: /check?url=https://google.com" });

    try {
        const start = Date.now();
        const response = await axios.get(url);
        const duration = Date.now() - start;

        res.json({
            url: url,
            status: response.status,
            statusText: response.statusText,
            responseTime: `${duration}ms`
        });
    } catch (error) {
        res.status(500).json({
            url: url,
            status: "Down/Error",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server jalan di port ${PORT}`);
});