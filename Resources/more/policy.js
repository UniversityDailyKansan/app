var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/more/policy');
	});

var tv = Ti.UI.createTableView({minRowHeight:50,rowBackgroundColor:'white',backgroundColor:'white',});

var text1 = 'At Kansan.com, we promote civil conversation about ideas produced by The University Daily Kansan. We value a rich media discourse and urge all readers to share their thoughtful comments that contribute to a story\'s nature. Comments that spur discussion about Lawrence and the University of Kansas are encouraged.';
var text2 = 'User comments are moderated and subject to removal at the discretion of Kansan.com staff. Sometimes we can\'t immediately review every comment made; if you see potentially harmful comments that haven\'t been removed yet, please flag them for removal or report them here. We value and respect calm, polite and reasonable behavior even when controversial topics induce heated debate.';
var text3 = 'By commenting on Kansan.com or within this mobile application, the user agrees to adhere to the following set of rules. The University Daily Kansan reserves the right to remove comments containing the following: Harassment, personal attacks or slanderous remarks directed toward staff members, fellow Kansan.com users, people mentioned in stories or The University Daily Kansan. Offensive comments including but not limited to obscenity, hate speech, racism or otherwise abusive remarks. Commercial advertising or promotion of a product for profit. Violation of state, national or international copyright and trademark laws. Users who repeatedly disregard Kansan.com policy face suspension of their account. The user bears responsibility for comments posted on Kansan.com. Posted comments do not necessarily represent the views of The University Daily Kansan. By commenting on Kansan.com\'s public forum, the user thereby allows The University Daily Kansan to print the user\'s comments in the newspaper or elsewhere. All content on Kansan.com is intended for personal use only and is protected by federal copyright laws. The user agrees not to reproduce content for commercial use or for otherwise non-personal benefits.';

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
	
	var lake1 = Ti.UI.createLabel({
		text:text1,
		height:'auto',
		color:'black'		
	});
	textView.add(lake1);

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