import { Branches } from "./collection";

Meteor.methods({
  "add.branch": function (data) {
    return Branches.insert(data);
  },
  "remove.branch": function (branchId) {
    return Branches.remove(branchId);
  },
});
