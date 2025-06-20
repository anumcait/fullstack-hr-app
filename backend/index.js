const dotenv = require('dotenv');
dotenv.config();

const app = require('./app'); // ✅ FIRST import app

const sequelize = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ DB connection failed:', error);
  }
}

startServer();

