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
  removeUserByBranchId: function (branchId) {
    return Meteor.users.remove({
      "profile.branchId": branchId,
    });
  },
  "update.userStatus": function (branchId, newStatus) {
    return Meteor.users.update(
      { "profile.branchId": branchId },
      { $set: { "profile.status": newStatus } }
    );
  },
});
