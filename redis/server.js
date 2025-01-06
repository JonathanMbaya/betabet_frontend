const express = require('express');
const bodyParser = require('body-parser');
const betsRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use('/api', betsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
