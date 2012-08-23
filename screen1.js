(function(){
  var screen1 = $('#screen1'),
      screen2 = $('#screen2');

  var setCurrentPosition = function() {
    setInterval(function(){
      console.log('ok')
      navigator.geolocation.getCurrentPosition(function(position) {
        $(document).trigger({
          type: 'sc:geo:get',
          coords: position.coords
        });
      });
    }, 5000);
  };

  screen1.on('click', function() {
    setCurrentPosition();
  });

  $(document).on('sc:geo:display', function() {
    screen1.fadeOut('slow');
    screen2.fadeIn('slow');
  });


}());
