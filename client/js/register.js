//register.js

var nameError = new ReactiveVar(false);
var userError = new ReactiveVar(false);
var passwordError = new ReactiveVar(false);
var errorMessage = new ReactiveVar(null);

var resetErrors = function() {
	nameError.set(false);
	userError.set(false);
	passwordError.set(false);
	errorMessage.set(null);
}

Template.register.helpers({
	nameError: function() {
		return nameError.get();
	},
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

var validateForm = function(name, userid, password, role) {
	resetErrors();
	if(name.trim().length <= 0) {
		nameError.set(true);
		errorMessage.set("Name is required");
		return false;
	}
	if(userid.trim().length <= 0) {
		userError.set(true);
		errorMessage.set("Email ID is required")
		return false;
	}
	if(!TuteOne.validateEmail(userid)) {
		userError.set(true);	
		errorMessage.set("Email ID is not valid")
		return false;
	}
	if(password.length <= 0) {
		passwordError.set(true);
		errorMessage.set("Password is required");
		return false;
	}
	if(password.length < 6) {
		passwordError.set(true);
		errorMessage.set("Password too short (Minimum six characters required)");
		return false;
	}	
	return true;
}

Template.register.events({
	"click .sign-up": function(evt, templ) {
		evt.preventDefault();
		evt.stopPropagation();
		var name = templ.find("#name").value;
		var userid = templ.find("#email").value;
		var password = templ.find("#password").value;
		var role = templ.find('input[name="role"]:checked').value;
		var ret = validateForm(name, userid, password, role);
		if(ret) {
			Accounts.createUser({
				username: userid,
				password: password,
				email: userid,
				profile: {
					name: name,
					role: role
				}
			}, function(e){
				if(e) {
					errorMessage.set(e.reason);
				} else {
					Router.go("/");
				}
			});
		}
	}
})