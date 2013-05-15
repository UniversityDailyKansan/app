Titanium.UI.setBackgroundColor('#fff');
var window = Titanium.UI.currentWindow;

Titanium.App.Properties.setString('currNewsTB', 35);
Titanium.App.Properties.setString('currLVTB', 75);

//Set up analytics
Titanium.include('analytics.js');
var analytics = new Analytics('UA-668650-9');

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

var newswin = Ti.UI.createWindow({
    title:'Latest News',
	url:'news/latest.js',
});

var newstab = Ti.UI.createTab({
    icon:'tabs/kansan.png',
    title:'News',
    window:newswin
});

var kjhkwin = Ti.UI.createWindow({
    title:'KJHK Live',
	url:'kjhk/live.js'
});


var kjhktab = Ti.UI.createTab({
    icon:'tabs/radio.png',
    title:'KJHK',
    window:kjhkwin
});

var ffawin = Ti.UI.createWindow({
    title:'Free For All',
	url:'ffa.js'
});

var ffatab = Ti.UI.createTab({
    icon:'tabs/ffa.png',
    title:'Free For All',
    window:ffawin
});

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

tabGroup.addEventListener('open', checkReminderToRate);
//tabGroup.addEventListener('open', checkappUpdated);
/********************************************/
/************* NOTIFICATIONS ****************/
/********************************************/

tabGroup.open();

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