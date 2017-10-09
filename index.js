const nodemailer = require('nodemailer');
const fs = require('fs');
const config = require('./config');

let smtpConfig = {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: config.user,
        pass: config.pass
    }
};
let transporter = nodemailer.createTransport(smtpConfig);

let emails = [{
    company: "Treehouse Inc",
    name: "Ryan Carson",
    email: "ryan@teamtreehouse.com"
}, {
    company: "Twilio",
    name: "Kevin Whinnery",
    email: "kwhinnery@twilio.com"
}, {
    company: "Uber",
    email: "support@uber.com"
}, {
    company: "Upperline",
    email: "info@upperlinecode.com"
}, {
    company: "Verizon",
    name: "Maria Montenegro",
    email: "maria.montenegro@verizon.com",
}, {
    company: "Walmart",
    name: "Alex Roberton",
    email: "alex.roberton@walmart.com"
}, {
    company: "Wattvision",
    email: "info@wattvision.com"
}, {
    company: "Weare",
    email: "programs@weare.ci"
}, {
    company: "Wolfram",
    email: "stephen_wolfram@wolframalpha.com"
}, {
    company: "Zapier",
    email: "contact@zapier.com"
}];

/* let emails = [{
    company: "Bharddwaj Vemulapalli",
    email: "bharddwajvemulapalli@gmail.com"
}, {
    company: "Sumant Pottepalem",
    email: "sumant.hhms@gmail.com"
}, {
    company: "Ishan Arya",
    email: "ishan.arya130@gmail.com"
}, {
    email: "vineetekka605@gmail.com",
    company: "Vineet Ekka"
}, {
    company: "Jishan Desai",
    email: "jishanpdesai@gmail.com"
}, {
    company: "Tarun Boddupalli",
    email: "tarunbod@gmail.com"
}]; */

for (var i = 0; i < emails.length; i++) {
    let text = String(fs.readFileSync('template.txt'));
    text = text.replace('%SPONSOR_NAME%', emails[i].company);
    let mailOptions = {
        from: 'sponsor@hackedison.com', // sender address
        to: emails[i].email, // list of receivers
        subject: 'HackEdison | Info & Sponsorship', // Subject line
        html: text
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to %s: %s', emails[i].company, info.messageId);
    });
}
