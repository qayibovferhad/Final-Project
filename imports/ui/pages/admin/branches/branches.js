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
  getAllBranches: function () {
    return Branches.find();
  },
  getDirector: function (directorId) {
    return Meteor.users.findOne({ _id: directorId });
  },
});

Template.branches.events({
  "submit #branchForm"(event, template) {
    event.preventDefault();
    let branchName = $("#branch-name").val();
    let branchAddress = $("#branch-address").val();
    let direktorName = $("#direktor-name").val();
    let direktorEmail = $("#direktor-email").val();
    let direktorPassword = $("#direktor-password").val();
    let direktorAge = $("#direktor-age").val();

    let branchData = {
      _id: Random.id(),
      branchName,
      branchAddress,
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
      direktorName,
      direktorEmail,
      direktorPassword,
      direktorAge,
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
});
