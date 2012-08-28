
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

	for(dd = 0; dd < response.length; dd++) {
		if (response[dd].route == 'red') {
			var coordsPos = response[dd].coords;
			var stopsPos = response[dd].stops;
			for(i = 0; i < coordsPos.length; i++) {
				redPoints.push({latitude: coordsPos[i][0], longitude: coordsPos[i][1]});
			}
			for(p = 0; p < stopsPos.length; p++) {
				var mrker = Titanium.Map.createAnnotation({
					latitude:stopsPos[p].location[0],
					longitude:stopsPos[p].location[1],
					title:stopsPos[p].times[0],
					pincolor:Titanium.Map.ANNOTATION_RED,
					subtitle:stopsPos[p].times[1]+', '+stopsPos[p].times[2],
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
