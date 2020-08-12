import mongoose from 'mongoose';
import { DbModel } from '../../common/constant';

const roleSchema = new mongoose.Schema({
    role: { type: Number },
    name: { type: String }
});

roleSchema.set('toJSON', { virtuals: true });

const RoleModel = mongoose.model(DbModel.role, roleSchema);

export default RoleModel;
