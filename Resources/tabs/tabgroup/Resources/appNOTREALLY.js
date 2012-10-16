Ti.include('config.js');

// create main window
var wMain = Ti.UI.createWindow({

	url: 'index.js',
	backgroundColor: '#000',
	tabBarHidden:true,	
	navBarHidden:true,	
	statusBarHidden:true,
	exitOnClose: true	

});

// declare global vars
var tabGroupWindows = {

	navtop: [], 
	navbottom: []

};

Ti.App.addEventListener('addTabGroupWindow', function(e) {

	Ti.API.log('window ' + e.name + '(' + e.window + ') in ' + e.tabgroup + ' opened');

	var window = {
	
		window: e.window, 
		name: e.name
	
	};

	if (typeof e.data != 'undefined') {
	
		window.data = e.data;
		e.window.data = e.data;
	
	} else {
	
		window.data = false;
		e.window.data = false;
	
	}
	
	tabGroupWindows[e.tabgroup].push(window);
	
	e.window.open();
	e.window.show();

});

Ti.App.addEventListener('removeTabGroupWindow', function(e) {

//	Ti.API.log('windows in ' + e.tabgroup + ' closed');
	
	var windows = tabGroupWindows[e.tabgroup];

	for (var win in windows) {
	
		Ti.API.log('window ' + windows[win].name + ' in ' + e.tabgroup + ' closed');
	
		windows[win].window.hide();
		windows[win].window.close();
	
	}
	
	tabGroupWindows[e.tabgroup] = [];

});

function openApp() {
				
	wMain.open();
		
}

Ti.API.log('Density: ' + Titanium.Platform.displayCaps.density);
Ti.API.log('DPI: ' + Titanium.Platform.displayCaps.dpi);
Ti.API.log('Width: ' + Titanium.Platform.displayCaps.platformWidth);
Ti.API.log('Height: ' + Titanium.Platform.displayCaps.platformHeight);

openApp();