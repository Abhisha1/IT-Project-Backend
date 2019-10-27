const admin = require('firebase-admin');
const dotenv = require('dotenv').config();
// configures the admin SDK
admin.initializeApp({
    credential: admin.credential.cert({
        "type": process.env.FIREBASE_TYPE,
    "project_id": process.env.FIREBASE_PROJECT_ID,
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": process.env.FIREBASE_AUTH_URI,
    "token_uri": process.env.FIREBASE_TOKEN_URI,
    "auth_provider_X509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL}),
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