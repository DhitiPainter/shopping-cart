import { ObjectID } from 'bson';
import m from 'moment';
import mongoose from 'mongoose';
import { DbModel } from '../../common/constant';

const historySchema = new mongoose.Schema({
    user: { type: ObjectID, required: true },
    product: { type: ObjectID, required: true },
    deliveryAddress: { type: ObjectID, required: true },
    status: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    country: { type: ObjectID, default: 'India' },
    orderDate: { type: Date, default: Date.now },
    expectedDeliveryDate: { type: Date, default: m(Date.now(), 'DD-MM-YYYY').add(7, 'days') },
    updatedDate: { type: Date },
});

historySchema.set('toJSON', { virtuals: true });

const HistoryModel = mongoose.model(DbModel.history, historySchema);

export default HistoryModel;
