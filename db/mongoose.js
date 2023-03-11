/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
   const mongoose = require('mongoose')

   /* Connnect to our database */
   // Get the URI of the local database, or the one specified on deployment.
   // const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/HomeMasterAPI'
   const mongoURI = process.env.DB_URI || 'mongodb+srv://team30:team30@cluster0.qkstq.mongodb.net/HomeMasterAPI?retryWrites=true&w=majority'
   
   mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
   
   module.exports = { mongoose }  // Export the active connection.