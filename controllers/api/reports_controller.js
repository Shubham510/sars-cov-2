const Report = require('../../models/report');


module.exports = {
    getReports : async function(req, res){
        try{
            // Get all the reports with the specified Status
            let all_reports = await Report.find({'status':req.params.status});
            return res.status(200).json(all_reports);
        }
        catch(err){
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
    }
    
}