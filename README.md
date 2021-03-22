# sars-cov-2

<h2>Description:</h2>
A simple API based application on Node.js with MongoDB for doctors to manage patients in a hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients.


<h2>Installation:</h2>

1. Install mongodb,
2. Install node and npm,
3. Install dependencies by running `npm install` inside the project directory.

Now run `npm start` to start the server.

<h2>Routes:</h2>
<ul>
  <li> api/doctors/register → Requires doctor to register with email id, username and password </li>
  <li> api/doctors/login → returns the JWT token to be used </li>
  <li> api/patients/register → Requires User's Name and Phone number </li>
  <li> api/patients/:id/create_report → Require's report's status ( Status can be [Negative, Travelled-Quarantine,
       Symptoms-Quarantine, Positive-Admit]) </li>
  <li> api/patients/:id/all_reports → Lists all the reports of a patient oldest to latest </li>
  <li> api/reports/:status → Lists all the reports of all the patients filtered by a specific
       status </li>
  
  <br>
  <p>Sample request for all the APIs can be found <a href="https://www.getpostman.com/collections/b4da973633d541920628">here</a></p>

