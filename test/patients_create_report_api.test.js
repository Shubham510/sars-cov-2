let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);



describe("/patient/:id/create_report", () => {
    it("should generate a report for the user and return it", () => {
        let report = {
            "status":"Travelled-Quarantine"
        }
        let patient_id = "603ff2867146f371b886d17f";
        chai.request(server)
            .post('/api/patients/'+ patient_id +'/create_report')
            .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNmZjNlMDcxNDZmMzcxYjg4NmQxODIiLCJpYXQiOjE2MTQ4MDM5NTZ9.vAOhAgaT9dVoY1CEumDFx3HqTT6nV9SWVd2T8UAXdw4")
            .send(report)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Report generated");
                res.body.data.should.have.property('newReport');
                res.body.data.newReport.should.have.property("owner").eql(patient_id);
                res.body.data.newReport.should.have.property("status").eql(report.status);
            });
    });

    it("should return error for an invalid patient", () => {
        let report = {
            "status":"Travelled-Quarantine"
        }
        let patient_id = "603ff2867146f371b874d17f";
        chai.request(server)
            .post('/api/patients/'+patient_id+'/create_report')
            .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNmZjNlMDcxNDZmMzcxYjg4NmQxODIiLCJpYXQiOjE2MTQ4MDM5NTZ9.vAOhAgaT9dVoY1CEumDFx3HqTT6nV9SWVd2T8UAXdw4")
            .send(report)
            .end((err,res) => {
                res.should.have.status(404);
            });
    });
});