Meteor.publish("get.users", function (query = {}) {
  return Meteor.users.find(query);
});
