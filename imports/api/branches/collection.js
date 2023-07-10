import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
export const Branches = new Mongo.Collection("branches");
export const Rooms = new Mongo.Collection("rooms");
const Schema = {};

Schema.Branch = new SimpleSchema({
  _id: {
    type: String,
  },
  branchName: {
    type: String,
  },
  branchAddress: {
    type: String,
  },
  direktorId: {
    type: String,
    optional: true,
  },
  status: {
    type: Boolean,
  },
  teachers: {
    type: Array,
    optional: true,
  },
  "teachers.$": String,
  rooms: {
    type: Array,
    optional: true,
  },
  "rooms.$": String,
});
Schema.Room = new SimpleSchema({
  _id: {
    type: String,
  },
  roomName: {
    type: String,
  },
  branchId: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
});
export const branchValidationText = Schema.Branch.namedContext("branch");
Branches.attachSchema(Schema.Branch);
export const roomValidationText = Schema.Room.namedContext("room");
Rooms.attachSchema(Schema.Room);
