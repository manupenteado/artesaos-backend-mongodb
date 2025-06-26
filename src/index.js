import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import productRoutes from './routes/product.route.js';
import purchaseRoutes from './routes/purchase.route.js';
import db from './database/configdb.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);

const PORT = process.env.PORT || 3000;

db.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

