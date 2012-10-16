var win = Titanium.UI.currentWindow;

win.backgroundImage = 'images/bg.png';
win.backgroundRepeat = true;
//
// HORIZONTAL SCROLLING TABS
//
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
var tableview = Titanium.UI.createTableView({
        		data:data,
        		top:40,
        		bottom:48,
        		backgroundColor:'transparent',
        		transparentBackground:true,
        		separatorColor:'transparent',
        	});
        			
		tableview.addEventListener('click',function(e) {
			var w = Ti.UI.createWindow({
				title:section
			});
			var articleContent = "<body style='"+font1+"; width:94%; margin:0 auto;font-size:15px;'><h3 style='font-size:25px;text-transform:uppercase;color:#358CCB;margin-top:10px;line-height:14px"+font2+"'>"+e.row.headline+"</h3><div style='font-size:16px;color:#999999;margin-top:-18px;'>By "+e.row.author;
			articleContent += " | "+e.row.date+"</div>"+e.row.articleCopy+"</body>";
			var wb = Ti.UI.createWebView({
				html:"<html><head><link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700|Source+Sans+Pro:300,400' rel='stylesheet' type='text/css'><style>img{ max-width:100%; }</style></head>"+articleContent,
				bottom:0,
			});
            w.add(wb);
            var b = Titanium.UI.createButton({
                title:'Close',
                style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
            });
            w.setLeftNavButton(b);
            b.addEventListener('click',function()
            {
                w.close();
            });
            w.open({modal:true});
        });
        
        win.add(tableview);
var sections = new Array('sports','photo','news');
Ti.include('betterTemplate.js');
var betterScroll = require('betterScroll');

var data = betterTemplate('news');
Ti.API.info(data);
var left = 8;
var leftAmount = 0;
for (var s in sections){
	var scrollLabel = new betterScroll(sections[s]);
	leftAmount = (scrollLabel.text.length)*10;
	scrollLabel.left = left;
	left = left + leftAmount + 40;
	Ti.API.info(left);
	scrollView.add(scrollLabel);
	        var sectionData = betterTemplate(sections[s]);
		tableview.data = sectionData;

	scrollLabel.addEventListener('click',function(e){
		Titanium.App.Analytics.trackPageview('/news/'+s);
		Ti.API.info(sections[s]);
	});
}

win.add(scrollView);
