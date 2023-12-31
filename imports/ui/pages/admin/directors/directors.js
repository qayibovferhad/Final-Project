import { Branches } from "../../../../api/branches/collection";
import "./directors.html";
Template.directors.onCreated(function () {
  this.autorun(() => {
    let query = {
      "profile.type": "DIREKTOR",
    };
    this.subscribe("get.users", query);
  });
  this.autorun(() => {
    let query = {};
    this.subscribe("get.branches", query);
  });
});
Template.directors.helpers({
  addOne: function (index) {
    return index + 1;
  },
  getAllDirectors: function () {
    let query = {
      "profile.type": "DIREKTOR",
    };
    return Meteor.users.find(query);
  },
  getBranch: function (direktorId) {
    return Branches.findOne({ direktorId: direktorId });
  },
});
Template.directors.events({
  "keyup #searchInput": function (event, template) {
    const searchQuery = event.target.value.trim();
    template.searchQuery.set(searchQuery);
  },
});
