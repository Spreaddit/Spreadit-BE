const userRole = require('./constants/userRole');

const users = [
    {
        _id: "624a4a94c66738f13854b474", // amira
        // Username: amiraelgarf
        name: "Amira EL-Garf",
        username: "amiraelgarf",
        email: "amiraelgarf@gmail.com",
        password: "12345678",
        gender: "Female",
        birth_date: "2002-01-01",
        roleId: userRole.defaultRole._id,
        isnsfw: true,
        isVerified: true,
        followers: ["624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8", "624a6a677c8d9c9f5fd5eb0b"],
        followings: ["624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8", "624a6a677c8d9c9f5fd5eb0b"],
    },
    {
        _id: "624a4fbf3f392aefdb4dd1c8", // farouq
        // Username: farouq12
        name: "Farouq",
        username: "farouq12",
        email: "Farouqdiaaeldin@gmail.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2003-4-10",
        roleId: userRole.defaultRole._id,
        isnsfw: true,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a6a677c8d9c9f5fd5eb0b"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a6a677c8d9c9f5fd5eb0b"],
    },
    {
        _id: "624a52d75ff69df002d25035", // mahmoud
        // Username: mahmoudabbas
        name: "Mahmoud Abbas",
        username: "mahmoudabbas",
        email: "mahmoudaly964@gmail.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2003-5-10",
        roleId: userRole.defaultRole._id,
        isnsfw: false,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a6a677c8d9c9f5fd5eb0b"],
        followings: ["624a4a94c66738f13854b474", "624a6a677c8d9c9f5fd5eb0b"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
        // Username: abdullah
        name: "Abdullah Haitham",
        username: "abdullah12",
        email: "hedeya@gmail.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2003-08-15",
        roleId: userRole.defaultRole._id,
        isnsfw: true,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb0c", // Mimo
        // Username: mimo
        name: "Mariam Mahrous",
        username: "mimo",
        email: "mariam.aal03@eng-st.cu.edu.eg",
        password: "12345678",
        gender: "Female",
        birth_date: "2003-03-20",
        roleId: userRole.defaultRole._id,
        isnsfw: true,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb0d", // Basem
        // Username: basem
        name: "Basem Elgalfy",
        username: "basemelgalfy",
        email: "basem_elgalfy@yahoo.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2004-12-05",
        roleId: userRole.defaultRole._id,
        isnsfw: false,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb0e", // Basma
        // Username: basma
        name: "Basma Mohamed",
        username: "basma12",
        email: "basmaa2003@gmail.com",
        password: "12345678",
        gender: "Female",
        birth_date: "2003-07-18",
        roleId: userRole.defaultRole._id,
        isnsfw: true,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb0f", // Farida
        // Username: farida
        name: "Farida Moukhtar",
        username: "faridamoukhtar",
        email: "farida.moukhtar03@eng-st.cu.edu.eg",
        password: "12345678",
        gender: "Female",
        birth_date: "2002-10-25",
        roleId: userRole.defaultRole._id,
        isnsfw: false,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb10", // Abdelrahman
        // Username: abdelrahman
        name: "Abdelrahman Akefafy",
        username: "abdelrahman12",
        email: "abdelrahman.akefafy@gmail.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2002-04-30",
        roleId: userRole.defaultRole._id,
        isnsfw: true,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb11", // Rehab
        // Username: rehab
        name: "Rehab Fecky",
        username: "rehabfecky",
        email: "rehabfecky@gmail.com",
        password: "12345678",
        gender: "Female",
        birth_date: "2002-02-12",
        roleId: userRole.defaultRole._id,
        isnsfw: false,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb12", // Youssef
        // Username: youssef
        name: "Youssef Ayman",
        username: "youssef12",
        email: "yusuf.ayman@gmail.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2002-08-27",
        roleId: userRole.defaultRole._id,
        isnsfw: true,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb13", // Galal
        // Username: galal
        name: "Galal Mohamed",
        username: "galal12",
        email: "galalmohamed2003@gmail.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2002-03-15",
        roleId: userRole.defaultRole._id,
        isnsfw: false,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb14", // Karim
        // Username: karim
        name: "Karim Hasseb",
        username: "karimhasseb",
        email: "karim.hasseb02@eng-st.cu.edu.eg",
        password: "12345678",
        gender: "Male",
        birth_date: "2002-09-10",
        roleId: userRole.defaultRole._id,
        isnsfw: true,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb15", // Chahd
        // Username: chahd
        name: "Chahd Zalaky",
        username: "chahdzalaky",
        email: "shahd.zalaky@gmail.com",
        password: "12345678",
        gender: "Female",
        birth_date: "2002-11-22",
        roleId: userRole.defaultRole._id,
        isnsfw: false,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
        // Username: mahmoud
        name: "Mahmoud loutfy",
        username: "mahmoud12",
        email: "mahmoud.loutfy3333@gmail.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2002-05-07",
        roleId: userRole.defaultRole._id,
        isnsfw: true,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb17", // Maher
        // Username: maher
        name: "Mohamed Maher",
        username: "maher12",
        email: "m7mdrefaat550@gmail.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2002-08-30",
        roleId: userRole.defaultRole._id,
        isnsfw: false,
        isVerified: true,
        followers: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
        followings: ["624a4a94c66738f13854b474", "624a52d75ff69df002d25035", "624a4fbf3f392aefdb4dd1c8"],
    },
    {
        _id: "624a6a677c8d9c9f5fd5eb17", // Maher
        name: "Ahmed Ashry",
        username: "ashry12",
        email: "ahmadashry2002@gmail.com",
        password: "12345678",
        gender: "Male",
        birth_date: "2002-08-30",
        roleId: userRole.adminRole._id,
        isnsfw: false,
        isVerified: true,
    },
]

exports.data = users;