import "./sidebar.html";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

Template.sidebar.helpers({
  getUser: function (payload) {
    return Meteor.user()?.profile?.type === payload;
  },
});
Template.sidebar.events({
  "click .logoutBtn": function (event, template) {
    Meteor.logout(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        FlowRouter.go("/login");
      }
    });
  },
});
