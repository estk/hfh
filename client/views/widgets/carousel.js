Template.carousel.helpers({
  photos: function () {
    return Photos.find({tags: 'home'});
  },
  first: function (i) {
    return i === 0;
  },
});

Template.carousel.rendered = function () {
  var spinWidth = $('.spin-container').width();
  $('.spin-container').height(spinWidth*2/3);
  
  // Get the photos
  var cb = function (err, res) {

    if (err || EJSON.parse(res.content).stat === "fail") {
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
  if (typeof this.data !== 'string') {
    Flickr.getWithTags("home", cb);
  } else {
    Flickr.getWithTags(this.data, cb);
  }

  $('.carousel').carousel({
    interval: 5000
  });
  $('.carousel-indicators :first-child').addClass('active')
};
