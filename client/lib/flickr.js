"use strict";

var _baseUrl = "http://api.flickr.com/services/rest/";
var _apiKey = "f21b3b897a9c08dd4f07f00ca4fdc3f4";
var _userId = "66318963@N07";
var _extras = ["url_l","description"];
var _params = {
  api_key: _apiKey,
  user_id: _userId,
  extras: _extras.join(","),
  format: "json",
  nojsoncallback: 1
};

window.Flickr = {

  get: function (params, cb) {
    Meteor.http.get( _baseUrl, {"params": params}, cb);
  },

  getWithTags: function (tags, cb) {
    var params = _.clone(_params);

    if (_.isArray(tags))
      params.tags = tags.join(",");
    else
      params.tags = tags;
      
    params.method = 'flickr.photos.search';
    this.get(params, cb);
  },

  getUrl: function (photo, sizeChar) {
    var size = "";
    if (! _.isUndefined(sizeChar))
      size = "_" + sizeChar;
      
    return "http://farm" + photo.farm + ".staticflickr.com/" +
      photo.server + "/" + photo.id + "_" + photo.secret + size + ".jpg";
  }
};

