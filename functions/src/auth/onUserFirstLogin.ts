import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import UserRecord = admin.auth.UserRecord;

export const onUserFirstLogin = functions.auth.user().onCreate((user: UserRecord, context) => {
    const app = admin.initializeApp();

    const usersRef = app.database().ref('users/' + user.uid);
    const createdAt = usersRef.child('createdAt').set(Date.now());
    const eventId = usersRef.child('eventId').set(null);

    const deleteApp = () => app.delete().catch(() => null);

    return Promise.all([createdAt, eventId])
        .then(result => deleteApp().then(() => result))
        .catch(err => deleteApp().then(() => Promise.reject(err)));
});