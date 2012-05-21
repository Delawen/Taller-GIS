var lon = 5;
var lat = 40;
var zoom = 5;
var map, layer;
var button;

function init() {
    map = new OpenLayers.Map( 'map', { controls: [] } );
    layer = new OpenLayers.Layer.WMS( "OpenLayers WMS", 
            "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
    map.addLayer(layer);

    vlayer = new OpenLayers.Layer.Vector( "Editable" );
    map.addLayer(vlayer);
    
    button = new OpenLayers.Control();
    OpenLayers.Util.extend(button, {
        type: 'button',
	activate: function(){
		alert ('Active!!\nThe map has ' +map.zoom + ' zoom level');
		map.setCenter(new OpenLayers.LonLat(lon, lat), map.zoom + 1);
	},
	deactivate: function(){
		alert('Do the zoom to '+zoom+ ' level!');
		map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
	}
    });

    // parent control must be added to the map
    map.addControl(button);

    map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
}
