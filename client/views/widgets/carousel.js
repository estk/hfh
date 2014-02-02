Template.carousel.helpers({
  photos: function () {
    return Photos.find({tags: String(this)});
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
      // console.log("tags:", p.tags);
      Photos.insert(p);
    });
    console.log("Photos added!");
  };

  var tags = this.data;
  tags = tags + ",-before,-after";
  Flickr.getWithTags(tags, cb);

  var carousel = $('.carousel').carousel({
    interval: 5000
  });
  $('.carousel-indicators :first-child').addClass('active')

  $('.carousel-inner').on('click', function (e) {
    carousel.carousel('next');
  });
};
