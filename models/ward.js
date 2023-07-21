const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wardSchema = new Schema({
    name: { type: String, required: true }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Ward', wardSchema);