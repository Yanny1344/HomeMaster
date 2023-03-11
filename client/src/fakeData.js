// The users table
export const users = [
    {
        userID: 0,
        email: "org@gmail.com",
        userType: "Organization",
        name: "Boss",
        userName: "org",
        pfp: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
        password: "org",
    },
    {
        userID: 1,
        email: "client@qq.com",
        userType: "Client",
        name: "Yixuan",
        userName: "user1",
        pfp: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
        password: "user1",
    },
    {
        userID: 2,
        email: "employee@163.com",
        userType: "Employee",
        name: "Cool Worker",
        userName: "employee1",
        hourlyWage: 35,
        pfp: "https://image.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg",
        password: "employee1",
    },
    {
        userID: 3,
        email: "employee2@163.com",
        userType: "Employee",
        name: "Slow Worker",
        userName: "employee2",
        hourlyWage: 25,
        pfp: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
        password: "employee2",
    },
    {
        userID: 9,
        email: "admin@admin.com",
        userType: "Admin",
        name: "admin",
        userName: "admin",
        pfp: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
        password: "admin",
    },
];

// The employment relation table
export const employment = [
    { employer: 0, employee: 2 },
    { employer: 0, employee: 3 },
];

// The products table
export const products = [
    {
        productID: 0,
        organizationID: 0,
        productType: 0,
        name: "Bright Home",
        price: 1300,
        hours: 40,
        maxHour: 2,
        des: "The package includes 40 hours of housekeeping service. Clients are \
        welcome to plan how these hours will be used."
    },
    {
        productID: 1,
        organizationID: 4,
        name: "Baby Sitting+",
        productType: 2,
        price: 800,
        hours: 20,
        maxHour: 4,
        des: "The package includes 20 hours of babysitting service. Clients are \
        welcome to plan how these hours will be used."
    },
    {
        productID: 2,
        organizationID: 1,
        productType: 0,
        name: "Cleaning Squad",
        price: 600,
        hours: 20,
        maxHour: 5,
        des: "further description needed"
    },
    {
        productID: 3,
        organizationID: 1,
        productType: 0,
        name: "Cleaning Squad",
        price: 1500,
        hours: 30,
        maxHour: 2,
        des: "further description needed"
    },
    {
        productID: 4,
        organizationID: 5,
        productType: 2,
        name: "Golden Apple",
        price: 2000,
        hours: 40,
        maxHour: 5,
        des: "further description needed"
    },
    {
        productID: 5,
        organizationID: 2,
        productType: 1,
        name: "Toolbox",
        price: 300,
        hours: 6,
        maxHour: 2,
        des: "further description needed"
    },
    {
        productID: 6,
        organizationID: 3,
        productType: 1,
        name: "Patrick Plumber",
        price: 200,
        hours: 4,
        maxHour: 2,
        des: "further description needed"
    },
    {
        productID: 7,
        organizationID: 6,
        productType: 3,
        name: "Furniture Builder",
        price: 40,
        hours: 4,
        maxHour: 2,
        des: "further description needed"
    },
    {
        productID: 8,
        organizationID: 7,
        productType: 3,
        name: "Tree House",
        price: 80,
        hours: 3,
        maxHour: 3,
        des: "further description needed"
    },
    {
        productID: 9,
        organizationID: 0,
        productType: 0,
        name: "Bright Home",
        price: 1300,
        hours: 40,
        maxHour: 2,
        des: "The package includes 40 hours of housekeeping service. Clients are \
        welcome to plan how these hours will be used."
    },
    {
        productID: 10,
        organizationID: 0,
        productType: 0,
        name: "Bright Home",
        price: 1300,
        hours: 40,
        maxHour: 2,
        des: "The package includes 40 hours of housekeeping service. Clients are \
        welcome to plan how these hours will be used."
    },
];

// organization picture table
export const organizations = [
    {
        organizationID: 0,
        userID: 0, // account associated with this organization
        productType: 0,
        name: "Bright Home",
        logo: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
    },
    {
        organizationID: 1,
        userID: 5,
        productType: 0,
        name: "Cleaning Squad",
        logo: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
    },
    {
        organizationID: 2,
        userID: 6,
        productType: 1,
        name: "Toolbox",
        logo: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
    },
    {
        organizationID: 3,
        userID: 7,
        productType: 1,
        name: "Patrick Plumber",
        logo: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
    },
    {
        organizationID: 4,
        userID: 8,
        productType: 2,
        name: "Baby Sitting+",
        logo: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
    },
    {
        organizationID: 5,
        userID: 9,
        productType: 2,
        name: "Golden Apple",
        logo: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
    },
    {
        organizationID: 6,
        userID: 10,
        productType: 3,
        name: "Furniture Builder",
        logo: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
    },
    {
        organizationID: 7,
        userID: 11,
        productType: 3,
        name: "Tree House",
        logo: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
    },

];

// The purchase table
export const purchases = [
    { purchaseID: 0, clientID: 1, productID: 0, remainingHours: 36 },
    { purchaseID: 1, clientID: 1, productID: 1, remainingHours: 16 },
    { purchaseID: 3, clientID: 1, productID: 0, remainingHours: 32 },
    { purchaseID: 4, clientID: 1, productID: 1, remainingHours: 12 },
    { purchaseID: 5, clientID: 1, productID: 0, remainingHours: 1 },
    { purchaseID: 6, clientID: 1, productID: 1, remainingHours: 6 },
    { purchaseID: 7, clientID: 1, productID: 0, remainingHours: 8 },
    { purchaseID: 8, clientID: 1, productID: 1, remainingHours: 13 },
];

// The payment info table
export const paymentInfo = [
    { clientID: 1, cardNum: 4556768665877074, cvv: 542, mmdd: "0423" },
    { clientID: 1, cardNum: 4916378931124833, cvv: 601, mmdd: "0522" },
];

// Event info table
// An event can have 3 status:
// 1. Requested. The user has sent a request to schedule this event, but no worker has been assigned yet.
// 2. Assigned. The event has been assigned to someone and waiting to happen.
// 3. Finished. The event has taken place and confirmed by the user.
export const events = [
    {
        eventID: 0,
        organization: 0,
        clientID: 1,
        productID: 0,
        workerID: 2,
        hours: 2,
        time: "2021-03-12T13:00:00+00:00",
        status: "finished",
    },
    {
        eventID: 1,
        organization: 0,
        clientID: 1,
        productID: 0,
        workerID: 2,
        hours: 2,
        time: "2021-11-15T16:00:00+00:00",
        status: "finished",
    },
    {
        eventID: 2,
        organization: 0,
        clientID: 1,
        productID: 0,
        workerID: null,
        hours: 2,
        time: "2021-11-15T17:30:00+00:00",
        status: "requested",
    },
    {
        eventID: 3,
        organization: 0,
        clientID: 1,
        productID: 1,
        workerID: 3,
        hours: 4,
        time: "2021-11-01T09:00:00+00:00",
        status: "assigned",
    },
    {
        eventID: 4,
        organization: 0,
        clientID: 1,
        productID: 0,
        workerID: 2,
        hours: 2,
        time: "2021-11-16T17:30:00+00:00",
        status: "assigned",
    },
    {
        eventID: 5,
        organization: 0,
        clientID: 1,
        productID: 0,
        workerID: 2,
        hours: 2,
        time: "2021-11-16T17:30:00+00:00",
        status: "assigned",
    },
    {
        eventID: 6,
        organization: 0,
        clientID: 1,
        productID: 1,
        workerID: 2,
        hours: 2,
        time: "2021-11-16T17:30:00+00:00",
        status: "assigned",
    },
    {
        eventID: 7,
        organization: 0,
        clientID: 1,
        productID: 0,
        workerID: 2,
        hours: 2,
        time: "2021-11-16T17:30:00+00:00",
        status: "assigned",
    },
    {
        eventID: 8,
        organization: 0,
        clientID: 1,
        productID: 1,
        workerID: 3,
        hours: 2,
        time: "2021-11-16T17:30:00+00:00",
        status: "assigned",
    },
    {
        eventID: 9,
        organization: 0,
        clientID: 1,
        productID: 0,
        workerID: 3,
        hours: 2,
        time: "2021-11-16T17:30:00+00:00",
        status: "assigned",
    },
];

// Notification table. Types of notifications:
// 1. Purchase. Organizations will be notified when a product is sold.
// 2. Request. Organizations and workers will receive scheduling requests.
// 3. Scheduling. The assigned worker and the client will receive a notification when a job is assigned.
// 4. Confirmation-prompt. When a job is supposed to be done at a time point, the client will receive a notification to confirm it.
// 5. Confirmation. When a job is confirmed done by the client, the assigned worker will receive a notification.
// receiver:
// 0: organization 1: employee 2: client
export const notifications = [
    {
        notificationID: 0,
        receiver: 0,
        type: "Purchase",
        worker: null,
        client: 1,
        organization: 0,
        product: 0,
        time: "2021-03-11T15:02:08+00:00",
    },
    {
        notificationID: 1,
        receiver: 0,
        type: "Request",
        worker: 2,
        client: 1,
        organization: 0,
        product: 0,
        time: "2021-03-11T17:05:00+00:00",
    },
    {
        notificationID: 1,
        receiver: 1,
        type: "Request",
        worker: 2,
        client: 1,
        organization: 0,
        product: 0,
        time: "2021-03-11T17:05:00+00:00",
    },
    {
        notificationID: 2,
        receiver: 1,
        type: "Scheduling",
        worker: 2,
        client: 1,
        product: 0,
        time: "2021-03-11T17:05:00+00:00",
    },
    {
        notificationID: 2,
        receiver: 2,
        type: "Scheduling",
        worker: 2,
        client: 1,
        product: 0,
        time: "2021-03-11T17:05:00+00:00",
    },
    {
        notificationID: 3,
        receiver: 2,
        type: "Confirmation-prompt",
        worker: 2,
        client: 1,
        product: 0,
        time: "2021-03-11T17:05:00+00:00",
    },
    {
        notificationID: 4,
        receiver: 1,
        type: "Confirmation",
        worker: 2,
        client: 1,
        product: 0,
        time: "2021-03-11T17:05:00+00:00",
    },
];
