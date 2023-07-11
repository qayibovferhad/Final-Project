import SimpleSchema from "simpl-schema";

export const Subjects = new Mongo.Collection('subjects')

const Schema = {};

Schema.Subject = new SimpleSchema({
    name:{
        type:String,
        required:true
    },
    period:{
        type:Number,
        required:true
    },
    branchId:{
        type:String,
        required:true
    }
})

Schema.editSubject = new SimpleSchema({
    name:{
        type:String,
        required:true
    },
    period:{
        type:Number,
        required:true
    }
})



export const subjectValidationContext = Schema.Subject.namedContext('subject')
Subjects.attachSchema(Schema.Subject);

export const editSubjectValidationContext = Schema.editSubject.namedContext('editSubject')
Subjects.attachSchema(Schema.editSubject)