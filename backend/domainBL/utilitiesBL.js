var nodemailer = require('nodemailer');
var fs = require("fs");
var path = require('path');


var localities = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../model/localcouncilsMalta.json')));

exports.getLocalities = function getLocalities() {
    return localities;
}

exports.hashPassword = function hashPassword(password) {
    var crypto = require('crypto'),
        key = 'mysecret key'

    // create hahs
    var hash = crypto.createHmac('sha256', key)
    hash.update(password)
    var hashedValue = hash.digest('hex');
    return hashedValue;
}
exports.formatDate = function formatDate(dateStr) {
    var d = new Date(dateStr);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var date = d.getDate();
    if (date.toString().length == 1)
        date = "0" + date;
    var hour = d.getHours();
    if (hour.toString().length == 1)
        hour = "0" + hour;
    var minute = d.getMinutes();
    if (minute.toString().length == 1)
        minute = "0" + minute;
    return months[d.getMonth()] + " " + " " + date + " " + d.getFullYear();
    //+ " " + hour + ":" + minute;

}
exports.sendMail = function sendMail(to, subject, htmlBody, bcc) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'gergermalta',
                pass: 'Hello123!'
                //user: 'hgjduw6272hs@gmail.com',
                //pass: 'hgjduw6272hs'

            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"GerGer" <admin@gerger.com>', // sender address
            to: to, // list of receivers comma separated
            subject: subject, // Subject line
            //text: 'Hello world?', // plain text body
            html: htmlBody, // html body
            bcc: bcc

        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}
