import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './src/user/user.routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor listo en http://localhost:${PORT}`);
});
