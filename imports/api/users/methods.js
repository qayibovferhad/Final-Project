import { Branches } from "../branches/collection";
import { Rooms } from "../rooms/collection";

Meteor.methods({
  "add.user": function (data) {
    let res = Accounts.createUser({
      username: data.username,
      email: data.email,
      password: data.password,
      profile: {
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age,
        type: data.type,
        branchId: data.branchId,
        status: data.status,
        branches: data.selectedBranches,
      },
    });
    return res;
  },
  'add.Student':function(data){
         let result = Accounts.createUser({
          username:data.username,
          password:data.password,
          email:data.email,
          createdAt:data.createdAt,
          profile:{
            firstname:data.firstname,
            lastname:data.lastname,
            age:data.age,
            type:data.type,
            branchId:data.branchId,
            profileImgId:data.profileImgId,
            status:data.status,
            subjects:data.subjects
          }
   } )
         return result
  },
  removeUserByBranchId: function (branchId) {
    return Meteor.users.remove({
      "profile.branchId": branchId,
    });
  },
  'update.userSubjects':function(query,subjectId){
       return Meteor.users.update(query,{$push:{subjects:subjectId}})
  },
  "update.userStatus": function (branchId, newStatus) {
    Rooms.update({ branchId }, { $set: { status: newStatus } });
    return Meteor.users.update(
      { "profile.branchId": branchId },
      { $set: { "profile.status": newStatus } }
    );
  },
  "update.teacherStatus": function (teacherId, newStatus) {
    return Meteor.users.update(
      { _id: teacherId },
      { $set: { "profile.status": newStatus } }
    );
  },
  "remove.teacher": function (userId, branch) {
    Meteor.users.remove(userId);
    return Branches.update(
      { _id: branch._id },
      { $pull: { teachers: userId } }
    );
  },
});
