import { ObjectID } from 'bson';
import mongoose from 'mongoose';
import { DbModel } from '../../common/constant';

const addressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address1: { type: String, required: true, maxlength: 50 },
    address2: { type: String, maxlength: 50 },
    city: { type: String, maxlength: 50 },
    pincode: { type: String, maxlength: 6 },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
});

addressSchema.set('toJSON', { virtuals: true });

const AddressModel = mongoose.model(DbModel.address, addressSchema);

export default AddressModel;
