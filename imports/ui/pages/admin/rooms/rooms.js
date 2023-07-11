import { Branches } from "../../../../api/branches/collection";
import { Rooms, roomValidationText } from "../../../../api/rooms/collection";
import "./rooms.html";
Template.rooms.onCreated(function () {
  this.autorun(() => {
    let query = {};
    this.subscribe("get.branches", query);
  });
  this.autorun(() => {
    let query = {};
    this.subscribe("get.rooms", query);
  });
});
Template.rooms.helpers({
  addOne: function (index) {
    return index + 1;
  },
  getAllBranches: function () {
    let query = {};
    return Branches.find(query);
  },
  getAllRooms: function () {
    let query = {};
    return Rooms.find(query);
  },
  getBranch: function (roomId) {
    const room = Rooms.findOne({ _id: roomId });
    if (room) {
      const branch = Branches.findOne({ _id: room.branchId });
      if (branch) {
        return branch.branchName;
      }
    }
    return "";
  },
});
Template.rooms.events({
  "submit #roomForm": function (event, template) {
    event.preventDefault();
    let roomName = $("#room-name").val();
    let capacity = $("#room-capacity").val();
    let branchId = $("#room-branch").val();
    let roomData = {
      roomName,
      capacity,
      branchId,
      status: true,
    };
    roomValidationText.reset();
    roomData = roomValidationText.clean(roomData);
    roomValidationText.validate(roomData);

    Meteor.call("add.room", roomData, function (err, roomId) {
      if (err) {
        console.log(err);
      } else {
        Meteor.call("add.roomToBranch", branchId, roomId, function (err) {
          if (err) {
            console.log(err);
          } else {
            $("#addRoom").modal("hide");
            $("#room-name").val("");
            $("#room-capacity").val("");
            $("#room-branch").val("");
          }
        });
      }
    });
  },
  "click #deleteRoom": function () {
    console.log("dg");
    const roomId = this._id;
    const branch = Branches.findOne({ rooms: { $in: [roomId] } });
    Meteor.call("deleteRoom", roomId, branch, function (err) {
      if (err) {
        console.log(err);
      }
    });
  },
});
