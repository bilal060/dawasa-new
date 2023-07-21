const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const villageSchema = new Schema({
    name: { type: String, required: true },
    ward_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward', required: true },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Village', villageSchema);