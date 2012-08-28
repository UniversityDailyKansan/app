var win = Titanium.UI.currentWindow;
var currentWindow = Titanium.UI.currentWindow;
win.backgroundColor = '#fff';

// create table view data object
var data = [];

if (Titanium.Platform.name == 'android') {
	data.push(	{title:'Text into Free for All', color:'black', hasChild:true, sendin:'editnumberbelow'});
};
if (Titanium.Platform.osname == 'iphone') {
	data.push(	{title:'Text into Free for All', hasChild:true, sendin:'editnumberbelow'});
};
//data.push({title:'Notifications', hasChild:true, test:'more/notifications.js'});
//data.push(	{title:'Live Chat', hasChild:true, color:'black', test:'more/live_chat.js'});
data.push(	{title:'Twitter', hasChild:true, color:'black', test:'more/twitter/twitter.js'});
data.push(	{title:'Lawrence Weather from Google', color:'black', hasChild:true, test:'more/weather.js'});
//data.push(	{title:'LarryvilleKU', hasChild:true, color:'black', sendinLarryville:'adjustbelow'});
data.push(	{title:'Feedback', hasChild:true, color:'black', test:'more/feedback.js'});
data.push(	{title:'About the University Daily Kansan', hasChild:true, color:'black', test:'more/about_the_kansan.js'});
data.push(	{title:'About LarryvilleKU', hasChild:true, color:'black', test:'more/about_larryville.js'});
//data.push(	{title:'About Bargains', hasChild:true, color:'black', test:'more/about_bargains.js'});
data.push(	{title:'About KJHK Radio', hasChild:true, color:'black', test:'more/about_kjhk.js'});
data.push(	{title:'Credits', hasChild:true, color:'black', test:'more/credits.js'});
data.push(	{title:'User Policy', hasChild:true, color:'black', test:'more/policy.js'});

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	color:'#444444',
	rowBackgroundColor:'white',
	backgroundColor:'white',
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	if (e.rowData.test)
	{
		var win = Titanium.UI.createWindow({
			url:e.rowData.test,
			title:e.rowData.title
		});
		Titanium.UI.currentTab.open(win,{animated:true});
	}
	if (e.rowData.sendin)
	{
		Titanium.Platform.openURL('sms:7852898351');
	}
	if (e.rowData.sendinLarryville)
	{
		Titanium.Platform.openURL('http://larryvilleku.com');
	}
});
// add table view to the window
Titanium.UI.currentWindow.add(tableview);
