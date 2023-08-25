import mongoose from 'mongoose';
import {isIPv4} from 'is-ip';

const MAX_PERIPHERALS = 10;

function validateMaxPeripherals(value) {
    return value.length <= MAX_PERIPHERALS;
}

const gatewaySchema = new mongoose.Schema({
    serialNumber:{
        type: String,
        unique: true,
        require: true,
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
        validate: [validateMaxPeripherals, `A maximum of ${MAX_PERIPHERALS} peripherals is allowed.`]
    }
}, {
    timestamps: true
})

export default mongoose.model('Gateway', gatewaySchema);