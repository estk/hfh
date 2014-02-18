Template.splitview.helpers({
  banum: function(){return this;},
  photos: function () {
    var num = String(this),
        tags = makeTags(num);

    var ps = Photos.find({
      tags: {$in: tags}
    }).fetch();
    ps = _.sortBy(ps, function (o) {
      return _.contains(o.tags, "before") ? 0 : 1;
    });
    var minheight = _.min(_.pluck(ps, 'height_n'));
    return {
      before: ps[0],
      after: ps[1],
      minheight: minheight
    };
  }
});

Template.splitview.rendered = function() {
  var num = this.data,
      tags = makeTags(num);

  Flickr.getWithTags(tags);

  $('.fancybox').fancybox({});
};

function makeTags (num) {
  return ["before"+num, "after"+num];
}
