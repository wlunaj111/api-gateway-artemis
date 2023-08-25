import Gateway from "../models/gateway.model.js";


export const getGateways = async (req,res)=>{
    try {
        const gateways = await Gateway.find().populate('peripherals');
        res.status(200).json(gateways)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createGateway = async (req, res) => {  
    const { serialNumber, name, addressIPV4, peripherals } = req.body;
  
    try {
      const newGateway = new Gateway({
        serialNumber,
        name,
        addressIPV4,
        peripherals
      });
      const gatewaySaved = await newGateway.save();
      res.status(201).json(gatewaySaved)
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
  };


export const getGateway = async (req, res) => {
    try {
        const gateway = await Gateway.findById(req.params.id).populate('peripherals');
        if (!gateway) {
            return res.status(404).json({ message: 'Gateway not found' });
        }
        return res.status(200).json(gateway);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const updateGateway = async (req,res)=> {
    try {
        const updatedPeripheral = { ...req.body };
        const gateway =  await Gateway.findByIdAndUpdate(req.params.id, updatedPeripheral,{ new: true , runValidators: true  }).populate('peripherals');
       if(!gateway) return res.status(404).json({message: 'Gateway not found'}); 
       return res.status(200).json(gateway)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const deleteGateway = async (req,res)=>{
    try {
       const gateway =  await Gateway.findByIdAndDelete(req.params.id)
       if(!gateway) return res.status(404).json({message: 'Gateway not found'}); 
       return res.status(200).json(gateway)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}




