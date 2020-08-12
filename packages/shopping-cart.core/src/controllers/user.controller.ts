import { User } from '../models/user';
import * as userService from './../db/service/user.service';
import * as authService from './../db/service/authenticate.service';

export default class UserController {
    public roles = async () => {
        try {
            return await authService.getRoles();
        } catch (error) {
            throw (error)
        }
    }

    public authenticate = async (user: User) => {
        try {
            return await authService.authenticate(user);
        } catch (error) {
            throw (error);
        }
    }

    public registerUser = async (user: User) => {
        try {
            return await authService.register(user);
        } catch (error) {
            throw (error);
        }
    }

    public getUserProfile = async (userId: any) => {
        try {
            return await userService.getById(userId);
        } catch (error) {
            throw (error);
        }
    }

    public updateUserProfile = async (token: string, userId: any, user: any) => {
        try {
            return await userService.updateUserData(userId, user, token);
        } catch (error) {
            throw ({ error, status: 500, success: false });
        }
    }
}
