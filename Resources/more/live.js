var win = Titanium.UI.currentWindow;

var image = Titanium.UI.createImageView({
	id: 'liveView',
	url:'http://roofcam.union.ku.edu/jpeg.cgi?0'
}); 

win.add(image);

var seed = 0;

setInterval(function() {
  seed = seed + 1;
  image.url = 'http://roofcam.union.ku.edu/jpeg.cgi?0/#e' + seed;
}, 3000); //every 3 seconds