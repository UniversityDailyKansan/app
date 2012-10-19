var win = Ti.UI.currentWindow;
/*********** PREFS **********/

var feed_toolbar_image_height = 35;
var feed_toolbar_image_width = 35;
var feed_toolbar_image_bottom = 2;
var title_bar_height = 40;
var feed_view_name = 'Your News';
var settings_view_width = 250;
var type_view_width = 250;
if (Titanium.Platform.osname == 'ipad') {
	settings_view_width = 600;
	type_view_width = 600;
};
var bgImage = 'images/full_bg.png';
var phone_width = Titanium.Platform.displayCaps.platformWidth;
var reduced_phone_width = ((Titanium.Platform.displayCaps.platformWidth) - 20);
var double_phone_width = (phone_width + phone_width);

//Close arrow appears in a few places
var default_button_bg = 'images/transparent_bg.png';
var default_button_selected = '';
var default_left_arrow = 'images/back_arrow.png';
var default_close_dimensions = '30';
var default_close_from_top = '15';

//Get yo style on. This changes mostly things in the feed_view detail panes.
var col1 = '#c82c2c'; //Red
var col2 = '#6082A6'; //Regular blue
var background_color = '#1D243B'; //Dark blue
var light_grey = '#e1e1e1'; //Light grey
var darker_grey = '#555555'; //Grey, little darker
var link_blue = '#2A85E8'; //Light blue
var shadow_color = '#222222'; //Set on heading titles
var shadow_offset = {x: -2, y: -2}; //Set on heading titles
var row_bgImage = 'images/row_bg.png'; //Set on heading backgrounds

var typeData = [
	{ prettyName:'Neighborhood News', hasChild:true, slug:'neighborhood-messages', desc:'Community stories from you or the grouch next door', },
	{ prettyName:'Bargains', hasChild:true, slug:'bargains', desc: 'You will know where awesome deals are going to be.', },
	{ prettyName:'Events', hasChild:true, slug:'events', desc:'There\'s a block party on Ohio next weekend', },
	{ prettyName:'Restaurants', hasChild:true, slug:'restaurants', desc:'Tonight it\'s Mass St, North Iowa or a dine-in. Check the ratings and comments', },
	{ prettyName:'Kansan Articles', hasChild:true, slug:'local-news', desc:'Mapped locations of the University Daily Kansan stories and reports', },
	{ prettyName:'Tweets', hasChild:true, slug:'tweets', desc:'Tweet with your location on in your latest 140-composition and hashtag #larryvilleku', },
	//{ prettyName:'Photos from Flickr', hasChild:true, slug:'photos', desc:'Geotagged hipster pics and snapshots of Lawrence', },
	//{ prettyName:'Police Citations', hasChild:true, slug:'police-citations', desc:'Everything from an unpaid meter to an MIP to speeding on K-10', },
	{ prettyName:'Accidents', hasChild:true, slug:'car-accidents', desc:'Drive safely. Every accident within the city limits is mapped', },
];

var dom = 'DIN 1451 Std';
var cond = 'Open Sans Condensed';
var body = 'Source Sans Pro';
if(Ti.Platform.osname=='android') {
	dom = 'DINMittelschriftStd';
	cond = 'OpenSans-CondBold';
	body = 'SourceSansPro-Regular';
}
win.backgroundColor = light_grey;


/****** PREPARE FEED *******/

	var xhr = Ti.Network.createHTTPClient();
	xhr.timeout = 1000000;
	var website = "http://larryvilleku.com";
	var limit_value = 50 //Cause most iOS devices can handle this amount
	var map_detail_height = 110; //For the detail view on the feed_row table.
	if (Ti.Android) {
		limit_value = 30; //Cause some Android devices can handle more, but the least can handle just 30.
		map_detail_height = 0; //Ironically, Android can't handle more than one mapview per app...even though it's a Google map.
	};
	var feed = website+"/api/dev1/items.json?limit="+limit_value;
	win.addEventListener('focus', getPreferences);
		function getPreferences() {
		Titanium.App.Analytics.trackPageview('/map'); //Fire analytics listener cause the app is starting
		for (var g=0; g < typeData.length; g++) {
			if(Titanium.App.Properties.getString(typeData[g].slug) === 'shown') {
				feed += '&type='+typeData[g].slug;
			}
		};
	};
	getPreferences();
	Ti.API.info(feed);
		
/*********LOAD INDICATOR**********/

	var actInd = Titanium.UI.createActivityIndicator({ 
		bottom:200, 
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG, 
		font: {
			
			fontSize:26,
			fontWeight:'bold'
		}, 
		color: col1, 
		message: 'Loading...', 
		width: 'auto', 
	});
	actInd.show();
	
	setTimeout(function() { actInd.hide(); },5000);
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

	xhr.open("GET",feed);
	
	var data = [];
	var annotations = [];
 	xhr.onload = function() {
		try {
			var newsitems = JSON.parse(this.responseText).features;
						var x = 0;
			 
			for (var i = 0; i < newsitems.length; i++){
				
				var location = newsitems[i].geometry.coordinates;
				var type = newsitems[i].properties.type;
				var title = newsitems[i].properties.title;
				var raw_date = newsitems[i].properties.item_date;
				var month = raw_date.substring(5,7);
				month = month.replace('01','Jan');
				month = month.replace('02','Feb');
				month = month.replace('03','Mar');
				month = month.replace('04','Apr');
				month = month.replace('05','May');
				month = month.replace('06','June');
				month = month.replace('07','July');
				month = month.replace('08','Aug');
				month = month.replace('09','Sept');
				month = month.replace('10','Oct');
				month = month.replace('11','Nov');
				month = month.replace('12','Dec');
				var day = raw_date.substring(8,10);
				var date = month+' '+day;
				if(title.length >= 60 ) {
					title = title.substr(0,60);
					title = title+'...'
				}
				
				if(type !== 'photos') {

				var mrker = Titanium.Map.createAnnotation({
					latitude:location[1],
					longitude:location[0],
					title:title,
					image:'../images/map_icons/'+type+'.png',
					animate:true,
					leftButton:'../images/map_icons/just_icons/'+type+'.png',
					id:i
				});
				annotations.push(mrker); 

/*******FEED VIEW APPEARANCE*********/
				
				var row = Ti.UI.createTableViewRow({hasChild:false,id:i});

				var newsitem_view = Ti.UI.createView({
					height:85,
					layout:'vertical',
					left:10,
					top:10,
					bottom:5,
					right:10,
					backgroundColor:'white',
					borderRadius:7,
					borderColor:'#b4b4b4',
					borderWidth:2,
				});
				
				var meta_view = Ti.UI.createView({
					height:32,
					width:82,
					backgroundImage:'../images/red_bg.png',
					top:-2,
					left:-2,
					borderRadius:7,
					borderColor:'#b4b4b4',
					borderWidth:1,
				});
				
				//Created at info
				var date_label = Ti.UI.createLabel({
					text:date.toUpperCase(),
					left:8,
					top:-26,
					height:25,
					width:'auto',
					color:'#fff',
					font:{fontSize:24, fontFamily:cond}
				});

				//Map icon of schema (type)
				var map_icon_view = Ti.UI.createImageView({
					image:'../images/map_icons/just_icons/'+type+'.png',
					right:4,
					top:-31,
					height:35,
					width:35,
				});

				//Newsitem Title info
				var newsitem_title = Ti.UI.createLabel({
					text:title,
					left:10,
					top:-2,
					height:'auto',
					width:'85%',
					color:darker_grey,
					font:{fontSize:15, fontFamily:cond}
				});
				
				//Combine the elements
				newsitem_view.add(meta_view);
				newsitem_view.add(date_label);
				newsitem_view.add(map_icon_view);
				newsitem_view.add(newsitem_title);
				
				//And put it all together...
				row.add(newsitem_view);
				row.className = 'item'+i;

				//row.description would follow the format, but Description is actually an attribute for TableRow defaults. So content it is.
				row.content = newsitems[i].properties.description;
				row.color = newsitems[i].properties.color;
				row.type = type;
				row.url = newsitems[i].properties.description;
				//row.title would follow the format, but Title is actually an attribute for this and that. So heading it is.
				row.heading = newsitems[i].properties.title;
				row.created_at = date;
				row.news_id = newsitems[i].properties.id;
				row.location = location;
				data[i] = row;
			};
		}
		var feed_rows = Titanium.UI.createTableView({
				data:data,
				minRowHeight:58,
				backgroundColor:light_grey,
				separatorColor:light_grey,
				top:title_bar_height,
				left:0,
				right:0
			});
feed_rows.addEventListener('click',function(e) {

            	var actual_content = Ti.UI.createWebView({
            		top:0,
            		left:4,
            		right:4,
            		bottom:map_detail_height, //Only appears on iOS,
            		html:'<html><head><link href="http://fonts.googleapis.com/css?family=Open+Sans+Condensed|Source+Sans+Pro|Lobster" rel="stylesheet" type="text/css"><style type="text/css"> body {font-family:"Source Sans Pro",Arial,sans-serif; width:'+reduced_phone_width+'px; font-size:16px;} img {width:'+reduced_phone_width+'px; height:auto} h3.mobile_app_only {color:'+col1+'; font-family:"Open Sans Condensed",Arial,sans-serif; font-weight:normal; font-size:22px;} a {text-decoration:none;}</style></head><body><a href="'+website+'/'+e.row.type+'/detail/'+e.row.news_id+'"><h3 class="mobile_app_only">' + e.row.heading + '</h3></a>' + e.row.content + '</body></html>'
            	});

				Titanium.App.Analytics.trackPageview('/larryville/detail-view/'+e.row.heading);
				var detail_window = Ti.UI.createWindow({
				title:'Details'
			});
				detail_window.add(actual_content);
            	
            var b = Titanium.UI.createButton({
                title:'Close',
                style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
            });
            detail_window.setLeftNavButton(b);
            b.addEventListener('click',function()
            {
                detail_window.close();
            });
            	if (Ti.Android) { } else {	
					var detail_mrker = Titanium.Map.createAnnotation({
						latitude:e.row.location[1],
						longitude:e.row.location[0],
						title:e.row.heading,
						image:'../images/map_icons/'+e.row.type+'.png',
						animate:true,
					});
				
					var detail_mapview = Titanium.Map.createView({
						mapType: Titanium.Map.STANDARD_TYPE,
						animate:true,
						region: {latitude:e.row.location[1], longitude:e.row.location[0], latitudeDelta:0.002, longitudeDelta:0.002},
						regionFit:true,
						userLocation:false,
						visible: true,
						left:0,
						bottom:0,
						height:map_detail_height,
						annotations:[detail_mrker],
						zoom:40,
						borderColor:'#999',
						borderWidth:3,
					});
					Titanium.Geolocation.distanceFilter = 10; //Not sure what this does, but it doesn't hurt
				
					detail_window.add(detail_mapview);
				};
            	detail_window.open({modal:true});
       		});
       		Ti.include('larryville_toolbar.js');
       		var refresh = Ti.UI.createView({
				height:40,
				width:40,
				layout:'vertical',
				left:60,
				top:0				
			});
 			var refresh_circle = Ti.UI.createImageView({
				image:'../images/refresh.png',
				left:68,
				top:8,
				height:25,
				width:25
			});
			refresh.add(refresh_circle);			
				
            refresh.addEventListener('click', function(){
            	feed = website+"/api/dev1/items.json?limit="+limit_value;
            	win.remove(feed_rows);
				actInd.show();
					setTimeout(function()
					{
						actInd.hide();
					},1000);
				getPreferences();
                xhr.open("GET",feed);
 				xhr.send();
            });
		win.add(refresh);

win.add(feed_rows);
				}
		catch(E){
			alert(E);
		}
	};
	xhr.send();

	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/larryville/news');
	});

			
