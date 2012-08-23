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
      marker.setMap(null);
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
          icon: 'img/maplocation.png'
        });
      }
      if (event._center !== false) {
        map.setCenter(latlng);
        circle = new google.maps.Circle({
            map: map,
            clickable: false,
            radius: 100, // in meters
            fillColor: '#fff',
            fillOpacity: 0.6,
            strokeColor: '#313131',
            strokeOpacity: 0.4,
            strokeWeight: 0.8
        });
        // Attach circle to marker
        circle.bindTo('center', localizationMarker, 'position');
      } else {
        circle.setCenter(latlng);
      }
    })

    .on('sc:geo:display', function(event) {
      if (markers) {
        removeMarkers();
      }
      event.collection.forEach(function(attrs) {
        setMarker(attrs);
      });

      var bounds = circle.getBounds();
      event.collection.forEach(function(attrs) {
        if (!bounds.contains( new google.maps.LatLng(attrs._latlng[0], attrs._latlng[1]) )) {
          removeMarker(attrs);
        }
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
