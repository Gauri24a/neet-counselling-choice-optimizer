/**
 * Backend entry point (PRD §6.1).
 */
const app = require('./app');
const { PORT } = require('./config/env');

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
