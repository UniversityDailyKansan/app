var win = Titanium.UI.currentWindow;
win.backgroundImage = 'bg.jpg';
var bigbuttonheight = 35;
var bigbuttonbottom = 20;

var url = Titanium.UI.createTextField({
	value:'http://kjhkstream.org:8000/stream_high',
	color:'#336699',
	hintText:'url',
	textAlign:'left',
	clearOnEdit:false, // this set to true was clearing the field on launch
	height:35,
	bottom:bigbuttonbottom,
	width:300,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});

var requestButton = Titanium.UI.createButton({
	title:'Request',
	bottom:bigbuttonbottom,
	width:100,
	height:bigbuttonheight,
	left:10,
});

var streamButton = Titanium.UI.createButton({
	title:'Start',
	bottom:bigbuttonbottom,
	width:100,
	height:bigbuttonheight,
	right:10,
});

var pauseButton = Titanium.UI.createButton({
	title:'Pause',
	bottom:bigbuttonbottom,
	width:100,
	height:bigbuttonheight,
	enabled:false,
	font:{fontSize:12}
});

var progressLabel = Titanium.UI.createLabel({
	text:'Time Played: Not Started',
	bottom:0,
	left:100,
	height:40,
	width:300,
	color:'#555',
	textAlignment:'right'
});
var stateLabel = Titanium.UI.createLabel({
	textAlignment:'center',
	text:'Not Started',
	bottom:'-8',
	left:10,
	height:40,
	color:'#fff',
	font:{fontSize:13}
});
requestButton.addEventListener('click', function(e){
	 if (Titanium.Platform.osname == 'ipad') {
		var requestWindow = Titanium.UI.createWindow({
			url:'request.js',
			title:'Request a song',
		});
		Titanium.UI.currentTab.open(requestWindow,{animated:true});
 }
		Titanium.Platform.openURL('tel:7858644747');
});
// win.add(url);
win.add(streamButton);
win.add(requestButton);
//win.add(pauseButton);
//win.add(progressLabel);
win.add(stateLabel);
var streamer = Ti.Media.createAudioPlayer();

streamButton.addEventListener('click',function()
{
	if (streamButton.title == 'Stop')
	{
		progressLabel.text = 'Stopped';
		streamer.stop();
		pauseButton.enabled = false;
		pauseButton.title = 'Pause';
		streamButton.title = "Start";
	}
	else
	{
		progressLabel.text = 'Starting ...';
		streamer.url = url.value;
		streamer.start();
		pauseButton.enabled = true;
		pauseButton.title = 'Pause';
		streamButton.title = "Stop";
	}
});

pauseButton.addEventListener('click', function()
{
	streamer.pause();
	if (streamer.paused) {
		pauseButton.title = 'Unpause';
	}
	else {
		pauseButton.title = 'Pause';
	}
});

streamer.addEventListener('progress',function(e)
{
	progressLabel.text = 'Time Played: ' + Math.round(e.progress) + ' seconds';
});

streamer.addEventListener('change',function(e)
{
	stateLabel.text = 'Currently '+e.description;
	if(e.description == "stopped") {
		progressLabel.text = 'Stopped';
		pauseButton.enabled = false;
		pauseButton.title = 'Pause';
		streamButton.title = "Start";
	}
});

// save off current idle timer state
var idleTimer = Ti.App.idleTimerDisabled;

// while we're in this window don't let the app shutdown
// when the screen is idle
Ti.App.idleTimerDisabled = true;

win.addEventListener('close',function()
{
	Ti.API.info("window was closed, idleTimer reset to = "+idleTimer);

	// restore previous idle state when closed
	Ti.App.idleTimerDisabled = idleTimer;
});