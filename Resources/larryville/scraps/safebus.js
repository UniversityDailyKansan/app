
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
var results, route, coords; 
var preParseData = (file.read().text); 
var response = JSON.parse(preParseData).results; 
var points = [];

	for(dd = 0; dd < response.length; dd++) {
		if (response[dd].route == 'red') {
			var coordsPos = response[dd].coords;
			for(i = 0; i < coordsPos.length; i++) {
				points.push({latitude: coordsPos[i][0], longitude: coordsPos[i][1]});
			}
		}
	}
        
         
        var route = {
                name:"boston",
                points:points,
                color:"red",
                width:4
            };
 
        // add a route
        mapview.addRoute(route);

win.add(mapview);
