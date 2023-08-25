import express from 'express';
import morgan from 'morgan';
import gatewayRoutes from './routes/gateway.routes.js';
import peripheralRoutes from './routes/peripheral.routes.js'


const app =  express();
app.use(morgan('dev'));
app.use(express.json());
app.use("/api",gatewayRoutes)
app.use("/api",peripheralRoutes)


export default app;