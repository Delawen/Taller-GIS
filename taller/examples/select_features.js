var lon = 0;
var lat = 0;
var zoom = 1;
var map, layer, vlayer, vlayer2;
var button, select1, select2, select3;

function init() {
    map = new OpenLayers.Map( 'map', { controls: [] } );
    layer = new OpenLayers.Layer.WMS( "OpenLayers WMS", 
            "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
    map.addLayer(layer);

    vlayer = new OpenLayers.Layer.Vector( "Vector 1 layer" );
    map.addLayer(vlayer);

    vlayer2 = new OpenLayers.Layer.Vector( "Vector 2 layer" );
    map.addLayer(vlayer2);

    init_features(vlayer,vlayer2);

    select1 = new OpenLayers.Control.SelectFeature(
                    vlayer,
                    {
                        clickout: false, toggle: false,
                        multiple: false, hover: false,
                        toggleKey: "ctrlKey", // ctrl key removes from selection
                        multipleKey: "shiftKey", // shift key adds to selection
                        box: true
                    }
                );

    select2 = new OpenLayers.Control.SelectFeature(
                    vlayer2,
                    {
                        clickout: false, toggle: false,
                        multiple: false, hover: false,
                        toggleKey: "ctrlKey", // ctrl key removes from selection
                        multipleKey: "shiftKey", // shift key adds to selection
                        box: true
                    }
                );

    select3 = new OpenLayers.Control.SelectFeature(
                    [vlayer, vlayer2],
                    {
                        clickout: false, toggle: false,
                        multiple: false, hover: false,
                        toggleKey: "ctrlKey", // ctrl key removes from selection
                        multipleKey: "shiftKey", // shift key adds to selection
                        box: true
                    }
                );

    // parent control must be added to the map
    map.addControls([select1, select2, select3]);

    map.setCenter(new OpenLayers.LonLat(lon, lat), zoom);
}

function init_features(vlayer,vlayer2){
    var features = new Array(50);
    for (var i=0; i<features.length; i++) {
        features[i] = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(
                (360 * Math.random()) - 180, (180 * Math.random()) - 90
            ), {
                type: 5 + parseInt(5 * Math.random())
            }
        );
    }
    vlayer.addFeatures(features);
    var features2 = new Array(50);
    for (var i=0; i<features2.length; i++) {
        features2[i] = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point(
                (360 * Math.random()) - 180, (180 * Math.random()) - 90
            ), {
                type: 5 + parseInt(5 * Math.random())
            }
        );
    }
    vlayer2.addFeatures(features2);
}
