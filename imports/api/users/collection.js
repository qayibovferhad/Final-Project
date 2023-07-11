import SimpleSchema from "simpl-schema";
import { FilesCollection } from "meteor/ostrio:files";

export const Users = Meteor.users;

export const Users_Images = new FilesCollection({
  collectionName: "users_images",
  storagePath: "/Users/User/Desktop/images",
  allowClientCode: false,
  onBeforeUpload(file) {
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return "Please upload image, with size equal or less than 10MB";
  },
});
