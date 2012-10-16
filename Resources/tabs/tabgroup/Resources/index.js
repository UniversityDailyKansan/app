Ti.include('config.js');

var win = Ti.UI.currentWindow;

win.backgroundColor = '#000';

var vHeader = Ti.UI.createView({

	top: 0,
	left: 0,
	width: sc(480),
	height: sc(47)

});

var lPageHeader = Ti.UI.createLabel({

	title: 'Tab 1 - Bottom', 
	color: '#fff', 
	textAlign: 'center', 
	width: sc(200), 
	font: {
	
		fontSize: 11
	
	}

});

var vHeaderBg = Ti.UI.createView({

	top: 0,
	left: 0,
	width: sc(480),
	height: sc(45),
	backgroundImage: 'images/480x854/bg_header_480.png'

});

var vHeaderLineTop = Ti.UI.createView({

	top: sc(0),
	left: sc(0),
	right: sc(0),
	height: sc(2),
	backgroundColor: '#4F4F4F'

});

var vHeaderLineBottom = Ti.UI.createView({

	bottom: sc(0),
	left: sc(0),
	right: sc(0),
	height: sc(2),
	backgroundColor: '#4F4F4F'

});


var tabgroup = new Class_Tabgroup({

	tabgroup: {
	
		width: sc(480),
		top: sc(50),
		bottom: sc(0),
		backgroundColor: '#000',	
	
	},
	bar: {
	
		width: sc(480),
		height: sc(73),
		bottom: sc(20),
		backgroundImage: 'images/480x854/bg_tabgroup_bottom.png',	
	
	},
	content: {
	
		width: sc(480),
		top: sc(50),
		bottom: sc(93),
		backgroundColor: '#000',	
	
	}
	
}, null, 'test_tab_bottom1', 'navbottom');

tabgroup.closeOtherTabgroup = function() {

	Ti.App.fireEvent('removeTabGroupWindow', {
	
		tabgroup: 'navtop',
		
	});

};

tabgroup.addTab({

	o: {
		
		name: 'test_tab_bottom1',
		off: 'images/480x854/bt_tab1_bottom_off.png',
		on: 'images/480x854/bt_tab1_bottom_on.png'
	
	},
	left: sc(16),
	top: sc(9),
	width: sc(132),
	height: sc(65),
	canScale: true,
	enableZoomControls: false

});

tabgroup.addTab({

	o: {
		
		name: 'test_tab_bottom2',
		off: 'images/480x854/bt_tab2_bottom_off.png',
		on: 'images/480x854/bt_tab2_bottom_on.png'
	
	},
//	left: 120,
	top: sc(9),
	width: sc(132),
	height: sc(65),
	canScale: true,
	enableZoomControls: false

});

tabgroup.addTab({

	o: {
		
		name: 'test_tab_bottom3',
		off: 'images/480x854/bt_tab3_bottom_off.png',
		on: 'images/480x854/bt_tab3_bottom_on.png'
	
	},
	right: sc(16),
	top: sc(9),
	width: sc(132),
	height: sc(65),
	canScale: true,
	enableZoomControls: false

});

tabgroup.create();

vHeader.add(vHeaderBg);
vHeader.add(vHeaderLineTop);
vHeader.add(vHeaderLineBottom);
vHeader.add(lPageHeader);

win.add(vHeader);
win.add(tabgroup.tabgroup);

Ti.App.addEventListener('setPageHeader', function(e) {
	
	lPageHeader.text = e.title;
		
});