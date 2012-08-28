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
	contentWidth:400,
	contentHeight:40,
	top:0,
	left:40,
	height:40,
	width:'100%',
	backgroundColor:'#10354c'
});

win.add(scrollView);

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
	});
scrollView.add(settings);

win.add(scrollView);
