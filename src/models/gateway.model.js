import mongoose from 'mongoose';
import {isIPv4} from 'is-ip';

const MAX_PERIPHERALS = 10;

function validateMaxPeripherals(value) {
    return value.length <= MAX_PERIPHERALS;
}

async function validateIfExistPeripheral(peripherals) {
    const peripheralCount = await mongoose.models.Peripheral.countDocuments({
      _id: { $in: peripherals },
    });
    return peripheralCount === peripherals.length;
}

const gatewaySchema = new mongoose.Schema({
    serialNumber:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name:{
        type: String,
        required: true,    
    },
    addressIPV4:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return isIPv4(value);
            },
            message: "The ip address is not valid"
        }  
    },
    peripherals: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Peripheral',
        }],
        validate: [
            {
              validator: validateMaxPeripherals,
              message: `A maximum of ${MAX_PERIPHERALS} peripherals is allowed.`,
            },
            {
              validator: validateIfExistPeripheral,
              message: 'One or more peripherals do not exist in the database.',
            },
          ],
        // validate: [validateMaxPeripherals, `A maximum of ${MAX_PERIPHERALS} peripherals is allowed.`]
        // validate: [validateIfExistPeripheral, 'One or more peripherals do not exist in the database.']
    }
}, {
    timestamps: true
})

export default mongoose.model('Gateway', gatewaySchema);