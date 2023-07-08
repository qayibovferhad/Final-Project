Meteor.publish("get.users", function () {
  let query = {};
  return Meteor.users.find(query);
});
