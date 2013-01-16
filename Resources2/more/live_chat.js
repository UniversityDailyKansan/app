var win = Titanium.UI.currentWindow;
var actInd = Titanium.UI.createActivityIndicator({
    bottom:10,
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
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/more/livechat');
	});
var chatbox = Titanium.UI.createWebView({url:'http://www.kansan.com/news/2010/sep/27/live-chat-page/'});

win.add(chatbox);