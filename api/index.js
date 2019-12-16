import config from 'dotenv';
import express from 'express';
import PharmRoutes from './v1/routes/pharmRoutes';
import requestsRoutes from './v1/routes/requestsRoutes';

config.config();
const app = express();
const { PORT = 8000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/pharmacies', PharmRoutes);
app.use('/api/v1/requests', requestsRoutes);

app.get('/', (_req, res) => {
  res.status(200).send({
    message: 'Welcome to EasyPharm API'
  });
});

// eslint-disable-next-line no-console
const server = app.listen(PORT, () => console.log(`The server is running on PORT ${PORT}`));

export default server;
