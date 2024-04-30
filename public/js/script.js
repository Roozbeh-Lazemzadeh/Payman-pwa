window.addEventListener('orientationchange', function(event) {
  // Lock the screen orientation to portrait mode
  if (window.orientation !== 0) {
    alert('Please rotate your device back to portrait orientation.');
    // Reset the orientation to portrait
    setTimeout(function () {
      screen.orientation.lock('portrait-primary');
    }, 0);
  }
});
