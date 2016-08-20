export class Globe {
    activate() {
        (<any> window).require([
            "dojo/ready",
            "esri/Color",
            "dojo/_base/array",
            "esri/arcgis/utils",
            "esri/config",
            "esri/graphicsUtils",
            "esri/symbols/SimpleFillSymbol",
            "esri/graphic",
            "esri/geometry/geometryEngine"
        ], function (
            ready,
            Color,
            array,
            arcgisUtils,
            config,
            graphicsUtils,
            SimpleFillSymbol,
            Graphic,
            geometryEngine
        ) {
                ready(function () {
                    //config.defaults.io.proxyUrl = "/proxy/";
                    //csv file from a webserver (usgs.gov), basemap, rederer, custom popup are conatined in this simple webmap.
                    var webmapId = "c5db002dffec4bf0a16a5ed7223f9a2c";


                    arcgisUtils.createMap(webmapId, "map", {
                        mapOptions: { slider: false }
                    }).then(function (response) {
                        var map = response.map;

                        //when the map is ready geodesically buffer all features 
                        bufferEarthquakes(map);

                    });

                    function bufferEarthquakes(map) {
                        //Pull first layer from the webmap and use it as input for the buffer operation
                        //Use GeometryEngine geodesicBuffer  
                        //buffers will have correct distance no matter what the spatial reference of the map is.

                        var featureLayer = map.getLayer(map.graphicsLayerIds[0]);
                        var geometries = graphicsUtils.getGeometries(featureLayer.graphics);

                        //geodesicBuffer(geometries, [distance], unit <see sdk for example codes--9036==km>, unionResults);
                        var bufferedGeometries = geometryEngine.geodesicBuffer(geometries, [2000], 9036, true);

                        //when buffer is done set up renderer and add each geometry to the map's graphics layer as a graphic
                        var symbol = new SimpleFillSymbol();
                        symbol.setColor(new Color([100, 100, 100, 0.25]));
                        symbol.setOutline(null);
                        array.forEach(bufferedGeometries, function (geometry) {
                            map.graphics.add(new Graphic(geometry, symbol));
                        });
                    }
                });
            });
    }
}
