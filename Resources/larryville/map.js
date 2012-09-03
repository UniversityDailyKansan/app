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
var darker_grey = '#555'; //Grey, little darker
var link_blue = '#2A85E8'; //Light blue
var shadow_color = '#222'; //Set on heading titles
var shadow_offset = {x: -2, y: -2}; //Set on heading titles
var row_bgImage = 'images/row_bg.png'; //Set on heading backgrounds

var typeData = [
	{ prettyName:'Safebus Red', hasChild:true, slug:'sbred', desc:'Safebus Red', },
	{ prettyName:'Safebus Green', hasChild:true, slug:'sbgreen', desc:'Safebus Green', },
	{ prettyName:'Safebus Blue', hasChild:true, slug:'sbblue', desc:'Safebus Blue', },
	{ prettyName:'Safebus Yellow', hasChild:true, slug:'sbyellow', desc:'Safebus Yellow', },
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

win.backgroundColor = light_grey;

	function getPreferences() {
		Titanium.App.Analytics.trackPageview('/map'); //Fire analytics listener cause the app is starting
		for (var g=0; g < typeData.length; g++) {
			if(Titanium.App.Properties.getString(typeData[g].slug) === 'shown') {
				feed += '&type='+typeData[g].slug;
			}
		};
	};

	//If the app is opening for the first time, set preferences because the app will crash otherwise when it queries the Titanium properties on ViewOptions (type_view). 
	//Learned from the comment on the first answer by Ravi http://developer.appcelerator.com/question/132802/check-if-the-app-is-running-on-the-first-time 
	
/****** PREPARE FEED *******/

	var data = [];
	var annotations = [];
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
	getPreferences();
	xhr.open("GET", feed);
		
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
    function getTableViewRowFromIndex(table, index) {
	//Ti.API.info('index: ' + index);
	var sections = table.data;
	if (!sections) {
		return null;
	}
	var currentRowIndex = index, row;
	for (var i = 0; i < sections.length; ++i) {
		//Ti.API.info('Section: ' + i);
		//Ti.API.info('Section length: ' + sections[i].rows.length);
		//Ti.API.info('currentRowIndex: ' + currentRowIndex);
		if (currentRowIndex < sections[i].rows.length) {
			//Ti.API.info('RETURNING: ' + sections[i].rows[currentRowIndex].title);
			Ti.API.debug(sections[i].rows[currentRowIndex]);
			Ti.API.debug(JSON.stringify(sections[i].rows[currentRowIndex]));
			return sections[i].rows[currentRowIndex];
		}
		else {
			currentRowIndex -= sections[i].rows.length;
		}
	}
}

/**********ACTUAL API LOADING*************/

 	xhr.onload = function() {
		try {
			var newsitems = JSON.parse(this.responseText).features;			 
			for (var i = 0; i < newsitems.length; i++){
				
				var location = newsitems[i].geometry.coordinates;
				var type = newsitems[i].properties.type;
				var title = newsitems[i].properties.title;
				var raw_date = newsitems[i].properties.item_date;
				
				var month = raw_date.substring(5,7);
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
					font:{fontSize:24}
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
					font:{fontSize:15}
				});
				
				//Combine the elements
				newsitem_view.add(meta_view);
				newsitem_view.add(date_label);
				newsitem_view.add(map_icon_view);
				newsitem_view.add(newsitem_title);
				
				//And put it all together...
				row.add(newsitem_view);
				row.className = 'item'+i;
				data[i] = row;
				
/******* FEED VIEW VARIABLES FOR DETAIL VIEW *********/

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
			var mapview = Titanium.Map.createView({
				mapType: Titanium.Map.STANDARD_TYPE,
				animate:true,
				region: {
					latitude:38.9622547128423, //CHANGE THIS
					longitude:-95.24254439999999, //CHANGE THIS
					latitudeDelta:0.02, //Your zoom levels
					longitudeDelta:0.02
				},
				regionFit:true,
				userLocation:true,
				visible: true,
				top:title_bar_height,
				annotations:annotations,
				zoom:20, //Don't know why this is here, but it can't hurt.
			});
			Titanium.Geolocation.distanceFilter = 10;
			
			mapview.addEventListener('click', function(evt) {
                var annotation = evt.annotation;
                var title = evt.title;
                var clickSource = evt.clicksource;
                var id = evt.annotation.id;
                if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' || evt.clicksource == 'leftView' || evt.clicksource == 'title') {
                var row = getTableViewRowFromIndex(feed_rows, id);
            	var actual_content = Ti.UI.createWebView({
            		top:0,
            		left:4,
            		right:4,
            		bottom:map_detail_height, //Only appears on iOS,
            		html:'<html><head><link href="http://fonts.googleapis.com/css?family=Open+Sans+Condensed|Source+Sans+Pro|Lobster" rel="stylesheet" type="text/css"><style type="text/css"> body {font-family:"Source Sans Pro",Arial,sans-serif; width:'+reduced_phone_width+'px; font-size:16px;} img {width:'+reduced_phone_width+'px; height:auto} h3.mobile_app_only {color:'+col1+'; font-family:"Open Sans Condensed",Arial,sans-serif; font-weight:normal; font-size:22px;} a {text-decoration:none;}</style></head><body><a href="'+website+'/'+row.type+'/detail/'+row.news_id+'"><h3 class="mobile_app_only">' + row.heading + '</h3></a>' + row.content + '</body></html>'
            	});

				Titanium.App.Analytics.trackPageview('/larryville/detail-view/'+row.heading);
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
						latitude:row.location[1],
						longitude:row.location[0],
						title:row.heading,
						image:'../images/map_icons/'+row.type+'.png',
						animate:true,
					});
				
					var detail_mapview = Titanium.Map.createView({
						mapType: Titanium.Map.STANDARD_TYPE,
						animate:true,
						region: {latitude:row.location[1], longitude:row.location[0], latitudeDelta:0.002, longitudeDelta:0.002},
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
 				}
            });
            
           
Titanium.Geolocation.purpose = "Recieve User Location";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
           function getLocation(){
				Titanium.Geolocation.getCurrentPosition(function(e){
        			var region={
						latitude: e.coords.latitude, //Standrad HTML5 getting location practice
						longitude: e.coords.longitude,
						animate:true,
						latitudeDelta:0.02,
						longitudeDelta:0.02
					};
					mapview.setLocation(region);
				});
			};
			
 			Titanium.Geolocation.addEventListener('location',function(){
    			getLocation();
			}); 
			
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
            	feed = website+"/api/dev1/items.json?limit="+limit_value;
            	win.remove(mapview);
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
			Ti.include('larryville_toolbar.js');
			var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'sbroutes.json');    
var results, route, coords, stops, location, times; 
var preParseData = (file.read().text); 
var response = JSON.parse(preParseData).results; 
var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var hm = ((hours * 60)+minutes); //Returns how many minutes
function appendIterationTimes(array,iteration){
	//http://stackoverflow.com/a/8069367 && http://stackoverflow.com/a/4822630
	for (var i = array[0]; i <= 1439; i += iteration) {
		if(!(i == array[0]))
			array.push(i);
	}
	for (var i = 0; i <= array[1]; i += iteration) {
		if(!(i == array[1]))
		array.push(i);
	}
	array.sort(function(a,b){return a - b});
	return array;
}
function closest(array,num){
    var k=0;
    var minDiff=100000;
    var ans;
    for(k in array){
         var m=Math.abs(num-array[k]);
         if(m<minDiff){ 
                minDiff=m; 
                ans=array[k]; 
            }
      }
    return ans;
}

function convertToTime(raw){
	if(raw === 0)
		return '12:00 a.m.';
	else if(raw === 60)
		return '1:00 a.m.';
	else if(raw === 120)
		return '2:00 a.m.';
	else if(raw === 180)
		return '3:00 a.m.';
	else if(raw === 1260)
		return '9:00 p.m.';
	else if(raw === 1320)
		return '10:00 p.m.';
	else if(raw === 1380)
		return '11:00 p.m.';
	else {
		var convertHours = (raw / 60);
		var splitHours = convertHours.toString().split(".");
		var convertMinutes = ((splitHours[1] * 60)/100);
		var splitMinutes = convertMinutes.toString().split('.');
		var minutes = Math.round(((splitMinutes[0].substring(0,2))+'.'+splitMinutes[0].substring(2,5)));
		if(minutes === 3){
			minutes = 30;
		}
		if(splitHours[0] >= 12 && splitHours !== 0){
			var hours = splitHours[0] - 12;
			var timeOfDay = 'p.m.';
		} else if(splitHours[0] == 0){
			var hours = 12;
			var timeOfDay = 'a.m.';
		} else {
			var hours = splitHours[0];
			var timeOfDay = 'a.m.';
		}
		return hours +':'+minutes+' '+timeOfDay;
	}
}
function createRoute(routeName,response){
	var routePoints = []; //Create empty point array
	var routeStops = []; //Create empty stop array
	var coordsPos = response[dd].coords;
	var stopsPos = response[dd].stops;
	for(i = 0; i < coordsPos.length; i++) {
		routePoints.push({latitude: coordsPos[i][0], longitude: coordsPos[i][1]});
	}
	for(p = 0; p < stopsPos.length; p++) {
		var timePos = appendIterationTimes(stopsPos[p].times[0],response[dd].iteration);
		var nearestTime = closest(timePos,hm, response[dd].iteration);
		var nearestTimeIndex = timePos.indexOf(nearestTime);
		var nextTimesPos = timePos.slice((nearestTimeIndex+parseInt(1)), (nearestTimeIndex+parseInt(4)));
		var nextTimes = '';
		for(h = 0; h < nextTimesPos.length; h++){
			nextTimes += convertToTime(nextTimesPos[h]) + ', ';
		}
		nearestTime = convertToTime(nearestTime);
		var mrker = Titanium.Map.createAnnotation({
			latitude:stopsPos[p].location[0][0],
			longitude:stopsPos[p].location[0][1],
			title:stopsPos[p].prettyName+': '+nearestTime,
			image:'../images/map_icons/sb'+routeName+'.png',
			subtitle:'Next: '+nextTimes,
			animate:true,
			id:p
		});
		routeStops.push(mrker); 
		//For later: http://maps.googleapis.com/maps/api/directions/json?origin=38.95097,-95.26001&destination=38.95322,-95.25704&sensor=false&mode=walking
	}
	var newRoute = {
		name: routeName+" Route",
		points:routePoints,
		color:routeName,
		width:2
	};
	if(Titanium.App.Properties.getString('sb'+routeName) === 'shown') {		
		mapview.addRoute(newRoute);
		mapview.addAnnotations(routeStops);
	}
}

for(dd = 0; dd < response.length; dd++) {
	createRoute(response[dd].route, response)
}

			win.add(mapview); //Add dat map to the screen
 			
				}
		catch(E){
			alert(E);
		}
	};
	xhr.send();
	

	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/larryville/map');
	});
	
Titanium.Geolocation.purpose = "Recieve User Location";
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;