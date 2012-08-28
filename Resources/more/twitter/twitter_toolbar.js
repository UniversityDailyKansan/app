var win = Titanium.UI.currentWindow;
//
// HORIZONTAL SCROLLING TABS
//
var scrollView = Titanium.UI.createScrollView({
	contentWidth:1200,
	contentHeight:40,
	top:0,
	height:40,
	left:40,
	width:'100%',
	backgroundColor:'#7085a1'
});

scrollView.addEventListener('scroll', function(e)
{
	Ti.API.info('x ' + e.x + ' y ' + e.y);

});

win.add(scrollView);

var UDK_News = Titanium.UI.createLabel({
			text:'@UDK_News',
			left: 10,
			width: 130,
			height:30,
			color:'#fff',
		});
	UDK_News.addEventListener('click',function(e){
    	var UDK_Newswindow = Ti.UI.createWindow({
            url:"news.js",
            title:"@UDK_News"
    });
		Titanium.UI.currentTab.open(UDK_Newswindow,{animated:true});
	});
	UDK_News.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/twitter/UDK_News');
	});
scrollView.add(UDK_News);
var UDK_Opinion = Titanium.UI.createLabel({
			text:'@UDK_Opinion',
			left:150,
			width: 140,
			height:30,
			color:'#fff',
		});
	UDK_Opinion.addEventListener('click',function(e){
    	var UDK_Opinionwindow = Ti.UI.createWindow({
            url:"opinion.js",
            title:"@UDK_Opinion"
    });
		Titanium.UI.currentTab.open(UDK_Opinionwindow,{animated:true});
	});
	UDK_Opinion.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/twitter/UDK_Opinion');
	});
scrollView.add(UDK_Opinion);
var UDKPlay = Titanium.UI.createLabel({
			text:'@UDKPlay',
			left:300,
			width: 110,
			height:30,
			color:'#fff',
		});
	UDKPlay.addEventListener('click',function(e){
    	var UDKPlaywindow = Ti.UI.createWindow({
            url:"udkplay.js",
            title:"@UDKPlay"
    });
		Titanium.UI.currentTab.open(UDKPlaywindow,{animated:true});
	});
	UDKPlay.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/twitter/UDKPlay');
	});
scrollView.add(UDKPlay);

var UDK_Sports = Titanium.UI.createLabel({
			text:'@UDK_Sports',
			left:420,
			width: 130,
			height:30,
			color:'#fff',
		});
	UDK_Sports.addEventListener('click',function(e){
    	var UDK_Sportswindow = Ti.UI.createWindow({
            url:"sports.js",
            title:"@UDK_Sports"
    });
		Titanium.UI.currentTab.open(UDK_Sportswindow,{animated:true});
	});
	UDK_Sports.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/twitter/UDK_Sports');
	});
scrollView.add(UDK_Sports);

var UDK_bball = Titanium.UI.createLabel({
			text:'@UDK_bball',
			left:560,
			width: 130,
			height:30,
			color:'#fff',
		});
	UDK_bball.addEventListener('click',function(e){
    	var UDK_bballwindow = Ti.UI.createWindow({
            url:"kubball.js",
            title:"@UDK_bball"
    });
		Titanium.UI.currentTab.open(UDK_bballwindow,{animated:true});
	});
	UDK_bball.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/twitter/UDK_bball');
	});
scrollView.add(UDK_bball);

var UDK_fball = Titanium.UI.createLabel({
			text:'@UDK_fball',
			left:700,
			width: 130,
			height:30,
			color:'#fff',
		});
	UDK_fball.addEventListener('click',function(e){
    	var UDK_fballwindow = Ti.UI.createWindow({
            url:"kansanfootball.js",
            title:"@UDK_fball"
    });
		Titanium.UI.currentTab.open(UDK_fballwindow,{animated:true});
	});
	UDK_fball.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/twitter/UDK_fball');
	});
scrollView.add(UDK_fball);

var UDK_B12fball = Titanium.UI.createLabel({
			text:'@UDK_B12fball',
			left:840,
			width: 150,
			height:30,
			color:'#fff',
		});
	UDK_B12fball.addEventListener('click',function(e){
    	var UDK_B12fballwindow = Ti.UI.createWindow({
            url:"UDK_B12fball.js",
            title:"@UDK_B12fball"
    });
		Titanium.UI.currentTab.open(UDK_B12fballwindow,{animated:true});
	});
	UDK_B12fball.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/twitter/UDK_B12fballl');
	});
scrollView.add(UDK_B12fball);

var UDK_Photo = Titanium.UI.createLabel({
			text:'@UDK_Photo',
			left:1000,
			width:140,
			height:30,
			color:'#fff',
		});
	UDK_Photo.addEventListener('click',function(e){
		var UDK_Photowindow = Ti.UI.createWindow({
            url:"photos.js",
            title:"@UDK_Photo"
    });
		Titanium.UI.currentTab.open(UDK_Photowindow,{animated:true});
	});
	UDK_Photo.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/twitter/UDK_Photo');
	});
scrollView.add(UDK_Photo);

win.add(scrollView);
