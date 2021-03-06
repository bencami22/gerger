var mongoose = require('mongoose');
var userModel = mongoose.model('User');
var utilitiesBL = require('./utilitiesBL');
var uuid = require('uuid/v1');
var fs = require('fs');
var path = require('path');

exports.authenticate = function authenticate(data, ip) {
    return new Promise(function(resolve, reject) {

        //get credentials sent by the client 
        var email = data.email;
        var password = data.password;

        var hashedValue = utilitiesBL.hashPassword(password);

        userModel.findOne({ email: email }).exec().then(function(userRetrieved) {

            //inform the callback of auth success/failure 
            if (!userRetrieved) {
                reject();
            }

            console.log('User found:' + userRetrieved + ' validating password hash...');

            var passwordMatch = userRetrieved.password == hashedValue;
            if (!passwordMatch) {
                userRetrieved = null;
            }
            console.log('Password Match:' + passwordMatch);

            resolve(userRetrieved);
        }).catch(function(err) {
            reject(err);
        });
    });
};

exports.authenticateOrCreate = function authenticateOrCreate(data, ip) {
    return new Promise(function(resolve, reject) {
        //TODO: a FB graph api call to make sure the access token is valid here
        userModel.findOne({
                extUIds: {
                    $elemMatch: { uid: data.uid }
                }
            }).exec()
            .then(function(userRetrieved) {
                if (!userRetrieved) {
                    userModel.findOne({
                            email: data.email
                        }).exec()
                        .then(function(userRetrieved) {
                            if (!userRetrieved) {
                                //user not found, lets add him
                                var newUser = new userModel();
                                newUser.email = data.email;
                                newUser.firstName = data.firstName; //data.firstName+date.lastName;
                                newUser.lastName = data.lastName;
                                newUser.avatarUrl = data.avatarUrl;
                                newUser.extUIds.push({
                                    uid: data.uid,
                                    provider: data.provider
                                });
                                newUser.role = 'regular';

                                newUser.save(function(err, product, numAffected) {
                                    if (!err) {
                                        console.log('Success!');
                                        fs.readFile(path.resolve(__dirname, '..', './mailtemplates/registrationcomplete.html'), 'utf8', function(err, content) {

                                            if (err) {
                                                console.log('Error loading file. err+' + err);
                                            }
                                            else {
                                                utilitiesBL.sendMail(newUser.email, 'Registration Complete', content.replace('[username]', newUser.email));
                                                resolve(newUser);
                                            }
                                        });
                                        resolve(newUser);
                                    }
                                    else {
                                        console.log('Error saving to mongoDB! Error:' + err);
                                        reject();
                                    }
                                });
                            }
                            else {
                                //user found
                                console.log('Email User found:' + userRetrieved + ' adding uid to email');

                                userRetrieved.extUIds.push({ uid: data.uid, provider: data.provider });
                                userRetrieved.save();
                                resolve(userRetrieved);
                            }

                        })
                        .catch(function(err) {
                            reject(err);
                        });
                }
                else {
                    console.log(' User found:' + userRetrieved);
                    resolve(userRetrieved);
                }
            });
    });
}

exports.forgotPassword = function forgotPassword(data, ip) {
    return new Promise(function(resolve, reject) {
        var email = data;

        userModel.findOne({ email: email }).exec().then(function(userRetrieved) {

            //inform the callback of auth success/failure 
            if (!userRetrieved) {
                console.log('User not found.');
                reject();
            }

            console.log('User found:' + userRetrieved + ' validating password hash...');

            fs.readFile(path.resolve(__dirname, '..', './mailtemplates/resetpassword.html'), 'utf8', function(err, content) {

                if (err) {
                    console.log('Error loading file. err+' + err);
                }
                else {
                    var resetPasswordToken = new Object();
                    resetPasswordToken.token = uuid();
                    if (userRetrieved.resetPasswordTokens == null)
                        userRetrieved.resetPasswordTokens = new [];
                    userRetrieved.resetPasswordTokens.push(resetPasswordToken);
                    userRetrieved.save();

                    utilitiesBL.sendMail(userRetrieved.email, 'Reset password', content.replace('[link]', 'https://gerger-bencami.c9users.io/resetpassword?token=' + resetPasswordToken.token));
                    resolve();
                }
            });
        }).catch(function(err) {
            reject(err);
        });
    });
};

exports.changePassword = function changePassword(resetPasswordToken, newPassword) {
    return new Promise(function(resolve, reject) {
        userModel.findOne({
                resetPasswordTokens: { $elemMatch: { token: resetPasswordToken } }
            }).exec().then(
                function(userRetrieved) {

                    //inform the callback of auth success/failure 
                    if (!userRetrieved) {
                        reject();
                    }

                    userRetrieved.password = utilitiesBL.hashPassword(newPassword);

                    userRetrieved.save().then(function() {
                        console.log("Change Password for userL" + userRetrieved.email + " was successful");
                        resolve();
                    })

                })
            .catch(function(err) {
                reject(err);
            });
    });
};

exports.registration = function registration(data, ip) {
    return new Promise(function(resolve, reject) {
        userModel.findOne({ email: data.email }).then(function(userRetrieved) {

            //inform the callback is email is already used
            if (userRetrieved) {
                reject();
            }

            console.log('No user found, continueing with registration.');

            var newUser = new userModel();
            newUser.email = data.email;
            newUser.firstName = data.firstName;
            newUser.lastName = data.lastName;
            newUser.password = utilitiesBL.hashPassword(data.password);
            newUser.role = 'regular';

            newUser.save().then(function() {
                console.log('Success!');
                fs.readFile(path.resolve(__dirname, '..', './mailtemplates/registrationcomplete.html'), 'utf8', function(err, content) {

                    if (err) {
                        console.log('Error loading file. err+' + err);
                    }
                    else {
                        utilitiesBL.sendMail(newUser.email, 'Registration Complete', content.replace('[username]', newUser.email));
                        resolve(newUser);
                    }
                });
                resolve(newUser);
            });
        }).catch(function(err) {
            reject(err);
        });
    });
};
