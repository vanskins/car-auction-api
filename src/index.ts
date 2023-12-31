import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router';

const app = express();
dotenv.config()
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000"]
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => {{
  console.log('Server running on http://localhost:8080')
}})

mongoose.Promise = Promise;
mongoose.connect(process.env.DB_CONNECTION);
mongoose.connection.on('error', (error: Error) => console.log(error))
app.use('/', router())