var win = Titanium.UI.currentWindow;
win.backgroundImage = '../images/bg.png';
win.backgroundRepeat = true;
var feed = 'http://kansan.com/api/get_category_posts/?slug=opinion';
var section = 'News';
var font1 = 'font-family:"Source Sans Pro", Helvetica, Arial, sans-serif';
var font2 = 'font-family:"Open Sans Condensed", Helvetica, Arial, sans-serif';

var dom = 'DIN 1451 Std';
var cond = 'Open Sans Condensed';
var body = 'Source Sans Pro';
if(Ti.Platform.osname=='android') {
	dom = 'DINMittelschriftStd';
	cond = 'OpenSans-CondBold';
	body = 'SourceSansPro-Regular';
} 

Titanium.UI.iPhone.appBadge=Titanium.UI.iPhone.appBadge-1;
	var data = [];
	var xhr = Ti.Network.createHTTPClient();
	xhr.timeout = 1000000;
	xhr.open("GET", feed);
		
/*********LOAD INDICATOR**********/

	var actInd = Titanium.UI.createActivityIndicator({ 
		bottom:200, 
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG, 
		font: {
			
			fontSize:26,
			fontWeight:'bold'
		}, 
		color: 'black', 
		message: 'Loading...', 
		width: 'auto', 
	});
	actInd.show();
	
	setTimeout(function() { actInd.hide(); },2000);
	win.add(actInd);
	
	xhr.onerror = function() { 
		Titanium.API.log(xhr.onerror);
		actInd.hide();         
		var no_internet = Titanium.UI.createAlertDialog({
            title: 'No Internet Connection',
            message: 'Sorry, but you\'re not connected to the internet, and we can\'t load the map information or feed view. Please try again when a internet connection is avaiable.',
            buttonNames: ['Shucks',],
        });
        no_internet.show();
    };

/**********ACTUAL API LOADING*************/

	xhr.onload = function() {	
		try {
			var stories = JSON.parse(this.responseText).posts;
			var x = 0;
			for (var i = 0; i < stories.length; i++){
				var headline = stories[i].title;
				var excerpt = stories[i].excerpt;
				excerpt = excerpt.replace('&nbsp;', ' ');
				excerpt = excerpt.replace('&#8220;', '"');
				excerpt = excerpt.replace('&#8221;', '"');
				excerpt = excerpt.replace('&#8243;', '"');
				excerpt = excerpt.replace('&#8217;', "'");
				excerpt = excerpt.replace('&#8216;', "'");
				headline = headline.replace('&#8220;', '"');
				headline = headline.replace('&#8221;', '"');
				headline = headline.replace('&#8243;', '"');
				headline = headline.replace('&#8217;', "'");
				headline = headline.replace('&#8216;', "'");
				var date_raw = stories[i].date;''
				var categories = stories[i].categories;
				var author = stories[i].author.nickname;
				var thumbheight = 0;
				if(stories[i].attachments){
					var attMeta = stories[i].attachments; 
					for(var v = 0; v < attMeta.length; v++){
						if(attMeta[v].mime_type === 'image/png' || attMeta[v].mime_type === 'image/jpg' || attMeta[v].mime_type === 'image/jpeg' || attMeta[v].mime_type === 'image/gif'){
							var thumbnail = attMeta[v].images.medium.url;
							thumbheight = attMeta[v].images.medium.height-12;
						}
					}
				}
				var link_to_post = stories[i].url;
				var tags = stories[i].tags;
				var tagged = '';
				for(var t = 0; t < tags.length; t++){
					tagged += tags[t].title+', ';
				}
				var month = date_raw.substring(5,7);
				month = month.replace('01','Jan');
				month = month.replace('02','Feb');
				month = month.replace('03','March');
				month = month.replace('04','April');
				month = month.replace('05','May');
				month = month.replace('06','June');
				month = month.replace('07','July');
				month = month.replace('08','Aug');
				month = month.replace('09','Sept');
				month = month.replace('10','Oct');
				month = month.replace('11','Nov');
				month = month.replace('12','Dec');
				var day = date_raw.substring(8,10);
				var date = month+' '+day;
				
				var row = Ti.UI.createTableViewRow({
					height:159+thumbheight, 
					backgroundColor:'transparent', 
					backgroundColor:'transparent', 
					transparentBackground:true
				});
				
				var newsitem_view = Ti.UI.createView({
					height:144+thumbheight,
					layout:'vertical',
					left:10,
					top:10,
					bottom:5,
					right:10,
					backgroundColor:'white',
					borderRadius:4,
					borderColor:'#dedede',
					borderWidth:0,
				});
				
				var newsitem_shadow = Ti.UI.createView({
					backgroundColor:'#c9c9c9',
					height:144+thumbheight,
					top:12,
					right:8,
					left:11,
					bottom:5,
					borderRadius:4,
					layout:'vertical',
				});
			
				var story_headline = Ti.UI.createLabel({
					text:headline,
					height:46,
					top:6,
					left:8,
					right:8,
					color:black,
					font:{
						fontSize:18,
						fontFamily:dom,
					}
				});
				
				var story_headline_border = Ti.UI.createView({
					height:1,
					backgroundColor:'#e9e9e9',
					top:2,
					left:0,
					right:0,
				});
				
				var excerpt_view = Ti.UI.createLabel({
					text:excerpt,
					height:60,
					left:8,
					right:8,
					top:2,
					font:{
						fontSize:14,
						fontFamily:body,
					},
					color:'#888888',
				});
				
				var meta_view = Ti.UI.createView({
					height:22,
					backgroundColor:'#dedede',
					left:0,
					right:0,
					top:5,
				});
				
				var date_label = Ti.UI.createLabel({
					text:date,
					color:'#777777',
					top:2,
					left:8,
					font:{
						fontSize:14,
					}
				});
				
				var author_label = Ti.UI.createLabel({
					text:author,
					color:'#777777',
					top:2,
					right:8,
					font:{
						fontSize: 13,
					}
				});
				
				if(thumbnail){
					var thumbnail_view = Ti.UI.createImageView({
						image:thumbnail,
						height:thumbheight,
						left:6,
						top:7,
						right:6,
					});
					newsitem_view.add(thumbnail_view);
					story_headline.top = 4;
					excerpt_view.top = 0;
					meta_view.top = 2;
				}
	
				newsitem_view.add(story_headline);
				newsitem_view.add(story_headline_border);
				newsitem_view.add(excerpt_view);
				meta_view.add(date_label);
				meta_view.add(author_label);
				newsitem_view.add(meta_view);
				row.add(newsitem_shadow);
            	row.add(newsitem_view);
            	data[x++] = row;
            	row.url = link_to_post;
            	row.date = date;
            	row.headline = headline
            	row.articleCopy = stories[i].content;
            	row.author = author;
            	row.theTags = tagged;
       		}

        	var tableview = Titanium.UI.createTableView({
        		data:data,
        		top:40,
        		bottom:48,
        		backgroundColor:'transparent',
        		transparentBackground:true,
        		separatorColor:'transparent',
        	});
        	
        	win.add(tableview);
			
			var refresh = Ti.UI.createView({
				height:40,
				width:40,
				layout:'vertical',
				left:0,
				top:0,
				backgroundColor:'#10354c'
			});
 			var refresh_circle = Ti.UI.createImageView({
				image:'../images/refresh.png',
				left:8,
				top:8,
				height:25,
				width:25
			});
			refresh.add(refresh_circle);
				
            refresh.addEventListener('click', function(){
            	win.remove(tableview);
				actInd.show();
					setTimeout(function()
					{
						actInd.hide();
					},1000);
                xhr.open("GET",feed);
 				xhr.send();
            });
		win.add(refresh);
   		Ti.include('news_toolbar.js');
   		Ti.include('../master_image.js');
		
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
    }
    catch(E)
    {
        alert(E);
    }
};
xhr.send();
