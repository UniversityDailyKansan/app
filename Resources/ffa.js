var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/FFA');
	});
	var liveFyreComments = Titanium.UI.createWebView({
		url:"http://kansan.com/ffa/?ffastrip=1",
		controls:true,
	});
	win.add(liveFyreComments);