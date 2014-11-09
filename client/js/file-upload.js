Template._meteorFileUploader.created = function() {
  // enable size to be an expression like "10*1024" but protect from villainous code injection with a regexp
  this.data.size = (this.data.size && /^(\d|\*|\+|\-|\/)+$/.test(this.data.size))?eval(this.data.size):null;
  this.data.options = _.extend({}, this.data);
  this.data.files = new Meteor.Collection(null);
};

Template._meteorFileUploader.events({
  'change input[type=file]': function (e, tmpl) {
    var fileInput = e.currentTarget;
    var file, mFile, uploader = tmpl.data;

    for (var i = 0; i < fileInput.files.length; i++) {
      file = fileInput.files[i];
      mFile = new MeteorFile(file, { collection: uploader.files });

      uploader.files.insert(mFile.toJSONValue());

      mFile.upload(
        file,
        uploader.method,
        uploader.options,
        function (err) {
          if (err) throw err;
        }
      );
    }
  }
});
/*****************************************************************************/

/************************ Handlebars *****************************************/
UI.registerHelper('FileUploader', function (options) {
  return Template._meteorFileUploader;
});

UI.registerHelper('humanize', function (number, options) {
  return MeteorFile.humanize(number);
});


/*****************************************************************************/

Files = new Meteor.Collection(null);

Template.fileUpload.events({
  'change input[type=file]': function (e, tmpl) {
    var input = tmpl.find('input[type=file]');
    var files = input.files;
    var file;
    var mFile;

    for (var i = 0; i < files.length; i++) {
      mFile = new MeteorFile(files[i], {
        collection: Files
      });

      Files.insert(mFile, function(i) {
        return function (err, res) {
          mFile.upload(files[i], "uploadFile");
        }
      }(i));
    }
  }
});

Template.fileUpload.helpers({
  files: function () {
    return Files.find();
  }
});

Template.fileUploadRow.helpers({
  uploadCompleteClass: function () {
    return this.uploadProgress == 100 ? 'progress-success' : '';
  }
});