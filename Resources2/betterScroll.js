/**
 * @author Shannon Hicks
 */

var betterScroll = function(scrollName){
	
var scrollLabel = Titanium.UI.createLabel({
	text:scrollName.charAt(0).toUpperCase() + scrollName.slice(1),
	left: 10,
	height:30,
	color:'#f9f9f9',
	font:{
		fontSize:22,
		fontFamily:dom,
	},
	width:'auto',
	verticalAlign:'center',
	textAlign:'center',
	shadowColor:'#000000',
	shadowOffset:{x:1, y:-1},
	top:10
});
return scrollLabel;
};

module.exports = betterScroll;