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
	text: 'Test',
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
    var panel = new OpenLayers.Control.Panel({
        defaultControl: button,
        createControlMarkup: function(control) {
            var button = document.createElement('button'),
                iconSpan = document.createElement('span'),
                textSpan = document.createElement('span');
            iconSpan.innerHTML = '&nbsp;';
            button.appendChild(iconSpan);
            if (control.text) {
                textSpan.innerHTML = control.text;
            }
            button.appendChild(textSpan);
            return button;
        }
    });
    panel.addControls([
        button
    ]);
    map.addControl(panel);

    map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
}
