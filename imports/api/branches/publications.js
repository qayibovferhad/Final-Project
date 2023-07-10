import { Branches, Rooms } from "./collection";

Meteor.publish("get.branches", function (argument) {
  let query = {};
  return Branches.find(query);
});
Meteor.publish("get.rooms", function (query) {
  return Rooms.find(query);
});
