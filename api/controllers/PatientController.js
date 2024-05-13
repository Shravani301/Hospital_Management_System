const Patient = require('../models/Patient');

exports.addPatient = async (req, res) => {
  const { patientName, bedID } = req.body;
  const userId = req.userId; // Extracted from authentication middleware

  try {
    // Create a new patient
    const patient = new Patient({ patientName, bedID, user: userId });
    await patient.save();

    // Find the user and push the new patient's ID to their patients array
    const user = await User.findById(userId);
    user.patients.push(patient._id); // Assuming patient._id is the ID of the newly created patient
    await user.save();

    res.status(201).json({ message: 'Patient added successfully', patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getPatientById = async (req, res) => {
  const patientId = req.params.id;

  try {
    // Find patient by ID in the database
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getUserPatients = async (req, res) => {
  const userId = req.userId; // Extracted from authentication middleware

  try {
    const user = await User.findById(userId).populate('patients');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ patients: user.patients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  const userId = req.userId; // Extracted from authentication middleware
  try {
    const patients = await Patient.find({ user: userId });
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
