  var projectTags = ["1230hillsborough","123sancarlos","280hillsborough", "70losaltos"];

Template.projects.helpers({
  projects: function () {
    var projects = []
    _.each(projectTags, function(d, i){
      var photos = Photos.find({tags: d}).fetch();
      var pilot = _.find(photos, function(d,i){ return _.contains(d.tags, "pilot"); });
      photos = photos.filter(function(d,i){ return ! _.contains(d.tags, "pilot"); });
      
      if (pilot)
        projects.push({
                name: d,
                pilot: pilot,
                photos: photos
        });
    });
    console.log(projects);
    return projects;
  }
});

Template.projects.created = function () {
  // get photos
  var cb = function (err, res) {
    if (err) {
      console.log(err);
      return;
    }

    var photos = EJSON.parse(res.content).photos.photo;
    _.each(photos, function (p) {
      p.tags = p.tags.split(' ');
      Photos.insert(p);
    });
    console.log("Photos added!");
    
  };

  // collect photos into projects
  function collectProjects() {
    _.each(projectTags, function(d, i){
      Flickr.getWithTags(d, cb)
      Projects.insert({
        name: d,
        photoIds: Photos.find({tags: d})
      });
    })
  }


  // XXX: Change to correct tags
  collectProjects();
}

Template.projects.rendered = function () {
  $('.fancybox').fancybox();
};
