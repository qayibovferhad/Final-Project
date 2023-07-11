import { Meteor } from 'meteor/meteor'
import { Users_Images } from './collection';

Meteor.publishComposite("get.users", function (query = {}) {
  return {
    find() {
      return Meteor.users?.find(query);
    },
    children: [
      {
          find(user){
               if (user.profile.profileImgId) {
                 return Users_Images.find({_id:user.profile.profileImgId}).cursor
               }
          }
      },
    ]
  }
});