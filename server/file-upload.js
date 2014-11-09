UPLOAD_DIR = '/home/dalchand/uploads/';

Meteor.methods({
    uploadFile: function (file) {
    	if(this.userId) {
    		var self = this;
      		file.save(UPLOAD_DIR, {
      			onComplete: function(name) {
      				console.log('upload complete');
			        var picture = {
			          source: '/' + name,
			          processed: false
			        }
			        Meteor.users.update({_id: self.userId}, {$set: {"profile.picture": picture}});
      			}
      		});
      	}
    }
});

FileApi = {};

FileApi.getFile = function(filename) {
	return UPLOAD_DIR + filename;
}