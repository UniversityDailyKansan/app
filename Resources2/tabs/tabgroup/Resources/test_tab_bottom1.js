Ti.include('config.js');

var win = Ti.UI.currentWindow;
var subWin = false;

Ti.App.fireEvent('setPageHeader', {

	title: 'Tab1 - top', 
	logoRight: true

});

var tabgroupTop = new Class_Tabgroup({

	tabgroup: {
	
		width: sc(480),
		top: sc(5),
		bottom: sc(0),
		backgroundColor: '#000',	
	
	},
	bar: {
	
		width: sc(480),
		height: sc(94),
		top: sc(0),
//				backgroundColor: '#000'	
		backgroundImage: 'images/480x854/bg_tabgroup_top.png',	
	
	},
	content: {
	
		width: sc(480),
		top: sc(124),
		bottom: sc(93),
		backgroundColor: '#000',	
	
	}
	
}, null, 'test_tab_top1', 'navtop');

tabgroupTop.addTab({

	o: {
		
		name: 'test_tab_top1',
		off: 'images/480x854/bt_tab1_bottom_off.png',
		on: 'images/480x854/bt_tab1_bottom_on.png'
	
	},
	left: sc(10),
	top: 0,
	width: sc(119),
	height: sc(62),
	canScale: true,
	enableZoomControls: false

});

tabgroupTop.addTab({

	o: {
		
		name: 'test_tab_top2',
		off: 'images/480x854/bt_tab2_bottom_off.png',
		on: 'images/480x854/bt_tab2_bottom_on.png'
	
	},
	top: 0,
	width: sc(119),
	left: sc(129),
	height: sc(62),
	canScale: true,
	enableZoomControls: false

});

tabgroupTop.addTab({

	o: {
		
		name: 'test_tab_top3',
		off: 'images/480x854/bt_tab3_bottom_off.png',
		on: 'images/480x854/bt_tab3_bottom_on.png'
	
	},
	top: 0,
	width: sc(119),
	left: sc(248),
	height: sc(62),
	canScale: true,
	enableZoomControls: false

});

tabgroupTop.create();

win.add(tabgroupTop.tabgroup);