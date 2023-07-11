import { Subjects } from "./collection"

Meteor.methods({
    'add.Subject': function (subjectData) {
        return Subjects.insert(subjectData)
    },
    'edit.Subject': function (query = {}, subjectData) {
        return Subjects.update(query, {
            $set: {
                name: subjectData.name,
                period: subjectData.period
            }
        })
    },
    'delete.Subject':function(query = {}){
        return Subjects.remove(query)
    }
})