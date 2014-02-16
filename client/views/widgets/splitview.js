Template.splitview.helpers({
  photos: function () {
    var num = String(this),
        tags = makeTags(num);

    var ps = Photos.find({
      tags: {$in: tags}
    });
    return ps;
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
