import express from 'express';
import morgan from 'morgan';
import gatewayRoutes from './routes/gateway.routes.js';
import peripheralRoutes from './routes/peripheral.routes.js'
import cors from 'cors'


const app =  express();
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use("/api",gatewayRoutes)
app.use("/api",peripheralRoutes)


export default app; 