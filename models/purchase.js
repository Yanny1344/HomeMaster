/* Purchase model */
'use strict';

const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema({
	// { purchaseID: 0, clientID: 1, productID: 0, remainingHours: 36 },

    clientID:{
        type: String,
        required: true,
    },

    productID:{
        type: String,
        required: true,
    },

    remainingHours:{
        type: Number,
        required: true, 
		minimum: 0
    },
})

PurchaseSchema.statics.findOne = function(criteria) {
	const Purchase = this
	return Purchase.find(criteria).then((purchases) => {
		if (!purchases) {
			return Promise.reject() 
		}
		else{
			return Promise.resolve(purchases)
		}
	})
}

PurchaseSchema.statics.findAndUpdate = function(purchaseID, requestedDuration) {
	const Purchase = this
	console.log(requestedDuration)
	return Purchase.findOneAndUpdate({_id: purchaseID}, {$inc: {"remainingHours": -requestedDuration}}).then((purchase) => {
		if (!purchase) {
			return Promise.reject() 
		}
		else{
			return Promise.resolve(purchase)
		}
	})
}

// make a model using the Purchase schema
const Purchase = mongoose.model('Purchase', PurchaseSchema)
module.exports = { Purchase }

