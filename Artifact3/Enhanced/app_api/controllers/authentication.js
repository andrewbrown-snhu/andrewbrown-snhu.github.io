//============================================================================
// Author      : Andrew Brown
// Date        : August 18, 2024
// Revised	   : October 6th, 2024
// Version     : 2.0
// Description : Authentication controllers for the routing response
//============================================================================

const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

// Added profile controller to handle put requests to update profile info
const profile = async (req, res) => {
    console.log(req.auth);

    // check if name and email are in the request
    if (!req.body.name || !req.body.email) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    // retrieve the logged in user
    let user = await User.findByIdAndUpdate(req.auth._id, {
        email: req.body.email,
        name: req.body.name
    });

    // check if password is being updated
    if (req.body.password && req.body.confirmpassword) {
        // make sure password and confirm password match
        if (!(req.body.password == req.body.confirmpassword)) {
            return res
                .status(400)
                .json({ "message": "Passwords do not match" });
        }

        user.setPassword(req.body.password);
    }

    // save the user data to the database
    const q = await user.save();

    if (!q) {
        return res
            .status(400)
            .json(err);
    } else {
        return res
            .status(200)
            .json(user);
    }

    /*user.email = req.body.email;
    user.name = req.body.name;*/

    

    /*user.save();*/

    /*return res
        .status(200)
        .json(user);*/

    //console.log(User.email);
    

    /*passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Error in Authentication Process
            return res
                .status(404)
                .json(err);
        }
        if (user) {
            user.email = req.body.email;
            user.name = req.body.name;

            if (req.body.password && req.body.confirmpassword) {
                if (!(req.body.password == req.body.confirmpassword)) {
                    return res
                        .status(400)
                        .json({ "message": "Passwords do not match" });
                }

                user.setPassword(req.body.password);
            }

            user.save();

            return res
                .status(200)
                .json(user);
        } else { // Auth failed return error
            res
                .status(401)
                .json(info);
        }
    })(req, res);*/

    /*return res
        .status(200)
        .json(User);*/

    //User.updateOne({_id: },)

    //const user
}

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    const user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: ''
        }
    );
    user.setPassword(req.body.password);
    const q = await user.save();

    if (!q) {
        return res
            .status(400)
            .json(err);
    } else {
        //const token = user.generateJWT();
        return res
            .status(200)
            .json({'message': 'success'});
    }
};

const login = (req, res) => {
    // Validate message to ensure that email and password are present.
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }
    // Delegate authentication to passport module
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Error in Authentication Process
            return res
                .status(404)
                .json(err);
        }
        if (user) { // Auth succeeded - generate JWT and return to caller
            const token = user.generateJWT();
            res
                .status(200)
                .json({ token });
        } else { // Auth failed return error
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login,
    profile
};