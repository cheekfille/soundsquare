(function(){

  var getURL = function(sound) {
    return sound.stream_url.replace('http://api.soundcloud.com','').replace('/stream','');
  };

  $(document)

    .on('sc:geo:display', function(event) {

      var collection = event.collection.map(function(sound) {
        if (sound.streamable) {
          sound.stream_url = sound.stream_url + '?client_id=827bc72c3e385eafebf59a31e9be0017';
          return sound;
        }
      });

      $(audio).data('collection', collection);
      $('h2').text(collection[0].title.replace('#sbud',''))
      $(document).trigger({
        type:'sc:map:highlight',
        audio: collection[0]
      })
    });


  $('.btnPlay').on('click', function() {
    var collection = $(audio).data('collection');
    var sound = collection[0];
    audio.src = sound.stream_url;
    audio.play();
    $(document).trigger({
      type: 'sc:audio:play',
      sound: sound,
      collection: collection
    });

  });

}());
