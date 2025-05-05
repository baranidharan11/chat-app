// firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // path to your JSON file

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
