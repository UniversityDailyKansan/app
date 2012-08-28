var win = Titanium.UI.currentWindow;
win.backgroundColor = '#fff';
var currentWindow = Titanium.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/bargains/category');
	});
// create table view data object
var data = [
	{title:'Restaurants', hasChild:true, color:'black', test:'categories/restaurants.js'},
	{title:'Entertainment', hasChild:true, color:'black', test:'categories/entertainment.js'},
	{title:'Events', hasChild:true, color:'black', test:'categories/events.js'},
	{title:'Drink Deals', hasChild:true, color:'black', test:'categories/drinks.js'},
	{title:'Retail', hasChild:true, color:'black', test:'categories/retail.js'},
	{title:'Other', hasChild:true, color:'black', test:'categories/other.js'},

];

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	color:'#444444',
	top:40,
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
});
// add table view to the window
Titanium.UI.currentWindow.add(tableview);
Ti.include('bargain_toolbar_null.js'); 

