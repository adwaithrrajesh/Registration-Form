const registrationModel = require('../model/registrationShema')


module.exports={
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
    }
}