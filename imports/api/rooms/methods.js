import { Branches } from "../branches/collection";
import { Rooms } from "./collection";

Meteor.methods({
  "add.room": function (data, branchId) {
    let branch = Branches.findOne({ _id: branchId, status: true });
    if (branch) {
      return Rooms.insert(data);
    } else {
      throw new Meteor.Error("has-been-blocked", "this branch blocked");
    }
  },
  "remove.roomByBranchId": function (branchId) {
    return Rooms.remove({ branchId });
  },

  "update.roomsStatus": function (branchId, newStatus) {
    const rooms = Rooms.find({ branchId: branchId }).fetch();
    const roomIds = rooms.map((room) => room._id);
    Rooms.update(
      { _id: { $in: roomIds } },
      { $set: { status: newStatus } },
      { multi: true }
    );
  },
  "update.roomStatus": function (roomId, newStatus) {
    const room = Rooms.findOne({ _id: roomId });
    if (Branches.findOne({ _id: room.branchId }).status === false) {
      throw new Meteor.Error("branch-deactived", "branch has been deactivated");
    }
    return Rooms.update({ _id: roomId }, { $set: { status: newStatus } });
  },
  deleteRoom: function (roomId, branch) {
    return Rooms.remove({ _id: roomId });
  },
});
