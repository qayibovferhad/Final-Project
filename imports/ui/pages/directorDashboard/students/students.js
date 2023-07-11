import { Subjects } from '../../../../api/subjects/collection';
import { Users_Images, studentValidationContext } from '../../../../api/users/collection';
import { Random } from 'meteor/random'
import './students.html'
Template.students.onCreated(function () {
    this.autorun(() => {
        this.subscribe('get.Subjects')
    })
    this.autorun(() => {
        let query = {
            "profile.type": "STUDENT",
            "profile.branchId": Meteor.user()?.profile?.branchId
        }
        this.subscribe('get.users', query)
    })
    this.subjects = new ReactiveVar([])
    this.isLoading = new ReactiveVar(false)
    this.student = new ReactiveVar('')
    this.subjectId = new ReactiveVar('')
});

Template.students.helpers({
    getSubjects: function () {
        return Subjects.find({})
    },
    getStudents: function () {
        let query = {
            "profile.type": "STUDENT",
            "profile.branchId": Meteor.user()?.profile?.branchId
        }
        return Meteor.users?.find(query)
    },
    addOne: function (index) {
        return index + 1
    },
    getProfileImg: function (imgId) {
        return Users_Images.findOne({ _id: imgId })?.link()
    },
    getStudent: function () {
        return Template.instance().student.get()
    },
    getStudentSubjects: function (subjects) {
        return Subjects.find({ _id: { $in: subjects } })
    }


});

Template.students.events({
    'change .subjectCheckbox': function (event, template) {
        event.preventDefault()
        const checked = event.target.checked
        let subjects = template.subjects.get()
        if (checked) {
            subjects.push(this._id)
        } else {
            subjects = subjects.filter((item) => {
                return item !== this._id
            })
        }
        template.subjects.set(subjects)


    },
    'submit #studentForm': function (event, template) {
        event.preventDefault()
        let firstname = $('#studentFirstname').val();
        let lastname = $('#studentLastname').val();
        let username = $('#studentUsername').val();
        let email = $('#studentEmail').val();
        let password = $('#studentPassword').val();
        let age = $('#studentAge').val()
        let subjects = template.subjects.get()
        let status = true;
        let data = {
            _id: Random.id(),
            username,
            password,
            email,
            createdAt: new Date(),
            firstname,
            lastname,
            age,
            type: 'STUDENT',
            status,
            branchId: Meteor.user()?.profile?.branchId,
            subjects


        }


        let file = document.getElementById('profileImg').files[0];
        if (file) {
            const upload = Users_Images.insert({
                fileId: Random.id(),
                meta: {
                    temp: true,
                    studentId: data._id
                },
                file,
                chunkSize: 'dynamic'
            }, false)
            upload.on('start', function () {
                template.isLoading.set(true)
            })

            upload.on('end', function (error, fileObj) {
                if (error) {
                    alert(`Error during upload: ${error}`);
                    console.log(error);
                } else {
                    data.profileImgId = fileObj._id
                    Meteor.call('add.Student', data, function (error, success) {
                        if (error) {
                            alert(error)
                        } else {
                            alert('Success', success)
                        }
                    })
                }
                template.isLoading.set(false)
            })

            upload.start()
        } else {
            Meteor.call('add.Student', data, function (error, success) {
                if (error) {
                    alert(error)
                } else {
                    alert(success)
                }
            })
        }

    },
    'click .updateBtn': function (event, template) {
        template.student.set(this)
    },

});