import { Branches, Rooms } from "./collection";

Meteor.methods({
  "add.branch": function (data) {
    return Branches.insert(data);
  },
  "remove.branch": function (branchId) {
    return Branches.remove(branchId);
  },
  "update.branchStatus": function (branchId, newStatus) {
    Branches.update({ _id: branchId }, { $set: { status: newStatus } });
  },
});
