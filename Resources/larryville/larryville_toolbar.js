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
	contentWidth:660,
	contentHeight:40,
	top:0,
	left:35,
	height:40,
	width:'100%',
	backgroundColor:'#10354c'
});
win.add(scrollView);

var upArrow = Titanium.UI.createView({
	backgroundImage:'/images/currentTriangle.png',
	top:30,
	left:Titanium.App.Properties.getString('currLVTB'),
	height: 10,
	width:20
});
Ti.API.info(Titanium.App.Properties.getString('currLVTB'));
scrollView.add(upArrow);

var shadowLeft = Titanium.UI.createView({
	backgroundImage:'/images/toolbarShadowLeft.png',
	top:0,
	left:35,
	height:40,
	width:40
});

win.add(shadowLeft);

var shadowRight = Titanium.UI.createView({
	backgroundImage:'/images/toolbarShadowRight.png',
	top:0,
	right:0,
	height:40,
	width:40
});

win.add(shadowRight);

scrollView.addEventListener('scroll', function(e) {
	if (e.x > 55) {
		shadowLeft.show();
	} else {
		shadowLeft.hide();
	}
	if (e.x < 460) {
		shadowRight.show();
	} else {
		shadowRight.hide();
	}
});


var location = Titanium.UI.createLabel({
			text:'Your Town',
			left:30,
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
    	var locationwindow = Ti.UI.createWindow({
            url:"map.js",
            title:"Your Town"
    });
		Titanium.UI.currentTab.open(locationwindow,{animated:true});
		Titanium.App.Properties.setString('currLVTB', 75);
	});
scrollView.add(location);

var news = Titanium.UI.createLabel({
			text:'Your News',
			left:165,
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
    	var newswindow = Ti.UI.createWindow({
            url:"feed_view.js",
            title:"Your News"
    });
		Titanium.UI.currentTab.open(newswindow,{animated:true});
		Titanium.App.Properties.setString('currLVTB', 205);
	});
scrollView.add(news);

scrollView.scrollTo((Titanium.App.Properties.getString('currLVTB') - 70), 0);

