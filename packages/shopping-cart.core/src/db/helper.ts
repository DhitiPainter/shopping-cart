import mongoose from 'mongoose';
import { ConnectionString } from './../common/constant';
import Address from './data-models/address.model';
import History from './data-models/history.model';
import Product from './data-models/product.model';
import UserRole from './data-models/role.model';
import UserDetails from './data-models/user-details.model';
import User from './data-models/user.model';

mongoose.connect(process.env.MONGODB_URI || ConnectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

export default {
    Address,
    History,
    Product,
    UserRole,
    User,
    UserDetails,
};
