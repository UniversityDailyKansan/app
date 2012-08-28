
if(Ti.Android) {
	var CloudPush = require('ti.cloudpush');
        //CloudPush.debug = true;
        CloudPush.enabled = true; //DUH
    var deviceToken //The unique Identifier for the device. 
    
    var Cloud = require('ti.cloud'); //Another module. iOS needs this too.
        //Cloud.debug = true;
 
	CloudPush.retrieveDeviceToken({
        success: function deviceTokenSuccess(e) {
            //alert('Device Token: ' + e.deviceToken);
            deviceToken = e.deviceToken //So here we have to get the deviceToken to identify one device from another so you don't send a push to just one device.
            loginDefault(); //See function below
        },
        error: function deviceTokenError(e) {
            alert('Failed to register for push! ' + e.error);
        }
    });
 
	function loginDefault(e){ //ACS requires that all users login. Whack, I know, but it's the policy for now.
        Cloud.Users.login({ //Going to create just a regular, default user, and they're going to collect all the device tokens. Each token is another subscriber, so it's not bending the rules, this just makes it easier for users so they don't have to create an account for the app/notifications
            login: 'test@example.com',
            password: 'example_password' //Create this user for Production AND Development under ACS Console > Manage > Users > Add User
        }, function (e) {
            if (e.success) {
                defaultSubscribe(); //See function below
            } else {
                alert('Error:\\n' +((e.error && e.message) || JSON.stringify(e)));
            }
        });
    }
 
    function defaultSubscribe(){
        Cloud.PushNotifications.subscribe({ //Now that we've logged in, submit the data to ACS
        	channel: 'larryville_news',
        	device_token: deviceToken,
        	type: 'android' //A must, for whatever reason. Took me forever to figure this out, because it only throws an error when you install to device, not in the emulator. Type as a requirement is also not specified in the Titanium docs, just in their REST API/iOS SDK/Java SDK/JS SDK docs.
        }, function (e) {
        	if (e.success) {
        		//alert('Subscribed');
        	} else {
        		alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
        	}
        });
    }
    
    function defaultUnsubscribe(){
    	Cloud.PushNotifications.unsubscribe({ //From the event listener above to remove the user from the list.
                channel: 'larryville_news',
                device_token: deviceToken,
        		type: 'android'
            }, function (e) {
                if (e.success) {
                    alert('Unsubscribed.');
                } else {
                    alert('Error:' +((e.error && e.message) || JSON.stringify(e)));
                }
            });
    }
 
 //The worst. This was a mountain of pain. So once we're all signed up, we've got to receive and parse the message. Moving on.
	CloudPush.addEventListener('callback', function (evt) {
		data = JSON.parse(evt.payload); //Your evt is total response text. We're going to just narrow this to the payload value, because I don't care about the rest. You can alert(evt) if you're so interested. Then we convert the JSON data into something readable.
	
		if(data.android.vibrate){ //if the vibrate property exists, then shake.
			Titanium.Media.vibrate();	
		}

		Titanium.Android.NotificationManager.notify( //An undocumented feature of the API, this is actually massively important to render notifications in the status bar.
			0,
			Ti.Android.createNotification({
				contentTitle: "LarryvilleKU: " + data.android.title, //The title
				contentText: data.android.alert, //The alert itself
				tickerText: data.android.alert, //What shows up in the bar upon first receiving notification (just duplicating the alert here)
				icon : Ti.App.Android.R.drawable.appicon, //the appicon to appear in the bar/when it's 'minimized'
				flags : Titanium.Android.ACTION_DEFAULT | Titanium.Android.FLAG_AUTO_CANCEL | Titanium.Android.FLAG_SHOW_LIGHTS,
				contentIntent: Titanium.Android.createPendingIntent({
					intent: Titanium.Android.createIntent({
						url: 'app.js' //When you click on the notification, open the app
					})
				})
			})
		)
    });
    
    
    //Lastly, for debugging purposes
    CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
        Ti.API.info('Tray Click Launched App (app was not running)');
    });
    CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
        Ti.API.info('Tray Click Focused App (app was already running)');
    });
}