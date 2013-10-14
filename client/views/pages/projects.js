Template.projects.helpers({
  projects: function () {
    return [
      {
        thumbnail: "http://hello.com",
        url: "http://hello.com",
        subphotos: [
          {
            url: "http://hello.com",
            description: "Blah"
          }
        ]
      }
    ];
  }
});

Template.carousel.rendered = function () {
  // get photos
  var cb = function (err, res) {
    if (err) {
      console.log(err);
      return;
    }
    // XXX: Correct?
    var photos = EJSON.parse(res.content).photos.photo;
    _.each(photos, function (p) {
      Photos.insert(p);
    })
    console.log("Photos added!");
  };
  // XXX: Change to correct tags
  var tags = "homan,blah,foo"
  Flickr.getWithTags(tags, cb)

  // XXX: Initialize fancybox?

}
