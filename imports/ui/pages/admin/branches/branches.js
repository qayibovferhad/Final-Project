import "./branches.html";
import { Random } from "meteor/random";
import {
  Branches,
  branchValidationText,
} from "../../../../api/branches/collection";

Template.branches.onCreated(function () {
  this.autorun(() => {
    let query = {};
    this.subscribe("get.branches", query);
  });
  this.autorun(() => {
    let query = {};
    this.subscribe("get.users", query);
  });
});

Template.branches.helpers({
  addOne: function (index) {
    return index + 1;
  },
  getAllBranches: function () {
    return Branches.find();
  },
  getDirector: function (directorId) {
    return Meteor.users.findOne({ _id: directorId });
  },
  isBranchActive: function (status) {
    return status === "active";
  },
});

Template.branches.events({
  "submit #branchForm"(event, template) {
    event.preventDefault();
    let branchName = $("#branch-name").val();
    let branchAddress = $("#branch-address").val();
    let firstname = $("#direktor-firstname").val();
    let lastname = $("#direktor-lastname").val();
    let username = $("#direktor-username").val();
    let email = $("#direktor-email").val();
    let password = $("#direktor-password").val();
    let age = $("#direktor-age").val();

    let branchData = {
      _id: Random.id(),
      branchName,
      branchAddress,
      status: "active",
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
      active: true,
      type: "DIREKTOR",
      branchId: branchData._id,
    };

    Meteor.call("add.user", direktorData, function (err, userId) {
      if (err) {
        console.log(err);
      } else {
        branchData.direktorId = userId;
        Meteor.call("add.branch", branchData, function (err, branchId) {
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
          }
        });
      }
    });
  },
  "click .activate-btn": function (event, template) {
    const branchId = this._id;
    const branch = Branches.findOne({ _id: branchId });
    const newStatus = branch.status === "active" ? "inactive" : "active";

    Meteor.call("update.branchStatus", branchId, newStatus, function (err) {
      if (err) {
        console.log(err);
      } else {
        Meteor.call("update.userStatus", branchId, newStatus, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
    event.stopPropagation();
  },
});
