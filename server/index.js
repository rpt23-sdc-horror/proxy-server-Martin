const app = require('./routes');

const port = 4000;

app.listen(port, () => {
  console.log(`Hugo's proxy server listening on port ${port}`);
});
