const app = require('./routes');

require('dotenv').config();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Hugo's proxy server listening on port ${port}`);
});
