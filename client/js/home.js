//home.js

Template.home.rendered = function() {
	Session.set("page", "home");
}

Template.home.helpers({
	displayName: function() {
		var user = Meteor.user();
		if(user && user.profile.name) {
			return user.profile.name;
		}
	}
});

Template.home.events({
	"click .sign-out": function(e) {
		e.preventDefault();
		Meteor.logout();
	}
})