import "./teachers.html";
import { Random } from "meteor/random";
import { Branches } from "../../../../api/branches/collection";

Template.teachers.onCreated(function () {
  this.autorun(() => {
    let query = {
      "profile.type": "TEACHER",
    };
    this.subscribe("get.users", query);
  });
  this.subscribe("get.branches");
});
Template.teachers.helpers({
  getAllTeachers: function () {
    return Meteor.users.find({ "profile.type": "TEACHER" });
  },
  getAllBranches: function () {
    return Branches.find();
  },
  getBranchNames: function () {
    const branchIds = this.profile.branches;
    return Branches.find({ _id: { $in: branchIds } }).map(
      (branch) => branch.branchName
    );
  },
});
Template.teachers.events({
  "submit #teacherForm": function (event, template) {
    event.preventDefault();
    let firstname = $("#teacher-firstname").val();
    let lastname = $("#teacher-lastname").val();
    let username = $("#teacher-username").val();
    let email = $("#teacher-email").val();
    let password = $("#teacher-password").val();
    let age = $("#teacher-age").val();

    let selectedBranches = [];
    $("input[name='teacher-branches']:checked").each(function () {
      selectedBranches.push($(this).val());
    });

    let teacherData = {
      _id: Random.id(),
      firstname,
      username,
      lastname,
      email,
      password,
      age,
      selectedBranches,
      status: true,
      type: "TEACHER",
    };
    Meteor.call("add.user", teacherData, function (err, teacherId) {
      if (err) {
        console.log(err);
      } else {
        Meteor.call(
          "add.teacherToBranch",
          teacherId,
          selectedBranches,
          function (err, success) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    });
  },
});
