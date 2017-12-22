var mongoose = require('mongoose');
var userModel = mongoose.model('User');
var utiltiesBL = require('./utilitiesBL');
var uuid = require('uuid/v1');
var fs = require('fs');
var path = require('path');

exports.authenticate = function authenticate(data, ip, callback) {
    //get credentials sent by the client 
    var username = data.username;
    var password = data.password;

    var hashedValue = utiltiesBL.hashPassword(password);

    userModel.findOne({ username: username }, function(err, userRetrieved) {

        //inform the callback of auth success/failure 
        if (err || !userRetrieved) {
            callback(false);
            return;
        }

        console.log('User found:' + userRetrieved + ' validating password hash...');

        var passwordMatch = userRetrieved.password == hashedValue;
        if (!passwordMatch) {
            userRetrieved = null;
        }
        console.log('Password Match:' + passwordMatch);

        callback(userRetrieved);
    });
}

exports.forgotPassword = function forgotPassword(data, ip, callback) {
    var email = data;

    userModel.findOne({ email: email }, function(err, userRetrieved) {

        //inform the callback of auth success/failure 
        if (err || !userRetrieved) {
            console.log('User not found.');
            callback(false);
            return;
        }

        console.log('User found:' + userRetrieved + ' validating password hash...');

        fs.readFile(path.resolve(__dirname, '..', './mailtemplates/resetpassword.html'), 'utf8', function(err, content) {

            if (err) {
                console.log('Error loading file. err+' + err);
            }
            else {
                var resetPasswordToken = new Object();
                resetPasswordToken.token = uuid();

                userRetrieved.resetPasswordTokens.push(resetPasswordToken);
                userRetrieved.save();

                utiltiesBL.sendMail(userRetrieved.email, 'Reset password', content.replace('[link]', 'https://gerger-bencami.c9users.io/resetpassword?token=' + resetPasswordToken.token));
                callback(true);
            }
        });
    });
}

exports.changePassword = function changePassword(resetPasswordToken, newPassword, callback) {
    userModel.findOne({
            resetPasswordTokens: { $elemMatch: { token: resetPasswordToken } }
        },
        function(err, userRetrieved) {

            //inform the callback of auth success/failure 
            if (err || !userRetrieved) {
                callback(false);
                return;
            }

            userRetrieved.password = utiltiesBL.hashPassword(newPassword);

            userRetrieved.save();
            console.log("Change Password for userL" + userRetrieved.username + " was successful");
            callback(null, true);
        });
    callback(null, false);
}

exports.registration = function registration(data, ip, callback) {
    var username = data.username;
    var password = data.password;
    var email = data.email;

    userModel.findOne({ username: username }, function(err, userRetrieved) {

        //inform the callback is username is already used
        if (err || userRetrieved) {
            console.log('User found:' + userRetrieved + ' Error:' + err);
            callback(false);
            return;
        }

        console.log('No user found, continueing with registration.');

        var newUser = new userModel();
        newUser.email = data.email;
        newUser.username = data.username;
        newUser.password = utiltiesBL.hashPassword(data.password);
        newUser.role = 'regular';

        newUser.save(function(err, product, numAffected) {
            if (!err) {
                console.log('Success!');
                fs.readFile(path.resolve(__dirname, '..', './mailtemplates/registrationcomplete.html'), 'utf8', function(err, content) {

                    if (err) {
                        console.log('Error loading file. err+' + err);
                    }
                    else {
                        utiltiesBL.sendMail(newUser.email, 'Registration Complete', content.replace('[username]', newUser.username));
                        callback(true);
                    }
                });
                callback(true);
            }
            else {
                console.log('Error saving to mongoDB! Error:' + err);
                callback(false);
            }
        });
    });
}
