import { Subjects, editSubjectValidationContext, subjectValidationContext } from '../../../../api/subjects/collection';
import './subjects.html'
import { Random } from 'meteor/random'


Template.subjects.onCreated(function () {
    this.autorun(() => {
        let query = {
            branchId: Meteor.user()?.profile?.branchId
        }
        this.subscribe('get.Subjects', query)
    })
    this.subject = new ReactiveVar()
});

Template.subjects.helpers({
    getSubjects: function () {
        let query = {
            branchId: Meteor.user()?.profile?.branchId
        }
        return Subjects.find(query)
    },
    addOne: function (index) {
        return index + 1
    },
    getSubject: function () {
        console.log(Template.instance().subject.get());
        return Template.instance().subject.get()
    }
});

Template.subjects.events({
    'submit #subjectForm': function (event, template) {
        event.preventDefault()
        let name = $('#name').val();
        let period = parseInt($('#period').val());

        let subjectData = {
            _id: Random.id(),
            name,
            period,
            branchId: Meteor.user()?.profile?.branchId
        }

        subjectValidationContext.reset();
        subjectData = subjectValidationContext.clean(subjectData);
        subjectValidationContext.validate(subjectData);

        if (!subjectValidationContext.isValid()) {
            subjectValidationContext.validationErrors().map((err) => {
                $(`#${err.name}`).addClass('is-invalid')
                $(`.feedback-${err.name}`).text(`Error: ${err.type}`)
            });
            return;
        }

        Meteor.call('add.Subject', subjectData, function (error, success) {
            if (error) {
                alert(error)
            } else {
                document.getElementById('name').value = ''
                document.getElementById('period').value = 0 
                
            }
        })



    },
    'click .updateBtn': function (event, template) {
        template.subject.set(this)
    },
    'submit #updateSubjectForm': function (event, template) {
        event.preventDefault()

        let name = $('#editName').val();
        let period = $('#editPeriod').val()

        let subjectData = {
            name,
            period
        }

        let subjectId = template.subject?.get()?._id

        let query = {
            _id: subjectId,
        }

        editSubjectValidationContext.reset();
        subjectData = editSubjectValidationContext.clean(subjectData);
        editSubjectValidationContext.validate(subjectData);

        if (!editSubjectValidationContext.isValid()) {
            editSubjectValidationContext.validationErrors().map((err) => {
                $(`.${err.name}`).addClass('is-invalid')
                $(`.feedback-${err.name}`).text(`Error: ${err.type}`)
            });
            return;
        }

        
        Meteor.call('edit.Subject', query, subjectData, function (error, success) {
            if (error) {
                console.log(error);
            } else {
                alert(success)
             
                

            }
        })
    },
    'click .deleteBtn':function(event,template){
          let query = {
            _id:this._id
          }
          if (confirm('Are you sure?') === true) {
            Meteor.call('delete.Subject',query,function(error,success){
                if (error) {
                    console.log(error);
                }else{
                    alert(success)
                }
          })
          }
    }
});