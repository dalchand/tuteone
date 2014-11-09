//profile.js

var editing = new ReactiveVar();

Template.profile.created = function() {
	editing.set(null);
}

Template.profile.rendered = function() {
	Session.set("page", "profile");
	$("body").on("click.editing", function(){
		editing.set(null);
	});
}

Template.profile.destroyed = function() {
	$("body").off("click.editing");
}

Template.profile.helpers({
	role: function(role) {
		if(role == "student") return "Student";
		else if(role == "tutor") return "Tutor";
	},
	editing: function() {
		return editing.get();
	}
});

Template.profile.events({
	"click .name": function(evt) {
		evt.stopPropagation();
		editing.set("name");
	},
	"click .phone": function(evt) {
		evt.stopPropagation();
		editing.set("phone");
	},
	"click .aboutme": function(evt) {
		evt.stopPropagation();
		editing.set("aboutme");
	},
	"click .location": function(evt) {
		evt.stopPropagation();
		editing.set("location");
	},
	"click .interests": function(evt) {
		evt.stopPropagation();
		editing.set("interests");
	},
	"click .lookingfor": function(evt) {
		evt.stopPropagation();
		editing.set("lookingfor");
	},
	"click .educations": function(evt) {
		evt.stopPropagation();
		editing.set("educations");
	},
	"keypress input.phone": function(event, templ) {
		event.stopPropagation();
		var number = templ.find(".phone").value.trim();
		if(number.length == 10) {
			return false;
		}
		return (event.charCode >= 48 && event.charCode <= 57)
	},
	"blur input.name": function(evt, templ) {
		evt.stopPropagation();
		var name = templ.find(".name").value.trim();
		if(name.length > 0) {
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.name": name}});
			editing.set(null);
		} else {
			editing.set(null);
		}
	},
	"blur input.location": function(evt, templ) {
		evt.stopPropagation();
		var location = templ.find(".location").value.trim();
		if(location.length > 0) {
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.location": location}});
			editing.set(null);
		} else {
			Meteor.users.update({_id: Meteor.userId()}, {$unset: {"profile.location": null}});
			editing.set(null);
		}
	},
	"blur input.phone": function(evt, templ) {
		evt.stopPropagation();
		var phone = templ.find(".phone").value.trim();
		if(phone.length == 10) {
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.phone": phone}});
			editing.set(null);
		} 
		if(phone.length == 0) {
			Meteor.users.update({_id: Meteor.userId()}, {$unset: {"profile.phone": null}});
			editing.set(null);
		}
	},
	"blur textarea.aboutme": function(evt, templ) {
		evt.stopPropagation();
		var aboutme = templ.find(".aboutme").value.trim();
		if(aboutme.length > 0) {
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.about_me": aboutme}});
			editing.set(null);
		} else {
			Meteor.users.update({_id: Meteor.userId()}, {$unset: {"profile.about_me": null}});
			editing.set(null);
		}
	},
	"blur textarea.interests": function(evt, templ) {
		evt.stopPropagation();
		var interests = templ.find(".interests").value.trim();
		if(interests.length > 0) {
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.interests": interests}});
			editing.set(null);
		} else {
			Meteor.users.update({_id: Meteor.userId()}, {$unset: {"profile.interests": null}});
			editing.set(null);
		}
	},
	"blur textarea.lookingfor": function(evt, templ) {
		evt.stopPropagation();
		var lookingfor = templ.find(".lookingfor").value.trim();
		if(lookingfor.length > 0) {
			Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.looking_for": lookingfor}});
			editing.set(null);
		} else {
			Meteor.users.update({_id: Meteor.userId()}, {$unset: {"profile.looking_for": null}});
			editing.set(null);
		}
	},
	"click .removeEducation": function() {
		var temp = this
		Meteor.users.update({_id: Meteor.userId()}, {$pull: {"profile.educations": this}})
	}
});

Template.newEducation.events({
	"click .addNewEducation": function(evt, templ) {
		evt.stopPropagation();
		var year = templ.find(".year").value;
		var institute = templ.find(".institute").value;
		var course = templ.find(".course").value;
		var result = templ.find(".result").value;
		if(year.length !== 0 && institute.length !== 0 && course.length !== 0 && result.length !== 0) {
			var education = {
				year: year,
				institute: institute,
				course: course,
				result: result
			};
			Meteor.users.update({_id: Meteor.userId()}, {$push: {"profile.educations": education}});
			templ.find(".year").value = "";
			templ.find(".institute").value = "";
			templ.find(".course").value = "";
			templ.find(".result").value = "";
		}
	}
})