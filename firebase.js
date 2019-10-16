const admin = require('firebase-admin');
const serviceWorker = require('./service-account-file.json')

// configures the admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceWorker),
    databaseURL: "https://zerobug-f79e9.firebaseio.com"
})
/**
 * 
 * @param request The requested user
 * @param response The set of searched users sent back to front end
 */
let getAllUsers = function (request, response) {
    let defaultAuth = admin.auth();
    
    let userName = request.body.name;
    // List batch of users, 1000 at a time.
    let searchedUsers = []
    defaultAuth.listUsers(1000)
        .then(function (listUsersResult) {
            listUsersResult.users.forEach(function (userRecord) {
                if (userRecord.displayName.toLowerCase().includes(userName.toLowerCase())) {
                    let userDetails = {
                        displayName: userRecord.displayName,
                        photoURL: userRecord.photoURL,
                        uid: userRecord.uid
                    }
                    searchedUsers.push(userDetails);
                }
            })
            // Sends successful matches
            if(searchedUsers.length > 0){
                response.status(200).json({ msg: "Success", users: searchedUsers })
            }
            // Sends a message back for no matches
            else{
                response.status(200).json({ msg: "No matches"})
            }
        })
        // sends an error message for when firebase admin sdk returns an error
        .catch(function (error) {
            response.status(400).json({ msg: "Unsuccessful" })
        });
}

module.exports.getAllUsers = getAllUsers;