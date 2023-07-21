const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const branchSchema = new Schema({
    name: { type: String, required: true }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Branch', branchSchema);