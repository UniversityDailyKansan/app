var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/more/credits');
	});

var tv = Ti.UI.createTableView({minRowHeight:80,rowBackgroundColor:'white',backgroundColor:'white',});

var text1 = 'This app was produced by Tim Shedor, Kansan.com Web Editor Fall 2011, Designer and Technical Editor 2012 & 2013, and Colby Soden, Kansan.com Interactive Developer Fall 2012.';
var text2 = 'Interface redesign by Sera Lanzer. It is made up of code, images, and other parts that are protected by the Creative Commons license and the Open Source License, produced by the Open Source Initiative. The Free For All icon was created by John Caserta, from The Noun Project. The LarryvilleKU icon was created by our talented in-house digital creative, Andres Rivas-Cruz. The radio tower icon (appearing above the KJHK tab) was produced by PixelPress Media Design (www.pixelpressicons.com). The  info icon was produced by The Working Group (www.theworkinggroup.ca). The weather information is provided by the Google Weather API service and is displayed using foundational code written by Bob Sims.';

var data = [];

	var row = Ti.UI.createTableViewRow({height:'auto',className:"row"});

	var textView = Ti.UI.createView({
		height:'auto',
		layout:'vertical',
		left:20,
		top:20,
		bottom:60,
		right:20
	});

	var l1 = Ti.UI.createLabel({
		text:text1,
		color:'black',
		height:'auto'
	});
	textView.add(l1);
	var l2 = Ti.UI.createLabel({
		text:text2,
		top:10,
		color:'black',
		height:'auto',
		bottom:20,
	});
	textView.add(l2);
	row.add(textView);

	data.push(row);

tv.setData(data);

win.add(tv);