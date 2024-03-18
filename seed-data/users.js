const userRole = require('./constants/userRole');

const users = [
    {
        _id: "624a4a94c66738f13854b474",
        name: "Amira EL-Garf",
        username: "amiraelgarf",
        email: "amiraelgarf@gmail.com",
        password: "12345678",
        gender: "Female",
        birth_date: "2002-01-01",
        roleId: userRole.defaultRole._id,
        isnsfw: true,
        followers: ["624a52d75ff69df002d25035"],
        followings: ["624a52d75ff69df002d25035"],
    },
    {
        _id: "624a4fbf3f392aefdb4dd1c8",
        name: "Farouq",
        username: "farouq12",
        email: "Farouqdiaaeldin@gmail.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2003-4-10",
        roleId: userRole.moderatorRole._id,
        isnsfw: true,
    },
    {
        _id: "624a52d75ff69df002d25035",
        name: "Mahmoud Abbas",
        username: "mahmoudabbas",
        email: "mahmoudaly964@gmail.com",
        password: "1234567890",
        gender: "Male",
        birth_date: "2003-5-10",
        roleId: userRole.defaultRole._id,
        isnsfw: false,
        followers: ["624a4a94c66738f13854b474"],
        followings: ["624a4a94c66738f13854b474"],
    },
]

exports.data = users;