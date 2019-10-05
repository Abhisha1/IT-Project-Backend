const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://zerobug-f79e9.firebaseio.com"
})

let getAllUsers = function (request, response) {
    let defaultAuth = admin.auth();
    
    let userName = request.body.name;
    // List batch of users, 1000 at a time.
    let searchedUsers = []
    defaultAuth.listUsers(1000)
        .then(function (listUsersResult) {
            listUsersResult.users.forEach(function (userRecord) {
                console.log(userRecord.displayName.toLowerCase());
                console.log(userName.toLowerCase());
                if (userRecord.displayName.toLowerCase().includes(userName.toLowerCase())) {
                    searchedUsers.push(userRecord);
                    console.log(searchedUsers);
                }
            })
            if(searchedUsers.length > 0){
                response.status(200).json({ msg: "Success", users: searchedUsers })
            }
            else{
                response.status(200).json({ msg: "No matches"})
            }
        })
        .catch(function (error) {
            response.status(400).json({ msg: "Unsuccessful" })
        });
}

module.exports.getAllUsers = getAllUsers;