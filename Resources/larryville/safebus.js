
var win = Titanium.UI.currentWindow;

var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region: {
		latitude:38.9622547128423, //CHANGE THIS
		longitude:-95.24254439999999, //CHANGE THIS
		latitudeDelta:0.02, //Your zoom levels
		longitudeDelta:0.02
	},	
	animate:true,
	regionFit:true,
});
var fileName = 'sbroutes.json'; 
var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'sbroutes.json');    
var results, route, coords, stops, location, times; 
var preParseData = (file.read().text); 
var response = JSON.parse(preParseData).results; 
var redPoints = [];
var redStops = [];
var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var hm = ((hours * 60)+minutes);
Ti.API.info(hm);
function closest(array,num){
    var k=0;
    var minDiff=100000;
    var ans;
    for(k in array){
         var m=Math.abs(num-array[k]);
         if(m<minDiff){ 
                minDiff=m; 
                ans=array[k]; 
            }
      }
    return ans;
}

function convertToTime(raw){
	var convertHours = (raw / 60);
	var splitHours = convertHours.toString().split(".");
	var convertMinutes = ((splitHours[1] * 60)/100);
	var splitMinutes = convertMinutes.toString().split('.');
	var minutes = splitMinutes[0].substring(0,2)
	return splitHours[0] +':'+minutes;
}

	for(dd = 0; dd < response.length; dd++) {
		if (response[dd].route == 'red') {
			var coordsPos = response[dd].coords;
			var stopsPos = response[dd].stops;
			for(i = 0; i < coordsPos.length; i++) {
				redPoints.push({latitude: coordsPos[i][0], longitude: coordsPos[i][1]});
			}
			for(p = 0; p < stopsPos.length; p++) {
				var timePos = stopsPos[p].times[0];
				var nearestTime = closest(timePos,hm);
				var nearestTimeIndex = timePos.indexOf(nearestTime);
				var nextTimesPos = timePos.slice((nearestTimeIndex+parseInt(1)), (nearestTimeIndex+parseInt(4)));
				var nextTimes = '';
				for(h = 0; h < nextTimesPos.length; h++){
					Ti.API.info(nextTimesPos[h]);
					nextTimes += convertToTime(nextTimesPos[h]) + ', ';
					Ti.API.info('nextTimes' + nextTimes);
				}
				nearestTime = convertToTime(nearestTime);
				Ti.API.info('nearest In' + nearestTimeIndex);
				Ti.API.info('nearest' + nearestTime);
				Ti.API.info('next' + nextTimes);
				var mrker = Titanium.Map.createAnnotation({
					latitude:stopsPos[p].location[0][0],
					longitude:stopsPos[p].location[0][1],
					title:nearestTime,
					image:'../images/map_icons/sb'+response[dd].route+'.png',
					subtitle:nextTimes,
					animate:true,
					id:p
				});
				redStops.push(mrker); 
			}
		}
	}
	var redRoute = {
		name:"Red Route",
		points:redPoints,
		color:"red",
		width:3
	};
	mapview.addRoute(redRoute);
	mapview.addAnnotations(redStops);

win.add(mapview);
