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
    if (err) {
      console.log(err);
      return;
    }
    var photos = EJSON.parse(res.content).photos.photo;
    _.each(photos, function (p) {
      Photos.insert(p);
    });
    console.log("Photos added!");
  };
  Flickr.getWithTags("home", cb);

  $('.carousel').carousel({
    interval: 5000
  });
  $('.carousel-indicators :first-child').addClass('active')
};
