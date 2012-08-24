(function(){
  var mapOptions = {
    center: new google.maps.LatLng(52.530821822916664, 13.419200485416665),
    zoom: 15,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  var markers = [];
  var localizationMarker;
  var playlistCollection;

  var setMarker = function(attrs) {
    markers.push(new google.maps.Marker({
      position: new google.maps.LatLng(attrs._latlng[0], attrs._latlng[1]),
      map: map,
      icon: 'img/mapmarker.png',
      _sound_id: attrs.id
    }));
  };

  var removeMarkers = function() {
    markers.forEach(function(marker){
      if (marker.icon !== 'img/mapbuddy.png') {
        marker.setMap(null);
      }
    });
  };

  var removeMarker = function(attrs) {
    markers.forEach(function(marker){
      if (marker._sound_id === attrs.id) {
        marker.setMap(null);
      }
    });
  };


  $(document)

    .on('sc:geo:get', function(event) {
      // set a marker on this position with maplocation.png
      var latlng = new google.maps.LatLng(event.coords.latitude, event.coords.longitude);
      if (localizationMarker) {
        localizationMarker.setPosition(latlng);
      } else {
        localizationMarker = new google.maps.Marker({
          position: latlng,
          map: map,
          zIndex: google.maps.Marker.MAX_ZINDEX,
          icon: 'img/maplocation.png'
        });
      }
      if (event._center !== false) {
        map.setCenter(latlng);
        circle = new google.maps.Circle({
            map: map,
            clickable: false,
            radius: 100, // in meters
            fillOpacity: 0,
            strokeOpacity: 0
        });
        // Attach circle to marker
        circle.bindTo('center', localizationMarker, 'position');
      } else {
        circle.setCenter(latlng);
      }
    })

    .on('sc:collection:ready', function(event) {
      if (markers) {
        removeMarkers();
      }
      event.collection.forEach(function(attrs) {
        setMarker(attrs);
      });

      var bounds = circle.getBounds();
      playlistCollection = [];
      event.collection.forEach(function(attrs) {
        if (!bounds.contains( new google.maps.LatLng(attrs._latlng[0], attrs._latlng[1]) )) {
          removeMarker(attrs);
        } else {
          playlistCollection.push(attrs);
        }
      });

      $(document).trigger({
        type: 'sc:playlist:ready',
        playlist: playlistCollection
      });

    })

    .on('sc:map:highlight sc:audio:play', function(event) {
      var audio = event.audio || event.sound,
          highlightedMarker;
      _.each(markers, function(marker){
        if (marker._sound_id === audio.id) {
          marker.setIcon('img/mapbuddy.png');
          marker.setZIndex(google.maps.Marker.MAX_ZINDEX - 1);
          highlightedMarker = marker;
        } else {
          marker.setIcon('img/mapmarker.png');
          marker.setZIndex(0);
        }
      });

    });

}());
