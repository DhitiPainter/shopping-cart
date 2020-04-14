import _ from 'lodash';
import mongoose from 'mongoose';
import db from './../../db/helper';
const UserModel = db.User;
const UserDetailsModel = db.UserDetails;

export async function getAll() {
    return await UserModel.find().select('-hash');
}

export async function getById(id: any) {
    try {
        const user: any = id ? await UserModel.findById(id).select('-hash').select('-__v') : null;
        const userDetail: any = user && user.userDetails ? await UserDetailsModel.findById(user.userDetails).select('-__v').select('-_id') : null;
        // const classSection: any = userDetail && userDetail.class ?
        // await ClassSectionModel.findById(userDetail.class).select('-__v').select('-_id') : null;
        let profile: any = {};
        profile = user ? user.toObject() : {};
        // if (userDetail) {
        //     profile = _.merge(profile, userDetail.toObject(), classSection.toObject());
        // }
        return profile;
    } catch (error) {
        console.log(error);
    }
}

export async function updateUserData(id: any, userParam: any, token: string) {
    try {
        const userDetailsData = await UserDetailsModel.findOne((x: any) => x && x.user === id).exec();
        let userDetail: any;
        console.log(userDetailsData);
        if (userDetailsData) {
            userDetail = new UserDetailsModel(userDetailsData);
            userDetail.user = mongoose.Types.ObjectId(id);
            updateUserDetails(userDetail, userParam);
        } else {
            userDetail = new UserDetailsModel(userParam);
            updateUserDetails(userDetail, userParam);
        }
        try {
            return userDetail.save().then((res: any) => {
                return { message: 'Updated Successfully', userDetail, status: 200, success: true };
            }, (err: any) => {
                if (err) {
                    throw { error: err.errors };
                }
            });
        } catch (error) {
            return { message: 'Exception ocurred', error };
        }
    } catch (error) {
        return { message: 'Exception encountered', error, status: 500, success: false };
    }
}

function updateUserDetails(oldUserDetails: any, newUserDetails: any) {
    !oldUserDetails ? oldUserDetails = new UserDetailsModel() : null;
    newUserDetails.firstName ? oldUserDetails.firstName = newUserDetails.firstName : null;
    newUserDetails.lastName ? oldUserDetails.lastName = newUserDetails.lastName : null;
    newUserDetails.mobile ? oldUserDetails.mobile = newUserDetails.mobile : null;
    newUserDetails.role ? oldUserDetails.role = newUserDetails.role : null;
    newUserDetails.gender ? oldUserDetails.gender = newUserDetails.gender : null;
    newUserDetails.user ? oldUserDetails.user = newUserDetails.user : null;
}

export async function deleteUser(id: any) {
    try {
        const userDetail = await UserDetailsModel.findOne((x: any) => x.user === id);
        const details = new UserDetailsModel(userDetail);
        await UserDetailsModel.findByIdAndRemove(details.id);
        await UserModel.findByIdAndRemove(id);
        return { message: 'Deleted Successfully', status: 200, success: true };
    } catch (error) {
        return { message: 'Exception encountered', error, status: 500, success: false };
    }

}

// export async function update(id: any, userParam: any, token: string) {
//     try {
//         return UserModel.findById(mongoose.Types.ObjectId(id)).then((userData: any) => {
//             let userDetailsId: any;
//             if (userData) {
//                 if (userData.userDetails) {
//                     userDetailsId = userData.userDetails;
//                     // Find user details data;
//                     return UserDetailsModel.findById(mongoose.Types.ObjectId(userDetailsId))
//                         .then((userDetailsData: any) => {
//                             if (userDetailsData) {
//                                 const userDetail: any = new UserDetailsModel(userDetailsData);
//                                 // let classId: any = userDetailsData.class;
//                                 // updateUserClassSection(classSection, userParam)
//                                 updateUserDetails(userDetail, userParam);

//                                 // classId = userDetail.class ? userDetail.class : classSection._id;
//                                 // Assign classSection's ObjectId
//                                 // userDetail.class = mongoose.Types.ObjectId(classId);

//                                 // Update collection documents
//                                 // classSection.save();
//                                 userDetail.save();
//                                 return updateUser(userData, userParam, id, userDetailsId, userDetail);
//                                 // Find class section data
//                                 // return ClassSectionModel.findById(mongoose.Types.ObjectId(classId))
//                                 // .then((classData: any) => {
//                                 //     // Create classSectionModel regardless of data present
//                                 //     const classSection = new ClassSectionModel(classData)

//                                 // })
//                             }
//                         });
//                 } else {
//                     // Add Class Section to collection
//                     // const classSection: any = new ClassSectionModel();

//                     // Add User Details to collection with classSection objectId
//                     const userDetails: any = new UserDetailsModel();

//                     // updateUserClassSection(classSection, userParam)
//                     updateUserDetails(userDetails, userParam);
//                     // Assign objectIds to respective collection documents
//                     // userDetails.class = classSection._id;
//                     userDetailsId = userDetails._id;

//                     // Create/update collection documents
//                     // classSection.save();
//                     userDetails.save();
//                     return updateUser(userData, userParam, id, userDetailsId, userDetails);
//                 }
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

// function updateUser(userData: any, userParam: any, userId: any, userDetailsId: any, userDetails: any): any {
//     const user: any = new UserModel(userData);
//     // copy userParam properties to user
//     Object.assign(user, userParam);

//     // Update document values
//     user.userDetails = userDetailsId;
//     user.updatedBy = userId;
//     user.updatedDate = new Date();

//     // Update document
//     return user.save().then((userModel: any) => {
//         const userM = userModel;
//         const userDetail = userDetails;
//         // let section = classSection;

//         return { message: 'Data updated successfully', userProfile: _.merge(userM, userDetail) };
//     }, (err: any) => {
//         console.log(err);
//         return { message: 'Internal server error occurred' };
//     });
// }
