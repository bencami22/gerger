var nodemailer = require('nodemailer');

exports.hashPassword = function hashPassword(password) {
    var crypto = require('crypto'),
        key = 'mysecret key'

    // create hahs
    var hash = crypto.createHmac('sha256', key)
    hash.update(password)
    var hashedValue = hash.digest('hex');
    return hashedValue;
}

exports.sendMail = function sendMail(to, subject, htmlBody) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hgjduw6272hs@gmail.com',
                pass: 'hgjduw6272hs'
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"GerGer" <admin@gerger.com>', // sender address
            to: to, // list of receivers omma separated
            subject: subject, // Subject line
            //text: 'Hello world?', // plain text body
            html: htmlBody // html body
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
