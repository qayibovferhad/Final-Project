import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
export const Branches = new Mongo.Collection("branches");
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

export const branchValidationText = Schema.Branch.namedContext("branch");
Branches.attachSchema(Schema.Branch);
