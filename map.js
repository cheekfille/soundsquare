(function(){
  var mapOptions = {
    center: new google.maps.LatLng(52.530821822916664, 13.419200485416665),
    zoom: 15,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  var markers = [];

  var setMarker = function(attrs) {
    markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(attrs._latlng[0], attrs._latlng[1]),
        map: map,
        icon: 'img/mapmarker.png',
        _sound_id: attrs.id
    }));
  };


  $(document)

    .on('sc:geo:get', function(event) {
      map.setCenter(new google.maps.LatLng(event.coords.latitude, event.coords.longitude));
      // set a marker on this position with maplocation.png
      if ()
      new google.maps.Marker({
        position: new google.maps.LatLng(event.coords.latitude, event.coords.longitude),
        map: map,
        icon: 'img/maplocation.png'
      });
    })

    .on('sc:geo:display', function(event) {
      event.collection.forEach(function(attrs) {
        setMarker(attrs);
      });
    })

    .on('sc:map:highlight', function(event) {
      var audio = event.audio,
          highlightedMarker;
      _.each(markers, function(marker){
        if (marker._sound_id === audio.id) {
          marker.setIcon('img/mapbuddy.png');
          highlightedMarker = marker;
        } else {
          marker.setIcon('img/mapmarker.png');
        }
      });

    });

}());
