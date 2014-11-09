//router.js

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('home');
}, {where: 'client'});

Router.route('/profile', function () {
  this.render('profile');
}, {where: 'client'});

Router.route('/logout', function () {
  Meteor.logout(function(e){
  	if(!e) {
  		Router.go("/");
  	}
  });
}, {where: 'client'});

Router.route('/register', function () {
	this.render('register');
}, {where: 'client'});

Router.route('/(.*)', function () {
  this.redirect("/");
}, {where: 'client'});

Router.onBeforeAction(function() {
	if(this.url === "/register") {
		if(Meteor.userId()) {
			Router.go("/");
		} else {
			this.next();
		}
	} else {
	  	if (! Meteor.userId() ) {
	  		this.render('login');
	  	} else {
	    	this.next();
	  	}
  	}
});