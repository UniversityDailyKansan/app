var win = Titanium.UI.currentWindow;

//
// HORIZONTAL SCROLLING TABS
//
var news_currentChoice = "Latest";
var dom = 'DIN 1451 Std';
var cond = 'Open Sans Condensed';
var body = 'Source Sans Pro';
if(Ti.Platform.osname=='android') {
	dom = 'DINMittelschriftStd';
	cond = 'OpenSans-CondBold';
	body = 'SourceSansPro-Regular';
} 
var scrollView = Titanium.UI.createScrollView({
	contentWidth:990,
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
		left:Ti.App.arrowLeft,
		height: 10,
		width:20
});

//win.add(upArrow);

var shadowLeft = Titanium.UI.createView({
	backgroundImage:'/images/toolbarShadowLeft.png',
	top:0,
	left:0,
	height:40,
	width:80
});

win.add(shadowLeft);

var shadowRight = Titanium.UI.createView({
	backgroundImage:'/images/toolbarShadowRight.png',
	top:0,
	right:0,
	height:40,
	width:80
});

win.add(shadowRight);

var latest = Titanium.UI.createLabel({
			text:'Latest',
			left: 10,
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
		
	latest.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/news/latest');
	});
	latest.addEventListener('click',function(e){
    	var latestwindow = Ti.UI.createWindow({
            url:"latest.js",
            title:"Latest"
    });
		Titanium.UI.currentTab.open(latestwindow,{animated:true});
		Ti.App.arrowLeft=70;
		//win.add(upArrow);
	});
	
scrollView.add(latest);
			
var featured = Titanium.UI.createLabel({
			text:'Featured',
			left: 105,
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
		
	
		
	featured.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/news/featured');
	});
	featured.addEventListener('click',function(e){
    	var featuredwindow = Ti.UI.createWindow({
            url:"featured.js",
            title:"Featured"
    });
		Titanium.UI.currentTab.open(featuredwindow,{animated:true});
		Ti.App.arrowLeft=175;
		//win.add(upArrow);
	});
scrollView.add(featured);
			
var news = Titanium.UI.createLabel({
			text:'News',
			left: 220,
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
    	Titanium.App.Analytics.trackPageview('/news/news');
	});
	news.addEventListener('click',function(e){
    	var newswindow = Ti.UI.createWindow({
            url:"news.js",
            title:"News"
    });
		Titanium.UI.currentTab.open(newswindow,{animated:true});
		Ti.App.arrowLeft = 275;
		//win.add(upArrow);
	});
scrollView.add(news);
			
var opinion = Titanium.UI.createLabel({
			text:'Opinion',
			left:305,
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
		
	
			
	opinion.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/news/opinion');
	});
	opinion.addEventListener('click',function(e){
    	var opinionwindow = Ti.UI.createWindow({
            url:"opinion.js",
            title:"Opinion"
    });
		Titanium.UI.currentTab.open(opinionwindow,{animated:true});
		Ti.App.arrowLeft = 370;
		//win.add(upArrow);
	});
scrollView.add(opinion);
			
var sports = Titanium.UI.createLabel({
			text:'Sports',
			left:400,
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
		
		
			
	sports.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/news/sports');
	});
	sports.addEventListener('click',function(e){
    	var sportswindow = Ti.UI.createWindow({
            url:"sports.js",
            title:"Sports"
    });
		Titanium.UI.currentTab.open(sportswindow,{animated:true});
		Ti.App.arrowLeft = 460;
		//win.add(upArrow);
	});
scrollView.add(sports);
			
var photo = Titanium.UI.createLabel({
			text:'Photo',
			left:490,
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
		
		
			
	photo.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/news/photo');
	});
	photo.addEventListener('click',function(e){
    	var photowindow = Ti.UI.createWindow({
            url:"photo.js",
            title:"Photo"
    });
		Titanium.UI.currentTab.open(photowindow,{animated:true});
		Ti.App.arrowLeft = 550;
		//win.add(upArrow);
	});
scrollView.add(photo);
			
var feature = Titanium.UI.createLabel({
			text:'Feature',
			left:570,
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
		
		
			
	feature.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/news/feature');
	});
	feature.addEventListener('click',function(e){
    	var featurewindow = Ti.UI.createWindow({
            url:"feature.js",
            title:"Feature"
    });
		Titanium.UI.currentTab.open(featurewindow,{animated:true});
		Ti.App.arrowLeft = 635;
		//win.add(upArrow);
	});
scrollView.add(feature);

var entertainment = Titanium.UI.createLabel({
			text:'Entertainment',
			left:670,
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
		
		
			
	entertainment.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/news/entertainment');
	});
	entertainment.addEventListener('click',function(e){
    	var entertainmentwindow = Ti.UI.createWindow({
            url:"entertainment.js",
            title:"Entertainment"
    });
		Titanium.UI.currentTab.open(entertainmentwindow,{animated:true});
		Ti.App.arrowLeft = 760;
		//win.add(upArrow);
	});
scrollView.add(entertainment);

var video = Titanium.UI.createLabel({
			text:'Video',
			left:835,
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
		

			
	video.addEventListener('click', function(e){
    	Titanium.App.Analytics.trackPageview('/news/video');
	});
	video.addEventListener('click',function(e){
    	var videowindow = Ti.UI.createWindow({
            url:"video.js",
            title:"Video"
    });
		Titanium.UI.currentTab.open(videowindow,{animated:true});
		Ti.App.arrowLeft = 890;
		//win.add(upArrow);
	});
scrollView.add(video);
			
win.add(scrollView);
win.add(upArrow);
