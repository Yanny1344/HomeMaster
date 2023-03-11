/* Product mongoose model */
const mongoose = require('mongoose')

const Payment = mongoose.model('Payment', {
    clientID: {
        type: String, 
        required: true
    },
    cardNum: {
        type: String, 
        required: true, 
        minlength: 16, 
        maxlength: 16
    },
    cvv: {
        type: String, 
        required: true, 
        minlength: 3,
        maxlength: 3
    },
    mmdd: {
        type: String, 
        required: true, 
        minlength: 4,
        maxlength: 4
    }
})

module.exports = { Payment }