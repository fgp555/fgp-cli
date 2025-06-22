const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./src/user/user.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);

app.listen(3000, () => {
  console.log('✅ Servidor listo en http://localhost:3000');
});
