// Set up the main Video.js player
// Moved to it's own file after the app files load
//   trying to make the volume bar issue go away by giving the
//   styles longer to load, but it hasn't worked
var mainPlayer = videojs('main-player', { 
  controls: true,
  preload: 'none',
  width: 'auto', 
  height: 'auto',
  sources: [
    {
      type: 'video/mp4',
      src: 'http://vjs.zencdn.net/v/oceans.mp4'
    },
    {
      type: 'video/webm',
      src: 'http://vjs.zencdn.net/v/oceans.webm'
    }
  ]
});

// Hack to make sure volume bar and handle get udpated
// after styles load, because the process we're using 
// to load the styles takes some time
setTimeout(function(){
  mainPlayer.volume(0).volume(1);
}, 500);