//accounts.js

Meteor.users.allow({
	"insert": function() {
		return true;
	},
	"update": function(userId) {
		if(this.userId == userId) {
			return true;
		} else {
			return false;
		}
	},
	"remove": function() {
		return false;
	}
})

Meteor.publish("user-data", function(){
	if(this.userId) {
		return Meteor.users.find({_id: this.userId});
	} else {
		this.ready();
	}
});