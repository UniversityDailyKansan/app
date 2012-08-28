var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/more/about-the-kansan');
	});

var tv = Ti.UI.createTableView({minRowHeight:50,rowBackgroundColor:'white',backgroundColor:'white',});

var text1 = 'The University Daily Kansan is the student newspaper of the University of Kansas. The first copy is paid through the student activity fee. Additional copies of the Kansan are 25 cents. Subscriptions can be purchased at the Kansan business office, 2000 Dole Human Development Center, 1000 Sunnyside, Lawrence, KS 66045.';
var text2 = 'The University Daily Kansan (ISSN 0746-4967) is published daily during the school year except Saturday, Sunday, fall break, spring break and exams. Weekly during the summer session excluding holidays. Periodical postage is paid in Lawrence, KS 66044. Annual subscriptions by mail are $120 plus tax. Student subscriptions are paid through the student activity fee. Postmaster: Send address changes to The University Daily Kansan, 2000 Dole Human Development Center, 1000 Sunnyside, Lawrence, KS 660455 ';
var text3 = 'The mission of The University Daily Kansan is to serve as a primary, credible news source for a diverse University community. The Kansan staff practices high ethical standards, good news judgment, objectivity and creativity. The Kansan staff members are student journalists working in a professional learning environment. We respect each individual\'s role and recognize that the newspaper is a product of the entire staff. The Kansan maintains an open-door policy and encourages reader feedback';

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

	var l3 = Ti.UI.createLabel({
		text:text3,
		top:10,
		color:'black',
		height:'auto'
	});
	textView.add(l3);
	
	row.add(textView);

	data.push(row);

tv.setData(data);

win.add(tv);