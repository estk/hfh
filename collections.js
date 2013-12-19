Photos = new Meteor.Collection(null);
Projects = new Meteor.Collection(null);

Photos.before.insert(function (userId, doc) {
  return ! Photos.findOne({id: doc.id});
});

Projects.before.insert(function (userId, doc) {
  return ! Projects.findOne({name: doc.name});
});
