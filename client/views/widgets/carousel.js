Template.carousel.helpers({
  photos: function () {
    var tags = String(this).split(','),
        yes = tags.filter(function (t) { return t[0] !== '-'; }),
        // no = [];
        no = _.difference(tags, yes);

    return Photos.find({
      tags: {
        $all: yes,
        $not: {$in: no}
      }
    });
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
      console.error(err);
      return;
    }
    var photos = EJSON.parse(res.content).photos.photo;
    _.each(photos, function (p) {
      p.tags = p.tags.split(' ');
      // console.log("tags:", p.tags);
      Photos.insert(p);
    });
    console.debug("Photos added!");
  };

  var tags = this.data;
  Flickr.getWithTags(tags, cb);

  var carousel = $('.carousel').carousel({
    interval: 5000
  });
  $('.carousel-indicators :first-child').addClass('active')

  $('.carousel-inner').on('click', function (e) {
    carousel.carousel('next');
  });
};
