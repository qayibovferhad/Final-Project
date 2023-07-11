import { Branches } from "../../../../api/branches/collection";
import { Rooms, roomValidationText } from "../../../../api/rooms/collection";
import "./rooms.html";
Template.rooms.onCreated(function () {
  this.searchQuery = new ReactiveVar("");
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
    const instance = Template.instance();
    const searchQuery = instance.searchQuery.get();

    if (searchQuery) {
      return Rooms.find(
        { roomName: { $regex: searchQuery, $options: "i" } },
        { sort: { roomName: 1 } }
      );
    } else {
      return Rooms.find({});
    }
  },
  getBranch: function (roomId) {
    const room = Rooms.findOne({ _id: roomId });
    if (room) {
      const branch = Branches.findOne({ _id: room.branchId });
      if (branch) {
        return branch;
      }
    }
    return "";
  },
});
Template.rooms.events({
  "keyup #searchInput": function (event, template) {
    const searchQuery = event.target.value.trim();
    template.searchQuery.set(searchQuery);
    console.log(template.searchQuery.get());
  },
  "submit #roomForm": function (event, template) {
    event.preventDefault();
    let roomName = $("#room-name").val();
    let capacity = $("#room-capacity").val();
    let branchId = $("#room-branch").val();
    let roomData = {
      roomName,
      capacity,
      branchId,
      isEmpty: true,
      status: true,
    };
    roomValidationText.reset();
    roomData = roomValidationText.clean(roomData);
    roomValidationText.validate(roomData);

    Meteor.call("add.room", roomData, branchId, function (err, roomId) {
      if (err) {
        console.log(err);
      } else {
        $("#addRoom").modal("hide");
        $("#room-name").val("");
        $("#room-capacity").val("");
        $("#room-branch").val("");
      }
    });
  },
  "click #deleteRoom": function () {
    const roomId = this._id;
    Meteor.call("deleteRoom", roomId, function (err) {
      if (err) {
        console.log(err);
      }
    });
  },
  "click .activate-btn": function (event, template) {
    const roomId = this._id;
    const room = Rooms.findOne({ _id: roomId });
    const newStatus = room.status === true ? false : true;

    Meteor.call("update.roomStatus", roomId, newStatus, function (err) {
      if (err) {
        console.log(err);
      }
    });
  },
});
