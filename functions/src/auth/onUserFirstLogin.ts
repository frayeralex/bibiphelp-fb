import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import UserRecord = admin.auth.UserRecord;
admin.initializeApp();

export const onUserFirstLogin = functions.auth.user().onCreate((user: UserRecord) => {
    const usersRef = admin.database().ref('users');
    usersRef.push(user.uid);
    const newUser = usersRef.child(user.uid);
    const createdAt = newUser.child('createdAt').set(Date.now());

        return Promise.all([
            createdAt
        ]);
    });