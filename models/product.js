/* Product mongoose model */
const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    organizationID:{
        type: String,
        required: true,
		minlength: 1,
		trim: true,
		unique: true,
    },
    productType:{
        type: Number,
        required: true,
        min: 0,
        max:3
    },
	hourlyWage: {
		type: Number,
		required: false,
		minlength: 1
	},

	price:{
        type: Number,
        required: true,
		minlength: 1,
		trim: true,
    },
    
    hours:{
        type: Number,
        required: true,
		minlength: 1,
		trim: true,
    },

    maxHour:{
        type: Number,
        required: true,
		minlength: 1,
		trim: true,
    },

    des:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },

    name:{
        type: String,
        required: true,
        minlength: 1,
    },
    
    pfp:{
        type: String,
        required: true
    },
})

module.exports = { Product }


// productID: 0,
//         organizationID: 0,
//         productType: 0,
//         name: "Bright Home",
//         price: 1300,
//         hours: 40,
//         maxHour: 2,
//         des: "The package includes 40 hours of housekeeping service. Clients are \
//         welcome to plan how these hours will be used."