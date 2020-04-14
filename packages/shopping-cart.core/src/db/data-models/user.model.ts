import { ObjectID } from 'bson';
import mongoose from 'mongoose';
import validator from 'validator';
import { DbModel } from '../../common/constant';

const userSchema = new mongoose.Schema({
    userName: {
        type: String, unique: true, required: true,
    },
    email: { type: String, unique: true, required: true, validate: { validator: validator.isEmail, msg: '{value} is not valid' } },
    hash: { type: String, required: true },
    createdBy: { type: ObjectID },
    updatedBy: { type: ObjectID },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
});

userSchema.set('toJSON', { virtuals: true });

const UserModel = mongoose.model(DbModel.user, userSchema);

export default UserModel;
