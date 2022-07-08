const express = require('express');
const app = express();

const healthRoutes = require('./routes/health');

app.use('/api/health/status', healthRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`);
});
