Meteor.methods({
    uploadFile: function (file) {
      	file.save('/home/dalchand/uploads/');
    }
});