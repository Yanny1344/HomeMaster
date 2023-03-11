/* Employement mongoose model */
const mongoose = require('mongoose')

const EmploymentSchema =new mongoose.Schema( {
    employer_id: {
        type: String, 
        required: true
    },
    employee_id: {
        type: String, 
        required: true
    }
})

EmploymentSchema.statics.findOne = function(criteria) {
	const Employment = this
	return Employment.find(criteria).then((employment) => {
		if (!employment) {
			return Promise.reject() 
		}
		else{
			return Promise.resolve(employment)
		}
	})
}
const Employment = mongoose.model('Employment', EmploymentSchema)
module.exports = { Employment }