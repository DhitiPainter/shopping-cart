import { ObjectID } from 'bson';
import mongoose from 'mongoose';
import validator from 'validator';
import { DbModel } from '../../common/constant';

const userDetailsSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: {
        type: String,
        maxlength: 10,
        // validate: { validator: validator.isNumeric, msg: '{value} is not valid' },
    },
    role: { type: Number, required: true },
    gender: { type: String },
    user: { type: ObjectID },
});

userDetailsSchema.set('toJSON', { virtuals: true });

const UserDetailsModel = mongoose.model(DbModel.userDetails, userDetailsSchema);

export default UserDetailsModel;
