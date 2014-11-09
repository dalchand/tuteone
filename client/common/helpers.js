//helpers.js

TuteOne = {};

TuteOne.validateEmail = function(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

var resourceUrl = "http://192.168.0.103:8080/eps/files";

UI.registerHelper("loggedIn", function(){
	return Meteor.userId();
});

UI.registerHelper("equals", function(a, b){
	return (a === b);
});

UI.registerHelper("page", function(){
	return Session.get("page");
});

UI.registerHelper("user", function(){
	return Meteor.user();
});

UI.registerHelper("text", function(t){
	return t.replace(/\r?\n/g, '<br />');
})

UI.registerHelper("imageUrl", function(src){
	return resourceUrl + src;
})