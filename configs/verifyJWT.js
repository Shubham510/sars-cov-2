const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');


module.exports = async function(req, res, next){
    const token = req.header('Authorization');
    if(!token){ return res.status(401).send('Access Denied'); }

    try{
        // Verifying the token
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        let doctor = await Doctor.findById(verified._id);
        if(doctor){
            // Setting req.user property for checking authorization when needed
            req.user = doctor;     
            next();
        }
        else{
            return res.status(400).send("Invalid token");    
        }
    }
    catch(err){
        return res.status(400).send("Invalid token");
    }

}