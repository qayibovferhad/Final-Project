import { Branches, Rooms } from "./collection";

Meteor.publish("get.branches", function (argument) {
  let query = {};
  return Branches.find(query);
});
