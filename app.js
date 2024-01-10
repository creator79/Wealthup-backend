// app.js
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/index.js';
import codeRoutes from './routes/code.routes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log('MongoDB connection failed !!! ', err);
    });


app.use('/', codeRoutes);

