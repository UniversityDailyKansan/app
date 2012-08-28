var win = Titanium.UI.currentWindow;
var ad_link = 'http://larryvilleku.com/manage-feeds/misc/app_img/app_link.php';
var ad_image = 'http://larryvilleku.com/swag/wp-content/themes/DANK/css/images/mock_banner.png';

var imgAd = Titanium.UI.createImageView({
    image:ad_image,
    width:'100%',
    height:54,
    bottom:-4,
    left:0,
});
imgAd.addEventListener('click', function() { 
    Titanium.Platform.openURL(ad_link); 
});

win.add(imgAd);