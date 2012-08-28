var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/more/about-bargains');
	});
win.backgroundColor = '#fff';

var tv = Ti.UI.createTableView({minRowHeight:50,rowBackgroundColor:'white',backgroundColor:'white',});

var text1 = 'The Bargains element of this app was introduced to make saving money at popular, local Lawrence businesses easy and available. The average college student is hardly a coupon clipper, but with this service locating and utilizing discounts becomes infinitely easier. Open the tab, narrow your search and scan the barcode on the screen at any participating business.';
var text2 = 'As this service is still in development, we want to hear your feedback. Love it or hate it, your thoughts are important to us. Please navigate back one page and click the "Feedback" option to contact us.';

var data = [];

	var row = Ti.UI.createTableViewRow({height:'auto',className:"row",});
	
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