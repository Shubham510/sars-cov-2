let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);



describe("/patients/:id/all_reports", () => {
    it("should return all the reports for the specified patient", () => {
        let patient_id = "603ff2867146f371b886d17f";
        chai.request(server)
            .get('/api/patients/'+ patient_id +'/all_reports')
            .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNmZjNlMDcxNDZmMzcxYjg4NmQxODIiLCJpYXQiOjE2MTQ4MDM5NTZ9.vAOhAgaT9dVoY1CEumDFx3HqTT6nV9SWVd2T8UAXdw4")
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Reports fetched successfully!");
                res.body.data.should.have.property('all_reports');
                res.body.data.all_reports.should.have.property("reports").be.a('array');
                // res.body.data.all_reports.should.have.property("status").eql(report.status);
            });
    });

    it("should return error for an invalid patient", () => {
        let patient_id = "603ff2867146f371b874d17f";
        chai.request(server)
            .get('/api/patients/'+patient_id+'/all_reports')
            .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNmZjNlMDcxNDZmMzcxYjg4NmQxODIiLCJpYXQiOjE2MTQ4MDM5NTZ9.vAOhAgaT9dVoY1CEumDFx3HqTT6nV9SWVd2T8UAXdw4")
            .end((err,res) => {
                res.should.have.status(404);
            });
    });
});