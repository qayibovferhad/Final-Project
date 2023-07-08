Meteor.methods({
  "add.user": function (data) {
    let res = Accounts.createUser({
      username: data.direktorName,
      email: data.direktorEmail,
      password: data.direktorPassword,
      profile: {
        age: data.direktorAge,
        type: data.type,
        branchId: data.branchId,
      },
    });
    return res;
  },
  removeUserByBranchId: function (branchId) {
    return Meteor.users.remove({
      "profile.branchId": branchId,
    });
  },
});
