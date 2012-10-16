Ti.include('config.js');

var win = Ti.UI.currentWindow;

var subWin = false;

Ti.App.fireEvent('setPageHeader', {

	title: 'Tab3 - bottom'

});
	
var myMenue = [

	{ title: 'Entry 1', hasChild: false, page: 'test_subpage_tableview' }, 
	{ title: 'Entry 2', hasChild: false, page: 'test_subpage_tableview' }, 
	{ title: 'Entry 3 - with data', hasChild: false, page: 'test_subpage_tableview' }

];

var myData = {

	text: 'This data is transfered from the parent tableview'

}; 
	
var data = [];
var rows = [];
	
for (var link in myMenue) {
		
	var bg_row = 'images/480x854/bg_row_all.png';
	var row_height = sc(63);
	
	if (link == 0) {
	
		bg_row = 'images/480x854/bg_row_top.png';
		row_height = sc(64);
	
	} else
	
	if (link == (myMenue.length-1)) {
	
		bg_row = 'images/480x854/bg_row_bottom.png';
		row_height = sc(60);			
	
	} else {
	
		bg_row = 'images/480x854/bg_row_all.png';
		row_height = sc(63);
	
	}
	
	rows[link] = Ti.UI.createTableViewRow({
	
//		backgroundImage: bg_row, 
		color: '#fff', 
		height: row_height, 
//		selectionStyle: 'none', 
		page: myMenue[link].page
	
	});
	
	if (platform == 'iphone') {
	
		rows[link].backgroundImage = bg_row; 
	
	}

	var	lLinkTitle = Ti.UI.createLabel({
		
		left: sc(10),
		text: myMenue[link].title,
		height: sc(30),
		width: sc(480)
		
	});
	
	var iArrow = Ti.UI.createImageView({
	
		image: 'images/480x854/arrow_white.png', 
		right: sc(10),
		width: sc(9),
		height: sc(15), 
		canScale: true,
		enableZoomControls: false
	
	});
	
	if (platform == 'iphone') {
	
		rows[link].backgroundImage = bg_row; 
		rows[link].selectionStyle = bg_row;
		rows[link].separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle.NONE; 
		lLinkTitle.color = '#fff'; 
	
	}
	
	rows[link].add(lLinkTitle);
	rows[link].add(iArrow);			

	data.push(rows[link]);

}
			
var tv = Titanium.UI.createTableView({
	
	data:data, 
	top: sc(30),
	left: sc(10),
	right: sc(10),
//	bottom: sc(10),
	height: sc(190), 
	color: '#fff', 
	backgroundColor: 'transparent', 
	selectionStyle:'none', 
	separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE

});

tv.addEventListener('click', function(e) {
	
	var ePage = myMenue[e.index].page + '.js';
									
	subWin = Ti.UI.createWindow(win.o.content);
	subWin.url = ePage;
	subWin.o = win.o;
	subWin.data = e.index == 2 ? myData : {};
	
	if (platform == 'android') {								
	
		Ti.App.fireEvent('addTabGroupWindow', {
		
			tabgroup: 'navbottom', 
			window: subWin,
			name: subWin.url,
			data: subWin.data
			
		});
	
	} else {
	
		subWin.open();
	
	}
							
});

win.add(tv);

win.addEventListener('close', function(e) {

	Ti.API.log('window closed: ' + JSON.stringify(win));
	
	win.remove(tv);

});		

