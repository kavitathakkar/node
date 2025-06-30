const express = require('express');
const router = express.Router();
const {
    getAllServices,
    setupDB,
    getServiceDetails,
    generateRequest,
    addMember,
    updatePassword,
    updateRequest,
    deleteMember,
    calculateEMI,
    deleteRequest
} = require('../controllers/indexController')

//GET route to setupDB
router.get('/setupdb', setupDB);
router.get('/allservices', getAllServices);
router.get('/home', getAllServices);
router.get('/service/:type', getServiceDetails);
router.post('/service/:type/form', generateRequest);
router.post('/member', addMember);
router.post('/service/:type/calculate', calculateEMI);
router.put('/updatepassword', updatePassword);
router.put('/updaterequest', updateRequest);
router.delete('/cancelrequest', deleteRequest);
router.delete('/cancelmember', deleteMember)

module.exports = router;
