const Patient = require('../../models/patient');
const Report = require('../../models/report');

module.exports = {
    createUser : async function(req, res) {
        try{
            //Check if the patient is registered or not
            let patient = await Patient.findOne({
                name: req.body.name,
                phone: req.body.phone
            });
            
            //Return all reports of an already registered patient
            if(patient) {
                return res.redirect(`/api/patients/${ patient._id }/all_reports`);
            }

            //Creating new patient
            let newUser = await Patient.create({
                name: req.body.name,
                phone: req.body.phone
            });

            return res.status(200).json({
                message: "Patient registered successfully",
                data: {
                    patient_id: newUser
                }
            });
        }
        catch(err){
            console.log("Err: ",err);
            return res.json(500, {
                message: "Error: "+err
            });
        }
    },

    createReport: async function (req, res) {
        // Checking if patient parameter is correct
        let patient = await Patient.findById(req.params.id);
        if(!patient){ return res.status(404).send('Patient not found'); }

        // Creating the report
        let newReport = await Report.create({
            created_by: req.user,       // logged in doctor
            status: req.body.status,    
            owner: patient._id         
        });

        patient.reports.push(newReport);
        patient.save();
        
        // Return the newly generated report
        return res.status(200).json({
            message: 'Report generated',
            data:{
                newReport: newReport
            }
        });
    },

    allReports: async function (req, res) {
        try{
            // Checking if patient parameter is correct
            let patient = await Patient.findById(req.params.id);
            if(!patient){ return res.status(404).send('Patient not found'); }

            // Gathering all the reports of that patient
            let reports = await Patient.findById(req.params.id).populate({
                path: 'reports'
            });

            return res.status(200).json({
                message: "Patient already Registered!",
                data : {
                    all_reports: reports
                }
            });
        }
        catch(err){
            return res.status(500).send(`Internal Server error`);
        }
    }
};