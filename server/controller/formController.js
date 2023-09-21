const registrationModel = require('../model/registrationShema');
const { Country, State, City } = require('country-state-city');


module.exports={
    
    
    getAllCountryDetails:(req,res)=>{
        try {     
            const AllCountries = Country.getAllCountries();
            return res.status(200).json({countries:AllCountries});
        } catch (error) {
            return res.status(500).json({msg:"Internal Server Error"});
        }
    },

    getStates: async(req,res)=>{
        try {
            const isoCode = req.body.isoCode
            const states = State.getStatesOfCountry(isoCode);
            return res.status(200).json({states:states})
        } catch (error) {
            return res.status(500).json({msg:"Internal server error"})
        }
    },

    getCities: async(req,res)=>{
        try {
            const stateCode = req.body.stateCode;
            const countryIsoCode = req.body.countryIsoCode;
            const AllCities = await City.getAllCities(); 
            const cities = AllCities.filter((entry) => {
              return entry.countryCode === countryIsoCode && entry.stateCode === stateCode;
            });
            return res.status(200).json({ cities: cities });
          } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
          }
    },

    insertForm : async(req,res)=>{
        try {     
            const email = req.body.email;
            const emailExist = await registrationModel.findOne({email:email});
            if(emailExist) return res.status(401).json({msg:"Email Already exist"});
            const registrationDetails = req.body;
            const newRegistration = new registrationModel(registrationDetails);
            const registerationSuccess = newRegistration.save();
            if(registerationSuccess) return res.status(200).json({msg:"Registered Successfully"});
            else return res.status(404).json({msg:"Unable to insert in database"});
        } catch (error) {
            return res.status(500).json({msg:"Internal server error"})
        }
    },
    getRegistrationDetails: async(req,res)=>{
        try {
            const registrationDetails = await registrationModel.find();
            return res.status(200).json({registrationDetails:registrationDetails});
        } catch (error) {
            return res.status(500).json({msg:"Internal server error"})
        }
    },
}