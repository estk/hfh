Photos = new Meteor.Collection(null);

Photos.before.insert(function (userId, doc) {
  return ! Photos.findOne({id: doc.id});
});
