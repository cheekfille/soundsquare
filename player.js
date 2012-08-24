(function(){

  var getURL = function(sound) {
    return sound.stream_url.replace('http://api.soundcloud.com','').replace('/stream','');
  };

  $(document)

    .on('sc:playlist:ready', function(event) {

      var collection = event.playlist.map(function(sound) {
        if (sound.streamable) {
          sound.stream_url = sound.stream_url + '?client_id=827bc72c3e385eafebf59a31e9be0017';
          return sound;
        }
      });

      if (!audio.isPlaying) {
        $(audio).data('collection', collection);
        $('h2').text(collection[0].title.replace('#sbud',''));
        $(document).trigger({
          type:'sc:map:highlight',
          audio: collection[0]
        });
      }
    });


  $('.btnPlay').on('click', function() {
    var collection = $(audio).data('collection');
    var sound = collection[0];

    if (audio.src !== sound.stream_url) {
      audio.src = sound.stream_url;
    }

    if ($(this).hasClass('playing')) {
      $(this).toggleClass('playing', false);
      audio.pause();
    } else {
      $(this).toggleClass('playing', true);
      audio.play();
    }

    $(document).trigger({
      type: 'sc:audio:play',
      sound: sound,
      collection: collection
    });

  });

  $(audio)
    .on('play', function() {
      this.isPlaying = true;
      $('.btnPlay').toggleClass('playing', true);
    })
    .on('pause', function() {
      this.isPlaying = false;
      $('.btnPlay').toggleClass('playing', false);
    })
    .on('ended', function() {
      this.isPlaying = false;
      $('.btnPlay').toggleClass('playing', false);
    });

}());
