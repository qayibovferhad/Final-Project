import SimpleSchema from "simpl-schema";

export const Rooms = new Mongo.Collection("rooms");
const Schema = {};
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
export const roomValidationText = Schema.Room.namedContext("room");
Rooms.attachSchema(Schema.Room);
