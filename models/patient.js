const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        pattern: "[1-9][0-9]{9}", // 10 digit number
        reqired: true
    },
    reports:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }
    ]
},{
    timestamps: true
});

// name and phone as composite key
patientSchema.index({ name: 1, phone: 1}, { unique: true });
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient