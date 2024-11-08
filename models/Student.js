const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    adminNumber: { type: String, required: true },
    name: { type: String, required: true },
    diploma: { type: String, required: true },
    cGPA: { type: mongoose.Schema.Types.Decimal128, required: true },
    image: { type: String }

}, { versionKey: false });

module.exports = mongoose.model('Student', studentSchema);