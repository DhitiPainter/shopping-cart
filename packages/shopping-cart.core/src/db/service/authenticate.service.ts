import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import mongoose from 'mongoose';
import { User } from '../../models/user';
import { jwtSecret } from './../../common/constant';
import db from './../../db/helper';
const UserModel = db.User;
const UserRoleModel = db.UserRole;

/**
 * Authenticate user
 * @param userObject login cred object
 */
export async function authenticate(userObject: User) {
    let user: User = null;
    try {
        const res: any = await UserModel.findOne({ userName: userObject.userName }).exec();
        if (res) {
            user = {
                userName: res.userName,
                id: res.id,
                email: res.email,
            };
            console.log(bcrypt.compareSync(userObject.password, res.hash));
            if (user && userObject.password && bcrypt.compareSync(userObject.password, res.hash)) {
                const token = jwt.sign({ sub: user.id }, jwtSecret);
                return {
                    user, token,
                    message: 'Logged in successfully!',
                };
            }
        } else {
            throw {ResponseException: { ExceptionMessage: 'Invalid credentials' }};
        }
    } catch (error) {
        return error;
    }
}

/**
 * Register new user
 * @param userParam userObject
 */
export async function register(userParam: User) {
    try {
        const userData = await UserModel.findOne({ userName: userParam.userName });
        if (userData) {
            throw { isUserExists: true, message: 'Username is already taken' };
        } else {
            const user: any = new UserModel(userParam);
            const userRole: any = new UserRoleModel();
            // hash password
            if (userParam.password) {
                user.hash = bcrypt.hashSync(userParam.password, 10);
            }
            // Set createdBy is not there
            user.createdBy = user._id;
            userRole.user = mongoose.Types.ObjectId(user._id);
            userRole.role = user.role;
            // save user and userRole
            user.save();
            userRole.save();

            return { message: 'User "' + userParam.userName + '" registered successfully', isUserExists: false };
        }
    } catch (error) {
        return { message: 'Exception encountered', error };
    }
}
