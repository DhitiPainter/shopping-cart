import mongoose, { Schema } from 'mongoose';
import { ConnectionString } from './../common/constant';

export const connectDatabase = () => {
    // Set up default mongoose connection
    mongoose.connect(ConnectionString, { useUnifiedTopology: true });

    // Get the default connection
    const db = mongoose.connection;

    db.collection('roles').update({ role: 1 }, { $setOnInsert: { role: 1, name: 'Admin' } }, { upsert: true });
    db.collection('roles').update({ role: 2 }, { $setOnInsert: { role: 2, name: 'User' } }, { upsert: true });
    db.collection('roles').update({ role: 3 }, { $setOnInsert: { role: 3, name: 'SuperAdmin' } }, { upsert: true });

    // Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};
