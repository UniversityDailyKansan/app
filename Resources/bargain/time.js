var win = Titanium.UI.currentWindow;
feed = 'http://larryvilleku.com/bargains/feeds/all.php';
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/bargains/time');
	});
	
// create table view data object
var data = [];

var xhr = Ti.Network.createHTTPClient();
xhr.open("GET",feed);
var actInd = Titanium.UI.createActivityIndicator({
    bottom:200,
    height:50,
    style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
    font: {fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'},
    color: 'black',
    message: 'Loading...',
    width: 210
});
actInd.show();
	setTimeout(function()
	{
		actInd.hide();
	},2000);
win.add(actInd);
xhr.send();
xhr.onerror = function()
{
    actInd.hide();
};
xhr.onload = function()
{
	try
	{
		var doc = this.responseXML.documentElement;
		var items = doc.getElementsByTagName("item");
		var x = 0;
		var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
		for (var c=0;c<items.length;c++)
		{
			var item = items.item(c);
			var thumbnails = item.getElementsByTagName("media:thumbnail");
			if (thumbnails && thumbnails.length > 0)
			{
				var media = thumbnails.item(0).getAttribute("url");
				var title = item.getElementsByTagName("title").item(0).text;
				var discount = item.getElementsByTagName("description").item(0).text;
				var timevalid = item.getElementsByTagName("pubDate").item(0).text;
				var bgcolor = (c % 2) == 0 ? '#fff' : '#eee';

				var row = Ti.UI.createTableViewRow({hasChild:true,height:65,backgroundColor:bgcolor});
				var post_view = Ti.UI.createView({
					height:'auto',
					layout:'vertical',
					left:5,
					top:5,
					bottom:5,
					right:5
				});
				var av = Ti.UI.createImageView({
						image:media,
						left:0,
						top:0,
						height:48,
						width:48
					});
				// Add the avatar image to the view
				post_view.add(av);

				var title2 = Ti.UI.createLabel({
					text:title,
					left:54,
					width:120,
					top:-45,
					bottom:2,
					height:16,
					textAlign:'left',
					color:'#444444',
					font:{fontSize:14,fontWeight:'bold'}		
				});
				post_view.add(title2);
				
				var date_label = Ti.UI.createLabel({
					text:timevalid,
					right:15,
					top:-18,
					bottom:2,
					height:14,
					textAlign:'right',
					width:110,
					color:'#444444',
					font:{fontSize:12}
				});
				// Add the date to the view
				post_view.add(date_label);

				var discount_text = Ti.UI.createLabel({
					text:discount,
					left:54,
					top:2,
					bottom:2,
					height:'auto',
					width:236,
					textAlign:'left',
					color:'#444444',
					font:{fontSize:14}
				});
				// Add the tweet to the view
				post_view.add(discount_text);
				// Add the vertical layout view to the row
				row.add(post_view);
				data[x++] = row;
				row.url = item.getElementsByTagName("link").item(0).text;
			}
		}
		var tableview = Titanium.UI.createTableView({data:data,top:40});
		Titanium.UI.currentWindow.add(tableview);
			var refresh = Ti.UI.createView({
				height:40,
				width:40,
				layout:'vertical',
				left:0,
				top:0,
				backgroundColor:'#7085a1'
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
				actInd.show();
					setTimeout(function()
					{
						actInd.hide();
					},1000);
                xhr.open("GET",feed);
 				xhr.send();
            });
		win.add(refresh);
   		Ti.include('bargain_toolbar.js'); 
		tableview.addEventListener('click',function(e)
		{
			var w = Ti.UI.createWindow({title:'By Time'});
			var wb = Ti.UI.createWebView({url:e.row.url});
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
//xhr.send();




