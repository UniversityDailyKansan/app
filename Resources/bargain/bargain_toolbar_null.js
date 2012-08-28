var win = Titanium.UI.currentWindow;

//
// HORIZONTAL SCROLLING TABS
//
var scrollView = Titanium.UI.createScrollView({
	contentWidth:600,
	contentHeight:40,
	top:0,
	height:40,
	width:'100%',
	backgroundColor:'#7085a1'
});

scrollView.addEventListener('scroll', function(e)
{
	Ti.API.info('x ' + e.x + ' y ' + e.y);

});

win.add(scrollView);

var daily = Titanium.UI.createLabel({
			text:'Today\'s Bargain',
			left: 10,
			height:30,
			color:'#fff',
		});
	daily.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/bargain/daily');
	});
	daily.addEventListener('click',function(e){
    	var dailywindow = Ti.UI.createWindow({
            url:"daily.js",
            title:"Today\'s Bargain"
    });
		Titanium.UI.currentTab.open(dailywindow,{animated:true});
	});
scrollView.add(daily);
var location = Titanium.UI.createLabel({
			text:'By Location',
			left:170,
			height:30,
			color:'#fff',
		});
	location.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/bargain/location');
	});
	location.addEventListener('click',function(e){
    	var locationwindow = Ti.UI.createWindow({
            url:"location.js",
            title:"By Location"
    });
		Titanium.UI.currentTab.open(locationwindow,{animated:true});
	});
scrollView.add(location);
var category = Titanium.UI.createLabel({
			text:'By Category',
			left:290,
			height:30,
			color:'#fff',
		});
	category.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/bargain/category');
	});
	category.addEventListener('click',function(e){
    	var categorywindow = Ti.UI.createWindow({
            url:"category.js",
            title:"By Category"
    });
		Titanium.UI.currentTab.open(categorywindow,{animated:true});
	});
scrollView.add(category);
var time = Titanium.UI.createLabel({
			text:'By Time',
			left:420,
			height:30,
			color:'#fff',
		});
	time.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/bargain/time');
	});
	time.addEventListener('click',function(e){
    	var timewindow = Ti.UI.createWindow({
            url:"time.js",
            title:"By Time"
    });
		Titanium.UI.currentTab.open(timewindow,{animated:true});
	});
scrollView.add(time);

win.add(scrollView);
