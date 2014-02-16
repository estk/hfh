Template.carousel.helpers({
  photos: function () {
    var tags = String(this).split(','),
        yes = tags.filter(function (t) { return t[0] !== '-'; }),
        no = _.difference(tags, yes).map(function(s) {return s.slice(1);});

    var ps = Photos.find({
      tags: {
        $all: yes,
        $not: {$in: no}
      }
    });
    return ps;
  },
  first: function (i) {
    return i === 0;
  },
});

Template.carousel.rendered = function () {
  var spinWidth = $('.spin-container').width();
  $('.spin-container').height(spinWidth*2/3);
  
  var tags = this.data;
  Flickr.getWithTags(tags);

  var carousel = $('.carousel').carousel({
    interval: 5000
  });
  $('.carousel-indicators :first-child').addClass('active')

  $('.carousel-inner').on('click', function (e) {
    carousel.carousel('next');
  });
};
