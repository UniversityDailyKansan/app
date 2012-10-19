var win = Titanium.UI.currentWindow;

var dom = 'DIN 1451 Std';
var cond = 'Open Sans Condensed';
var body = 'Source Sans Pro';
if(Ti.Platform.osname=='android') {
	dom = 'DINMittelschriftStd';
	cond = 'OpenSans-CondBold';
	body = 'SourceSansPro-Regular';
} 
//
// HORIZONTAL SCROLLING TABS
//
var scrollView = Titanium.UI.createScrollView({
	anchorPoint:{x:.5,y:.5},
	contentWidth:400,
	contentHeight:40,
	top:0,
	left:40,
	height:40,
	width:'100%',
	backgroundColor:'#10354c'
});

win.add(scrollView);

var upArrow = Titanium.UI.createView({
	backgroundImage:'/images/currentTriangle.png',
		top:30,
		left:Ti.App.arrowLV,
		height: 10,
		width:20
});

var shadowLeft = Titanium.UI.createView({
	backgroundImage:'/images/toolbarShadowLeft.png',
	top:0,
	left:0,
	height:40,
	width:80,
	visible:false
});

win.add(shadowLeft);

var shadowRight = Titanium.UI.createView({
	backgroundImage:'/images/toolbarShadowRight.png',
	top:0,
	right:0,
	height:40,
	width:80,
	visible:false
});

win.add(shadowRight);

var news = Titanium.UI.createLabel({
			text:'Your News',
			left:10,
			height:30,
			color:'#f9f9f9',
			font:{
				fontSize:22,
				fontFamily:dom,
			},
			width:'auto',
			verticalAlign:'center',
			textAlign:'center',
			shadowColor:'#000000',
			shadowOffset:{x:1, y:-1},
			top:10
		});
	news.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/larryville/news');
	});
	news.addEventListener('click',function(e){
    	var newswindow = Ti.UI.createWindow({
            url:"feed_view.js",
            title:"Your News"
    });
		Titanium.UI.currentTab.open(newswindow,{animated:true});
		Ti.App.arrowLV = 90;
	});
scrollView.add(news);
var location = Titanium.UI.createLabel({
			text:'Your Town',
			left:145,
			height:30,
			color:'#f9f9f9',
			font:{
				fontSize:22,
				fontFamily:dom,
			},
			width:'auto',
			verticalAlign:'center',
			textAlign:'center',
			shadowColor:'#000000',
			shadowOffset:{x:1, y:-1},
			top:10
		});
	location.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/larryville/town');
	});
	location.addEventListener('click',function(e){
    	var locationwindow = Ti.UI.createWindow({
            url:"map.js",
            title:"Your Town"
    });
		Titanium.UI.currentTab.open(locationwindow,{animated:true});
		Ti.App.arrowLV = 230;
	});
scrollView.add(location);
var settings = Titanium.UI.createLabel({
			text:'Settings',
			left:275,
			height:30,
			color:'#f9f9f9',
			font:{
				fontSize:22,
				fontFamily:dom,
			},
			width:'auto',
			verticalAlign:'center',
			textAlign:'center',
			shadowColor:'#000000',
			shadowOffset:{x:1, y:-1},
			top:10
		});
	settings.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/larryville/settings');
	});
	settings.addEventListener('click',function(e){
    	var settingswindow = Ti.UI.createWindow({
            url:"preferences.js",
            title:"Preferences"
    });
		Titanium.UI.currentTab.open(settingswindow,{animated:true});
		Ti.App.arrowLV = 340;
	});
scrollView.add(settings);

var safeRide = Titanium.UI.createLabel({
			text:'Call SafeRide',
			left:370,
			height:30,
			color:'#f9f9f9',
			font:{
				fontSize:22,
				fontFamily:dom,
			},
			width:'auto',
			verticalAlign:'center',
			textAlign:'center',
			shadowColor:'#000000',
			shadowOffset:{x:1, y:-1},
			top:10
		});
	safeRide.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/larryville/safeRide');
	});
	safeRide.addEventListener('click',function(e){
    	var the_number = '7858647233';
		Ti.Platform.openURL('tel:+7858647233');
		Ti.App.arrowLV = 400;
	});
scrollView.add(safeRide);

scrollView.addEventListener('scroll', function(e)
{
    Ti.API.info('x ' + e.x + ' y ' + e.y);

    if (e.x > 20)
    {
        shadowLeft.show();
    }
    else
    {
        shadowLeft.hide();
    }
    if (e.x < 160)
    {
        shadowRight.show();
    }
    else
    {
        shadowRight.hide();
    }

});

win.add(scrollView);
win.add(upArrow);
