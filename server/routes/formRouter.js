const { Router } = require('express');
const router = Router();
const {insertForm,getRegistrationDetails, getAllCountryDetails, getStates, getCities} = require('../controller/formController')
const {validateForm} = require('../middleware/expressValidator')


router.get('/getRegistrationDetails',getRegistrationDetails);
router.get('/getAllCountryDetails',getAllCountryDetails)
router.post('/getStates',getStates);
router.post('/getCitiesWithIsoCode',getCities)

router.post('/insertForm',validateForm,insertForm);
module.exports = router;