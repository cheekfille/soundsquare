(function(){
  var screen1 = $('#screen1'),
      screen2 = $('#screen2');

  var getPosition = function(center) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $(document).trigger({
        type: 'sc:geo:get',
        coords: position.coords,
        _center: center
      });
    });
  };

  var setCurrentPosition = function() {
    getPosition();
    setInterval(function(){
      getPosition(false);
    }, 8000);
  };

  screen1.on('click', function() {
    setCurrentPosition();
  });

  $(document).on('sc:geo:display', function() {
    screen1.fadeOut('slow');
    screen2.fadeIn('slow');
  });


}());
