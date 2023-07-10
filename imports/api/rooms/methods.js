import { Branches } from "../branches/collection";
import { Rooms } from "./collection";

Meteor.methods({
  "add.room": function (data) {
    return Rooms.insert(data);
  },
  "add.roomToBranch": function (branchId, roomId) {
    return Branches.update({ _id: branchId }, { $push: { rooms: roomId } });
  },
  "remove.roomByBranchId": function (branchId) {
    return Rooms.remove({ branchId });
  },
  deleteRoom: function (roomId, branch) {
    Rooms.remove({ _id: roomId });
    return Branches.update({ _id: branch._id }, { $pull: { rooms: roomId } });
  },
});
