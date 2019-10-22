import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import PharmRoutes from './server/routes/PharmRoutes';

config.config();
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1/Pharmacies', PharmRoutes);

app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to EasyPharm API'
  })
);

app.listen(port, () => {
  console.log(`Server  double check is running on PORT ${port}`);
});

export default app;
