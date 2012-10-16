Ti.include('config.js');

var win = Ti.UI.currentWindow;

var hasDetail = false;

if (win.data.text != 'undefined') {

	hasDetail = win.data.text;

};

var subWin = false;

Ti.App.fireEvent('setPageHeader', {

	title: 'Tab3 - bottom - detail', 
	logoRight: true

});

var bBack = Ti.UI.createButton({

	title: 'back',
	right: sc(10),
	width: sc(110),
	height: sc(42), 
	color: '#000', 
	top: sc(20),
	zIndex: 8000

});

bBack.addEventListener('click', function(e) {

	win.close();

});

var lDetail = Ti.UI.createLabel({

	text: '', 
	width: sc(350),
	height: sc(350),
	color: '#fff'

});

if (hasDetail != false) {
	
	lDetail.text = hasDetail;

}

win.add(bBack);
win.add(lDetail);

win.addEventListener('close', function(e) {

	Ti.API.log('window closed: ' + JSON.stringify(win));
		
	win.remove(bBack);
	win.remove(lDetail);
	
	if (subWin != false) {
	
		subWin.close();
	
	}

});		

