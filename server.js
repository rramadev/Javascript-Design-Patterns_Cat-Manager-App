const express =  require('express');
const app = express();
const path = require('path');

const port = '8080';

app.use(express.static(__dirname + '/src'));
// app.use('/assets',  express.static(__dirname + '/assets'));

// app.use('/', (req, res) => {
//   res.sendFile(path.join(__dirname + './src/index.html'));
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);  
});