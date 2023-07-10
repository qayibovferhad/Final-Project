import { Rooms } from "./collection";

Meteor.publish("get.rooms", function (query) {
  return Rooms.find(query);
});
