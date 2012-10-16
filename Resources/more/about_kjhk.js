var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/more/about-kjhk');
	});

var tv = Ti.UI.createTableView({minRowHeight:50,rowBackgroundColor:'white',backgroundColor:'white',});

var text1 = 'Broadcasting from Lawrence, Kansas, KJHK 90.7 FM is the student-run radio station at the University of Kansas.  First launched in October 1975, the FM station has been an historic outlet for student expression. A true pioneer of college radio, KJHK has been home to independent music since the early 1980\'s, always featuring the newest and best undiscovered artists. This approach has made the station an institution of the airwaves of Lawrence and an important part of KU\'s cultural fabric. But the station doesn’t stop there; KJHK provides all students with the opportunity to produce award-winning news, sports, and talk programs as well.';
var text2 = 'In addition to great programming, the station serves students by staying at the leading edge of technology; in 1994, KJHK became one of the first radio stations in the world to broadcast a continuous audio stream on the internet. The station\'s innovation continues through today, with programs ranging from its ambitious Digital Archive Project to its new internet-based live remote broadcasts.';
var text3 = 'KJHK relies on contributions from individuals and businesses to continue to improve its services to all listeners. The station\'s latest endeavor is its historic studio relocation project, which moved all of its broadcast studios into state-of-the-art broadcasting suites in the Kansas Union. This nearly half-million dollar buildout has provided KJHK with a new facility in the heart of KU\'s campus, improving educational opportunities to students while promoting the station’s rich history and success through increased visibility.';
var text4 = 'The station continues to enjoy success and excellence in broadcasting, regularly receiving awards and accolades from local and national outlets. KJHK\'s 150+ student volunteers are the reason for this continued success. You can support their efforts by becoming a friend of KJHK.  For a minimum donation, you will help support the station, its students, and its community.  Thanks for listening to your Sound Alternative, and keep the dial to the left.';

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
	
	var l4 = Ti.UI.createLabel({
		text:text4,
		top:10,
		color:'black',
		height:'auto'
	});
	textView.add(l4);
	
	row.add(textView);

	data.push(row);

tv.setData(data);

win.add(tv);