//login.js

var userError = new ReactiveVar(false);
var passwordError = new ReactiveVar(false);
var errorMessage = new ReactiveVar(null);

var resetErrors = function() {
	userError.set(false);
	passwordError.set(false);
	errorMessage.set(null);
}

Template.login.helpers({
	userError: function() {
		return userError.get();
	},
	passwordError: function() {
		return passwordError.get();
	},
	errorMessage: function() {
		return errorMessage.get();
	}
});

var validateForm = function(userid, password) {
	resetErrors();
	
	if(userid.trim().length <= 0) {
		userError.set(true);
		errorMessage.set("Email ID is required")
		return false;
	}
	if(password.length <= 0) {
		passwordError.set(true);
		errorMessage.set("Password is required");
		return false;
	}
	return true;
}

Template.login.rendered = function() {
	Session.set("page", "login");
}

Template.login.events({
	"click .sign-in": function(evt, templ) {
		evt.preventDefault();
		var userid = templ.find("#email").value;
		var password = templ.find("#password").value;
		var ret = validateForm(userid, password);
		if(ret) {
			Meteor.loginWithPassword(userid, password, function(e) {
				if(e) {
					errorMessage.set(e.reason);
				} 
			});
		}
	}
})