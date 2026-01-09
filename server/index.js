import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import { ConnectDB } from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import carRoutes from './routes/carRoutes.js'
const app=express();
dotenv.config()

app.use(cors());
app.use(express.json())
ConnectDB(process.env.MONGO_URI);

app.use('/api',authRoutes)
app.use('/api/cars',carRoutes)

const PORT=process.env.PORT||4000;
app.listen(PORT,()=>console.log(`server is on ${PORT} 🚀`))
