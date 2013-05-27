var win = Titanium.UI.currentWindow;
win.backgroundColor = 'black';
win.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/KULive');
});
var image = Titanium.UI.createImageView({
	id: 'liveView',
	image:'http://roofcam.union.ku.edu/jpeg.cgi?0'
}); 

win.add(image);

var seed = 0;

setInterval(function() {
  seed = seed++;
  image.image = 'http://roofcam.union.ku.edu/jpeg.cgi?0/#e' + seed;
}, 3000); //every 3 seconds