import Peripheral from "../models/peripheral.model.js";
// import Gateway from '../models/gateway.model.js'

export const getPeripherals = async (req, res) => {
  try {
    const peripheral = await Peripheral.find();
    res.status(200).json(peripheral);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPeripheral = async (req, res) => {
  try {
    // const { uid, vendor, status, gateway: gatewayId } = req.body;
    const { uid, vendor, status } = req.body;

    // const gateway = await Gateway.findById(gatewayId);
    // if (!gateway) {
    //   return res.status(404).json({ message: "Gateway not found." });
    // }
    const newPeripheral = new Peripheral({
      uid,
      vendor,
      status,
      // gateway,
    });
    const peripheralSaved = await newPeripheral.save();
    res.status(201).json(peripheralSaved);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getPeripheral = async (req, res) => {
  try {
    const peripheral = await Peripheral.findById(req.params.id);
    if (!peripheral) return res.status(404).json({ message: "Peripheral not found" });
    return res.status(200).json(peripheral);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePeripheral = async (req, res) => {
  try {
    const updatedPeripheral = { ...req.body };
    const peripheral = await Peripheral.findByIdAndUpdate(req.params.id, updatedPeripheral, { new: true, runValidators: true });

    if (!peripheral) {
      return res.status(404).json({ message: "Peripheral not found" });
    }
    return res.status(200).json(peripheral);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePeripheral = async (req, res) => {
  try {
    const peripheral = await Peripheral.findByIdAndDelete(req.params.id);
    if (!peripheral) return res.status(404).json({ message: "Peripheral not found" });
    return res.status(200).json(peripheral);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
