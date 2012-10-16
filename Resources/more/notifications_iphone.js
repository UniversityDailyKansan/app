var win = Ti.UI.currentWindow;

Ti.include('../urbanairship.js');
 
UrbanAirship.key='dbs5vadXR6aslsCTRkk96Q';
UrbanAirship.secret ='pyD-fRHMSCObjcfhNrBLlw';
UrbanAirship.master_secret='aSjC-xvZQ0SPeNFs4MBMSw';
UrbanAirship.baseurl = 'https://go.urbanairship.com';
 
var register = Ti.UI.createButton({
  title: 'Enable Notifications',
  top: 60,
  left: 60,
  width: 200,
  height: 40
});
 
register.addEventListener('click', function() {
  Ti.Network.registerForPushNotifications({
    types: [
      Ti.Network.NOTIFICATION_TYPE_BADGE,
      Ti.Network.NOTIFICATION_TYPE_ALERT,
      Ti.Network.NOTIFICATION_TYPE_SOUND
    ],
    success:function(e) {
      var deviceToken = e.deviceToken;
      Ti.API.info('successfully registered for apple device token with '+e.deviceToken);
      var params = {
        tags: ['version'+Ti.App.getVersion()],
        alias: alias.value
      };
      UrbanAirship.register(params, function(data) {
        Ti.API.debug("registerUrban success: " + JSON.stringify(data));
      }, function(errorregistration) {
        Ti.API.warn("Couldn't register for notifications");
      });
    },
    error:function(e) {
      Ti.API.warn("push notifications disabled: "+e);
    },
    callback:function(e) {
      var a = Ti.UI.createAlertDialog({
        title:'University Daily Kansan',
        message:e.data.alert
      });
      a.show();
      Titanium.UI.iPhone.appBadge=Titanium.UI.iPhone.appBadge-1;
    }
  });  
  Ti.API.info('registered urban airship');
});
win.add(register);
