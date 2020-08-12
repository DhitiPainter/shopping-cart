import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import db from './../../db/helper';
import { jwtSecret } from './../../common/constant';

import { User } from '../../models/user';

const UserModel = db.User;
const RoleModel = db.Role;

/**
 * Get Roles of the system
 */
export async function getRoles() {
    return RoleModel.find();
}

/**
 * Authenticate user
 * @param userObject login cred object
 */
export async function authenticate(userObject: User) {
    let user: User = null;
    const res: any = await UserModel.findOne({ userName: userObject.userName }).exec();
    if (res) {
        user = {
            userName: res.userName,
            id: res.id,
            email: res.email,
            role: res.role
        };
        if (userObject.role.toString() !== user.role.toString()) {
            throw { ResponseException: { ExceptionMessage: 'Choose appropriate role' } };
        }
        if (user && userObject.password && bcrypt.compareSync(userObject.password, res.hash)) {
            const token = jwt.sign({ sub: user.id }, jwtSecret);
            return {
                user, token,
                message: 'Logged in successfully!',
            };
        }
    } else {
        throw { ResponseException: { ExceptionMessage: 'Invalid credentials' } };
    }
}

/**
 * Register new user
 * @param userParam userObject
 */
export async function register(userParam: User) {
    const userData = await UserModel.findOne({ userName: userParam.userName });
    if (userData) {
        throw { isUserExists: true, message: 'Username is already taken' };
    } else {
        const user: any = new UserModel(userParam);
        const userRole = RoleModel.findOne({ name: 'User' });
        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
        // Set createdBy is not there
        user.createdBy = user._id;
        user.role = (await userRole)._id;
        // save user
        user.save();

        return { message: 'User "' + userParam.userName + '" registered successfully', isUserExists: false };
    }
}
