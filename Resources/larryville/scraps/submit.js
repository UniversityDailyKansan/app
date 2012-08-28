var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/LarryvilleKU/submit');
	});			
			
			var submitWeb = Titanium.UI.createWebView({
				url:website+'/neighbornews/message/new/',
			});
	win.add(submitWeb);