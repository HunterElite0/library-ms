const express = require('express');
const bookRoutes = require('./src/routes/bookRoutes');

const app = express();
app.use(express.json());
app.use('/book', bookRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
