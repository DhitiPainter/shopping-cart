import { ObjectID } from 'bson';
import mongoose from 'mongoose';
import { DbModel } from '../../common/constant';

const userRoleSchema = new mongoose.Schema({
    role: { type: Number },
    user: { type: ObjectID },
});

userRoleSchema.set('toJSON', { virtuals: true });

const UserRoleModel = mongoose.model(DbModel.userRole, userRoleSchema);

export default UserRoleModel;
