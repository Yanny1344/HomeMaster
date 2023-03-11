/* Event model */
'use strict';

const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
	// {
    //     eventID: 0,
    //     organization: 0,
    //     clientID: 1,
    //     productID: 0,
    //     workerID: 2,
    //     hours: 2,
    //     time: "2021-03-12T13:00:00+00:00",
    //     status: "finished",
    // },

    clientID:{
        type: String,
        required: true,
    },

    productID:{
        type: String,
        required: true
    },

	workerID: {
		type: String,
	},
    
	hours: {
		type: Number,
		required: true,
	}, 

	time: {
		type: Date,
		required: true,
	},
	organization: {
		type: String,
		required: true
	},

	status: {
		type: String,
		required: true,
	},
})

EventSchema.statics.findOne = function(criteria) {
	const Event = this
	return Event.find(criteria).then((events) => {
		if (!events) {
			return Promise.reject() 
		}
		else{
			return Promise.resolve(events)
		}
	})
}

EventSchema.statics.findAndUpdate = function(eventID, workerID) {
	const Event = this
	return Event.findOneAndUpdate({_id: eventID}, {status: "assigned", workerID: workerID}).then((event) => {
		if (!event) {
			return Promise.reject() 
		}
		else{
			return Promise.resolve(event)
		}
	})
}

EventSchema.statics.checkFinished = function() {
	const Event = this
	const now = new Date()
	return Event.updateMany({time: {$lt: now}, status: "assigned"}, {status: "finished"}).then((event) => {
		if (!event) {
			return Promise.reject() 
		}
		else{
			return Promise.resolve(event)
		}
	})
}

// make a model using the User schema
const Event = mongoose.model('Event', EventSchema)
module.exports = { Event }