import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import userRoute from './routes/user.route.js';
import MessageRoute from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import { app, server } from './SocketIO/server.js';

dotenv.config();

// middleware routes
app.use(express.json())
app.use(cookieParser())
app.use(cors());

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;
try {
    mongoose.connect(URI)
    console.log("connected to mongodb")
} catch (error) {
    console.log(error)
}
//routes
app.use("/api/user", userRoute)
app.use("/api/message",MessageRoute)
server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})