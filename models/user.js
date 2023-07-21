const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        select: false
    },
    status: { type: String, default: 'ACTIVE' },
    phone: { type: String },
    token: { type: String },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);