/* 
  Vidoe.js-specific Javascript for getting the player and skin working 
*/

// Load the Video.js Less content from a file
// This allows us to easily swap in new versions of the video-js.less
// file when they're created
window.defaultStyles = '/* No Styles Loaded */';

window.resetStyles = function(){
  var cmEl = $('.CodeMirror')[0];

  // If CodeMirror has loaded we need to talk to it
  if (cmEl) {
    cmEl.CodeMirror.setValue(window.defaultStyles);
  
  // Otherwise we need to update the content of the textarea
  // pre CodeMirror init
  } else {
    $('#less-input').val(window.defaultStyles);
  }
};

$.ajax('/stylesheets/video-js.less', { async: false }).done(function(data){
  window.defaultStyles = data;
  window.resetStyles();
});

$('.skin-styles-reset').on('click', function(){
  window.resetStyles();
});


