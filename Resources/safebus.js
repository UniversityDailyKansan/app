
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
var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var hm = ((hours * 60)+minutes); //Returns how many minutes
Ti.API.info(hm);
function appendIterationTimes(array,iteration){
	//http://stackoverflow.com/a/8069367 && http://stackoverflow.com/a/4822630
	for (var i = array[0]; i <= 1439; i += iteration) {
		if(!(i == array[0]))
			array.push(i);
	}
	for (var i = 0; i <= array[1]; i += iteration) {
		if(!(i == array[1]))
		array.push(i);
	}
	array.sort(function(a,b){return a - b});
	return array;
}
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
	if(raw === 0)
		return '12:00 a.m.';
	else if(raw === 60)
		return '1:00 a.m.';
	else if(raw === 120)
		return '2:00 a.m.';
	else if(raw === 180)
		return '3:00 a.m.';
	else if(raw === 1260)
		return '9:00 p.m.';
	else if(raw === 1320)
		return '10:00 p.m.';
	else if(raw === 1380)
		return '11:00 p.m.';
	else {
		var convertHours = (raw / 60);
		var splitHours = convertHours.toString().split(".");
		var convertMinutes = ((splitHours[1] * 60)/100);
		var splitMinutes = convertMinutes.toString().split('.');
		var minutes = Math.round(((splitMinutes[0].substring(0,2))+'.'+splitMinutes[0].substring(2,5)));
		if(splitHours[0] >= 12 && splitHours !== 0){
			var hours = splitHours[0] - 12;
			var timeOfDay = 'p.m.';
		} else if(splitHours[0] == 0){
			var hours = 12;
			var timeOfDay = 'a.m.';
		} else {
			var hours = splitHours[0];
			var timeOfDay = 'a.m.';
		}
		return hours +':'+minutes+' '+timeOfDay;
	}
}
function createRoute(routeName,response){
	var routePoints = []; //Create empty point array
	var routeStops = []; //Create empty stop array
	var coordsPos = response[dd].coords;
	var stopsPos = response[dd].stops;
	for(i = 0; i < coordsPos.length; i++) {
		routePoints.push({latitude: coordsPos[i][0], longitude: coordsPos[i][1]});
	}
	for(p = 0; p < stopsPos.length; p++) {
		var timePos = appendIterationTimes(stopsPos[p].times[0],response[dd].iteration);
		var nearestTime = closest(timePos,hm, response[dd].iteration);
		var nearestTimeIndex = timePos.indexOf(nearestTime);
		var nextTimesPos = timePos.slice((nearestTimeIndex+parseInt(1)), (nearestTimeIndex+parseInt(4)));
		var nextTimes = '';
		Ti.API.info(nextTimesPos);
		for(h = 0; h < nextTimesPos.length; h++){
			nextTimes += convertToTime(nextTimesPos[h]) + ', ';
		}
		nearestTime = convertToTime(nearestTime);
		var mrker = Titanium.Map.createAnnotation({
			latitude:stopsPos[p].location[0][0],
			longitude:stopsPos[p].location[0][1],
			title:stopsPos[p].prettyName+': '+nearestTime,
			image:'../images/map_icons/sb'+routeName+'.png',
			subtitle:'Next: '+nextTimes,
			animate:true,
			id:p
		});
		routeStops.push(mrker); 
		//For later: http://maps.googleapis.com/maps/api/directions/json?origin=38.95097,-95.26001&destination=38.95322,-95.25704&sensor=false&mode=walking
	}
	var newRoute = {
		name: routeName+" Route",
		points:routePoints,
		color:routeName,
		width:3
	};
	
	mapview.addRoute(newRoute);
	mapview.addAnnotations(routeStops);
}

for(dd = 0; dd < response.length; dd++) {
	createRoute(response[dd].route, response)
}

win.add(mapview);
