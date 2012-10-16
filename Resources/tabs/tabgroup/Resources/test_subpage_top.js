Ti.include('config.js');

var win = Ti.UI.currentWindow;
var subWin = false;

var bBack = Ti.UI.createButton({

	title: 'back',
	right: sc(10),
	width: sc(110),
	height: sc(42), 
	color: '#000', 
	top: sc(20)

});

bBack.addEventListener('click', function(e) {

	win.close();

});

var bOpen = Ti.UI.createButton({

	title: 'open subpage', 
	width: sc(250),
	height: sc(50)

});

bOpen.addEventListener('click', function(e) {

	var ePage = 'test_subpage_top.js';
									
	subWin = Ti.UI.createWindow(win.o.content);
	subWin.url = ePage;
	subWin.o = win.o;								
	
	if (platform == 'android') {
			
		Ti.App.fireEvent('addTabGroupWindow', {
		
			tabgroup: 'navtop', 
			window: subWin,
			name: subWin.url
			
		});
	
	} else {
	
		subWin.open();
	
	}

});

win.add(bBack);
win.add(bOpen);

win.addEventListener('close', function(e) {

	Ti.API.log('window closed: ' + JSON.stringify(win));
		
	win.remove(bBack);
	win.remove(bOpen);
	
	if (subWin != false) {
	
		subWin.close();
	
	}

});		

