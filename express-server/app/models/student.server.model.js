﻿// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var StudentSchema = new Schema({
	studentNumber:{
        type:String,
        unique:true,
        required:"Student Number is required",
        trim:true
    },
    password:{
        type:String,
        validate:[
            (password) => password&&password.length > 6,
            'Password should be longer than 6 digits'
			
        ]
    },
    firstName:String,
    lastName:String,
    address: String,
    city: String,
    phoneNumber: String,
    email:{
        type:String,
        unique:true,
        match:[/.+\@.+\..+/, "Please fill a valid email address"]
    },
    program:String,
    techSkills:String,
    favouriteTopics:String,
	
});

// Set the 'fullname' virtual property
StudentSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
// before saving it into database
StudentSchema.pre('save', function(next){
	//hash the password before saving it
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// Create an instance method for authenticating user
StudentSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the user enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Student', StudentSchema);