var win = Ti.UI.currentWindow;
	win.addEventListener('focus', function(e){
    	Titanium.App.Analytics.trackPageview('/more/feedback');
	});

// initialize to all modes
win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

var dEmailMessage = Titanium.UI.createEmailDialog();
	dEmailMessage.subject = 'UDK Mobile App Feedback';
	dEmailMessage.toRecipients = ['dev@kansan.com'];
	dEmailMessage.messageBody = 'Sent from the University Daily Kansan Mobile App';
 
dEmailMessage.addEventListener('complete',function(e)
{
    if (e.result == emailDialog.SENT)
    {
        alert("message was sent");
    }
    else
    {
        alert("message was not sent. result = "+e.result);
    }
});
dEmailMessage.open();