// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatRoutes = require('./chatRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
