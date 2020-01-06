import config from 'dotenv';
import express from 'express';
import pharmRoutes from './v1/routes/pharmRoutes';
import requestsRoutes from './v1/routes/requestsRoutes';
import userRoutes from './v1/routes/userRoutes';

config.config();
const app = express();
const { PORT = 8000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/pharmacies', pharmRoutes);
app.use('/api/v1/requests', requestsRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', (_req, res) => {
  res.status(200).send({
    message: 'Welcome to EasyPharm API'
  });
});

// eslint-disable-next-line no-console
const server = app.listen(PORT, () => console.log(`The server is running on PORT ${PORT}`));

export default server;
