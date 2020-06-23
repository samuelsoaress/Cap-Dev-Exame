const { app } = require('./config/express');

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servindo na porta: ${PORT}`)
  // app.get('logger').info(`Servindo na porta: ${PORT}`);
});
