import "./branches.html";
import { Random } from "meteor/random";
import {
  Branches,
  branchValidationText,
} from "../../../../api/branches/collection";
import { Rooms } from "../../../../api/rooms/collection";

Template.branches.onCreated(function () {
  this.searchQuery = new ReactiveVar("");
  this.sortOptions = new ReactiveVar({ branchName: 1 });
  this.autorun(() => {
    let query = {};
    this.subscribe("get.users", query);
  });
  this.autorun(() => {
    let query = {};
    this.subscribe("get.rooms", query);
  });
  this.autorun(() => {
    let query = {};
    this.subscribe("get.branches", query);
  });
});

Template.branches.helpers({
  addOne: function (index) {
    return index + 1;
  },
  getAllBranches: function () {
    const searchQuery = Template.instance().searchQuery.get();
    const sortOptions = Template.instance().sortOptions.get();

    let query = {};
    if (searchQuery) {
      query.branchName = { $regex: searchQuery, $options: "i" };
    }

    return Branches.find(query, { sort: sortOptions });
  },
  getRoomCount: function (branchId) {
    return Rooms.find({ branchId }).count();
  },
  getTeacherCount: function (branchId) {
    return Meteor.users
      .find({
        "profile.branches": { $in: [branchId] },
        "profile.type": "TEACHER",
      })
      .count();
  },
  getDirector: function (branchId) {
    console.log(branchId);

    let user = Meteor.users.findOne({
      "profile.branchId": branchId,
      "profile.type": "DIREKTOR",
    });
    console.log(user);
    if (user) {
      return user.username;
    }
    return "";
  },
  formatDate: function (date) {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  },
});
Template.branches.events({
  "click .sort-btn": function (event, template) {
    const field = event.currentTarget.dataset.field;
    const sortOptions = template.sortOptions.get();

    if (sortOptions[field] === 1) {
      sortOptions[field] = -1;
    } else {
      sortOptions[field] = 1;
    }

    template.sortOptions.set(sortOptions);
  },

  "keyup #searchInput": function (event, template) {
    const searchQuery = event.target.value.trim();
    template.searchQuery.set(searchQuery);
  },

  "submit #branchForm"(event, template) {
    event.preventDefault();
    let branchName = $("#branch-name").val();
    let branchAddress = $("#branch-address").val();
    let firstname = $("#direktor-firstname").val();
    let lastname = $("#direktor-lastname").val();
    let username = $("#direktor-username").val();
    let email = $("#direktor-email").val();
    let password = $("#direktor-password").val();
    let age = parseInt($("#direktor-age").val());

    let branchData = {
      _id: Random.id(),
      branchName,
      branchAddress,
      status: true,
      direktorId: null,
    };

    branchValidationText.reset();
    branchData = branchValidationText.clean(branchData);
    branchValidationText.validate(branchData);

    if (!branchValidationText.isValid()) {
      branchValidationText.validationErrors().map((err) => {
        console.log("err", err);
      });
      return;
    }

    let direktorData = {
      _id: Random.id(),
      firstname,
      lastname,
      username,
      email,
      password,
      age,
      status: true,
      type: "DIREKTOR",
      branchId: branchData._id,
    };

   

    Meteor.call("add.user", direktorData, function (err, userId) {
      if (err) {
        console.log(err);
      } else {
        branchData.direktorId = userId;
        Meteor.call("add.branch", branchData, function (err) {
          if (err) {
            console.log(err);
          } else {
            $("#myModal").modal("hide");
            $("#branch-name").val("");
            $("#branch-address").val("");
            $("#direktor-name").val("");
            $("#direktor-email").val("");
            $("#direktor-password").val("");
            $("#direktor-age").val("");
          }
        });
      }
    });
  },

  "click .delete-btn": function () {
    const branchId = this._id;
    Meteor.call("remove.branch", branchId, function (err) {
      if (err) {
        console.log(err);
      } else {
        Meteor.call("removeUserByBranchId", branchId, function (err) {
          if (err) {
            console.log(err);
          } else {
            Meteor.call("remove.roomByBranchId", branchId, function (err) {
              if (err) {
                console.log(err);
              }
            });
          }
        });
      }
    });
  },
  "click .activate-btn": function (event, template) {
    const branchId = this._id;
    const branch = Branches.findOne({ _id: branchId });
    const newStatus = branch.status === true ? false : true;

    Meteor.call("update.branchStatus", branchId, newStatus, function (err) {
      if (err) {
        console.log(err);
      } else {
        Meteor.call("update.userStatus", branchId, newStatus, function (err) {
          if (err) {
            console.log(err);
          } else {
            Meteor.call(
              "update.roomsStatus",
              branchId,
              newStatus,
              function (err) {
                console.log(err);
              }
            );
          }
        });
      }
    });
  },
});
