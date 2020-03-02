import * as functions from 'firebase-functions';
import { DataSnapshot } from "firebase-functions/lib/providers/database";

export const onEventCreate = functions.database
    .ref('/events/{eventId}')
    .onCreate((snapshot: DataSnapshot, context: functions.EventContext) => {

        return Promise.all([
            snapshot.ref.child('userId').set(context.auth?.uid),
            snapshot.ref.child('status').set(0),
            snapshot.ref.child('createdAt').set(Date.now())
        ]);
    });