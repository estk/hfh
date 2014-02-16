Template.splitview.helpers({
  photos: function () {
    var num = String(this),
        tags = makeTags(num);

    var ps = Photos.find({
      tags: {$in: tags}
    }).fetch();
    return _.sortBy(ps, function (o) {
      return _.contains(o.tags, "before") ? 0 : 1;
    });
  }
});

Template.splitview.rendered = function() {
  var num = this.data,
      tags = makeTags(num);

  Flickr.getWithTags(tags);
};

function makeTags (num) {
  return ["before"+num, "after"+num];
}
