import compression from 'compression';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
// import { preventSendingErrors } from './src/middlewares/preventSendingErrors.middleware.js';
import router from './src/routes/api/index.routes.js';

const port = 3000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use(router);

// My middlewares
// app.use(preventSendingErrors);

app.listen(port, () => console.log('Server is online!'));
