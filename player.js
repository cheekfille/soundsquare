(function(){

  var getURL = function(sound) {
    return sound.stream_url.replace('http://api.soundcloud.com','').replace('/stream','');
  };

  var playlist = [],
      currentSound;

  $(document)

    .on('sc:playlist:ready', function(event) {
      var playlistIds = _.pluck(playlist, 'id');

      event.playlist.forEach(function(sound){
        if (sound.streamable && !_.any(playlistIds, function(id) { return id === sound.id; } )) {
          sound.stream_url = sound.stream_url + '?client_id=827bc72c3e385eafebf59a31e9be0017';
          playlist.push(sound);
        }
      });

      if (!audio.isPlaying) {
        $('h2').text(playlist[0].title.replace('#sbud',''));
        $(document).trigger({
          type:'sc:map:highlight',
          audio: playlist[0]
        });
      }
    });


  $('.btnPlay').on('click', function(event) {

    currentSound = _.find(playlist, function(current){
      return !current._played;
    });

    if (currentSound === undefined) {
      return;
    }

    if (audio.src !== currentSound.stream_url) {
      audio.src = currentSound.stream_url;
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
      sound: currentSound
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

      playlist.forEach(function(current){
        if (current.id === currentSound.id) {
          current._played = true;
        }
      });

      $('.btnPlay')
        .toggleClass('playing', false)
        .click();
    });

}());
