/*jshint -W117 */
/*jshint -W083 */

/*debugging vars*/
var label;

define([
    'src/WorldWind',

], function(
    WorldWind) {

    var DataCreator = function(globe) {

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_ERROR);
        this.wwd = new WorldWind.WorldWindow(globe);
        this.wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer());
        this.wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(this.wwd));
        this.wwd.addLayer(new WorldWind.ViewControlsLayer(this.wwd));
        this.handle();

            // Enable sub-surface rendering for the World Window.
            //this.wwd.subsurfaceMode = true;
            // Enable deep picking in order to detect the sub-surface shapes.
        this.wwd.deepPicking = true;
        // Set up to refresh the imagery periodically.



    };
        var imgsample = "asd";



    DataCreator.prototype.shapes = function(){
            for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        // Create a layer to hold the surface shapes.
        var shapesLayer = new WorldWind.RenderableLayer("Surface Shapes");
        wwd.addLayer(shapesLayer);

        // Create a simple surface polygon, a triangle.
        var boundary = [];
        boundary.push(new WorldWind.Location(40, -100));
        boundary.push(new WorldWind.Location(45, -110));
        boundary.push(new WorldWind.Location(40, -120));

        // Create and set attributes for it. The shapes below except the surface polyline use this same attributes
        // object. Real apps typically create new attributes objects for each shape unless they know the attributes
        // can be shared among shapes.
        var attributes = new WorldWind.ShapeAttributes(null);
        attributes.outlineColor = WorldWind.Color.BLUE;
        attributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);

        var highlightAttributes = new WorldWind.ShapeAttributes(attributes);
        highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 1);

        var shape = new WorldWind.SurfacePolygon(boundary, attributes);
        shape.highlightAttributes = highlightAttributes;
        shapesLayer.addRenderable(shape);
    }


    DataCreator.prototype.create = function(options) {
        var val = options.number;
        var q = "";

        if (options.keyword) {
            q = "&$q=" + options.keyword;
        }

        var self = this;
        var coords = {};
        var url;
        switch (options.type) {
            // health
            case 0:
                url = "json_files/District1/District1_Health.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;
          
            case 1:
                url = "json_files/District2/District2_Health.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
               
                break;
           
            case 2:
                url = "json_files/District3/District3_Health.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;

            case 3:
                url = "json_files/District4/District4_Health.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;

            case 4:
                url = "json_files/District5/District5_Health.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;

            case 5:
                url = "json_files/District6/District6_Health.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;
                // HEALTH END
                // EDUCATION
            case 6:
                url = "json_files/District1/District1_Educ.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;
          
            case 7:
                url = "json_files/District2/District2_Educ.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
               
                break;
           
            case 8:
                url = "json_files/District3/District3_Educ.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;

            case 9:
                url = "json_files/District4/District4_Educ.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;

            case 10:
                url = "json_files/District5/District5_Educ.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;

            case 11:
                url = "json_files/District6/District6_Educ.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;
                // EDUCATION END
                // LIVELIHOOD
            case 12:
                url = "json_files/District1/District1_Liv.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;
          
            case 13:
                url = "json_files/District2/District2_Liv.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
               
                break;
           
            case 14:
                url = "json_files/District3/District3_Liv.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;

            case 15:
                url = "json_files/District4/District4_Liv.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;

            case 16:
                url = "json_files/District5/District5_Liv.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;

            case 17:
                url = "json_files/District6/District6_Liv.json?$where=((lat>0)AND(lng>0))&$limit=" + val + q;
                
                break;
        }

        if (this.layer) {
            this.wwd.removeLayer(this.layer);
        }

        $.ajax({
            url: url
        }).done(function(res) {
            if (res.length < 1) {

                $("#alert").css("visibility", "visible");
                $("#alert").css("opacity", 1);
                return;
            }

            for (var x in res) {
                switch (options.type) {
                    case 0:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 1:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)]
                        break;
                    case 2:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 3:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 4:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 5:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 6:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 7:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 8:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 9:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 10:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)]
                        break;
                    case 11:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 12:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 13:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 14:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 15:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 16:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                    case 17:
                        res[x].coordinates = [Number(res[x].location.longitude), Number(res[x].location.latitude)];
                        break;
                }

            }
            res = GeoJSON.parse(res, {
                Point: 'coordinates'
            });
            res = JSON.stringify(res);
            self.layer = self.import(res, self.type);
        });
    };


    DataCreator.prototype.import = function(data, type) {
        var self = this;
        var layer = new WorldWind.RenderableLayer("layer");
        var polygonGeoJSON = new WorldWind.GeoJSONParser(data);
        polygonGeoJSON.load(this.shapeConfigurationCallback, layer, function() {
            self.start(layer);
        }, 1);
        this.wwd.addLayer(layer);
        this.layer=layer;
        return layer;
    };


    DataCreator.prototype.start = function(layer) {
        _self = this;

        var lat, lng;

        lng = layer.renderables[0].position.longitude;
        lat = layer.renderables[0].position.latitude;

        var anim = new WorldWind.GoToAnimator(this.wwd);
        //tilt quezon city
            this.wwd.navigator.lookAtLocation.latitude = 14.676208;
            this.wwd.navigator.lookAtLocation.longitude = 121.043861;
            this.wwd.navigator.range = 6400;
            this.wwd.navigator.heading = 360;
            this.wwd.navigator.tilt = 65;
            //
        this.wwd.redraw();

        anim.goTo(new WorldWind.Position(lat, lng, 30000), function() {});

    };

    DataCreator.prototype.handle = function() {
        var self = this;
        var highlightedItems = [];

        var handleMove = function(o) {
            var x = o.clientX,
                y = o.clientY;
            var redrawRequired = highlightedItems.length > 0; 

            for (var h = 0; h < highlightedItems.length; h++) {
                highlightedItems[h].highlighted = false;
            }
            highlightedItems = [];

            var pickList = self.wwd.pick(self.wwd.canvasCoordinates(x, y));
            if (pickList.objects.length > 0) {
                redrawRequired = true;
            }

            if (pickList.objects.length > 0) {
                for (var p = 0; p < pickList.objects.length; p++) {
                    if (!pickList.objects[p].isTerrain) {
                        pickList.objects[p].userObject.highlighted = true;
                        highlightedItems.push(pickList.objects[p].userObject);
                    }
                }
            }

            if (redrawRequired) {
                self.wwd.redraw();
            }
        };
        self.wwd.addEventListener("mousemove", handleMove);

        var handlePick = function(o) {

            var x = o.clientX,
                y = o.clientY;

            var pickList = self.wwd.pick(self.wwd.canvasCoordinates(x, y));
            if (pickList.objects.length > 0) {
                for (var p = 0; p < pickList.objects.length; p++) {
                    if (!pickList.objects[p].isTerrain) {

                        self.fillBox(pickList.objects[p].userObject.attributes.properties);
                    }
                }
            }

        };
        self.wwd.addEventListener("click", handlePick);

    };

    DataCreator.prototype.fillBox = function(data) {
        $("#infoPoint").show();
        var myString = "";
        for (var x in data) {
            if (typeof(data[x]) == "string") {
                myString += "<b>" + x + "</b>: " + data[x] + "<br>";
            }
        }
        $("#textInfo").html(myString);
    };

    DataCreator.prototype.refreshLayer = function(){
        $("refreshLayer").click(function(){
        // if (this.layer) {
            wwd.redraw();
        // }
        });
    };


    DataCreator.prototype.shapeConfigurationCallback = function(geometry, properties) {
        var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        placemarkAttributes.imageScale = 0.5;
        placemarkAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 1.0,
            WorldWind.OFFSET_FRACTION, 0.0);

        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 0.90);

        placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes.drawLeaderLine = true;
        placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        placemarkAttributes.imageSource = "./thirdparty/images/red-dot2.png";


        var highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        highlightAttributes.imageScale = 0.7;


        var configuration = {};

        configuration.attributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        configuration.highlightAttributes = highlightAttributes;
        configuration.name = properties[label];

        configuration.attributes.properties = properties;

        return configuration;
    };


    return DataCreator;
});
