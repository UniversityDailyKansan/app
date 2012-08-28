var win = Ti.UI.currentWindow;

// initialize to all modes
win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

var dEmailMessage = Titanium.UI.createEmailDialog();
	dEmailMessage.subject = 'KJHK Request a Song';
	dEmailMessage.toRecipients = ['request@ku.edu'];
	dEmailMessage.messageBody = 'Artist Name:       /      Song Requested:      / Sent from the UDK Mobile App';
 
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