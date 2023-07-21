const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    account: { type: String, required: true },
    fullname: { type: String, required: true },
    group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    district_id: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
    ward_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward', required: true },
    village_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Village', required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },
    phone: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    meter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Meter', required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Customer', customerSchema);