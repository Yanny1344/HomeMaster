/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
const UserSchema = new mongoose.Schema({
    // userID: 0,
    // email: "org@gmail.com",
    // userType: "Organization",
    // name: "Boss",
    // userName: "org",
    // pfp: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
    // password: "org",
	// productType: 2
	// hourlyWage: 20

    // userID:{
    //     type: Number,
	// 	minlength: 1,
	// 	trim: true,
	// 	// unique: true,

    // },

    userType:{
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },

    userName:{
        type: String,
        required: true,
        minlength: 1,
        unique: true,
    },

    pfp:{
        type: String,
        // required: true
    },

	name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
    
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	}, 
	password: {
		type: String,
		required: true,
		minlength: 3
	},
	// hourlyWage: {
	// 	type: Number,
	// 	required: false,
	// 	minlength: 1
	// },
	
	// productType: {
	// 	type: Number,
	// 	required: false,
	// 	minlength: 1
	// }
})

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByNamePassword = function(userName, password, userType) {
	const User = this // binds this to the User model
	console.log("findByNamePassword")
	// First find the user by their email
	return User.findOne({ userName: userName }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					console.log("correct password")
					if (userType === user.userType || userName === "admin"){
						console.log("correct type, or admin")
						resolve(user)
					}else{
						console.log("incorrect type")
						reject()
					}
				} else {
					reject()
				}
			})
		})
	})
}

UserSchema.statics.findMulti = function(IDs) {
	const User = this
	return User.find({ 
		_id: {
			$in: IDs
		}
	 }).then((users) => {
		if (!users) {
			return Promise.reject() 
		}else{
			return Promise.resolve(users)
		}
	})
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }

