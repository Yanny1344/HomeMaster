/* server.js for react-express-authentication */
"use strict";

/* Server environment setup */
// To run in development mode, run normally: node server.js
// To run in development with the test user logged in the backend, run: TEST_USER_ON=true node server.js
// To run in production mode, run in terminal: NODE_ENV=production node server.js
const env = process.env.NODE_ENV // read the environment variable (will be 'production' in production mode)

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
const TEST_USER_ID = '5fb8b011b864666580b4efe3' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file
const TEST_USER_EMAIL = 'test@user.com'
//////

const log = console.log;
const path = require('path')

const express = require("express");
// following line of code may be deleted
require('dotenv/config'); 
// starting the express server
const app = express();

// enable CORS if in development, for React local development server to connect to the web server.
const cors = require('cors')
if (env !== 'production') { app.use(cors()) }

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// the following line of code may be deleted
// connect to mongoose database
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, userUnifiedTopology:true})
.then(  () => {
    console.log('DB Connected');
})
.catch(  () => {
    console.log("DB Connection Lost");
});

// import the mongoose models
const { Payment } = require("./models/payment");
const { Product } = require("./models/product");
const { User } = require("./models/user");
const { Employment } = require("./models/employment");
const { Event } = require("./models/event")
const { Purchase } = require("./models/purchase")

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser') 
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)


// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo') // to store session information on the database in production


function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

// Middleware for authentication of resources
// const authenticate = (req, res, next) => {
//     if (env !== 'production' && USE_TEST_USER)
//         req.session.user = TEST_USER_ID // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

//     if (req.session.user) {
//         User.findById(req.session.user).then((user) => {
//             if (!user) {
//                 return Promise.reject()
//             } else {
//                 req.user = user
//                 next()
//             }
//         }).catch((error) => {
//             res.status(401).send("Unauthorized")
//         })
//     } else {
//         res.status(401).send("Unauthorized")
//     }
// }


/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        // store the sessions on the database in production
        // store: env === 'production' ? MongoStore.create({
        //                                             mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/HomeMasterAPI'
        //                                 }) : null
        store: env === 'production' ? MongoStore.create({
                                                    mongoUrl: process.env.DB_URI || 'mongodb+srv://team30:team30@cluster0.qkstq.mongodb.net/HomeMasterAPI?retryWrites=true&w=majority'
                                        }) : null

    })
);

// other API routes can go here...
// ...
// A route to login and create a session
app.post("/user/login", (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const userType = req.body.typeChosen;

    // log(email, password);
    // Use the static method on the User model to find a user
    // by their userName and password
    User.findByNamePassword(userName, password, userType)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.userName = user.userName; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            req.session.currentUser = user;
            res.send({ currentUser: user});
            
        })
        .catch(error => {
            log(error)
            res.status(400).send()
        });
});


/*** API Routes below ************************************/
// User API Route

/// PRODUCTS

// Adding a product
app.post('/product/create', mongoChecker, async (req, res) => {
    log(req.body)

    // Create a new user
    const product = new Product({
        productID: req.body.productID,
        organizationID: req.body.organizationID,
        productType: req.body.productType,
        price: req.body.price,
        hours: req.body.hours,
        maxHour: req.body.maxHour,
        des: req.body.des,
        hourlyWage: req.body.hourlyWage,
        name: req.body.name,
        pfp: req.body.pfp
    })

    try {
        // Save the product
        const newProduct = await product.save()
        res.send(newProduct)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})


app.delete('/product/:id', mongoChecker, async (req, res) => {
    const id = req.params.id;

    try {
        const feedback = []
        const removal_product = await Product.remove({_id: id})
        feedback.push(removal_product)
        const removal_event = await Event.remove({productID: id})
        feedback.push(removal_event)
        const removal_purchase = await Purchase.remove({productID: id})
        res.send(feedback)
    }
    catch{
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// get the productlist for an organization
app.get('/products/:org_id', mongoChecker, async (req, res) => {
    const id = req.params.org_id

    if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}
    // Get the products
    try {
        const products = await Product.find({organizationID:id})
        // res.send(students) // just the array
        res.send({ products }) // can wrap students in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})

// get the productlist for all organization
app.get('/products', mongoChecker, async (req, res) => {
    try {
        const products = await Product.find()
        res.send({ products }) // can wrap students in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

/// -----  USERS -----

// Adding a user
app.post('/user/signup', mongoChecker, async (req, res) => {
    log(req.body)
    
    // Create a new user
    const user = new User({
        userType: req.body.userType,
        pfp: req.body.pfp,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name
    })

    try {
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// get all employee
app.get('/employees', mongoChecker, async (req, res) => {
    // Get the products
    try {
        const employees = await User.find({userType: "Employee"})
        res.send({ employees }) // can wrap students in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})


// get a user by id
app.get('/user/:user_id', mongoChecker, async (req, res) => {
    const userID = req.params.user_id
    try{
        const user = await User.findOne({ _id: userID }).then((user) => {
            if (!user) {
                return Promise.reject() 
            }
            else{
                return Promise.resolve(user)
            }
        })
        res.send(user)
    }
    catch(error){
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// Removing a employee
app.delete('/employee/:user_id', mongoChecker, async (req, res) => {
    const id = req.params.user_id;

    try {
        const feedback = []
        const removal_user = await User.remove({_id: id})
        feedback.push(removal_user)
        const removal_employment = await Employment.remove({employee_id: id})
        feedback.push(removal_employment)
        res.send(feedback)
    }
    catch{
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// Removing a client
app.delete('/client/:user_id', mongoChecker, async (req, res) => {
    const id = req.params.user_id;

    try {
        const feedback = []
        const removal_user = await User.remove({_id: id})
        feedback.push(removal_user)
        const removal_event = await Event.remove({clientID: id})
        feedback.push(removal_event)
        const removal_purchase = await Purchase.remove({clientID: id})
        feedback.push(removal_purchase)
        const removal_payment = await Payment.remove({clientID: id})
        feedback.push(removal_payment)
        res.send(feedback)
    }
    catch{
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// removing an organization
app.delete('/organization/:user_id', mongoChecker, async (req, res) => {
    const id = req.params.user_id;

    try {
        const feedback = []
        const removal_user = await User.remove({_id: id})
        feedback.push(removal_user)
        const removal_event = await Event.remove({clientID: id})
        feedback.push(removal_event)
        const removal_employment = await Employment.remove({employee_id: id})
        feedback.push(removal_employment)
        res.send(feedback)
    }
    catch{
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

// Get All userInfo
app.get('/users', mongoChecker, async (req, res) => {
    try {
        const users = await User.find()
        res.send({ users }) // can wrap students in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }
})




/// -----  Events  -----
// Removing an event
app.delete('/event/:event_id', mongoChecker, async (req, res) => {
})

// Getting all the events relating to an organization
app.get('/event/find_by_org/:org_id', mongoChecker, async (req, res) => {
    const orgID = req.params.org_id
    try{
        const events = await Event.findOne({organization: orgID})
        res.send(events)
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
})

// Getting all the events relating to a client
app.get('/event/find_by_client/:client_id', mongoChecker, async (req, res) => {
    const clientID = req.params.client_id
    try{
        const events = await Event.findOne({clientID: clientID})
        res.send(events)
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
})
// Getting all the events relating to a worker
app.get('/event/find_by_worker/:worker_id', mongoChecker, async (req, res) => {
    const workerID = req.params.worker_id
    try{
        const events = await Event.findOne({workerID: workerID})
        res.send(events)
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
})
// Getting all the requested events for a worker
app.get('/event/find_requested_event_for_worker/:worker_id', mongoChecker, async (req, res) => {
    const workerID = req.params.worker_id
    try{
        // find organizationID in employment
        const employment = await Employment.findOne({
            employee_id : workerID
        })
        const employerID = employment.employer_id
        
        const events = await Event.findOne({
            oraganization: employerID,
            status : "requested"
        })
        res.send(events)
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
})
// Getting all the requested events for a orgnization
app.get('/event/find_requested_event_for_org/:org_id', mongoChecker, async (req, res) => {
    const orgID = req.params.org_id
    console.log(orgID)
    try{
        const events = await Event.findOne({
            organization: orgID,
            status : "requested"
        })
        res.send(events)
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
})

// Changing the status ("requested", "assigned", "finished") of an event
app.patch('/event/:event_id', mongoChecker, async (req, res) => {
    const {workerID} = req.body
    const {event_id} = req.params

    try {
        const updatedEvent = await Event.findAndUpdate(event_id, workerID)
        res.send(updatedEvent)

    } catch (error) {
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') 
        }
    }
})

async function checkFinished(){
    try {
        const updatedEvent = await Event.checkFinished()

    } catch (error) {
        console.log("couldn't update finishing status for events...")
    }
    setTimeout(checkFinished, 5000)
}

checkFinished()




/// -----  Purchases -----

// Getting all purchases of the client
app.get('/purchase/:client_id', mongoChecker, async (req, res) => {
    const clientID = req.params.client_id
    try{
        const purchases = await Purchase.findOne({clientID: clientID})
        res.send(purchases)
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
})

// Add a new purchase into the db by specifying
// the client ID and the product ID
// Note that the remainingHours equal to
// the total hour for this product
app.post('/purchase', mongoChecker, async (req, res) => {
    // Create a new purchase
    const purchase = new Purchase({
        clientID: req.body.clientID, 
        productID: req.body.productID,
        remainingHours: req.body.remainingHours
    })

    try {
        const newPurchase = await purchase.save()
        res.send(newPurchase)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// Change the remainingHours of the purchase
// If the remainingHours is less than 0 it will not be requestable 
// (but that part of the logic is written in the event request part)
app.patch('/purchase', mongoChecker, async (req, res) => {
    const {purchaseID, clientID, productID, organizationID, requestedTime, requestedDuration} = req.body

    try {
        const updatedPurchase = await Purchase.findAndUpdate(purchaseID, requestedDuration)
        const event = new Event({
            clientID: clientID,
            productID: productID,
            workerID: null,
            hours: requestedDuration,
            time: requestedTime, 
            organization:  organizationID,       
            status: "requested",
        })
        await event.save()
        res.send(updatedPurchase)

    } catch (error) {
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') 
        }
    }
})

/// -----  PaymentInfo -----

// Add a new payment info to the db, need to specify
// the clientID, the cardnumber, the cvv, the exp. date
app.post('/payment', mongoChecker, async (req, res) => {
    console.log(req.body)

    const payment = new Payment({
        clientID: req.body.clientID, 
        cardNum: req.body.cardNum, 
        cvv: req.body.cvv, 
        mmdd: req.body.mmdd
    })

    try {
        const newPayment = await payment.save()
        res.send(newPayment)
    } catch (error) {
        if (isMongoError(error)) { 
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') 
        }
    }
})

// Remove a credit card
// Specify the client ID and the cardNum
app.delete('/payment/:user_id/:cardNum', mongoChecker, async (req, res) => {
    const id = req.params.user_id;
    const card = req.params.cardNum;
    try {
        const removal_result = await Payment.remove({clientID: id, cardNum: card})
        res.send(removal_result)
    }
    catch{
        log(error)
        res.status(500).send("Internal Server Error")
    }
})


// Retrieve all credit card info for a certain user
// Specify the clientID
app.get('/payment/:user_id', mongoChecker, async (req, res) => {
    const id = req.params.user_id;
    try{
        const cards = await Payment.find({clientID: id})
        res.send(cards)
    }
    catch{
        log(error)
        res.status(500).send("Internal Server Error")
    }
    
})



/// -----  Employment -----

// Add a piece of employment info
app.post('/employment/', mongoChecker, async (req, res) => {
    
    // Create a new user
    const employment = new Employment({
        employer_id: req.body.employer_id,
        employee_id: req.body.employee_id,
    })

    try {
        const newEmployment = await employment.save()
        res.send(newEmployment)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// get employment for an organizaiton
app.get('/employment/:employer_id', mongoChecker, async (req, res) => {
    const id = req.params.employer_id;
    if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}
    try{
        const employments = await Employment.find({employer_id: id})
        res.send(employments)
    }
    catch{
        log(error)
        res.status(500).send("Internal Server Error")
    }
})
// get employee for an organization
app.get('/employment/find_employees/:employer_id', mongoChecker, async (req, res) => {
    const orgID = req.params.employer_id;

    try{
        const employments = await Employment.find({employer_id: orgID})
        const employeeIDs = employments.map(({employee_id}) => employee_id)
        const employees = await User.findMulti(employeeIDs)
        res.send(employees)
    }
    catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});


// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    if (env !== 'production' && USE_TEST_USER) { // test user on development environment.
        req.session.user = TEST_USER_ID;
        req.session.email = TEST_USER_EMAIL;
        res.send({ currentUser: TEST_USER_EMAIL })
        return;
    }

    if (req.session.user) {
        res.send({ currentUser: req.session.currentUser });
    } else {
        res.status(401).send();
    }
});



/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // send index.html
   
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
