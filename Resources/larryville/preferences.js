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
	{ prettyName:'Neighborhood News', hasChild:true, status: 'shown', slug:'neighborhood-messages', desc:'Community stories from you or the grouch next door', },
	{ prettyName:'Bargains', hasChild:true, status:'shown', slug:'bargains', desc: 'You will know where awesome deals are going to be.', },
	{ prettyName:'Events', hasChild:true,  status:'shown', slug:'events', desc:'There\'s a block party on Ohio next weekend', },
	{ prettyName:'Safebus Red', hasChild:true,  status:'shown', slug:'sbred', desc:'Safebus Red', },
	{ prettyName:'Safebus Green', hasChild:true,  status:'shown', slug:'sbgreen', desc:'Safebus Green', },
	{ prettyName:'Safebus Blue', hasChild:true,  status:'shown', slug:'sbblue', desc:'Safebus Blue', },
	{ prettyName:'Safebus Yellow', hasChild:true,  status:'shown', slug:'sbyellow', desc:'Safebus Yellow', },
	{ prettyName:'Restaurants', hasChild:true,  status:'shown', slug:'restaurants', desc:'Tonight it\'s Mass St, North Iowa or a dine-in. Check the ratings and comments', },
	{ prettyName:'Kansan Articles', hasChild:true,  status:'shown', slug:'local-news', desc:'Mapped locations of the University Daily Kansan stories and reports', },
	{ prettyName:'Tweets', hasChild:true,  status:'shown', slug:'tweets', desc:'Tweet with your location on in your latest 140-composition and hashtag #larryvilleku', },
	//{ prettyName:'Photos from Flickr', hasChild:true, status: 'shown', slug:'photos', desc:'Geotagged hipster pics and snapshots of Lawrence', },
	//{ prettyName:'Police Citations', hasChild:true, status: 'shown', slug:'police-citations', desc:'Everything from an unpaid meter to an MIP to speeding on K-10', },
	//{ prettyName:'Accidents', hasChild:true, status: 'shown', slug:'car-accidents', desc:'Drive safely. Every accident within the city limits is mapped', },
];

typeArray = [];		
						
			for (var t = 0; t < typeData.length; t++) {
				var typePrettyName = typeData[t].prettyName;
								
				var typeRow = Titanium.UI.createTableViewRow();
				
				var typeStatus = Titanium.App.Properties.getString(typeData[t].status); //This is set upon row click. Listener is later

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
				
				
				var typeIcon = Titanium.UI.createImageView({
					image: '../images/map_icons/just_icons/'+typeData[t].slug+'.png', //This is why settings image names to the same as slug is important
					left:40,
					width:30,
					height:30,
				});
				
				typeRow.add(typeIcon);
				typeRow.add(typeHeading);
				typeRow.slug = typeData[t].slug;
				typeRow.hasChild=false;
 				if (Titanium.App.Properties.getString(typeRow.slug) == 'hidden') { //This will check to see what the setting currently is...
					typeRow.leftImage = '../images/hidden.png'; //Changes to red to signify it's hidden
				} else {
					typeRow.leftImage = '../images/shown.png'; //Changes to red to signify it's hidden
				};
 				 				
				typeRow.className = 'typeRow';
 				typeRow.heading = typeData[t].heading;

				//typeArray.push(typeRow);
				
				typeArray[t] = typeRow;
				typeRow.backgroundColor = 'white';
				//So that the event listener can adjust properties
				
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
			
			
			
			win.add(typeTable);
			
			typeTable.addEventListener('click',function(e) {
				if (Titanium.App.Properties.getString(e.row.slug) == 'hidden') {
					Titanium.App.Properties.setString(e.row.slug, 'shown');
					e.row.leftImage = '../images/shown.png'; //Changes to red to signify it's hidden
					Titanium.App.Analytics.trackPageview('/view-options/'+e.row.slug+'shown'); //Fire analytics listener. From a customer service standpoint, to know what people  do like to see on their map.
				} else {
					Titanium.App.Properties.setString(e.row.slug, 'hidden');
					e.row.leftImage = '../images/hidden.png'; //Changes to red to signify it's hidden
					Titanium.App.Analytics.trackPageview('/view-options/'+e.row.slug+'hidden'); //Fire analytics listener. From a customer service standpoint, to know what people don't like to see on their map.
				};
			});
			
			var saveButton = Titanium.UI.createLabel({
					bottom:0,
					height:40,
					width:'100%',
					text:'Save',
					textAlign:'center',
					backgroundColor:'#1D243B',
					color:'#fff',
					font:{
						fontFamily:cond,
						fontSize:24,
					},	
			});
			
			saveButton.addEventListener('click',function(e){
				win.close();
			});
			
			win.add(saveButton);
			