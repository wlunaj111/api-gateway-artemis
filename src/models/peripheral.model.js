import mongoose from 'mongoose';

const peripheralSchema = new mongoose.Schema({
    uid:{
        type: Number,
        unique: true,
        required: true,
        trim: true
    },
    vendor:{
        type: String,
        required: true,    
    },
    status: {
        type: String,
        enum: {
            values: ['online', 'offline'],
            message: 'Status must be either "online" or "offline"'
        },
        required: true
    },
    // gateway: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Gateway',
    // },
    
}, {
    timestamps: true
})

export default mongoose.model('Peripheral', peripheralSchema);