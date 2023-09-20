const { Router } = require('express');
const router = Router();
const {insertForm,getRegistrationDetails} = require('../controller/formController')
const {validateForm} = require('../middleware/expressValidator')

router.post('/insertForm',validateForm,insertForm);
router.get('/getRegistrationDetails',getRegistrationDetails);

module.exports = router;