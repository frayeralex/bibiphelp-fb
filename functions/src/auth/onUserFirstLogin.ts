import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import UserRecord = admin.auth.UserRecord;

export const onUserFirstLogin = functions.auth.user().onCreate((user: UserRecord, context) => {
    const appOptions = JSON.parse(process.env.FIREBASE_CONFIG!!);
    appOptions.databaseAuthVariableOverride = context.auth;
    const app = admin.initializeApp(appOptions, 'app');

    const usersRef = app.database().ref('users/' + user.uid);
    const createdAt = usersRef.child('createdAt').set(Date.now());
    const eventId = usersRef.child('eventId').set(null);

    const deleteApp = () => app.delete().catch(() => null);

    return Promise.all([createdAt, eventId])
        .then(res => deleteApp().then(() => res))
        .catch(err => deleteApp().then(() => Promise.reject(err)));
});