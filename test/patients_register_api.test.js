let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);



describe("/patient/register", () => {
    it("should register the patient and return patient id", () => {
        let patient = {
            "name": "Rohit Sharma",
            "phone": 8923450924
        }
        chai.request(server)
            .post('/api/patients/register')
            .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNmZjNlMDcxNDZmMzcxYjg4NmQxODIiLCJpYXQiOjE2MTQ4MDM5NTZ9.vAOhAgaT9dVoY1CEumDFx3HqTT6nV9SWVd2T8UAXdw4")
            .send(patient)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Patient registered successfully");
                res.body.data.should.have.property('patient_id');
                res.body.data.patient_id.should.have.property("_id");
                res.body.data.patient_id.should.have.property("name").eql(patient.name);
            });
    });

    it("should return all reports for an already registered patient", () => {
        let patient = {
            "name": "Raju Sen",
            "phone": 8923450924
        }
        chai.request(server)
            .post('/api/patients/register')
            .set("Authorization","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNmZjNlMDcxNDZmMzcxYjg4NmQxODIiLCJpYXQiOjE2MTQ4MDM5NTZ9.vAOhAgaT9dVoY1CEumDFx3HqTT6nV9SWVd2T8UAXdw4")
            .send(patient)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Patient already Registered!");
                res.body.data.should.have.property('all_reports');
                res.body.data.all_reports.should.have.property("reports");
                res.body.data.all_reports.should.have.property("name").eql(patient.name);
            });
    });
});