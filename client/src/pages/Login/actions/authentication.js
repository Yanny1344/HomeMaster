import { users } from "../../../fakeData.js";

// export const auth = (userName, password, userType) => {
//     for (const user of users) {
//         if (user.userName === userName && user.userType === userType) {
//             const userID = user.userID;
//             if (user.password === password) return { userID: userID, name: user.name, pfp: user.pfp };
//             return { userID: -1, name: null, pfp: null };
//         }
//     }
//     return { userID: -1, name: null, pfp: null };
// };

export const validForm = (
    name,
    email,
    password,
    confirmPassword,
    userName,
) => {
    const returnValues = {
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        userName: true,
        
    };
    const emailFormat =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === "") {
        returnValues.name = false;
    }
    if (!emailFormat.test(email)) {
        returnValues.email = false;
    }
    if (userName === "") {
        returnValues.userName = false;
    }
    if (password === "") {
        returnValues.password = false;
    }
    if (confirmPassword === "" || confirmPassword !== password) {
        returnValues.confirmPassword = false;
        console.log(confirmPassword);
        console.log(password);
    }
    return returnValues;
};
