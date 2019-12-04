import config from 'dotenv';
import express from 'express';
import PharmRoutes from './v1/routes/PharmRoutes';

config.config();
const app = express();
const { PORT = 8000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/pharmacies', PharmRoutes);

app.get('/', (_req, res) => {
  res.status(200).send({
    message: 'Welcome to EasyPharm API'
  });
});

app.listen(PORT, () => {
  console.log(`Server  double check is running on PORT ${PORT}`);
});

export default app;
