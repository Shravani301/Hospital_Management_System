const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patientName: {
    type: String,
    required: true,
  },
  bedID: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who owns the patient
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
