import { Router } from "express";   
import { getGateways, getGateway,createGateway, updateGateway,deleteGateway } from "../controllers/gateway.controller.js";  

const router = Router();

router.get('/gateways', getGateways)
router.get('/gateways/:id', getGateway)
router.post('/gateways', createGateway)
router.delete('/gateways/:id', deleteGateway)
router.put('/gateways/:id', updateGateway)

export default router;
