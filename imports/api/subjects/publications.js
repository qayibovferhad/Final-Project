import { Subjects } from "./collection"

Meteor.publishComposite("get.Subjects", function (query = {}) {
    return {
      find() {
        return Subjects?.find(query);
      }
    }
  });