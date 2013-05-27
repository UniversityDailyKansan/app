var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/more/larryville-about');
	});

var tv = Ti.UI.createTableView({minRowHeight:50,rowBackgroundColor:'white',backgroundColor:'white',});

var text1 = 'LarryvilleKU is a hyper-local news service originally inspired by the Open Block platform. It is now available to students as an exclusive deal-finder.';
var text2 = 'Map icons created by Nicolas Mollet\'s project';

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
		height:'auto',
		color:'black'
	});
	textView.add(l1);

	var l2 = Ti.UI.createLabel({
		text:text2,
		top:10,
		color:'black',
		height:'auto'
	});
	textView.add(l2);

	row.add(textView);

	data.push(row);

tv.setData(data);

win.add(tv);