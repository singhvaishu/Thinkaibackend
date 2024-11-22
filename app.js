
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

require('dotenv').config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use('/', authRoutes);
app.use('/post', postRoutes);

module.exports = app;
