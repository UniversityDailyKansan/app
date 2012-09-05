 else {
					var curr_latitude = '';
					var curr_longitude = '';
					function getCoordsPlease(){
						Titanium.Geolocation.getCurrentPosition(function(e){
							curr_latitude = e.coords.latitude; //Standrad HTML5 getting location practice
							curr_longitude = e.coords.longitude;
						});
					}
					getCoordsPlease();
 					var directions_data = [];
 					var wd = Ti.Network.createHTTPClient();
 					wd.timeout = 1000000;
 					wd.open("GET", "http://maps.googleapis.com/maps/api/directions/json?origin="+curr_latitude+","+curr_longitude+"&destination="+evt.annotation.latitude+","+evt.annotation.longitude+"&sensor=false&mode=walking");
 					wd.onload = function() {
 						try {
 							var wdirections = JSON.parse(this.responseText);			 
 							for (var kk = 0; kk < wdirections.length; kk++){
 								var distance = wdirections[kk].routes[0].legs.steps.distance.text;
 								var duration = wdirections[kk].routes[0].legs.steps.duration.text;
 								var instructions = wdirections[kk].routes[0].legs.steps.html_instructions;
 								var directions_row = Ti.UI.createTableViewRow({hasChild:false,id:k});
								
								var distance_label = Ti.UI.createView({
									text:distance,
									left:10,
									top:10,
								});
								var duration_label = Ti.UI.createView({
									text:duration,
									right:10,
									top:10,
								});
								var instructions_label = Ti.UI.createView({
									text:instructions,
									textAlign:center,
									top:10,
								});
								directions.push(directions_row);
 							}
 							var directions_tv = Titanium.UI.createTableView({
								data:directions_tv,
								minRowHeight:58,
								left:0,
								right:0
							});
							var directions_window = Ti.UI.createWindow({
								title:'Walking Directions'
							});
							directions_window.add(directions_tv);
							var directions_b = Titanium.UI.createButton({
								title:'Close',
								style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
							});
							directions_window.setLeftNavButton(directions_b);
							directions_b.addEventListener('click',function() {
								directions_window.close();
							});
							directions_window.open({modal:true});
 						}
 						catch(E){
							alert(E);
						}
 					}
					wd.send();
 				}