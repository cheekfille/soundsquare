(function(){

  var setScreenSizes = function() {
    $('.screen')
      .css('width',  window.innerWidth)
      .css('height', window.innerHeight);

    $('.autoWidth').css('width',  window.innerWidth);
  };

  $(window)
    .on('load', function() {
      setScreenSizes();
      $('#map_canvas').css('visibility','visible');
    })
    .on('resize', setScreenSizes);

}());
