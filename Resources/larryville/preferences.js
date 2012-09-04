var win = Ti.UI.currentWindow;
var dom = 'DIN 1451 Std';
var cond = 'Open Sans Condensed';
var body = 'Source Sans Pro';
if(Ti.Platform.osname=='android') {
	dom = 'DINMittelschriftStd';
	cond = 'OpenSans-CondBold';
	body = 'SourceSansPro-Regular';
} 

/*********** PREFS **********/
var title_bar_height = 40;

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
	//{ prettyName:'Accidents', hasChild:true, slug:'car-accidents', desc:'Drive safely. Every accident within the city limits is mapped', },
];

typeArray = [];						
						
			for (var t = 0; t < typeData.length; t++) {
				var typePrettyName = typeData[t].prettyName;
								
				var typeRow = Titanium.UI.createTableViewRow();

				var typeHeading =  Titanium.UI.createLabel({
					text:typePrettyName.toUpperCase(), //.toUpperCase() is not necessary, I only did it because I'm using League and it looks bad when it's just lowercase
					font:{
						fontFamily:cond,
						fontSize:24,
					},
					width:'auto',
					left:90,
					textAlign:'left',
					color:col2
				});
				
				var typeStatus = Titanium.App.Properties.getString(typeData[t].slug); //This is set upon row click. Listener is later
				
				var typeIcon = Titanium.UI.createImageView({
					image: '../images/map_icons/just_icons/'+typeData[t].slug+'.png', //This is why settings image names to the same as slug is important
					left:40,
					width:30,
					height:30,
				});
				
				typeStatus[t] = typeData[t].slug;
				typeRow.add(typeIcon);
				typeRow.add(typeHeading);
				typeRow.hasChild=false;
 				typeRow.leftImage = '../images/'+typeStatus+'.png';	
 				 				
				typeRow.className = 'typeRow';
 				typeRow.heading = typeData[t].heading;

				typeArray.push(typeRow);
				
				typeArray[t] = typeRow;
				typeRow.backgroundColor = 'white';
				
				//So that the event listener can adjust properties
				typeRow.slug = typeData[t].slug;
				typeRow.backgroundColor = typeRow.backgroundColor;
				typeRow.id = t;
			};
			var typeTable = Titanium.UI.createTableView({
				left:4,
				right:4,
				data:typeArray,
				minRowHeight:58,
				color:col1,
				rowBackgroundColor:'white',
				backgroundColor:'white',
				top:0,
				bottom:0,
			});
			
			typeTable.addEventListener('click',function(e) {
				if (Titanium.App.Properties.getString(e.rowData.slug) === 'hidden') {
					Titanium.App.Properties.setString(e.rowData.slug, 'shown')
					e.rowData.leftImage = '../images/shown.png'; //Changes to red to signify it's hidden
					Titanium.App.Analytics.trackPageview('/view-options/'+e.rowData.slug+'shown'); //Fire analytics listener. From a customer service standpoint, to know what people  do like to see on their map.
				} else {
					Titanium.App.Properties.setString(e.rowData.slug, 'hidden');
					e.rowData.leftImage = '../images/hidden.png'; //Changes to red to signify it's hidden
					Titanium.App.Analytics.trackPageview('/view-options/'+e.rowData.slug+'hidden'); //Fire analytics listener. From a customer service standpoint, to know what people don't like to see on their map.
				};
			});
			win.add(typeTable);