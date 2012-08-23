(function(){

  $(document).on('sc:geo:get', function() {
    fetchData();
  });

  var fetchData = function() {
    $.ajax({
      type: 'get',
      url: 'http://api.soundcloud.com/e1/search/sounds?q=sbud&client_id=827bc72c3e385eafebf59a31e9be0017&limit=50',
      success: afterFetch
    });
  };

  var hasGeoTags = function(tags) {
    tags = tags.split(' ');
    // TODO add foursquare tags
    return _.compact(tags.map(function(tag) {
      if (/^geo\:/.test(tag)) {
        return tag.split('=')[1];
      }
    }));
  };

  var afterFetch = function(data) {
    var collection = _.compact(data.collection.map(function(attrs) {
      var latlng = hasGeoTags(attrs.tag_list);
      if (attrs.title.indexOf('#sbud') != -1 && latlng) {
        attrs._latlng = latlng;
        return attrs;
      }
    }));

    //  TODO: order by the nearest

    $(document).trigger({
      type: 'sc:geo:display',
      collection: collection
    });
  };

  $(document).on('sc:audio:play', function(event) {
    // $('h1').text('You are listening to:')
    $('h2').text(event.sound.title.replace('#sbud',''))
  });

}());
