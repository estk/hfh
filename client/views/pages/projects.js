  var projectTags = ["1230hillsborough","123sancarlos","70losaltos"];

Template.projects.helpers({
  projects: function () {
    var projects = [];

    // heavy construction
    _.each(projectTags, function(tgs){
      var tags = String(tgs).split(','),
          yes = tags.filter(function (t) { return t[0] !== '-'; }),
          no = _.difference(tags, yes).map(function(s) {return s.slice(1);});

      // console.log("yes: " + yes, "no: " + no);

      var photos = Photos.find({
        tags: {
          $all: yes,
          $not: {$in: no}
        }
      }).fetch();

      // if (!! photos[0]) console.log(photos[0]);
      var pilot = _.find(photos, function(d){ return _.contains(d.tags, "pilot"); });
      photos = photos.filter(function(d){ return ! _.contains(d.tags, "pilot"); });

      // There needs to be a pilot.
      if (!! pilot) {
        projects.push({
          name: tgs,
          pilot: pilot,
          photos: photos
        });
      }
    });
    // console.log(projects);
    return projects;
  }
});

Template.projects.created = function () {
  _.each(projectTags, function(d){
    // console.log("requesting " + d + " from flickr ");
    Flickr.getWithTags(d);
  });
};

Template.projects.rendered = function () {
  $('.fancybox').fancybox({});
};
