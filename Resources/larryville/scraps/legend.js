var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/LarryvilleKU/legend');
	});

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
			legendData = [];
			
			for (var h=0; h < typeData.length; h++) {
				var legendRow = Titanium.UI.createTableViewRow();
				var legendHeading =  Titanium.UI.createLabel({
					text:typeData[h].prettyName.toUpperCase(), //Get the names
					font:{
						fontSize:22,
					},
					width:'auto',
					left:45,
					top:10,
					height:15,
					color: col1
				});
				
				var legendImage = Titanium.UI.createImageView({
					image:'../images/map_icons/just_icons/'+typeData[h].slug+'.png',
					left:5,
					top:3,
					height:30,
					width:30,
				});
				
				var legendDesc = Titanium.UI.createLabel({
					text:typeData[h].desc,
					font:{
						fontSize:14,
					},
					width:'70%',
					left:45,
					top:15,
					color: darker_grey
				});
 
				legendRow.add(legendHeading);
				legendRow.add(legendImage);
				legendRow.add(legendDesc);
 				
				legendRow.className = 'legendRow'; 

				legendData.push(legendRow);
			};

			var legendTable = Titanium.UI.createTableView({
				data:legendData,
				rowHeight:120,
				color:col1,
				rowBackgroundColor:'white',
				backgroundColor:'white',
			});
	win.add(legendTable);