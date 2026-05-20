const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files (index.html)
app.use(express.static(path.join(__dirname)));

// API endpoint to get system info
app.get('/api/system-info', (req, res) => {
    res.json({
        hostname: os.hostname(),
        platform: os.platform(),
        arch: os.arch(),
        cpuCount: os.cpus().length,
        totalMemory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB',
        freeMemory: Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB',
        uptime: Math.floor(os.uptime() / 60) + ' minutes',
        nodeVersion: process.version,
        env: process.env.NODE_ENV || 'development'
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`🚀 Docker Insights App listening at http://localhost:${port}`);
    console.log(`Container Hostname: ${os.hostname()}`);
});
