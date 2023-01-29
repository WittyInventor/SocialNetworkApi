const express = require('express');
const routes = require('./routes');
const config = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// / middleware express. when you see use, it becomes middleware



config.once('open', () => {

  
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  })
});