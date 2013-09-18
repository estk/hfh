Template.carousel.helpers({
  photos: function () {
    return Photos.find();
  }
});

Template.carousel.rendered = function () {
  // Get the photos
  var cb = function (err, res) {
    if (err) {
      console.log(err);
      return;
    }
    var photos = EJSON.parse(res.content).photos.photo;
    _.each(photos, function (p) {
      Photos.insert(p);
    });
    console.log("photos inserted");
  };
  Flickr.getWithTags("home", cb);
  $('.carousel-indicators:first-child').addClass('active');
  $('.carousel-inner:first-child').addClass('active');

  $('.carousel').carousel({
    interval: 2000
  });
};
