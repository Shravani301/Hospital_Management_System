const express = require('express');
const router = express.Router();
const patientController = require('../controllers/PatientController');
//const authMiddleware = require('../middlewares/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware.authenticateUser, patientController.addPatient);
router.get('/patients/:id', authMiddleware.authenticateUser, patientController.getPatientById);
router.get('/patients',authMiddleware.authenticateUser, patientController.getUserPatients)
router.get('/patients', authMiddleware.authenticateUser, patientController.getAllPatients);

module.exports = router;
