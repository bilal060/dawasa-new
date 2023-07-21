const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meterSchema = new Schema({
    enddevice_deveul: { type: String, required: true },
    enddevice_devaddr: { type: String, required: true },
    meternumber: { type: String, required: true },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Meter', meterSchema);