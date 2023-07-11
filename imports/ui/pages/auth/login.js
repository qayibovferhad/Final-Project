import './login.html'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
Template.login.events({
    'submit #loginForm': function (event, template) {
        event.preventDefault()
        let username = $('#username').val();
        let password = $('#password').val();
        Meteor.loginWithPassword(username, password, function (error, success) {
            if (error) {
                console.log(error);
            } else {
                    FlowRouter.go('/director/students')
            }
        })
    }
});