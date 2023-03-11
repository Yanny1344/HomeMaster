

# Welcome to Home Master

---

![Image 2021-11-07 at 9 07 PM](https://user-images.githubusercontent.com/43226505/140674880-a891026a-e86f-4303-b181-e1166c57aa97.JPG)


<br/>

# General Introduction

  Home Master is an online platform.
  <br/>
  It provides a communication platform for Housekeeping companies, Employees of housekeeping companies, and Customers. 
  <br/>
  Housekeeping companies provides a variety of housekeeping service products.
  <br/>
  Customers could order these products from our Home Master online platform.
  <br/>
  It's just like a "housekeeping service" version of amazon.
  <br/>
Help the company and customers to communicate better, so that customers can get better service, so as to achieve a win-win situation.


# Due to Heroku Stop working, the following part will be updated Dec.8

Website Deployed on Heroku : https://desolate-garden-13245.herokuapp.com/

Website : https://desolate-garden-13245.herokuapp.com/

Heroku git repository: https://git.heroku.com/desolate-garden-13245.git

Github original repository: https://github.com/csc309-fall-2021/team30.git

DB_URI=mongodb+srv://team30:team30@cluster0.qkstq.mongodb.net/HomeMasterAPI?retryWrites=true&w=majority
PORT=5000

<br/>

# Development Setup

- Start mongo-db server:

```
cd team30
mkdir mongo-data
mongod --dbpath mongo-data

```



- Install independencies for the react project, and build the pages:

```
cd team30/client
npm install
npm run build
```

- Install independencies for the express server and start it:

```
cd team30
npm intall 
npm start
```

You can now visit the page via `localhost:5000`


# Features

There are 3 types of users for this app: (and Admin)

### Organization:
Sample organization user login in with default credential: <br/>
name: user3, password: user3.<br/>
Login in and see a webpage like this:
<img width="1026" alt="截屏2021-12-07 21 38 00" src="https://user-images.githubusercontent.com/43226505/145138704-e1ff947e-a93f-47b0-bf4d-c4e2e8636c0f.png">
- Calendar Tab: you can see the upcoming and past events that are related to your workers here. 
- Management Tab: you can add products and employees here. 
- Requests Tab: see all the service requests sent to you from your clients and assign workers to these requests. 
- Profile Tab: shows the account's profile page and allows logging out. 
<img width="990" alt="截屏2021-12-07 21 45 06" src="https://user-images.githubusercontent.com/43226505/145139289-db2c4a07-93c2-404f-9ec3-c4299782bbcc.png">

### Employee: 
Sample employee user login in with default credential: <br/>
name: employee, password: employee.<br/>
Login in and you could see a page like this:
<img width="1008" alt="截屏2021-12-07 21 45 43" src="https://user-images.githubusercontent.com/43226505/145139345-7f027e1f-22a7-4ed4-b750-257897f3003c.png">

- Calendar Tab: show the upcoming and past events that are assigned to this worker. 
- Requests Tab: see all the service requests sent to your organization. You can choose to accept them.
- Paystub Tab: see all your past work history and the amount of payment you should receive. 
- Profile Tab: shows the account's profile page and allows logging out. 

### Client: 
Sample client user login in with default credential: <br/>
name: user, password: user.<br/>
Login in and you could see a page like this:
<img width="1024" alt="截屏2021-12-07 21 42 59" src="https://user-images.githubusercontent.com/43226505/145139069-c696c43f-a405-4a58-a6cd-78da453435b6.png">
- Home Tab: see all the products that are available for purchase. 
- Calendar Tab: see the service requests (they are either assigned to workers or finished) that are accepted in a calendar view. 
- Payment Tab: client can see their added credit cards here, remove existing cards, or add a new card. 
- Purchased Tab: see the products that you have purchased and their remaining hours. You can request for service here for each product if there are still hours remained. 
- Profile Tab: shows the account's profile page and allows logging out. 

### ADMIN: 
Admin login in with unique credential: <br/>
name: admin, password: admin.<br/>
Login in and you could see a page like this:
<img width="1035" alt="截屏2021-12-07 21 46 34" src="https://user-images.githubusercontent.com/43226505/145139470-fc5f545e-cb2e-437d-b122-d69e7117f3ca.png">
- ALL USERS  Tab: see a list of all the users' information in Home Master system.
- DELETE Tab (after each user's information) : delete this user.
- ALL PRODUCTS  Tab: see a list of all the products' informatiom in Home Master system.
- " + " Tab: add a new user ( Client or Organization )<br/>
Click on "+" Tab and see a webpage like this
<img width="1031" alt="截屏2021-12-07 21 53 18" src="https://user-images.githubusercontent.com/43226505/145140094-9e0c1bd2-2030-49bf-bd5a-704663149a9f.png">
Input name, password and choose user type for new user.
<br/>


# General Workflow

1. Assuming that we have an organization O, a client C, an employee E in the database. 
2. Organization adds a product via the Management tab. They can specify the name of the product, the hourly service price, the max hours per visit, the total hours, and the hourly wage for the worker who do take this job. 
3. Client can now see the product via the Home tab. 
4. Client adds a credit card via the Payment tab. (Specifying card number, cvv and the exp. date)
5. Client finds the product in Home tab, chooses a card and clicks on "place order". 
6. A new purchase is now added to the client's Purchase Tab. 
7. The client can request for a service in the Purchase Tab for their newly-created purchase. They can specify a date and time. 
8. Both the organization and the employee can now see the request in their Request tab. 
9. The organization can assign the job to one of their employees using a drop-down list, showing all its employees. 
10. The employee can click on 'accept' to take the requested job, if that job hasn't been assigned to anyone. 
11. After 9 or 10, a new event is now created for both the assigned worker and the client. 
12. This new event can be seen on the calendar view now, for all three parties. 
13. After the date of the event, its status will be set to "finished". A record for this job will be added to the worker's Paystub tab. 

# Admin Workflow
1. Assuming that we have an Admin A in the database. We will have only one admin ( name: admin; password: admin ) in the app.
2. Admin login and will see a list of all the users' informatiom in Home Master system. Click Delete tab to delete existing user.
3. Click on All products tab, admin will see a list of all products' informatiom in Home Master system.
4. Click on " + " tab at top right coner to add a new Client or a new Organization. 


<br/>

# Notes: 

### Account creation:
- The client can create an account via the signup tab. 
- An employee account has to be created via the organization's Management tab. 
- An organization account has to be created by the Admin. 

### Session:
- The user will not sign out on page refresh. They will stay signed in until session timed out or if they choose to log out via the profile page. 

<br/>

# Default credentials

- For client: `name: user; password: user`
- For admin: `name: admin; password: admin`

<br/>

### Routes Overview:
Overview of routes:

<br/>
1. Adding a product:
app.post('/product/create')
<br/>
2. Get the productlist for an organization( expecting organizationID:req.params.org_id ):
app.get('/products/:org_id')
<br/>
3. Adding a user:
app.post('/user/signup')
<br/>
    Expecting new user info: 
   new User({
        userType: req.body.userType,
        pfp: req.body.pfp,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name
    })
<br/>
4. Get all employee:
app.get('/employees')
<br/>
5. Get a user by id(expecting userId req.params.user_id):
app.get('/user/:user_id')
<br/>
6. Removing an employee(expecting employeeID req.params.user_id):
app.delete('/employee/:user_id')
<br/>
7. Removing a client(expecting clientID req.params.user_id):
app.delete('/client/:user_id')
<br/>
8. Removing an organization(expecting organizationID req.params.user_id):
app.delete('/organization/:user_id')
<br/>
9. Getting all purchases of the client(expecting clientID req.params.user_id):
app.get('/purchase/:client_id')
<br/>
10. Add a piece of employment info:
<br/>
expecting new employment info: new Employment({
        employer_id: req.body.employer_id,
        employee_id: req.body.employee_id,
    })
    <br/>
app.post('/employment/')
<br/>


# Third-party Library Use
- react-bootstrap
- Material-UI
