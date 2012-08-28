var win = Titanium.UI.currentWindow;
var currentWindow = Titanium.UI.currentWindow;
win.backgroundColor = '#fff';
feed = 'http://larryvilleku.com/bargains/feeds/map_feed.php';

	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/bargains/map');
	});
Titanium.Geolocation.purpose = "Recieve User Location";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

// create table view data object
var annotations = [];


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
            var title = item.getElementsByTagName("title").item(0).text;
            var lat = item.getElementsByTagName("author").item(0).text;
            var lng = item.getElementsByTagName("pubDate").item(0).text;
            var discount = item.getElementsByTagName("description").item(0).text;
            var link = item.getElementsByTagName("link").item(0).text;
 
                    var mrker = Titanium.Map.createAnnotation({
                        latitude:lat,
                        longitude:lng,
                        title:title,
                        subtitle:discount,
						pinImage: '../images/map-pin.png',
                        animate:true,
                    });

        				annotations.push(mrker);        
        }
        var mapview = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			animate:true,
			region: {latitude:38.9622547128423, longitude:-95.24254439999999, latitudeDelta:0.02, longitudeDelta:0.02},
			regionFit:true,
			userLocation:true,
			visible: true,
			top:40,
			annotations:annotations,
			zoom:20,
		});
		Titanium.Geolocation.distanceFilter = 10;

		win.add(mapview);
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
   		function getLocation(){
			Titanium.Geolocation.getCurrentPosition(function(e){
        		var region={
					latitude: e.coords.latitude,
					longitude: e.coords.longitude,
					animate:true,
					latitudeDelta:0.5,
					longitudeDelta:0.5
				};
				mapview.setLocation(region);
			});
		}
 		Titanium.Geolocation.addEventListener('location',function(){
    		getLocation();
		}); 
		
    }
    catch(E)
    {
        alert(E);
    }
};
//xhr.send();