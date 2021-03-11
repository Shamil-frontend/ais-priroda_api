const app = require('./src/app.js')

const PORT = 8000;

const start = async () => {
  console.log("Server ready at: http://localhost:", PORT, "\n");
  app.listen(PORT);
}

start();
