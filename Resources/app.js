Titanium.UI.setBackgroundColor('#fff');
var window = Titanium.UI.currentWindow;

Ti.App.arrowLeft = 70; //this is for the news_toolbar
Ti.App.arrowLV = 90; //for LV_toolbar

//Set up analytics
Titanium.include('analytics.js');
var analytics = new Analytics('UA-668650-9');
// Call the next function if you want to reset the analytics to a new first time visit.
//analytics.reset();

Titanium.App.addEventListener('analytics_trackPageview', function(e){
	analytics.trackPageview('/app' + e.pageUrl);
});

var dom = 'DIN 1451 Std';
var cond = 'Open Sans Condensed';
var body = 'Source Sans Pro';
if(Ti.Platform.osname=='android') {
	dom = 'DINMittelschriftStd';
	cond = 'OpenSans-CondBold';
	body = 'SourceSansPro-Regular';
} 

Titanium.App.addEventListener('analytics_trackEvent', function(e){
	analytics.trackEvent(e.category, e.action, e.label, e.value);
});


Titanium.App.Analytics = {
	trackPageview:function(pageUrl){
		Titanium.App.fireEvent('analytics_trackPageview', {pageUrl:pageUrl});
	},
	trackEvent:function(category, action, label, value){
		Titanium.App.fireEvent('analytics_trackEvent', {category:category, action:action, label:label, value:value});
	}
}


analytics.start(10);
var tabGroup = Ti.UI.createTabGroup();

// create news window
var newswin = Ti.UI.createWindow({  
    title:'Latest News',
	url:'news/latest.js',
});

// craete newstab
var newstab = Ti.UI.createTab({  
    icon:'tabs/kansan.png',
    title:'News',
    window:newswin
});

// create kjhk window
var kjhkwin = Ti.UI.createWindow({  
    title:'KJHK Live',
	url:'kjhk/live.js'
});


// craete tab2
var kjhktab = Ti.UI.createTab({ 
    icon:'tabs/radio.png',
    title:'KJHK',
    window:kjhkwin
});

// create ffa window
var ffawin = Ti.UI.createWindow({  
    title:'Free For All',
	url:'ffa.js'
});

// craete ffatab
var ffatab = Ti.UI.createTab({ 
    icon:'tabs/ffa.png',
    title:'Free For All',
    window:ffawin
});

// create bargainwin window
var lvwin = Ti.UI.createWindow({  
    title:'LarryvilleKU',
	url:'larryville/map.js'
});

var lvtab = Ti.UI.createTab({  
    icon:'tabs/larryville.png',
    title:'LarryvilleKU',
    window:lvwin
});

var morewin = Ti.UI.createWindow({  
    title:'More',
	url:'more.js'
});

var moretab = Ti.UI.createTab({  
    icon:'tabs/info.png',
    title:'More',
    window:morewin
});
newswin.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/news');
});
kjhkwin.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/kjhk');
});
ffawin.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/ffa');
});
lvwin.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/larryville');
});
morewin.addEventListener('focus', function(e){
	Titanium.App.Analytics.trackPageview('/more');
});

// add the tab to the tab group
tabGroup.addTab(newstab);
tabGroup.addTab(ffatab);
tabGroup.addTab(lvtab);
tabGroup.addTab(kjhktab);
tabGroup.addTab(moretab);

lvwin.addEventListener('focus', firstPreferences);
tabGroup.addEventListener('open', checkReminderToRate);
lvwin.addEventListener('open', howToNotification);
//tabGroup.addEventListener('open', checkappUpdated);
/********************************************/
/************* NOTIFICATIONS ****************/
/********************************************/	

tabGroup.open();

function howToNotification() {
	var howToDialog = Ti.UI.createAlertDialog({
		title: 'How to use LarryvilleKU',
		message: 'Customize your map by altering the settings to show what news, events, and deals you want to see.',
		buttonNames: ['Close']
	});
	howToDialog.show();
};

function checkReminderToRate() {
    var now = new Date().getTime();
    var remindToRate = Ti.App.Properties.getString('RemindToRate');
    if (!remindToRate) {
        Ti.App.Properties.setString('RemindToRate', now);
    }
    else if (remindToRate < now) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'Rate the UDK',
            message: 'Would you please rate the UDK app?',
            buttonNames: ['OK', 'Remind Me', 'Never'],
            cancel: 2
        });
        alertDialog.addEventListener('click', function(evt) {
            switch (evt.index) {
                case 0:
                    Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
                    // NOTE: replace this with your own iTunes link; also, this won't WON'T WORK IN THE SIMULATOR!
                    if (Ti.Android) {
                        Ti.Platform.openURL('https://market.android.com/details?id=com.udk.mobile');
                    }
                    else {
                        Ti.Platform.openURL('http://itunes.apple.com/us/app/the-university-daily-kansan/id453624902?ls=1&mt=8');
                    }
                    break;
                case 1:
                    // "Remind Me Later"? Ok, we'll remind them tomorrow when they launch the app.
                    Ti.App.Properties.setString('RemindToRate', now + (1000 * 60 * 60 * 24));
                    break;
                case 2:
                    Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
                    break;
            }
        });
        alertDialog.show();
    }
};
function checkappUpdated() {
    var now = new Date().getTime();
    var appUpdated = Ti.App.Properties.getString('AppUpdated');
    if (!appUpdated) {
        Ti.App.Properties.setString('AppUpdated', now);
    }
    else if (appUpdated < now) {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'New Bargains Feature',
            message: 'New in this version: Bargains brings discounts at Lawrence businesses within a few clicks by displaying scannable coupons on your phone\'s screen. Click the "Bargains" tab, and present the barcode to any participating retailer as a regular coupon.',
            buttonNames: ['OK', 'Cancel'],
            cancel: 1
        });
        alertDialog.addEventListener('click', function(evt) {
            switch (evt.index) {
                case 0:
                    // "Remind Me Later"? Ok, we'll remind them tomorrow when they launch the app.
                    Ti.App.Properties.setString('AppUpdated', Number.MAX_VALUE);
                    break;
                case 1:
                    // "Remind Me Later"? Ok, we'll remind them tomorrow when they launch the app.
                    Ti.App.Properties.setString('AppUpdated', Number.MAX_VALUE);
                    break;
            }
        });
        alertDialog.show();
    }
};
function firstPreferences() {
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
	//{ prettyName:'Accidents', hasChild:true, slug:'car-accidents', desc:'Drive safely. Every accident within the city limits is mapped', },
];
		var opened = Ti.App.Properties.getString('appLaunch5');
		//We're eventually launching a window, so we have to recreate the heading bar seen elsewhere in the app
			var heading_bar = Titanium.UI.createView({
				top:0,
				height:title_bar_height,
				backgroundImage:bgImage,
			});
           	
			var heading_text = Titanium.UI.createLabel({
				shadowColor: shadow_color,
				shadowOffset: shadow_offset,
				color:'#fff',
				height:title_bar_height,
				text:'Preferences',
				textAlign:'center',
				width:phone_width,
				font:{
					fontFamily:cond,
					fontSize:30,
				}
			});

			//At the bottom, to make this intuitive, we're adding a Save button so users believe their preferences are saved. Also, the save button sets a Properties string so this window doesn't have to come up again
            var save_bar = Titanium.UI.createButton({
				bottom:0,
				height:40,
				width:'100%',
				backgroundImage: bgImage,
				backgroundSelectedImage: default_button_selected,
				borderWidth: 0,
				borderColor: 'transparent',
            });
           	
			var save_text = Titanium.UI.createLabel({
				color:'#fff',
				height:40,
				text:'Save',
				textAlign:'center',
				width:'100%',
				font:{
					fontFamily:cond,
					fontSize:30,
				}
			});
			//save_bar.add(save_text);
			
			var saveButton = Ti.UI.createButton({
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
				
				first_settings_window.close();
			});		
			
		//Blank response if it's already been opened. Again, (!opened) is inconsistent for me.
		if(opened){} else {
			for (var b=0; b < typeData.length; b++) {
				Titanium.App.Properties.setString(typeData[b].slug, 'shown'); //Set this as the default
			}
			var first_settings_window = Titanium.UI.createWindow({navBarHidden:true,}); //Using a window for stability's sake
			
			heading_bar.add(heading_text);
			first_settings_window.add(heading_bar);
			first_settings_window.add(saveButton);

			prefArray = [];	

			//A brief description
			var pref_about_text = Ti.UI.createLabel({
				text:'Decide which news you want to see. After all, it is your city, too.',
				font: {
					
					fontSize:16,
				}, 
				color: darker_grey,
				left:10,
				right:8,
				top:title_bar_height,
				height:title_bar_height,
			});
			first_settings_window.add(pref_about_text);
			
			//This is all basically taken from the first preferences setting view we set up (typeTable)			
			for (var p = 0; p < typeData.length; p++) {
				var prefPrettyName = typeData[p].prettyName;
								
				var prefRow = Titanium.UI.createTableViewRow();

				var prefHeading =  Titanium.UI.createLabel({
					text:prefPrettyName.toUpperCase(), //.toUpperCase() is not necessary, I only did it because I'm using League and it looks bad when it's just lowercase
					font:{
						fontFamily:cond,
						fontSize:24,
					},
					width:'auto',
					left:90,
					textAlign:'left',
					color:col2
				});
				
				if(!(Titanium.App.Properties.getString(typeData[p].slug))) {
					Titanium.App.Properties.setString(typeData[p].slug, 'shown');
				}
				
				var prefStatus = Titanium.App.Properties.getString(typeData[p].slug); //This is set upon row click. Listener is later
				
				var prefIcon = Titanium.UI.createImageView({
					image: 'images/map_icons/just_icons/'+typeData[p].slug+'.png',  //This is why settings image names to the same as slug is important
					left:40,
					width:30,
					height:30,
				});
				
				prefStatus[p] = typeData[p].slug;
				prefRow.add(prefIcon);
				prefRow.add(prefHeading);
				prefRow.hasChild=false;
 				prefRow.leftImage = 'images/'+prefStatus+'.png';	

				prefRow.className = 'prefRow';
 				prefRow.heading = typeData[p].heading;

				prefArray.push(prefRow);
				
				prefArray[p] = prefRow;
				prefRow.backgroundColor = 'white';
				
				//So that the event listener can adjust properties
				prefRow.slug = typeData[p].slug;
				prefRow.backgroundColor = prefRow.backgroundColor;
				prefRow.id = p;
			};
			
			var prefTable = Titanium.UI.createTableView({
				width:'100%',
				data:prefArray,
				minRowHeight:48,
				color:col1,
				rowBackgroundColor:'white',
				backgroundColor:'white',
				top:title_bar_height+title_bar_height,
				bottom:title_bar_height,
			});
			
			prefTable.addEventListener('click',function(e) {
				if (Titanium.App.Properties.getString(e.rowData.slug) === 'hidden') {
					Titanium.App.Properties.setString(e.rowData.slug, 'shown')
					e.rowData.leftImage = 'images/shown.png'; //Changes to green check to show it's visible
					Titanium.App.Analytics.trackPageview('/view-options/'+e.rowData.slug+'-shown'); //Fire analytics listener. From a customer service standpoint, to know what people  do like to see on their map.
				} else {
					Titanium.App.Properties.setString(e.rowData.slug, 'hidden');
					e.rowData.leftImage = 'images/hidden.png'; //Changes to red x to signify it's hidden
					Titanium.App.Analytics.trackPageview('/view-options/'+e.rowData.slug+'-hidden'); //Fire analytics listener. From a customer service standpoint, to know what people don't like to see on their map.
				};
			});
			first_settings_window.add(prefTable);
            first_settings_window.open({modal:true});
			save_bar.addEventListener('click',function() {
				Ti.App.Properties.setString("appLaunch5", JSON.stringify({opened:true})); //So we don't see this first prefences window again
				//Ti.App.Properties.setString('GPSPref', 'yes'); Note: this is a preference I need to build in down the line
				first_settings_window.close();
			});
		}
	};
