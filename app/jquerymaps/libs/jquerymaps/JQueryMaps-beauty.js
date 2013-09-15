// jQueryMaps - http://www.jquerymaps.com - Version 001.005.0040 - Copyright 2013 Flashmaps Geospatial (2013-08-24 11:47:54)

// The JQueryMaps Class

function JQueryMaps() {

    //  - JQueryMaps.Struct:	Classes for feeding the map from your JavaScript code instead of from XML feeds.
    //  - JQueryMaps.Map:		The map itself.
    //	- JQueryMaps.Misc:		Miscelaneous methods.	

    // Classes for feeding the map from your JavaScript code instead of from XML feeds.
    JQueryMaps.Struct = function() {

        // Feature or marker action
        JQueryMaps.Struct.Action = function() {
            this.event; // Event when the the action is triggered: onMouseOut, onMouseOver, onClick, onDoubleClick, onRightClick
            this.target; // Target of the action: 
            //   infoWindow: display a info window
            //   js: call a JavaScript function
            //   _blank, _self, _parent: open the URL on a new browser tab, on the current one or on the parent browser window
            //   categoryChange: change feature or marker category
            //   featuresUnhighlight: unhighlight all the highlighted features and markers
            //   featureHighlight: highlight this feature/marker
            //   loadChild: load a child theme
            this.url; // URL to load
            this.align; // If target is 'infoWindow', place it:
            //   mouse,x,y: at x,y pixels of the mouse position
            //   center,x,y; top-left,x,y; top,x,y; top-right,x,y; bottom-left,x,y; bottom,x,y; bottom-right,x,y; left,x,y; right,x,y
            this.newCategory; // If target is 'categoryChange', new category to assign
            this.jsFunction; // If target is 'js' or 'infoWindow', the JavaScript function to call. The full feature/marker is sent as a parameter.
            this.infoWindowDiv; // If target is 'infoWindow', div to display instead of loading a URL
        };

        // Animate an icon along a polyline
        JQueryMaps.Struct.Animation = function() {
            this.markerCategory; // Category for the marker to display
            this.shapeToFollow; // Shape to display the marker along (instance of Struct.Shape)
            this.interval; // Animation interval in seconds
            this.speed; // Animation speed (pixels per second)
        };

        // General configuration
        JQueryMaps.Struct.Config = function() {
            this.version; // System's version
            this.license; // License ID
            this.authorizationFile; // File with the authorization codes
            this.transparentImageUrl; // Transparent image's URL for the background of the map areas
            this.zoomFeatureFrames; // Frames for the animation when zooming on a feature 
            this.zoomFeatureMargin; // Margin when zooming on a feature (0.5 keeps half the width/height of the feature as the margin)
            this.zoomFeatureMinScale; // Minimum scale when zooming on a feature (1000000 doesn't zoom inner than 1:1000000)
            this.zoomButtonFrames; // Frames for the animation when zooming in/out by pressing the toolbar zoom buttons
            this.zoomButtonsFactor; // Zoom in/out factor when pressing the toolbar zoom buttons
            this.zoomMouseWheelFrames; // Frames for the animation when zooming in/out by rolling the mouse wheel
            this.zoomMouseWheelFactor; // Zoom in/out factor when rolling the mouse wheel
            this.previousLevelOpacity; // Opacity of the previous level when entering a child one (1: full opacity; 0: hide previouslevel)
            this.allowCaching; // Allow caching the XML feeds (set to true only if feeds never change)
            this.loadingInfoDiv; // div for displaying the loading info
            this.loadingSpinnerUrl; // Loading spinner's URL
            this.selectByRectangleFillColor; // When selecting by rectangle, the rectangle's CSS3 color (recommended not too opaque)
            this.fromMapJsFunction; // The JavaScript function to call on map events
            this.geolocationIconUrl; // Icon URL to show current device location
            this.geolocationInterval; // Interval to check the device geolocation in seconds
            this.coordinatesFormat; // Coordinates display format: ggmmss; gg.gggg; ggmm.mm
            this.markersRenderDestination; // Where to render markers: dom (default) or canvas
            this.outsideRendering; // Render outside of the viewport. 0: nothing; 1: one time width/height on each side
            this.toolbar; // Buttons to display on the toolbar and other toolbar-related parameters (instance of Struct.Toolbar) 
            this.functionality; // Enable/disable certain functionalities (instance of Struct.Functionality)
            this.platformDisplay; // Display mode depending on the platform (instance of Struct.PlatformDisplay)
            this.filters; // Graphic filters array (array of Struct.Filter instances)
            this.textStyles; // Text styles array (array of Struct.TextStyle instances)
            this.featureStyles; // Feature styles array (array of Struct.FeatureStyle instances)
            this.markerStyles; // Marker styles array (array of Struct.Marker instances)
            this.actions; // Actions array (array of Struct.Action instances)
        };

        // Feature (a geospatial object, like a )
        JQueryMaps.Struct.Feature = function() {
            this.id; // Feature ID
            this.category; // Feature's category ID
            this.label; // Feature label
            this.letteredLabel; // Printed label (LetteredLabel instance)
            this.styles; // Array of styles (array of jqmFeatureStyle instances)
            this.actions; // Array of actions (array of jqmAction instances)
        };

        // Feature category
        JQueryMaps.Struct.FeatureCategory = function() {
            this.id; // Features category's ID
            this.enabled; // onMouseOver, onMouseOut, onClick, onRightClick, and onDoubleClick events will be triggered
            this.zoom; // The map will zoom over the feature when clicked
            this.letteredLabel; // Printed label (LetteredLabel instance)
            this.featureStyles; // Array of styles (array of jqmFeatureStyle instances)
            this.actions; // Array of actions (array of jqmAction instances)
        };

        // Feature style
        JQueryMaps.Struct.FeatureStyle = function() {
            this.event; // Event for the style: onMouseOut (regular status), onMouseOver, onHighlighted
            this.fillColor; // Fill color
            this.strokeColor; // Polygon border or line color
            this.strokeWidth; // Polygon border or line width
            this.iconUrl; // Box-type feature icon URL
            this.width; // Box-type feature width
            this.height; // Box-type feature height
            this.visible; // Feature's visibility
        };

        // Graphic filter
        JQueryMaps.Struct.Filter = function() {
            this.id; // Filter ID, to be referenced from textStyle.filterId
            this.type; // Filter type: shadow, glow
            this.offsetX; // X offset
            this.offsetY; // Y offset
            this.blur; // Blur width
            this.fillColor // Filter color
        };

        // Functionalities configuration
        JQueryMaps.Struct.Functionality = function() {
            this.zoomInOutWheel; // Enable mouse wheel for zooming in/out
            this.pan; // Enable pan
        }

        // Feature category's Gradient
        JQueryMaps.Struct.Gradient = function() {
            this.inherit; // (Boolean) Inherit gradient from previous level
            this.fillColorLowest; // Color for the lowest value
            this.fillColorHighest; // Color for the highest value
            this.dataAttribute; // Property name that contains the values for the gradient
            this.header; // Legend's header
            this.subHeader; // Legend's subheader
            this.ranges; // (Number) Number of ranges
            this.autoRangeValues; // (Boolean) The range boundaries values will be calculated by the system
            this.rangeValues; // If autoRangeValues is false, the range boundaries. For example, for 5 ranges: '2,4,6,8' (<2, 2-4, 4-6, 6-8. >8) 
            this.rangeTextPrefix; // Text's prefix in the legend for each range
            this.rangeTextSufix; // Text's sufix in the legend for each range
        };

        // Lettered label configuration
        JQueryMaps.Struct.LetteredLabel = function() {
            this.attributeName; // The attribute name to display
            this.textStyle; // The text style to use (instace of Struct.TextStyle)
        };

        // Marker (a point landmark represented by an icon)
        JQueryMaps.Struct.Marker = function() {
            this.id; // Marker ID
            this.category; // Marker's category ID
            this.label; // Marker label
            this.lat; // Latitude in decimal degrees (E.g.: -23.26524)
            this.lon; // Longitude in decimal degrees (E.g.: -124.24459)
            this.x; // X in model pixels (E.g.: 1234.25)
            this.y; // Y in model pixels (E.g.: 1191.33)
            this.iconUrl; // Icon URL
            this.orientation; // Orientation angle (degrees)
            this.letteredLabel; // Printed label (LetteredLabel instance)
            this.styles; // Array of styles (array of jqmMarkerStyle instances)
            this.actions; // Array of actions (array of jqmAction instances)
        };

        // Marker category
        JQueryMaps.Struct.MarkerCategory = function() {
            this.id; // Markers category's ID
            this.enabled; // onMouseOver, onMouseOut onClick, onRightClick, and onDoubleClick events will be triggered
            this.iconUrl; // Icon URL (Deprecated, should be placed in the regular markerStyle)
            this.letteredLabel; // Printed label (LetteredLabel instance)
            this.markerStyles; // Array of styles (array of jqmMarkerStyle instances)
            this.actions; // Array of actions (array of jqmAction instances)
        };

        // Marker style
        JQueryMaps.Struct.MarkerStyle = function() {
            this.event; // Event for the style: onMouseOut (regular status), onMouseOver, onHighlighted
            this.iconUrl; // Icon URL
            this.scale; // Icon scale: 1: original size; 0.5: half size; 2: double size
            this.opacity; // Icon opacity: 1: opaque; 0: transparent; 0.5 translucid
            this.visible; // Marker's visibility
        };

        // Pixel Info
        JQueryMaps.Struct.PixelInfo = function() {
            this.div; // Div to show canvas pixel info on mouse move
            this.jsFunction; // JavaScript function to call with the canvas pixel info on mouse move
            this.align; // mouse,x,y: at x,y pixels of the mouse position; center,x,y; top-left,x,y; top,x,y; top-right,x,y; bottom-left,x,y; 
            // bottom,x,y; bottom-right,x,y; left,x,y; right,x,y
        };

        // Display mode depending on the platform
        JQueryMaps.Struct.PlatformDisplay = function() {
            this.id; // Platform ID
            this.displayMode; // Display mode: regular, fullScreen, fullScreenOnClick, viewport, viewportOnClick
            this.align; // If target is 'viewport' or 'viewportOnClick': center,x,y; top-left,x,y; top,x,y; top-right,x,y; bottom-left,x,y; bottom,x,y; 
            // bottom-right,x,y; left,x,y; right,x,y
            this.darkColor; // If target is 'viewport' or 'viewportOnClick', the CSS3 color (including alpha, normally) to darken the rest of the page 
        };

        // Functionalities depending on the platform
        JQueryMaps.Struct.PlatformFunctionality = function() {
            this.id; // Platform ID
            this.calculatedMapAreas; // Caculate map areas programatically, instead of using HTML <map> and <area> tags
            this.onMouseOverCalculateInterval; // If calculatedMapAreas, interval for checking which feature or marker is the mouse hovering over
            this.displayRegularFeatures; // Draw regular-status features on the canvas
            this.displayBgImages; // Keep the background image after displaying the features
        };

        // Positioned images mosaic
        JQueryMaps.Struct.PositionedImagesMosaic = function() {
            this.imagesUrl; // Images URL sufix (row and column need to be added
            this.focusOnImages; // After loading the images, focus on the mosaic
            this.rows; // Mosaic number of rows
            this.columns; // Mosaic number of columns
            this.extension; // Mosaic files' extension
            this.nwPixel; // Pixel of the northwest point
            this.nwGeo; // Lattitude and longitude of the northwest point
            this.sePixel; // Pixel of the southeast point
            this.seGeo; // Lattitude and longitude of the southeast point
            this.alpha; // Images opacity (0=transparent; 1=opaque)
            this.maxPixels; // Maximum width or height for each mosaic tile
        };

        // Feature's shape (the geometrical shape of the feature)
        JQueryMaps.Struct.Shape = function() {
            this.id; // Shape ID
            this.parts; // Array of parts
        };

        // Feature shape's part (a shape can have several parts, making one shape)
        JQueryMaps.Struct.ShapePart = function() {
            this.type; // Part type: polygon, polyline, curve, text, circle
            this.coords; // Comma-delimited coordinates in model pixels
            this.geoCoords; // Comma-delimited geográfical coordinates (lon,lat)
            this.height; // If type is curve, the height of the Bezier control point relative to the chord, 0.5: half that distance
            this.balance; // If type is curve, the position of the Bezier control point on the chord normal. 0: origin; 0.5: in the middle; 1: destination
            this.label; // If type is text, the label to display.
            this.align; // If type is text, alignment: center (default), top-left, top, top-right, bottom-left, bottom, bottom-right, left, right
            this.orientation; // If type is text, the orientation angle in degrees. By default, 0.
            this.fontSize; // If type is text, the orientation angle in model units. If not set, the textStyle's is used.
            this.maxWidth; // If type is text, the maximum width for multiline texts.
            this.textStyle; // If type is text, the text style's ID defined in the general configuration.
            this.radius; // If type is circle, the radius expressed in miles.
        };

        // 	Sign style
        JQueryMaps.Struct.SignStyle = function() {
            this.height; // Sign height
            this.iconUrlPattern; // Icon URL pattern: pattern itself, minimum and maximum text lengths (for example, "../images/icons/u_*.png,2,4")
            this.textStyle; // Text style ID
            this.width; // Sign width
        };

        // Feature or marker style
        // Deprecated. jqmFeatureStyle and jqmMarkerStyle should be used
        JQueryMaps.Struct.Style = function() {
            this.event; // Event for the style: onMouseOut (regular status), onMouseOver, onHighlighted
            this.fillColor; // Fill color
            this.strokeColor; // Polygon border or line color
            this.strokeWidth; // Polygon border or line width
            this.iconUrl; // Marker or box-type feature icon URL
            this.width; // Box-type feature width
            this.height; // Box-type feature height
        };

        // 	Text style
        JQueryMaps.Struct.TextStyle = function() {
            this.id; // Text style ID
            this.filterId; // Filter ID (reference to an instance of Struct.Filter)
            this.fontName; // Font name
            this.fontSize; // Font size
            this.fontBold; // Font is bold
            this.fontItalic; // Font is italic
            this.align; // Alignment: center (default), top-left, top, top-right, bottom-left, bottom, bottom-right, left, right
            this.fillColor; // Fill color
            this.strokeColor; // Polygon border or line color
            this.strokeWidth; // Polygon border or line width
            this.offsetX; // X displacement
            this.offsetY; // Y displacement
        };

        // Theme
        JQueryMaps.Struct.Theme = function() {
            this.id; // Theme's ID
            this.bgImageUrl; // Background image's URL
            this.bgImageLowResUrl; // Low resolution background image's URL
            this.fgImageUrl; // Foreground image's URL
            this.mapSize; // Map size
            this.letteredLabel; // Printed label (LetteredLabel instance)
            this.focusOnFeatureCategories; // After loaded, focus on the shapes
            this.maxInitialScaleFactor; // Maximum scale for the initial view
            this.minScaleFactor; // Minimum scale allowed
            this.styles; // Array of styles (array of jqmStyle instances)
            this.actions; // Array of actions (array of jqmAction instances)
            this.featureCategories; // Array of feature categories (array of jqmFeaturesCategory instances)
            this.features; // Array of features (array of jqmFeature instances)
            this.shapes; // Array of shapes (array of jqmShape instances)
            this.markerCategories; // Array of marker categories (array of jqmMarkersCategory instances)
            this.markers; // Array of markers (array of jqmMarker instances)
            this.limitPan; // Limit pan to the actual theme size
            this.limitZoomOut; // Limit zoom out to the actual theme size
            this.firstTapBehavior; // Set tap behavior for touchables: click, mouseover (second tap on the same feature is the click)
            this.avoidLetteredLabelIntersections; // Avoid intersections between lettered labels
        };

        // Toolbar configuration
        JQueryMaps.Struct.Toolbar = function() {
            this.align; // Toolbar alignment: top-left (default), top, top-right, bottom-left, bottom, bottom-right, left, right
            this.orientation; // Toolbar orientation: vertical, horizontal 
            this.verticalMargin; // Vertical margin
            this.horizontalMargin; // Horizontal margin
            this.buttonsPath; // Button images' path
            this.buttonsExtension; // Button images' extension: png, gif
            this.showCloseButton; // Show 'Close' button
            this.showBackButton; // Show 'Back' button
            this.showZoomButtons; // Show 'Zoom In/Out' buttons
            this.showInitialViewButton; // Show 'Initial View' button (not implemented)
            this.showFullScreenButton; // Show 'Full Screen' button (not implemented)
            this.showSelectByRectangleModeButton; // Show 'Select byRectangle' button
            this.showPrintButton; // Show 'Print' button
            this.showHelpButton; // Show 'Help' button (not implemented)
        };

    };

    JQueryMaps.Map = function(cbjaf) {
        var ccbed = this;
        var cbcaa = false;
        var cbbcb = false;
        var cbbji = true; // debug flag
        var cccdj = false;
        var cbbgf = (new Date()).getTime();
        var cbfej;
        var cbjae = cbjaf;
        var ccdcj;
        var cccja;
        var cbfdj;
        var cccjd;
        var cbgjc;
        var cbieh;
        var cbifd;
        var cbief;
        var ccaae;
        var ccaah;
        var ccaba = new Object();
        var cbhid = new Object();
        var cbcff = -1;
        var cbcfg = -1;
        var ccdde;
        var cbcji = new Object();
        var cbcjj = new Object();
        var cbbhg = new Object();
        var cbgbc = 0;
        var cbbdj = new Object();
        var cbfia = new Array();
        var cbgdh;
        var cbgda = new Array();
        var cbdie = new Object();
        var cccih;
        var ccchg;
        var ccbbc = Object();
        ccbbc.cbhfe;
        ccbbc.shapesDrawingNextKey;
        ccbbc.cbhdi;
        ccbbc.cbhdj;
        ccbbc.ccacf = new Array();
        ccbbc.cbacg;
        var cbegg = -1;
        var cbdhj = false;
        var ccdda;
        var cbfic;
        var cbjjg;
        var cbhhf = 'regular';
        var ccbeb = new Object();
        var cbfdf = new Object();
        var cbhdd = false;
        var cbghf;
        var cbghg;
        var cbhda;
        var cbebj;
        var cbecb;
        var cbeca;
        var cbgch;
        var ccdbe = window.G_vmlCanvasManager;
        var cbbce = new Array();
        var cbcci = new Object();
        var cbfid = new Object();
        var cbfif = -1;
        var cbebf = new Object();
        var cbcje = new cbcjf();
        var cbfga = true;
        var cbfha = false;
        var cbfff = true;
        var cbahg = new Object();
        cbahg.cccic;
        cbahg.cbidb;
        cbahg.cbaag = false;
        cbahg.ccdde = new Object();
        cbahg.cbchf = true;
        cbahg.cbfjd;
        var cbgfj = cbegd('jqmlog');
        var cbgfg;
        var ccbej = (new Date()).getTime();
        var ccdbf = new Object();
        ccdbf.cbijh = new Object();
        ccdbf.cbadd = new cbade();
        ccdbf.cbadd.cbaeb = true;
        ccdbf.cbbbj = undefined;
        ccdbf.cbdih = undefined;;
        ccdbf.cbdjj = false;
        ccdbf.cbiga;
        ccdbf.cbfjb;
        ccdbf.cbdfb = true;
        ccdbf.cbddi = true;
        ccdbf.cbaad = true;
        ccdbf.cbdif;
        ccdbf.cbaee;
        ccdbf.ccbcg;
        ccdbf.cccid;
        ccdbf.ccahb;
        ccdbf.cbfja;
        ccdbf.ccdef;
        ccdbf.cbdfc;
        ccdbf.cbdhf;
        ccdbf.cbfii;
        ccdbf.cbabb = new Array();
        ccdbf.ccabf = new Object();
        if (cbjaf) {
            cbfej = jqmInstances.length;
            jqmInstances.push(new Object());
            jqmInstances[cbfej].obj = this;
            ccdbf.cbiga = document['body']['style']['overflow'];
            ccdcj = $('#' + cbjae.mapDivId);
            ccdbf.cbeji = cbbbf(ccdcj[0], "RequestFullScreen");
            if (ccdbf.cbeji) $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', fullScreenChanged);
            cbebf.cbidi = false;
            cbebf.cbcjc = "You need to configure attribute 'geolocationIconUrl' inside 'jqm_config' tag.";
            cbjjg = JQueryMaps.Misc.getPlatformCapabilities();
            if (cbjae['config']) ccbfb(cbjae['config'], cbjae['mainPath']);
            else cbgcg(cbjae['configUrl']);
        } else {}

        function ccbhb(cbjaf) {
            ccdcj.empty();
            if (cbjaf.width) ccdcj.width(cbjaf.width);
            if (cbjaf.height) ccdcj.height(cbjaf.height);
            ccdcj.css('overflow', 'hidden');
            ccdai();
        }

        function ccdai() {
            if (ccdcj.width() != 0 && ccdcj.height() != 0) ccdda = {
                width: ccdcj.width(),
                height: ccdcj.height()
            };
        }

        function ccajf(cbbag) {
            if (!cbdhj && !cbbag) return;
            var cbhjh = cbeee();
            if (!cbcci.cbbii || !cbcci.cbbhe || cbcci.cbbii != cbhjh.width || cbcci.cbbhe != cbhjh.height) {
                if (ccdcj.css("display") != "none") document['body']['style']['overflow'] = 'hidden';
                else document['body']['style']['overflow'] = ccdbf.cbiga;
                ccdcj.parents().andSelf()["filter"]('div').each(function() {
                    if (this.tagName == "DIV") {
                        this["style"]["position"] = "absolute";
                        this["style"]["width"] = cbhjh.width + "px";
                        this["style"]["height"] = cbhjh.height + "px";
                        if (this.cbfbh != ccdcj[0].cbfbh) {
                            this["style"].left = "0px";
                            this["style"].top = "0px";
                        }
                    }
                });
                cbcci.cbbii = cbhjh.width;
                cbcci.cbbhe = cbhjh.height;
                ccdai();
                if (cbfid.cbhga) cbdja(cbfid, 1);
                ccajc('windowResized', {
                    "newSize": {
                        "width": cbeee.width,
                        "height": cbeee.height
                    }
                });
            }
        }

        function cbeee() {
            var cbiab, cbhji;
            if (window.innerWidth) cbiab = Math['min'](window.innerWidth, $(window).width());
            else cbiab = $(window).width(); if (window.innerHeight) cbhji = Math['min'](window.innerHeight, $(window).height());
            else cbhji = $(window).height();
            return {
                width: cbiab,
                height: cbhji
            };
        }

        function ccaie(cbgih, cbgjh) {
            var cbceb = ccdcj.parents().andSelf()["filter"]('div')[ccdcj.parents().andSelf()["filter"]('div').length - 1];
            cbceb["style"]['left'] = cbgih + "px";
            cbceb["style"]['top'] = cbgjh + "px";
        }

        function ccbgi() {
            ccdcj[0].ontouchstart = function(cbche) {
                var ccaag = cbifg(cbche);
                if (!ccaae || ccaag.cccjj.length > ccaae.cccjj.length) {
                    ccaae = ccaag;
                    ccaah = cbiff(cbche);
                    cbhdd = false;
                }
                ccdbf.cbfjb = {
                    left: ccaah.cccjj[0].ccdff,
                    top: ccaah.cccjj[0].ccdfi
                };
                ccdbf.ccdaa = false;
            };
            ccdcj[0].ontouchmove = function(cbche) {
                var cbbig = (new Date()).getTime();
                if (ccdbf.cbfje && cbbig < ccdbf.cbfje + 100) return;
                ccdbf.cbfje = cbbig;
                var preventDefault = cbbdj.cbeac.cbijg || cbbdj.cbeac.ccdhb;
                ccaah = cbiff(cbche);
                if (!ccaah || !ccaae || ccaah.cccjj.length < ccaae.cccjj.length) {
                    ccaae = cbifg(cbche);
                    return;
                }
                if (ccaah.cccjj.length == 1 && ccaae.cccjj.length == 1 && cbbdj.cbeac.cbijg) {
                    if (!cbhdd) {
                        if (cbfgd()) {
                            cbhda.hide();
                            cbhdd = true;
                            ccdbf.ccdaa = true;
                        }
                    }
                    var cbiaa = {
                        left: ccaae.cbgij.left + ccaah.cccjj[0].ccdff - ccaae.cccjj[0].ccdff,
                        top: ccaae.cbgij.top + ccaah.cccjj[0].ccdfi - ccaae.cccjj[0].ccdfi
                    };
                    var cbhih = (Math.abs(ccaah.cccjj[0].ccdff - ccaae.cccjj[0].ccdff) < Math.abs(ccaah.cccjj[0].ccdfi - ccaae.cccjj[0].ccdfi));
                    if (ccdbf.cbijh) {
                        if (cbiaa.left < ccdbf.cbfjb.left && (ccdbf.cbijh.cbhga && cbiaa.left < ccdbf.cbijh.cbhga.ccdff - ccdcj.offset().left)) {
                            cbiaa.left = ccdbf.cbijh.cbhga.ccdff - ccdcj.offset().left;
                            if (!cbhih) preventDefault = false;
                        }
                        if (cbiaa.left > ccdbf.cbfjb.left && (ccdbf.cbijh.cbheh && (cbiaa.left > ccdbf.cbijh.cbheh.ccdff - ccdcj.offset().left))) {
                            cbiaa.left = ccdbf.cbijh.cbheh.ccdff - ccdcj.offset().left;
                            if (!cbhih) preventDefault = false;
                        }
                        if (cbiaa.top < ccdbf.cbfjb.top && (ccdbf.cbijh.cbhga && cbiaa.top < ccdbf.cbijh.cbhga.ccdfi - ccdcj.offset().top)) {
                            cbiaa.top = ccdbf.cbijh.cbhga.ccdfi - ccdcj.offset().top;
                            if (cbhih) preventDefault = false;
                        }
                        if (cbiaa.top > ccdbf.cbfjb.top && (ccdbf.cbijh.cbheh && cbiaa.top > ccdbf.cbijh.cbheh.ccdfi - ccdcj.offset().top)) {
                            cbiaa.top = ccdbf.cbijh.cbheh.ccdfi - ccdcj.offset().top;
                            if (cbhih) preventDefault = false;
                        }
                    }
                    cbgjc.css('left', cbiaa.left + "px");
                    cbgjc.css('top', cbiaa.top + "px");
                    ccdbf.cbfjb = {
                        left: cbiaa.left,
                        top: cbiaa.top
                    };
                } else if (ccaah.cccjj.length == 2 && ccaae.cccjj.length == 2 && cbbdj.cbeac.ccdhb) {
                    ccdbf.ccdaa = true;
                    var cbcdf = cbeef(ccaae.cccjj[0], ccaae.cccjj[1]);
                    var cbcdj = cbeef(ccaah.cccjj[0], ccaah.cccjj[1]);
                    var cbiac = cbcdj / cbcdf;
                    if (!ccaae.cbfjc || Math.abs((ccaae.cbfjc - cbiac) / ccaae.cbfjc) > 0.05) {
                        var cbdbb = cbgfd(cbiac);
                        if (cbdbb != 0) {
                            cbfga = false;
                            var cbdia = ccdga(cbdbb, ccaae.cbbih);
                            if (cbdia) cbdja(cbdia, 1);
                            ccaae.cbfjc = cbiac;
                        }
                    }
                }
                if (preventDefault) {
                    cbche.preventDefault();
                }
            };
            ccdcj[0].ontouchend = function(cbche) {
                var cccib = (new Date()).getTime();
                if (ccaae && ccaah && ccaae.cccjj && ccaah.cccjj && ccdbf.ccdaa) {
                    if (cbhhf == 'regular') {
                        ccaba.cccib = (new Date()).getTime();
                        cbcif(cbche);
                        if (cbbdj.cbhea != "canvas") ccaej(true);
                        ccaei();
                    }
                } else {
                    if (cbfia[cbgbc].ccchc.platformFunctionality.cbahf && cbahg.cbchf && !ccdbf.ccdaa) {
                        var cbidb = cbdgi(false);
                        if (cbidb) {
                            var cajij;
                            switch (cbfia[cbidb.cbgbc].ccchc.cbdhe.toLowerCase()) {
                                case "mouseover":
                                    if (ccdbf.cbdhf && cbidb.type == ccdbf.cbdhf.type && cbidb.cbfhi == ccdbf.cbdhf.cbfhi && cbidb.cbgbc == ccdbf.cbdhf.cbgbc) {
                                        cajij = "onclick";
                                        ccdbf.cbdhf = undefined;
                                    } else {
                                        ccdbf.cbdhf = new Object();
                                        ccdbf.cbdhf.type = cbidb.type;
                                        ccdbf.cbdhf.cbfhi = cbidb.cbfhi;
                                        ccdbf.cbdhf.cbgbc = cbidb.cbgbc;
                                        jqmEvent(cbfej, "onmouseout", cbidb.type, cbidb.cbfhi, cbidb.cbgbc);
                                        cajij = "onmouseover";
                                    }
                                    break;
                                case "click":
                                    cajij = "onclick";
                                    ccdbf.cbdhf = undefined;
                                    break;
                            }
                            jqmEvent(cbfej, cajij, cbidb.type, cbidb.cbfhi, cbidb.cbgbc);
                        } else ccdbf.cbdhf = undefined;
                    }
                    ccaah = undefined;
                }
                ccaae = undefined;
                ccaah = undefined;
            };
        }

        function cbgcg(cbbef) {
            $.ajax({
                type: 'GET',
                url: cbbef,
                data: '',
                dataType: 'xml',
                success: function(xml) {
                    $(xml).find('jqm_config').each(function() {
                        cbbdj = new Object();
                        cbbdj.cbbec = cbdah(cbbef);
                        cbbdj.ccdbi = $(this).attr('version');
                        cbbdj.cbgcb = $(this).attr('license');
                        cbbdj.cbadf = cbedc($(this).attr('authorizationFile'), cbbdj.cbbec);
                        cbbdj.cbgdi = cbedc($(this).attr('loadingSpinnerUrl'), cbbdj.cbbec);
                        cbbdj.ccdab = cbedc($(this).attr('transparentImageUrl'), cbbdj.cbbec);
                        var cccgf = $(this).attr('zoomFeatureFrames');
                        if (cccgf) cbbdj.ccdgg = Number(cccgf);
                        else cbbdj.ccdgg = 5;
                        cccgf = $(this).attr('zoomFeatureMargin');
                        if (cccgf) cbbdj.ccdgh = Number(cccgf);
                        else cbbdj.ccdgh = 0.2;
                        cccgf = $(this).attr('zoomFeatureMinScale');
                        if (cccgf) cbbdj.ccdgi = Number(cccgf);
                        cccgf = $(this).attr('zoomButtonFrames');
                        if (cccgf) cbbdj.ccdgd = Number(cccgf);
                        else cbbdj.ccdgd = 10;
                        cccgf = $(this).attr('zoomButtonFactor');
                        if (cccgf) cbbdj.ccdgc = Number(cccgf);
                        else cbbdj.ccdgc = 0.2;
                        cccgf = $(this).attr('zoomMouseWheelFactor');
                        if (cccgf) cbbdj.ccdhc = Number(cccgf);
                        else cbbdj.ccdhc = 0.05;
                        cccgf = $(this).attr('zoomMouseWheelFrames');
                        if (cccgf) cbbdj.ccdhd = Number(cccgf);
                        else cbbdj.ccdhd = 2;
                        cccgf = $(this).attr('previousLevelOpacity');
                        if (cccgf) cbbdj.ccade = Number(cccgf);
                        else {
                            cccgf = $(this).attr('previousLevelAlpha');
                            if (cccgf) cbbdj.ccade = Number(cccgf);
                            else cbbdj.ccade = 0.5;
                        }
                        cccgf = $(this).attr('allowCaching');
                        if (cccgf) cbbdj.cbaae = ccdae(cccgf, false);
                        else cbbdj.cbaae = false;
                        cbbdj.cbdjh = $(this).attr('fromMapJsFunction');
                        cbbdj.cbgdg = $(this).attr('loadingInfoDiv');
                        if (cbjae.cbgdg) cbbdj.cbgdg = cbjae.cbgdg;
                        cbbdj.ccbdj = $(this).attr('selectByRectangleFillColor');
                        if (!cbbdj.ccbdj) cbbdj.ccbdj = $(this).attr('selectByPolygonFillColor');
                        cbbdj.cbbfa = $(this).attr('coordinatesFormat');
                        cbbdj.cbjjh = cbeec(this);
                        setInterval("jqmInstances[" + cbfej + "].obj.check();", 500);
                        cbbdj.cbecd = $(this).attr('geolocationInterval');
                        if (cbbdj.cbecd) setInterval("jqmInstances[" + cbfej + "].obj.checkGeolocation();", Number(cbbdj.cbecd) * 1000);
                        cbbdj.cbecc = $(this).attr('geolocationIconUrl');
                        cbbdj.cbggj = cbedc($(this).attr('magneticDeclinationGridUrl'), cbbdj.cbbec);
                        cccie = $(this).attr('markersRenderDestination');
                        if (cccie) cbbdj.cbhea = cccie;
                        else cbbdj.cbhea = 'dom';
                        cccie = $(this).attr('viewRotationAngle');
                        if (cccie) cbbdj.ccddf = Number(cccie);
                        else cbbdj.ccddf = 0; if (cbjae["viewRotationAngle"] != undefined) cbbdj.ccddf = cbjae["viewRotationAngle"];
                        cccie = $(this).attr('viewTiltAngle');
                        if (cccie) cbbdj.ccddj = Number(cccie);
                        else cbbdj.ccddj = 0; if (cbjae["viewTiltAngle"] != undefined) cbbdj.ccddj = cbjae["viewTiltAngle"];
                        cccie = $(this).attr('verticalTextsWhenTilt');
                        if (cccie) cbbdj.ccdca = Number(cccie);
                        else cbbdj.ccdca = false; if (cbjae["verticalTextsWhenTilt"] != undefined) cbbdj.ccdca = cbjae["verticalTextsWhenTilt"];
                        cccie = $(this).attr('outsideRendering');
                        if (cccie) cbbdj.cbiib = Number(cccie);
                        else cbbdj.cbiib = 0.25;
                        cbjbd(cbbdj, this, cbbdj.cbbec);
                        cbdeh(cbbdj, undefined);
                        cbjej(cbbdj, this, cbbdj.cbbec);
                        cbhee(cbbdj, undefined);
                        cbjah(cbbdj, this, cbbdj.cbbec);
                        cajih(cbbdj, null);
                        cbjbf(cbbdj, this);
                        cbjgb(cbbdj, this);
                        cbjga(cbbdj, this, cbbdj.cbbec);
                    });
                    $(xml).find('toolbar').each(function() {
                        cbbdj.cccih = cbjgd(this, cbbdj.cbbec);
                    });
                    $(xml).find('pixelInfo').each(function() {
                        cbbdj.cbjih = cbjff(this);
                    });
                    $(xml).find('functionality').each(function() {
                        cbbdj.cbeac = cbjbg(this);
                    });
                    cbbeb();
                }
            })
        }

        function cbeec(ccdfh) {
            var cbjji = new Array();
            $(ccdfh).find('platformDisplay').each(function() {
                var cbjjh = new Object();
                cbjjh.cbfbh = $(this).attr('id');
                cbjjh.cbcda = $(this).attr('displayMode');
                if (!cbjjh.cbcda) cbjjh.cbcda = 'regular';
                cbjjh.cbaaa = $(this).attr('align');
                cbjjh.cbbij = $(this).attr('darkColor');
                cbjji.push(cbjjh);
            });
            for (var cbfaf in cbjji) {
                var cbjjh = cbjji[cbfaf];
                if (cbjjh.cbfbh == cbjjg.cbfbh) return cbjjh;
            }
            for (var cbfaf in cbjji) {
                var cbjjh = cbjji[cbfaf];
                if (cbjjh.cbfbh == 'default') return cbjjh;
            }
            var cbjjh = new Object();
            cbjjh.cbfbh = 'default';
            cbjjh.cbcda = 'regular';
            return cbjjh;
        }

        function ccbfb(cbbea, cbghc) {
            cbbdj = new Object();
            cbbdj.cbbec = cbdah(cbghc);
            cbbdj.ccdbi = cbbea['version'];
            cbbdj.cbgcb = cbbea['license'];
            cbbdj.cbadf = cbedc(cbbea['authorizationFile'], cbbdj.cbbec);
            cbbdj.cbgdi = cbedc(cbbea['loadingSpinnerUrl'], cbbdj.cbbec);
            cbbdj.ccdab = cbedc(cbbea['transparentImageUrl'], cbbdj.cbbec);
            var cccgf = cbbea['zoomFeatureFrames'];
            if (cccgf != undefined) cbbdj.ccdgg = cccgf;
            else cbbdj.ccdgg = 5;
            cccgf = cbbea['zoomFeatureMargin'];
            if (cccgf != undefined) cbbdj.ccdgh = cccgf;
            else cbbdj.ccdgh = 0.2;
            cccgf = cbbea['zoomFeatureMinScale'];
            if (cccgf != undefined) cbbdj.ccdgi = cccgf;
            cccgf = cbbea['zoomButtonFrames'];
            if (cccgf != undefined) cbbdj.ccdgd = cccgf;
            else cbbdj.ccdgd = 10;
            cccgf = cbbea['zoomButtonsFactor'];
            if (cccgf != undefined) cbbdj.ccdgc = cccgf;
            else cbbdj.ccdgc = 0.2;
            cccgf = cbbea['zoomMouseWheelFactor'];
            if (cccgf != undefined) cbbdj.ccdhc = cccgf;
            else cbbdj.ccdhc = 0.05;
            cccgf = cbbea['zoomMouseWheelFrames'];
            if (cccgf != undefined) cbbdj.ccdhd = cccgf;
            else cbbdj.ccdhd = 2;
            cccgf = cbbea['previousLevelOpacity'];
            if (cccgf != undefined) cbbdj.ccade = cccgf;
            else {
                cccgf = cbbea['previousLevelAlpha'];
                if (cccgf != undefined) cbbdj.ccade = cccgf;
                else cbbdj.ccade = 0.5;
            }
            cccgf = cbbea['allowCaching'];
            if (cccgf != undefined) cbbdj.cbaae = cccgf;
            else cbbdj.cbaae = false;
            cbbdj.cbdjh = cbbea['fromMapJsFunction'];
            cbbdj.cbgdg = cbbea['loadingInfoDiv'];
            if (cbjae.cbgdg) cbbdj.cbgdg = cbjae.cbgdg;
            cbbdj.ccbdj = cbbea['selectByRectangleFillColor'];
            if (!cbbdj.ccbdj) cbbdj.ccbdj = cbbea['selectByPolygonFillColor'];
            cbbdj.cbbfa = cbbea['coordinatesFormat'];
            cbbdj.cbjjh = cbeec(this);
            setInterval("jqmInstances[" + cbfej + "].obj.check();", 500);
            cbbdj.cbecd = cbbea['geolocationInterval'];
            if (cbbdj.cbecd) setInterval("jqmInstances[" + cbfej + "].obj.checkGeolocation();", cbbdj.cbecd * 1000);
            cbbdj.cbecc = cbbea['geolocationIconUrl'];
            cbbdj.cbggj = cbbea['magneticDeclinationGridUrl'];
            cccie = cbbea['markersRenderDestination'];
            if (cccie) cbbdj.cbhea = cccie;
            else cbbdj.cbhea = 'dom';
            cccie = cbbea['viewRotationAngle'];
            if (cccie) cbbdj.ccddf = Number(cccie);
            else cbbdj.ccddf = 0; if (cbjae["viewRotationAngle"] != undefined) cbbdj.ccddf = cbjae["viewRotationAngle"];
            cccie = cbbea['viewTiltAngle'];
            if (cccie) cbbdj.ccddj = Number(cccie);
            else cbbdj.ccddj = 0; if (cbjae["viewTiltAngle"] != undefined) cbbdj.ccddj = cbjae["viewTiltAngle"];
            cccie = cbbea['verticalTextsWhenTilt'];
            if (cccie) cbbdj.ccdca = Number(cccie);
            else cbbdj.ccdca = false; if (cbjae["verticalTextsWhenTilt"] != undefined) cbbdj.ccdca = cbjae["verticalTextsWhenTilt"];
            cccie = cbbea['outsideRendering'];
            if (cccie) cbbdj.cbiib = Number(cccie);
            else cbbdj.cbiib = 0.25;
            cbjci(cbbdj, cbbea['filters']);
            cbjef(cbbdj, cbbea['textStyles']);
            if (cbbea['styles']) cbjch(cbbdj, cbbea['styles'], undefined);
            if (cbbea['featureStyles']) cbjch(cbbdj, cbbea['featureStyles'], undefined);
            if (cbbea['markerStyles']) cbjdi(cbbdj, cbbea['markerStyles'], undefined);
            cbdeh(cbbdj, undefined);
            cbhee(cbbdj, undefined);
            cajih(cbbdj, undefined);
            cbbdj.cccih = cbjeg(cbbea['toolbar'], cbbdj.cbbec);
            cbbdj.cbjih = cbjdj(cbbea['pixelInfo']);
            cbbdj.cbeac = cbjcj(cbbea['functionality']);
            cbbeb();
        }

        function cbbeb() {
            ccbhb(cbjae);
            if (typeof ccbed["check"] == "function") ccbed["check"](true);
            if (ccdbf.cbadd.cbaeb) {
                cbbgb();
                cbbgc();
                ccbba();
            } else cbgcf(); if (parseInt(Math.random() * 100) == 1) cbjhi({
                "pingUrl": "http://counter01.jquerymaps.com/hit.php",
                "hits": 100
            });
            if (ccdbf.cbadd.cbcja) {
                cbcje.ccdac(ccdbf.cbadd.cbcja, ccdbf.cbadd.cbcij);
                cbjhi({
                    "pingUrl": "http://counter01.jquerymaps.com/error.php",
                    "errorCode": ccdbf.cbadd.cbcja,
                    "errorArgument": ccdbf.cbadd.cbcij
                });
            }
        }

        function cbgcf() {
            if (!cbbdj.cbadf) {
                cbadg();
                return;
            }
            $.ajax({
                type: "GET",
                url: cbbdj.cbadf,
                error: function() {
                    cbhhc();
                },
                success: function(cbadi) {
                    cbadh(cbadi);
                }
            });
        }

        function cbadg() {
            ccdbf.cbadd.cbcja = 13010;
            ccdbf.cbadd.cbcij = cbbdj.cbadf;
        }

        function cbhhc() {
            ccdbf.cbadd.cbcja = 13000;
            ccdbf.cbadd.cbcij = cbbdj.cbadf;
        }

        function cbadh(cbadi) {
            ccdbf.cbadd.cbjbb(cbadi);
            if (ccdbf.cbadd.cbbai()) {
                cbbgb();
                if (ccdbf.cbadd.cbbah()) cbbgc();
            }
            ccbba();
        }

        function ccbba() {
            if (!cbgjc) {
                cbcje.ccdac(13020, window.location.hostname);
                return;
            }
            if (!cbebj) {
                cbcje.ccdac(13030, (new Date().toString()));
                return;
            }
            if (cbjjg.cbfhc) ccbgi();
            if (cbjjg.cbehf) {
                ccdcj.mousemove(function(cbche) {
                    ccdbf.cbfja = (new Date()).getTime();
                    ccdde = cbefj(cbche);
                    cbfdi();
                    if (ccdbf.cbabb.length > 0) ccaej(true);
                });
                ccdcj.mousedown(function(cbche) {
                    ccaae = new Object();
                    ccaae.ccabe = cbefj(cbche);
                    ccaae.cccib = (new Date()).getTime();
                    ccdde = ccaae.ccabe;
                });
                ccdcj.mouseup(function(cbche) {
                    if (cbhhf == 'regular') {
                        cbiea(cbche);
                        if (cbfgd()) {
                            cbcif(cbche);
                            if (cbjjg.cbafi == "msie" && cbjjg.cbafj >= 9) {
                                ccdbf.cbaee = true;
                                setTimeout(function() {
                                    ccdbf.cbaee = false;
                                }, 200);
                            }
                        } else {
                            if (cbfia[cbgbc].ccchc.platformFunctionality.cbahf && cbahg.cbchf) jqmEvent(cbfej, 'onclick', undefined, undefined, cbgbc);
                            ccaah = undefined;
                        }
                        ccaae = undefined;
                    }
                });
                if (cbbdj.cbeac.ccdhb) {
                    ccdcj[0].onmousewheel = function(cbche) {
                        cbiec(cbche);
                    };
                    if (!ccdbe) ccdcj[0]['addEventListener']("DOMMouseScroll", cbiec, false);
                }
            }
            cbgec(cbbdj.cbggj);
            cbfee();
            if (cbjae['initialTheme']) ccbgg(cbjae['initialTheme']);
            else if (cbjae.initialThemeUrl) cbgeg(cbjae.initialThemeUrl);
        }

        function cbiec(cbche) {
            if (!cbfff) return;
            cbhid.cccib = (new Date()).getTime();
            cbaib(cbche);
            if (!cbche) cbche = event;
            var cbhie = cbche.clientX - this.offsetLeft;
            var cbhif = cbche.clientY - this.offsetTop;
            var cbccd = cbche.wheelDelta / 120;
            if (!cbche.wheelDelta) cbccd = -cbche['detail'];
            if (cbccd > 0) cbccd = 1;
            else cbccd = -1;
            cbfga = false;
            var cbdia = ccdga(cbccd * cbbdj.ccdhc);
            cbdja(cbdia, cbbdj.ccdhd);
            if (ccdbf.cbaad) cccih.cccac();
            cbfia[cbgbc].cbdhg.cccdg = true;
        }

        function checkDisplay(cbbaf) {
            if (!ccdda) ccdai();
            switch (cbbdj.cbjjh.cbcda.toLowerCase()) {
                case 'regular':
                    break;
                case 'fullscreen':
                case 'fullscreenonclick':
                    ccajf(cbbaf);
                    if (cbcdc()) {
                        ccaie($(window).scrollLeft(), $(window).scrollTop());
                    }
                    break;
                case 'viewport':
                case 'viewportonclick':
                    if (cbcdc()) {
                        var ccadb, ccadc;
                        var cbaab = cbbdj.cbjjh.cbaaa.split(',');
                        var cbcdd = cbeee();
                        if (!ccdda) ccdai();
                        switch (jQuery.trim(cbaab[0]).toLowerCase()) {
                            case "top":
                            case "top-left":
                            case "top-right":
                                ccadc = Number(cbaab[2]);
                                break;
                            case "bottom":
                            case "bottom-left":
                            case "bottom-right":
                                ccadc = cbcdd.height - ccdda.height - Number(cbaab[2]);
                                break;
                            case "center":
                            case "left":
                            case "right":
                                ccadc = cbcdd.height / 2 - ccdda.height / 2 - Number(cbaab[2]);
                                break;
                        }
                        switch (jQuery.trim(cbaab[0]).toLowerCase()) {
                            case "left":
                            case "top-left":
                            case "bottom-left":
                                ccadb = Number(cbaab[1]);
                                break;
                            case "right":
                            case "top-right":
                            case "bottom-right":
                                ccadb = cbcdd.width - ccdda.width - Number(cbaab[1]);
                                break;
                            case "top":
                            case "bottom":
                            case "center":
                                ccadb = cbcdd.width / 2 - ccdda.width / 2 - Number(cbaab[1]);
                                break;
                        }
                        ccaie($(window).scrollLeft() + ccadb, $(window).scrollTop() + ccadc);
                    }
            }
        }

        function cbgec(ccdaj) {
            cbgdh.showMessage("Loading declination grid XML...");
            if (!ccdaj) {
                cbggi();
                return;
            }
            if (cbhjc('001')) ccdfe('Loading magnetic declination grid from ' + ccdaj);
            $.ajax({
                type: "GET",
                url: cajjc(ccdaj),
                data: "",
                dataType: "xml",
                success: function(xml) {
                    var cbccg = new Object();
                    $(xml).find('declinations').each(function() {
                        cbccg.cbhga = new Object();
                        cbccg.cbhga.cbfjh = $(this).attr('minLat');
                        cbccg.cbhga.cbggb = $(this).attr('minLon');
                        cbccg.cbheh = new Object();
                        cbccg.cbheh.cbfjh = $(this).attr('maxLat');
                        cbccg.cbheh.cbggb = $(this).attr('maxLon');
                        cbccg.cccdh = $(this).attr('gridStep');
                    });
                    cbccg.ccbaf = new Array();
                    $(xml).find('declination').each(function() {
                        var cbcad = $(this).attr('values').split("|");
                        cbccg.ccbaf.push(cbcad);
                    });
                    cbcii.ccbfi(cbccg);
                    cbggi();
                }
            });
        }

        function cbggi() {
            if (cbhjc('001')) ccdfe('Magnetic declination grid loaded.');
            cbgdh.hideMessage("Loading declination grid XML...");
            cbbdj.cbggi = true;
        }

        function ccbgg(obj) {
            cbfia[cbgbc].ccchc = new Object();
            cbfia[cbgbc].ccchc.cbfbh = obj['id'];
            cbfia[cbgbc].ccchc.cbafc = obj['bgImageUrl'];
            cbfia[cbgbc].ccchc.cbafb = obj['bgImageLowResUrl'];
            cbfia[cbgbc].ccchc.cbdfd = obj['fgImageUrl'];
            cbfia[cbgbc].ccchc.ccahj = obj['reloadInterval'];
            cbfia[cbgbc].ccchc.ccaic = obj['reloadTheme'];
            cbfia[cbgbc].ccchc.ccahh = obj['reloadFeatureCategories'];
            cbfia[cbgbc].ccchc.ccahi = obj['reloadFeatures'];
            cbfia[cbgbc].ccchc.ccaia = obj['reloadMarkerCategories'];
            cbfia[cbgbc].ccchc.ccaib = obj['reloadMarkers'];
            var cccgf = obj['limitPan'];
            if (cccgf == undefined) cccgf = true;
            cbfia[cbgbc].ccchc.cbgcc = cccgf;
            cccgf = obj['limitZoomOut'];
            if (cccgf == undefined) cccgf = true;
            cbfia[cbgbc].ccchc.cbgcd = cccgf;
            cccgf = obj['firstTapBehavior'];
            if (!cccgf) cccgf = "click";
            cbfia[cbgbc].ccchc.cbdhe = cccgf;
            cccgf = obj['avoidLetteredLabelIntersections'];
            if (cccgf == undefined) cccgf = true;
            cbfia[cbgbc].ccchc.cbaec = cccgf;
            if (obj['mapSize']) {
                cbfia[cbgbc].cbgjd = new Object();
                cbfia[cbgbc].cbgjd.ccdff = obj['mapSize']['x'];
                cbfia[cbgbc].cbgjd.ccdfi = obj['mapSize']['y'];
            }
            if (obj['projection']) cbfia[cbgbc].ccadi = obj['projection'];
            else cbfia[cbgbc].ccadi = "mercator";
            cbfia[cbgbc].cbcih.ccbgd(cbfia[cbgbc].ccadi);
            if (obj['letteredLabel']) cbfia[cbgbc].ccchc.cbgac = cbjdc(obj['letteredLabel']);
            cbfia[cbgbc].ccchc.cbdii = obj['focusOnFeatureCategories'];
            cbfia[cbgbc].ccchc.cbhfa = obj['maxInitialScaleFactor'];
            cbfia[cbgbc].ccchc.cbhgh = obj['minScaleFactor'];
            cbfia[cbgbc].ccchc.platformFunctionality = cbeed(cbjea(obj['platformFunctionalities']));
            if (cbfia[cbgbc].ccchc.platformFunctionality.cbahf) cbfji();
            if (obj['actions']) cbfia[cbgbc].ccchc.cajif = cbjcb(obj['actions']);
            if (obj['styles']) cbjch(cbfia[cbgbc].ccchc, obj['styles'], undefined);
            if (obj['featureStyles']) cbjch(cbfia[cbgbc].ccchc, obj['featureStyles'], undefined);
            if (obj['markerStyles']) cbjdi(cbfia[cbgbc].ccchc, obj['markerStyles'], undefined);
            cbdeh(cbfia[cbgbc].ccchc, cbbdj);
            cbhee(cbfia[cbgbc].ccchc, cbbdj);
            cajih(cbfia[cbgbc].ccchc, cbbdj);
            if (ccdbf.cbadd.cbaeb || ccdbf.cbadd.cbbbg(cbfia[cbgbc].ccbjb)) {
                ccbgj();
            }
            cbfia[cbgbc].cbgig = obj['mapFormat'];
            cbfia[cbgbc].cbdbj = cbjcd(obj['featureCategories']);
            cbfia[cbgbc].cbddc = cbjcf(obj['features']);
            if (obj['shapes']) {
                cbfia[cbgbc].ccbie = cbjee(obj['shapes'], cbfia[cbgbc].cbgig);
                cbfia[cbgbc].cbdhg.ccbjc = true;
                if (cbbdj.ccddf || cbbdj.ccddj) ccbad();
            } else {
                cbfia[cbgbc].ccchc.ccbji = obj['shapesUrl'];
                cbfia[cbgbc].cbdhg.ccbjc = false;
                cbgef();
            }
            cbfia[cbgbc].cbhaf = cbjde(obj["markerCategories"]);
            cbfia[cbgbc].cbhca = cbjdf(obj["markers"]);
            cbfia[cbgbc].cbdhg.cbdca = true;
            cbfia[cbgbc].cbdhg.cbddj = true;
            cbfia[cbgbc].cbdhg.cbhag = true;
            cbfia[cbgbc].cbdhg.cbhdf = true;
            ccdde = undefined;
            themeInitialActions();
        }

        function cbjcb(cajif) {
            var cajii = new Array();
            for (var cbfaf in cajif) {
                cajii.push(cbjca(cajif[cbfaf]));
            }
            return cajii;
        }

        function cbjch(obj, cbdeg, cbdcf) {
            for (var cbfaf in cbdeg) {
                var cbdee = cbdeg[cbfaf];
                switch (cbdee['event'].toLowerCase()) {
                    case 'onmouseout':
                        obj.cbdee = cbjcg(cbdee, cbdcf);
                        break;
                    case 'onmouseover':
                        obj.cbiie = cbjcg(cbdee, cbdcf);
                        break;
                    case 'onhighlighted':
                        obj.cbejd = cbjcg(cbdee, cbdcf);
                        break;
                }
            }
        }

        function cbjdi(obj, cbhed, cbdcf) {
            for (var cbfaf in cbhed) {
                var cbheb = cbhed[cbfaf];
                switch (cbheb['event'].toLowerCase()) {
                    case 'onmouseout':
                        obj.cbheb = cbjdh(cbheb, cbdcf);
                        break;
                    case 'onmouseover':
                        if (obj.cbchf) obj.cbiif = cbjdh(cbheb, cbdcf);
                        break;
                    case 'onhighlighted':
                        obj.cbeje = cbjdh(cbheb, cbdcf);
                        break;
                }
            }
        }

        function cbbgb() {
            ccdcj.append('<div id="jqmMapsDiv' + cbfej + '" style="position: absolute; top: 0px; left: 0px; z-index: 100; border: 0px; " />');
            cbgjc = $('#jqmMapsDiv' + cbfej);
            var cbife = 'jqmOnTopCanvasDiv' + cbfej;
            var cbiej = 'jqmOnTopCanvas' + cbfej;
            ccdcj.append('<div id="' + cbife + '" style="position: absolute; top: 0px; left: 0px; width:1000; z-index: 200; cursor: crosshair; ">' + '</div>');
            cbieh = $('#' + cbife);
            cbifd = document.createElement("canvas");
            cbifd['id'] = cbiej;
            cbifd['style']['display'] = 'block';
            cbifd.width = ccdda.width;
            cbifd.height = ccdda.height;
            cbieh[0].appendChild(cbifd);
            if (ccdbe) G_vmlCanvasManager['initElement'](cbifd);
            cbief = cbifd.getContext("2d");
            cbieh.hide();
            if (cbjjg.cbehf) {
                cbieh.mousemove(function(cbche) {
                    cbifb(cbche);
                });
                cbieh.mousedown(function(cbche) {
                    cbifa(cbche);
                });
                cbieh.mouseup(function(cbche) {
                    cbifc(cbche);
                });
            }
            var cbghb = "jqmMapAreasImage" + cbfej;
            var cbgha = "jqmMapAreas" + cbfej;
            var cbggg = "jqmMapAreasDiv" + cbfej;
            cbgjc.append("<img id='" + cbghb + "' src='" + cbbdj.ccdab + "' style='position: absolute; top: 0px; left: 0px; z-index: 200' " + "border='none' />" + "<div id='" + cbggg + "' style='position: relative; '></div>");
            cbghf = $("#" + cbggg);
            cbghg = $("#" + cbghb);
            var cbcec = "jqmMarkersDiv" + cbfej;
            cbgjc.append("<div id='" + cbcec + "' style='position: absolute; top: 0px; left: 0px; z-index: 300'></div>");
            cbhda = $("#" + cbcec);
            if (ccdbf.cbadd.cbffi()) {
                ccdbf.cbgfh = document.createElement('img');
                ccdbf.cbgfh.src = "data:image/png;base64," + ccdbf.cbadd.cbefd();
                ccdbf.cbgfh.border = 0;
                var cbfcc = document.createElement('a');
                cbfcc.href = String.fromCharCode(104, 116, 116, 112, 58, 47, 47, 119, 119, 119, 46, 106, 113, 117, 101, 114, 121, 109, 97, 112, 115, 46, 99, 111, 109);
                cbfcc.cccfj = "_blank";
                cbfcc.appendChild(ccdbf.cbgfh);
                ccdbf.cbgfi = document.createElement('div');
                ccdbf.cbgfi["style"]["z-index"] = "900";
                ccdbf.cbgfi["style"]["position"] = "absolute";
                ccdbf.cbgfi["align"] = "left";
                ccdbf.cbgfi["style"]["opacity"] = "0";
                ccdbf.cbgfi.appendChild(cbfcc);
                ccdcj[0].appendChild(ccdbf.cbgfi);
            }
        }

        function cbbgc() {
            cbcec = "jqmGeolocationIconDiv" + cbfej;
            cbgjc.append("<div id='" + cbcec + "' style='position: absolute; top: 0px; left: 0px; z-index: 400; '></div>");
            cbebj = $("#" + cbcec);
            cccih = new cccij(ccdcj, 'jqmToolbarDiv' + cbfej, cbbdj.cccih, 300);
            ccdcj.append('<div id="jqmInfoWindowsDiv' + cbfej + '"  style="position: absolute; top: 0px; left: 0px; z-index: 500; border: 0px; "/>');
            cbfdj = $('#jqmInfoWindowsDiv' + cbfej);
            cbgdh = new cbgdf(cbbdj.cbgdg, cbbdj.cbgdi);
            if (cbgfj) {
                ccdcj.append('<div id="jqmLogDiv' + cbfej + '"  style="position: absolute; top: 10px; left: 10px; z-index: 900; border: 0px; background-color: #000000; opacity: 0.8; width:' + (ccdda.width - 20) + 'px; height:' + (ccdda.height - 20) + 'px; text-align:left; " />');
                cbgfg = $('#jqmLogDiv' + cbfej);
            }
            cbgch = new cbgci();
        }

        function cbfee() {
            cbfia[cbgbc] = new Object();
            cbfia[cbgbc].cbdhg = new Object();
            cbfia[cbgbc].cbdhg.ccbjc = false;
            cbfia[cbgbc].cbdhg.cbdca = false;
            cbfia[cbgbc].cbdhg.cbddj = false;
            cbfia[cbgbc].cbdhg.cbhag = false;
            cbfia[cbgbc].cbdhg.cbhdf = false;
            cbfia[cbgbc].cbdhg.cbddh = false;
            cbfia[cbgbc].cbdhg.ccbii = false;
            cbfia[cbgbc].cbdhg.cbhcg = false;
            cbfia[cbgbc].cbdhg.cbhci = false;
            cbfia[cbgbc].cbdhg.cbhde = false;
            cbfia[cbgbc].cbdhg.ccbbi = false;
            cbfia[cbgbc].cbdhg.cccdg = false;
            cbfia[cbgbc].cbdhg.mapIsReady = false;
            cbfia[cbgbc].cbdhg.cbaie = false;
            cbfia[cbgbc].cbdhg.ccaci = false;
            cbfia[cbgbc].cbdhg.ccchh = true;
            cbfia[cbgbc].ccdgb = true;
            cbfia[cbgbc].ccbjg = new Object();
            cbfia[cbgbc].ccbje = new Object();
            cbfia[cbgbc].ccbjd = new Object();
            cbfia[cbgbc].ccbja = new Object();
            cbfia[cbgbc].ccbij = new Object();
            cbfia[cbgbc].cbfeg;
            cbfia[cbgbc].ccbie = new Array();
            cbfia[cbgbc].cbdbj = new Array();
            cbfia[cbgbc].cbddc = new Array();
            cbfia[cbgbc].cbhaf = new Array();
            cbfia[cbgbc].cbhca = new Array();
            cbfia[cbgbc].ccach = new Array();
            cbfia[cbgbc].cbcih = new cbcii(cbgbc);
            cbfia[cbgbc].cbegg = new Object();
            cbfia[cbgbc].cbfie = new Object();
            if (cbfic) cbfia[cbgbc].cbihb = cbfic;
            cbhda.html('');
        }

        function cbgeg(cccia) {
            if (cbhjc('001')) ccdfe('Loading theme from ' + cccia);
            clearTimeout(cbahg.cccic);
            $.ajax({
                type: 'GET',
                url: cajjc(cccia),
                data: '',
                dataType: 'xml',
                success: function(xml) {
                    $(xml).find('jmq_theme').each(function() {
                        cbjgc(this, cccia);
                    });
                    $(xml).find('jqm_theme').each(function() {
                        cbjgc(this, cccia);
                    });
                    $(xml).find('theme').each(function() {
                        cbfia[cbgbc].ccchc = new Object();
                        var ccchj = cbdah(cccia);
                        $(this).find('map').each(function() {
                            var cbdfe = cbedc($(this).attr('file'), cbbdj.cbbec);
                            cbfia[cbgbc].ccchc.ccbji = cbdfe.replace('.swf', '.xml');
                            cbfia[cbgbc].ccchc.cbafc = cbdfe.replace('.swf', '.png');
                            cbfia[cbgbc].ccchc.cbacf = $(this).attr('borderColor').replace('0x', '#');
                        });
                        $(this).find('areas').each(function() {
                            cbfia[cbgbc].ccchc.cbdfa = cbedc($(this).attr('xmlAreas'), cbbdj.cbbec);
                            cbfia[cbgbc].ccchc.cbdcc = cbedc($(this).attr('xmlCategories'), cbbdj.cbbec);
                        });
                        $(this).find('pois').each(function() {
                            cbfia[cbgbc].ccchc.cbheg = cbedc($(this).attr('xmlPOIs'), cbbdj.cbbec);
                            cbfia[cbgbc].ccchc.cbhai = cbedc($(this).attr('xmlCategories'), cbbdj.cbbec);
                        });
                        cbfia[cbgbc].ccchc.platformFunctionality = cbeed(undefined);
                        cbfia[cbgbc].ccchc.cbdhe = "click";
                        cbfia[cbgbc].ccchc.cbaec = true;
                    });
                    cbdeh(cbfia[cbgbc].ccchc, cbbdj);
                    cajih(cbfia[cbgbc].ccchc, cbbdj);
                    ccchi();
                }
            })
        }

        function cbjgc(ccdfh, cccia) {
            cbfia[cbgbc].ccchc = new Object();
            var ccchj = cbdah(cccia);
            cbfia[cbgbc].ccchc.cbfbh = $(ccdfh).attr('id');
            cbfia[cbgbc].ccchc.url = cccia;
            cbfia[cbgbc].ccchc.ccbji = cbedc($(ccdfh).attr('shapesUrl'), ccchj);
            cbfia[cbgbc].ccchc.cbafc = cbedc($(ccdfh).attr('backgroundImageUrl'), ccchj);
            cbfia[cbgbc].ccchc.cbafb = cbedc($(ccdfh).attr('backgroundImageLowResUrl'), ccchj);
            cbfia[cbgbc].ccchc.cbdfd = cbedc($(ccdfh).attr('foregroundImageUrl'), ccchj);
            cbfia[cbgbc].ccchc.cbdcc = cbedc($(ccdfh).attr('featureCategoriesUrl'), ccchj);
            cbfia[cbgbc].ccchc.cbdfa = cbedc($(ccdfh).attr('featuresUrl'), ccchj);
            cbfia[cbgbc].ccchc.cbhai = cbedc($(ccdfh).attr('markerCategoriesUrl'), ccchj);
            cbfia[cbgbc].ccchc.cbheg = cbedc($(ccdfh).attr('markersUrl'), ccchj);
            cbfia[cbgbc].ccchc.ccahj = Number($(ccdfh).attr('reloadInterval'));
            cbfia[cbgbc].ccchc.ccaic = ccdae($(ccdfh).attr('reloadTheme'), false);
            cbfia[cbgbc].ccchc.ccahh = ccdae($(ccdfh).attr('reloadFeatureCategories'), false);
            cbfia[cbgbc].ccchc.ccahi = ccdae($(ccdfh).attr('reloadFeatures'), false);
            cbfia[cbgbc].ccchc.ccaia = ccdae($(ccdfh).attr('reloadMarkerCategories'), false);
            cbfia[cbgbc].ccchc.ccaib = ccdae($(ccdfh).attr('reloadMarkers'), false);
            cbfia[cbgbc].ccchc.cbgcc = ccdae($(ccdfh).attr('limitPan'), true);
            cbfia[cbgbc].ccchc.cbgcd = ccdae($(ccdfh).attr('limitZoomOut'), true);
            var cccgf = $(ccdfh).attr('firstTapBehavior');
            if (!cccgf) cccgf = "click";
            cbfia[cbgbc].ccchc.cbdhe = cccgf;
            cbfia[cbgbc].ccchc.cbaec = ccdae($(ccdfh).attr('avoidLetteredLabelIntersections'), true);
            cbjfh(cbfia[cbgbc].ccchc, ccdfh);
            cbjbd(cbfia[cbgbc].ccchc, ccdfh, ccchj);
            cbjej(cbfia[cbgbc].ccchc, ccdfh, ccchj);
            cbjah(cbfia[cbgbc].ccchc, ccdfh, ccchj);
            cbfia[cbgbc].ccchc.cbgac = cbjeh(ccdfh);
            cbfia[cbgbc].ccchc.cbhfa = $(ccdfh).attr('maxInitialScaleFactor');
            cbfia[cbgbc].ccchc.cbhgh = Number($(ccdfh).attr('minScaleFactor'));
            cbfia[cbgbc].ccchc.platformFunctionality = cbeed(cbjfg(ccdfh));
        }

        function cbjfg(ccdfh) {
            var cbjjj = new Array();
            $(ccdfh).find('platformFunctionality').each(function() {
                var platformFunctionality = new Object();
                platformFunctionality.cbfbh = $(this).attr('id');
                if ($(this).attr('calculatedMapAreas')) platformFunctionality.cbahf = ccdae($(this).attr('calculatedMapAreas'));
                else platformFunctionality.cbahf = false; if (cbjjg.cbfge || cbjjg.cbfhb) platformFunctionality.cbahf = true;
                if ($(this).attr('onMouseOverCalculateInterval')) platformFunctionality.cbieb = Number($(this).attr('onMouseOverCalculateInterval'));
                else platformFunctionality.cbieb = 0.2; if ($(this).attr('displayRegularPolygons')) platformFunctionality.cbcdb = ccdae($(this).attr('displayRegularPolygons'));
                else {
                    if ($(this).attr('displayRegularFeatures')) platformFunctionality.cbcdb = ccdae($(this).attr('displayRegularPolygons'));
                    else platformFunctionality.cbcdb = true;
                } if ($(this).attr('displayBgImages')) platformFunctionality.cbccj = ccdae($(this).attr('displayBgImages'));
                else platformFunctionality.cbccj = false;
                cbjjj.push(platformFunctionality);
            });
            return cbjjj;
        }

        function cbjea(ccaaa) {
            if (!ccaaa) return undefined;
            var cbjjj = new Array();
            for (var cbfaf = 0; cbfaf < ccaaa.length; cbfaf++) {
                var ccaab = ccaaa[cbfaf];
                var platformFunctionality = new Object();
                platformFunctionality.cbfbh = ccaab['id'];
                if (ccaab['calculatedMapAreas'] != undefined) platformFunctionality.cbahf = ccaab['calculatedMapAreas'];
                else platformFunctionality.cbahf = false; if (cbjjg.cbfge || cbjjg.cbfhb) platformFunctionality.cbahf = true;
                if (ccaab['onMouseOverCalculateInterval'] != undefined) platformFunctionality.cbieb = ccaab['onMouseOverCalculateInterval'];
                else platformFunctionality.cbieb = 0.2; if (ccaab['displayRegularPolygons'] != undefined) platformFunctionality.cbcdb = ccaab['displayRegularPolygons'];
                else {
                    if (ccaab['displayRegularfeatures'] != undefined) platformFunctionality.cbcdb = ccaab['displayRegularfeatures'];
                    else platformFunctionality.cbcdb = true;
                } if (ccaab['displayBgImages'] != undefined) platformFunctionality.cbccj = ccaab['displayBgImages'];
                else platformFunctionality.cbccj = false;
                cbjjj.push(platformFunctionality);
            }
            return cbjjj;
        }

        function ccchi() {
            ccbgj();
            cbgef();
            cbgdb();
            cbgdc();
            cbged();
            cbgee(cbfia[cbgbc].ccchc.cbheg);
            cbgdh.showMessage("Processing...");
            ccbgh();
            if (cbfia[cbgbc].ccchc.platformFunctionality.cbahf && cbjjg.cbehf) cbfji();
        }

        function cbfji() {
            if (!cbfia[cbgbc].ccchc) return;
            if (!cbfia[cbgbc].ccchc.platformFunctionality.cbieb) cbfia[cbgbc].ccchc.platformFunctionality.cbieb = 0.2;
            cbahg.cccic = setTimeout(function() {
                cbahi(true);
            }, cbfia[cbgbc].ccchc.platformFunctionality.cbieb * 1000);
        }

        function ccbgh() {
            ccchg = setTimeout("jqmInstances[" + cbfej + "].obj.runThemeInitialActions();", 1);
        }

        function cccdf() {
            setTimeout("jqmInstances[" + cbfej + "].obj.resumeRunningActions();", 1);
        }

        function ccbgj() {
            var cbgbe = (cbfia[cbgbc].cbgii != undefined);
            if (!cbgbe) {
                var cbgbg = 'jqmMapLevelDiv' + cbfej + '-' + cbgbc;
                cbgjc.append('<div id="' + cbgbg + '" style="position: absolute; top: 0px; left: 0px; z-index: ' + (100 + cbgbc) + '; " />');
                cbfia[cbgbc].cbgii = $("#" + cbgbg);
                if (!cbfia[cbgbc].cbghi && cbfia[cbgbc].ccchc.cbafb) {
                    var cbfce = 'jqmBgMapImageLowRes' + cbfej + '-' + cbgbc;
                    cbfia[cbgbc].cbgii.append('<img id="' + cbfce + '" src="' + cbfia[cbgbc].ccchc.cbafb + '" style="position: absolute; top: 0px; left: 0px; " border="none" />');
                    cbfia[cbgbc].cbghi = $('#' + cbfce);
                    cbfia[cbgbc].cbghi.hide();
                }
                if (!cbfia[cbgbc].cbghh && cbfia[cbgbc].ccchc.cbafc) {
                    var cbfce = 'jqmBgMapImage' + cbfej + '-' + cbgbc;
                    cbfia[cbgbc].cbgii.append('<img id="' + cbfce + '" src="' + cbfia[cbgbc].ccchc.cbafc + '" style="position: absolute; top: 0px; left: 0px; " border="none" />');
                    cbfia[cbgbc].cbghh = $('#' + cbfce);
                    cbfia[cbgbc].cbghh.hide();
                }
                if (!ccdbe) {
                    var ccdgf = 'jqmZoomMapDiv' + cbfej + '-' + cbgbc;
                    var cccgf = document.createElement("div");
                    cccgf['style']['position'] = 'absolute';
                    cccgf['id'] = ccdgf;
                    cbfia[cbgbc].cbgii[0].appendChild(cccgf);
                    cbfia[cbgbc].cbhac = $('#' + ccdgf);
                    var ccdge = 'jqmZoomMapCanvas' + cbfej + '-' + cbgbc;
                    cbfia[cbgbc].cbhab = document.createElement("canvas");
                    cbfia[cbgbc].cbhab['id'] = ccdge;
                    cbfia[cbgbc].cbhab['style']['display'] = 'block';
                    cbfia[cbgbc].cbhab['style']['position'] = 'absolute';
                    cbfia[cbgbc].cbhab['style']['top'] = '0px';
                    cbfia[cbgbc].cbhab['style']['left'] = '0px';
                    cbfia[cbgbc].cbhac[0].appendChild(cbfia[cbgbc].cbhab);
                    cbfia[cbgbc].cbhaa = cbfia[cbgbc].cbhab.getContext("2d");
                }
                var ccacb = 'jqmPosImgsCanvasDiv' + cbfej + '-' + cbgbc;
                var ccabj = 'jqmPosImgsCanvas' + cbfej + '-' + cbgbc;
                cbfia[cbgbc].cbgii.append('<div id="' + ccacb + '" style="position: absolute; top: 0px; left: 0px; width:1000; height:1000; "></div>');
                cbfia[cbgbc].ccabi = $('#' + ccacb);
                cbfia[cbgbc].ccaca = document.createElement("canvas");
                cbfia[cbgbc].ccaca['id'] = ccabj;
                cbfia[cbgbc].ccaca['style']['display'] = 'block';
                cbfia[cbgbc].ccabi[0].appendChild(cbfia[cbgbc].ccaca);
                if (ccdbe) G_vmlCanvasManager['initElement'](cbfia[cbgbc].ccaca);
                cbfia[cbgbc].ccabh = cbfia[cbgbc].ccaca.getContext("2d");
                var mapDivId = 'jqmMapCanvasDiv' + cbfej + '-' + cbgbc;
                var cbgib = 'jqmMapCanvas' + cbfej + '-' + cbgbc;
                var cbgid = 'jqmMapExCanvasImgsDiv' + cbfej + '-' + cbgbc;
                cbfia[cbgbc].cbgii.append('<div id="' + mapDivId + '" style="position: absolute; top: 0px; left: 0px; "></div>' + '<div id="' + cbgid + '" style="position: absolute; top: 0px; left: 0px; "></div>');
                cbfia[cbgbc].cbgia = $('#' + mapDivId);
                cbfia[cbgbc].cbgie = $('#' + cbgid);
                cbfia[cbgbc].cbgic = document.createElement("canvas");
                cbfia[cbgbc].cbgic['id'] = cbgib;
                cbfia[cbgbc].cbgic['style']['display'] = 'block';
                cbfia[cbgbc].cbgia[0].appendChild(cbfia[cbgbc].cbgic);
                if (ccdbe) G_vmlCanvasManager['initElement'](cbfia[cbgbc].cbgic);
                cbfia[cbgbc].cbghj = cbfia[cbgbc].cbgic.getContext("2d");
                if (!cbfia[cbgbc].cbgif && cbfia[cbgbc].ccchc.cbdfd) {
                    var cbfce = 'jqmFgMapImage' + cbfej + '-' + cbgbc;
                    cbfia[cbgbc].cbgii.append('<img id="' + cbfce + '" src="' + cbfia[cbgbc].ccchc.cbdfd + '" style="position: absolute; top: 0px; left: 0px; " border="none" />');
                    cbfia[cbgbc].cbgif = $('#' + cbfce);
                    cbfia[cbgbc].cbgif.hide();
                }
                var cbejb = 'jqmHighlightCanvasDiv' + cbfej + '-' + cbgbc;
                var cbeii = 'jqmHighlightCanvas' + cbfej + '-' + cbgbc;
                var cbejf = 'jqmHighlightExCanvasImgsDiv' + cbfej + '-' + cbgbc;
                cbfia[cbgbc].cbgii.append('<div id="' + cbejb + '" style="position: absolute; top: 0px; left: 0px; " >' + '<div id="' + cbejf + '" style="position: absolute; top: 0px; left: 0px; width:1000; height:1000; "></div>' + '</div>');
                cbfia[cbgbc].cbeih = $('#' + cbejb);
                cbfia[cbgbc].cbejg = $('#' + cbejf);
                cbfia[cbgbc].cbeij = document.createElement("canvas");
                cbfia[cbgbc].cbeij['id'] = cbejb;
                cbfia[cbgbc].cbeij['style']['display'] = 'block';
                cbfia[cbgbc].cbeih[0].appendChild(cbfia[cbgbc].cbeij);
                if (ccdbe) G_vmlCanvasManager['initElement'](cbfia[cbgbc].cbeij);
                cbfia[cbgbc].cbeig = cbfia[cbgbc].cbeij.getContext("2d");
                var cbhcj = 'jqmMarkersCanvasDiv' + cbfej + '-' + cbgbc;
                var cbhcd = 'jqmMarkersCanvas' + cbfej + '-' + cbgbc;
                var cbhdb = 'jqmMarkersExCanvasImgsDiv' + cbfej + '-' + cbgbc;
                cbfia[cbgbc].cbgii.append('<div id="' + cbhcj + '" style="position: absolute; top: 0px; left: 0px; " >' + '<div id="' + cbhdb + '" style="position: absolute; top: 0px; left: 0px; width:1000; height:1000; "></div>' + '</div>');
                cbfia[cbgbc].cbhcc = $('#' + cbhcj);
                cbfia[cbgbc].cbhdc = $('#' + cbhdb);
                cbfia[cbgbc].cbhce = document.createElement("canvas");
                cbfia[cbgbc].cbhce['id'] = cbhcj;
                cbfia[cbgbc].cbhce['style']['display'] = 'block';
                cbfia[cbgbc].cbhcc[0].appendChild(cbfia[cbgbc].cbhce);
                if (ccdbe) G_vmlCanvasManager['initElement'](cbfia[cbgbc].cbhce);
                cbfia[cbgbc].cbhcb = cbfia[cbgbc].cbhce.getContext("2d");
                if (cbbdj.cbjih) {
                    cbfia[cbgbc].cbhcc.mouseup(function(cbche) {
                        cbjii(cbche, 'onclick');
                    });
                    cbfia[cbgbc].cbhcc.mousemove(function(cbche) {
                        cbjii(cbche, 'onmouseover');
                    });
                }
                var cbdae = 'jqmExternalDivsDiv' + cbfej + '-' + cbgbc;
                cbfia[cbgbc].cbgii.append('<div id="' + cbdae + '" style="position: absolute; top: 0px; left: 0px; " ></div>');
                cbfia[cbgbc].cbdaf = $('#' + cbdae);
            }
        }

        function cbgef() {
            if (cbhjc('001')) ccdfe('Loading shapes from ' + cbfia[cbgbc].ccchc.ccbji);
            cbgdh.showMessage("Loading shapes...");
            $.ajax({
                type: "GET",
                url: cajjc(cbfia[cbgbc].ccchc.ccbji),
                data: "",
                dataType: "xml",
                error: function() {},
                success: function(xml) {
                    $(xml).find('jqm_shapes').each(function() {
                        cbfia[cbgbc].cbgig = $(this).attr('format');
                        cbfia[cbgbc].cbgji = $(this).attr('version');
                        switch (cbfia[cbgbc].cbgig) {
                            case 'jqm_shapes':
                            case 'jqm_shapes_r':
                            case 'jqm_shapes_rg':
                            case 'jqm_boxes':
                                var cbgjf = $(this).attr('size').split(",");
                                cbfia[cbgbc].cbgjd = {
                                    ccdff: parseFloat(cbgjf[0]),
                                    ccdfi: parseFloat(cbgjf[1])
                                };
                                cbfia[cbgbc].cbgja = parseFloat($(this).attr('scale'));
                                cbfia[cbgbc].cbghd = new Object();
                                var cbhgi = $(this).attr('viewMin');
                                if (cbhgi) {
                                    cbhgi = cbhgi.split(",");
                                    cbfia[cbgbc].cbghd.cbhga = {
                                        width: parseFloat(cbhgi[0]),
                                        height: parseFloat(cbhgi[1])
                                    };
                                }
                                var cbhff = $(this).attr('viewMax');
                                if (cbhff) {
                                    cbhff = cbhff.split(",");
                                    cbfia[cbgbc].cbghd.cbheh = {
                                        ccdff: parseFloat(cbhff[0]),
                                        ccdfi: parseFloat(cbhff[1])
                                    };
                                }
                                var cbech = $(this).attr('geoMin');
                                if (cbech) {
                                    cbech = cbech.split(",");
                                    cbfia[cbgbc].geoMin = {
                                        cbggb: parseFloat(cbech[0]),
                                        cbfjh: parseFloat(cbech[1])
                                    };
                                }
                                var cbecg = $(this).attr('geoMax');
                                if (cbecg) {
                                    cbecg.split(",");
                                    cbfia[cbgbc].geoMax = {
                                        cbggb: parseFloat(cbecg[0]),
                                        cbfjh: parseFloat(cbecg[1])
                                    };
                                }
                                var cbebe = $(this).attr('geoCenter');
                                if (cbebe) {
                                    cbebe = cbebe.split(",");
                                    cbfia[cbgbc].cbebc = {
                                        cbggb: parseFloat(cbebe[0]),
                                        cbfjh: parseFloat(cbebe[1])
                                    };
                                }
                                cbfia[cbgbc].ccbjb = $(this).attr('id');
                                break;
                            case 'jqm_shapes_e001':
                                cbfia[cbgbc].cbchh = $(this).attr('data');
                                cbfia[cbgbc].cbchg = 0;
                                cbfia[cbgbc].cbgjd = new Object();
                                cbfia[cbgbc].cbgjd.ccdff = cbcai();
                                cbfia[cbgbc].cbgjd.ccdfi = cbcai();
                                cbfia[cbgbc].cbgja = cbcaf();
                                cbfia[cbgbc].cbghd = new Object();
                                cbfia[cbgbc].cbghd.cbhga = cbcag();
                                cbfia[cbgbc].cbghd.cbheh = cbcag();
                                cbfia[cbgbc].geoMin = new Object();
                                cbfia[cbgbc].geoMin.cbggb = cbcae();
                                cbfia[cbgbc].geoMin.cbfjh = cbcae();
                                cbfia[cbgbc].geoMax = new Object();
                                cbfia[cbgbc].geoMax.cbggb = cbcae();
                                cbfia[cbgbc].geoMax.cbfjh = cbcae();
                                cbfia[cbgbc].cbebc = new Object();
                                cbfia[cbgbc].cbebc.cbggb = cbcae();
                                cbfia[cbgbc].cbebc.cbfjh = cbcae();
                                var cbgbb = cbcaf();
                                cbfia[cbgbc].ccbjb = cbcah(cbgbb);
                                if (cbfia[cbgbc].cbgji >= "001.006") {
                                    cbgbb = cbcaf();
                                    cbfia[cbgbc].ccadi = cbcah(cbgbb);
                                } else cbfia[cbgbc].ccadi = "mercator";
                                cbfia[cbgbc].cbcih.ccbgd(cbfia[cbgbc].ccadi);
                                break;
                        }
                    });
                    $(xml).find('shape').each(function() {
                        cbfia[cbgbc].ccbie.push(cbjfj(this));
                    });
                    $(xml).find('moveAndScale').each(function() {
                        cbfia[cbgbc].cbcih.cajjb(cbjfb(this));
                    });
                    ccbjc();
                }
            })
        }

        function ccbjc() {
            if (cbhjc('001')) ccdfe('Shapes loaded');
            if (!ccdbf.cbadd.cbaeb && !ccdbf.cbadd.cbbbg(cbfia[cbgbc].ccbjb)) {
                cbfia[cbgbc].cbgii.remove();
                cbfia[cbgbc].cbgii = undefined;
            }
            if (cbfia[cbgbc].cbgig == "jqm_shapes_rg") {
                if (!cbfia[cbgbc].geoMin || !cbfia[cbgbc].geoMax) {}
                if (!cbfia[cbgbc].cbghd.cbhga || !cbfia[cbgbc].cbghd.cbheh) {}
                if (!cbfia[cbgbc].cbgja) {
                    cbahh(cbgbc);
                }
            }
            if (!cbfia[cbgbc].cbgja || !cbfia[cbgbc].cbebc) {
                if (cbgbc == 0) {
                    cbfia[cbgbc].cbgja = 10000;
                    cbfia[cbgbc].cbebc = {
                        cbfjh: 0,
                        cbggb: 0
                    };
                } else {
                    var cbace = cbfia[cbgbc].cbgjd.ccdff / ccdda.width;
                    var ccbbj = cbfia[cbgbc].cbgjd.ccdfi / ccdda.height;
                    if (ccbbj > cbace) cbace = ccbbj;
                    cbfia[cbgbc].cbgja = cbegg / cbace * .95;
                    var ccdeg = new Object();
                    ccdeg.ccdff = -cbgjc.position().left - cbfia[cbgbc - 1].cbgii.position().left + ccdda.width / 2;
                    ccdeg.ccdfi = -cbgjc.position().top - cbfia[cbgbc - 1].cbgii.position().top + ccdda.height / 2;
                    cbfia[cbgbc].cbebc = cbfia[cbgbc - 1].cbcih.cbjif(ccdeg, cbegg);
                }
            }
            cbfia[cbgbc].cbcih.ccbfa(cbfia[cbgbc].cbgja, cbfia[cbgbc].cbgjd, cbfia[cbgbc].cbebc, cbfia[cbgbc].ccadi);
            cbfia[cbgbc].cbcih.cbbjb = true;
            if (cbfia[cbgbc].cbgig == "jqm_shapes_rg") cbahb(cbgbc);
            if (cbbdj.ccddf || cbbdj.ccddj) ccbad();
            cbgdh.hideMessage("Loading shapes...");
            cbfia[cbgbc].cbdhg.ccbjc = true;
            if (!cbfia[cbgbc].cbgii) {
                if (!ccdbf.cbadd.cbcjb) cbcje.ccdac(13040, cbfia[cbgbc].ccbjb);
                ccdbf.cbadd.cbcjb = true;
            }
        }

        function cbgdb() {
            cbgdh.showMessage("Loading feature categories...");
            if (!cbfia[cbgbc].ccchc.cbdcc) {
                cbdca();
                return;
            }
            if (cbhjc('001')) ccdfe('Load feature categories from ' + cbfia[cbgbc].ccchc.cbdcc);
            $.ajax({
                type: "GET",
                url: cajjc(cbfia[cbgbc].ccchc.cbdcc),
                data: "",
                dataType: "xml",
                success: function(xml) {
                    var cbajb = cbdah(cbfia[cbgbc].ccchc.cbdcc);
                    $(xml).find('category').each(function() {
                        cbfia[cbgbc].cbdbj.push(cbjbc(this, cbajb));
                    });
                    cbdca();
                }
            });
        }

        function cbdca() {
            if (cbhjc('001')) ccdfe('Feature categories loaded');
            cbgdh.hideMessage("Loading feature categories...");
            cbfia[cbgbc].cbdhg.cbdca = true;
        }

        function cbgdc() {
            cbgdh.showMessage("Loading features XML...");
            if (!cbfia[cbgbc].ccchc.cbdfa) {
                cbddj();
                return;
            }
            if (cbhjc('001')) ccdfe('Loading features from ' + cbfia[cbgbc].ccchc.cbdfa);
            $.ajax({
                type: "GET",
                url: cajjc(cbfia[cbgbc].ccchc.cbdfa),
                data: "",
                dataType: "xml",
                success: function(xml) {
                    var cbdec = cbdah(cbfia[cbgbc].ccchc.cbdfa);
                    $(xml).find('feature').each(function() {
                        var cbdbh = cbjbe(this, cbdec);
                        cbdbh.cbfhi = cbfia[cbgbc].cbddc.length;
                        cbdbh['index'] = cbdbh.cbfhi;
                        if (!cbdbh['categoryId']) cbdbh['categoryId'] = cbdbh['category'];
                        cbfia[cbgbc].cbddc.push(cbdbh);
                    });
                    $(xml).find('area').each(function() {
                        var cbdbh = cbjba(this);
                        cbdbh.cbfhi = cbfia[cbgbc].cbddc.length;
                        cbdbh['index'] = cbdbh.cbfhi;
                        if (!cbdbh['categoryId']) cbdbh['categoryId'] = cbdbh['category'];
                        cbfia[cbgbc].cbddc.push(cbdbh);
                    });
                    cbddj();
                }
            })
        }

        function cbddj() {
            if (cbhjc('001')) ccdfe('Features loaded');
            cbgdh.hideMessage("Loading features XML...");
            cbfia[cbgbc].cbdhg.cbddj = true;
        }

        function cbged() {
            if (!cbfia[cbgbc].ccchc.cbhai) {
                return;
            }
            if (cbhjc('001')) ccdfe('Loading marker categories from ' + cbfia[cbgbc].ccchc.cbhai);
            cbgdh.showMessage("Loading marker categories...");
            $.ajax({
                type: "GET",
                url: cajjc(cbfia[cbgbc].ccchc.cbhai),
                data: "",
                dataType: "xml",
                success: function(xml) {
                    var cbajb = cbdah(cbfia[cbgbc].ccchc.cbhai);
                    $(xml).find('category').each(function() {
                        cbfia[cbgbc].cbhaf.push(cbjei(this, cbajb));
                    });
                    cbhag();
                }
            })
        }

        function cbhag() {
            if (cbhjc('001')) ccdfe('Marker categories loaded');
            cbgdh.hideMessage("Loading marker categories...");
            cbfia[cbgbc].cbdhg.cbhag = true;
        }

        function cbgee(cbheg) {
            if (!cbheg) {
                cbfia[cbgbc].cbdhg.cbhci = true;
                cbfia[cbgbc].cbdhg.cbhcg = true;
                cbfia[cbgbc].cbdhg.cbhde = true;
                cbfia[cbgbc].cbdhg.cbhdf = true;
                return;
            }
            cbfia[cbgbc].cbdhg.cbhci = false;
            cbfia[cbgbc].cbdhg.cbhcg = false;
            cbfia[cbgbc].cbdhg.cbhde = false;
            cbfia[cbgbc].cbdhg.cbhdf = false;
            if (cbhjc('001')) ccdfe('Loading markers from ' + cbheg);
            cbgdh.showMessage("Loading markers...");
            $.ajax({
                type: "GET",
                url: cajjc(cbheg),
                data: "",
                dataType: "xml",
                success: function(xml) {
                    var cbhdh = cbdah(cbheg);
                    $(xml).find('marker').each(function() {
                        var cbhae = cbjfa(this, cbhdh);
                        cbhae.cbfhi = cbfia[cbgbc].cbhca.length;
                        cbhae['index'] = cbhae.cbfhi;
                        cbfia[cbgbc].cbhca.push(cbhae);
                    });
                    cbhdf();
                }
            })
        }

        function cbhdf() {
            if (cbhjc('001')) ccdfe('Markers loaded');
            cbgdh.hideMessage("Loading markers...");
            cbfia[cbgbc].cbdhg.cbhdf = true;
        }

        function cbjfj(ccdfh) {
            var cbidg = new Object();
            cbidg.cbfbh = $(ccdfh).attr('id');
            switch (cbfia[cbgbc].cbgig) {
                case 'jqm_shapes':
                case 'jqm_shapes_r':
                case 'jqm_shapes_rg':
                    cbidg.type = $(ccdfh).attr('type');
                    var cbaji = $(ccdfh).attr('centroid');
                    if (cbaji) {
                        cbaji = cbaji.split(',');
                        cbidg.cbajh = {
                            ccdff: parseFloat(cbaji[0]),
                            ccdfi: parseFloat(cbaji[1])
                        };
                    } else {
                        var cbedf = $(ccdfh).attr('geoCentroid');
                        if (cbedf) {
                            cbedf = cbedf.split(',');
                            cbidg.cbede = {
                                cbggb: parseFloat(cbedf[0]),
                                cbfjh: parseFloat(cbedf[1])
                            };
                        }
                    }
                    var cbgba = $(ccdfh).attr('letteredLabelPosition');
                    if (cbgba) {
                        cbgba = cbgba.split(',');
                        cbidg.cbgaj = {
                            ccdff: parseFloat(cbgba[0]),
                            ccdfi: parseFloat(cbgba[1])
                        };
                    } else {
                        var cbefc = $(ccdfh).attr('geoLetteredLabelPosition');
                        if (cbefc) {
                            cbefc = cbefc.split(',');
                            cbidg.cbefb = {
                                cbggb: parseFloat(cbefc[0]),
                                cbfjh: parseFloat(cbefc[1])
                            };
                        }
                    }
                    cbidg.cbgai = $(ccdfh).attr('letteredLabelLineLinkSide');
                    cbidg.cbgag = $(ccdfh).attr('letteredLabelInner');
                    break;
                case 'jqm_shapes_e001':
                    cbidg.type = $(ccdfh).attr('type');
                    cbfia[cbgbc].cbchh = $(ccdfh).attr('data');
                    cbfia[cbgbc].cbchg = 0;
                    if (cbidg.type == "box") {
                        cbidg.cbgeh = cbcag();
                        cbidg.size = new Object();
                        cbidg.size.ccdff = 0;
                        cbidg.size.ccdfi = 0;
                        if (cbfia[cbgbc].cbgji >= "001.007") {
                            cbidg.cbifi = cbcai() / 10;
                            if (cbidg.cbifi == 400) cbidg.cbifi = undefined;
                        }
                    } else {
                        if (cbfia[cbgbc].cbgji < "001.003" || !cbidg.type || cbidg.type == "polygon") {
                            cbidg.cbajh = cbcag();
                            cbidg.cbgaj = cbcag();
                            cbidg.cbgai = cbcah(1);
                            cbidg.cbgag = cbcah(1);
                        }
                        if (cbfia[cbgbc].cbgji >= "001.003") {
                            var cccie = cbcah(1);
                            if (cccie == "y") {
                                var ccccb = cbcah(cbcai()).split("|");
                                cbidg.ccccc = new Array();
                                for (var cbfaf in ccccb) cbidg.ccccc.push(cbdha(ccccb[cbfaf]));
                                cbidg.cccbf = cbcah(cbcai()).split("|");
                                var cbgej = cbcai();
                                cbidg.cccbi = new Array();
                                for (var cbfaf = 0; cbfaf < cbgej; cbfaf++) cbidg.cccbi.push(cbcag());
                            }
                        }
                    }
                    break;
                case 'jqm_boxes':
                    cbidg.type = "box";
                    cbidg.cbgeh = new Object();
                    cbidg.cbgeh.ccdff = parseFloat($(ccdfh).attr('x'));
                    cbidg.cbgeh.ccdfi = parseFloat($(ccdfh).attr('y'));
                    if ($(ccdfh).attr('orientation')) cbidg.cbifi = parseFloat($(ccdfh).attr('orientation'));
                    if (!cbidg.cbifi) {
                        if ($(ccdfh).attr('o')) cbidg.cbifi = $(ccdfh).attr('o');
                    }
                    cbidg.size = new Object();
                    cbidg.size.ccdff = 0;
                    cbidg.size.ccdfi = 0;
                    break;
            }
            cbidg.cbjgg = new Array();
            $(ccdfh).find('part').each(function() {
                cbidg.cbjgg.push(cbjfi(this, cbidg.type));
            });
            ccbig(cbidg);
            return cbidg;
        }

        function ccbad() {
            cbbdj.ccddi = Math.sin(cbbdj.ccddf * Math.PI / 180);
            cbbdj.ccddh = Math.cos(cbbdj.ccddf * Math.PI / 180);
            cbbdj.ccdea = Math.cos(cbbdj.ccddj * Math.PI / 180);
            cbbdj.ccdeb = Math.sqrt(1 - cbbdj.ccdea * cbbdj.ccdea);
            var total = cbfia[cbgbc].ccbie.length;
            cbbdj.ccddg = new Object();
            cbbdj.ccddg.ccdff = (cbfia[cbgbc].cbghd.cbhga.ccdff + cbfia[cbgbc].cbghd.cbheh.ccdff) / 2;
            cbbdj.ccddg.ccdfi = (cbfia[cbgbc].cbghd.cbhga.ccdfi + cbfia[cbgbc].cbghd.cbheh.ccdfi) / 2;
            for (var ccbbe = 0; ccbbe < total; ccbbe++) ccbab(cbfia[cbgbc].ccbie[ccbbe]);
        }

        function ccbab(ccbhh) {
            if (ccbhh.type == "box") {
                ccbaa(ccbhh.cbgeh);
                if (ccbhh.cbifi != undefined) {
                    ccbhh.cbifi += cbbdj.ccddf;
                }
            } else {
                for (var cbiii = 0; cbiii < ccbhh.cbjgg.length; cbiii++) ccbac(ccbhh.cbjgg[cbiii]);
            }
            ccbig(ccbhh);
        }

        function ccbac(cbjge) {
            var total = cbjge.cbbfd.length;
            for (var cbagf = 0; cbagf < total; cbagf++) ccbaa(cbjge.cbbfd[cbagf]);
            if (cbjge.cbbfe && cbjge.cbbfe.length != cbjge.cbbfd.length) {
                total = cbjge.cbbfe.length;
                for (var cbagf = 0; cbagf < total; cbagf++) ccbaa(cbjge.cbbfe[cbagf]);
            }
            if (cbjge.type == "text") {
                if (cbjge.cbifi != 400) {
                    cbjge.cbifi -= cbbdj.ccddf;
                    cbjge.cbifi = cbcii.cbiaf(cbjge.cbifi);
                    if (cbbdj.ccddj) {
                        var ccafe = cbjge.cbifi / 180 * Math.PI;
                        var cbbfi = Math.cos(ccafe);
                        var ccccd = Math.sqrt(1 - cbbfi * cbbfi);
                        var ccdfi = ccccd * cbbdj.ccdea;
                        var cbhib = Math.sqrt(cbbfi * cbbfi + ccdfi * ccdfi);
                        var cccce = ccdfi / cbhib;
                        var cbbfj = cbbfi / cbhib;
                        var ccaff = Math.acos(cbbfj);
                        if (ccafe < 0) ccaff = -ccaff;
                        cbjge.cbifi = ccaff / Math.PI * 180;
                    }
                }
            }
            ccbgf(cbjge);
        }

        function ccbaa(ccaac) {
            var cbcch = {
                ccdff: ccaac.ccdff - cbbdj.ccddg.ccdff,
                ccdfi: ccaac.ccdfi - cbbdj.ccddg.ccdfi
            };
            ccaac.ccdff = cbbdj.ccddg.ccdff + cbcch.ccdff * cbbdj.ccddh - cbcch.ccdfi * cbbdj.ccddi;
            ccaac.ccdfi = cbbdj.ccddg.ccdfi + (cbcch.ccdfi * cbbdj.ccddh + cbcch.ccdff * cbbdj.ccddi) * cbbdj.ccdea;
        }

        function ccbig(ccbhh) {
            if (ccbhh.type == "box") return;
            ccbhh.cbgeh = new Object();
            ccbhh.cbgeh.ccdff = ccbhh.cbgeh.ccdfi = 999999;
            var cbheh = new Object();
            cbheh.ccdff = cbheh.ccdfi = -999999;
            for (var cbfaf in ccbhh.cbjgg) {
                var cbjge = ccbhh.cbjgg[cbfaf];
                if (cbjge.cbgeh.ccdff < ccbhh.cbgeh.ccdff) ccbhh.cbgeh.ccdff = cbjge.cbgeh.ccdff;
                if (cbjge.cbgeh.ccdfi < ccbhh.cbgeh.ccdfi) ccbhh.cbgeh.ccdfi = cbjge.cbgeh.ccdfi;
                if (cbjge.cbgeh.ccdff + cbjge.size.ccdff > cbheh.ccdff) cbheh.ccdff = cbjge.cbgeh.ccdff + cbjge.size.ccdff;
                if (cbjge.cbgeh.ccdfi + cbjge.size.ccdfi > cbheh.ccdfi) cbheh.ccdfi = cbjge.cbgeh.ccdfi + cbjge.size.ccdfi;
            }
            ccbhh.size = new Object();
            ccbhh.size.ccdff = cbheh.ccdff - ccbhh.cbgeh.ccdff;
            ccbhh.size.ccdfi = cbheh.ccdfi - ccbhh.cbgeh.ccdfi;
        }

        function cbjfb(ccdfh) {
            var cbidg = new Object();
            var cbiha = $(ccdfh).attr('originGeo').split(',');
            cbidg.cbigj = {
                cbhga: {
                    cbggb: parseFloat(cbiha[0]),
                    cbfjh: parseFloat(cbiha[1])
                },
                cbheh: {
                    cbggb: parseFloat(cbiha[2]),
                    cbfjh: parseFloat(cbiha[3])
                }
            };
            var cccgb = $(ccdfh).attr('targetGeo').split(',');
            cbidg.cccga = {
                cbggb: parseFloat(cccgb[0]),
                cbfjh: parseFloat(cccgb[1])
            };
            cbidg.ccbbg = parseFloat($(ccdfh).attr('scale'));
            return cbidg;
        }

        function cbjfi(ccdfh, cccaa) {
            var cbidg = new Object();
            cbidg.type = $(ccdfh).attr('type');
            if (!cbidg.type) cbidg.type = cccaa;
            if (!cbidg.type) {
                cbcje.ccdac(11260, $(ccdfh).attr('id'));
                return;
            }
            switch (cbfia[cbgbc].cbgig) {
                case 'jqm_shapes':
                case 'jqm_shapes_r':
                case 'jqm_shapes_rg':
                    var cbgfc = $(ccdfh).attr('loc');
                    if (cbgfc) {
                        cbgfc = cbgfc.split(',');
                        cbidg.cbgeh = {
                            ccdff: parseInt(cbgfc[0]),
                            ccdfi: parseInt(cbgfc[1])
                        };
                    }
                    var ccccg = $(ccdfh).attr('size');
                    if (ccccg) {
                        ccccg = ccccg.split(',');
                        cbidg.size = {
                            ccdff: parseInt(ccccg[0]),
                            ccdfi: parseInt(ccccg[1])
                        };
                    }
                    var cbbfg = $(ccdfh).attr('coords');
                    if (cbbfg) {
                        cbbfg = cbbfg.split(';');
                        cbidg.cbbfd = new Array(cbbfg.length);
                        for (var cbfaf = 0; cbfaf < cbbfg.length; cbfaf++) {
                            var ccaac = cbbfg[cbfaf].split(',');
                            cbidg.cbbfd[cbfaf] = {
                                ccdff: parseInt(ccaac[0]),
                                ccdfi: parseInt(ccaac[1])
                            };
                        }
                    } else {
                        var cbeea = $(ccdfh).attr('geoCoords');
                        if (cbeea) {
                            cbeea = cbeea.split(';');
                            cbidg.cbedj = new Array(cbeea.length);
                            for (var cbfaf = 0; cbfaf < cbeea.length; cbfaf++) {
                                var ccaac = cbeea[cbfaf].split(',');
                                cbidg.cbedj[cbfaf] = {
                                    cbggb: Number(ccaac[0]),
                                    cbfjh: Number(ccaac[1])
                                };
                            }
                        }
                    } if (cbidg.type == "text") {
                        cbidg.cbfib = $(ccdfh).attr('label');
                        cbidg.cbifi = Number($(ccdfh).attr('orientation'));
                        cbidg.cbhfh = Number($(ccdfh).attr('maxWidth'));
                        var cccha = $(ccdfh).attr('textStyle');
                        cbidg.cccgj = cbdhb(cccha);
                        cbidg.cbdje = Number($(ccdfh).attr('fontSize'));
                        cbidg.cbgeh = cbidg.cbbfd[0];
                        cbidg.size = {
                            ccdff: 0,
                            ccdfi: 0
                        };
                    }
                    if (!cbidg.cbgeh || !cbidg.size) ccbgf(cbidg);
                    break;
                case 'jqm_shapes_e001':
                    cbfia[cbgbc].cbchh = $(ccdfh).attr('data');
                    cbfia[cbgbc].cbchg = 0;
                    switch (cbidg.type) {
                        case "polyline":
                        case "polygon":
                            cbidg.cbgeh = cbcag();
                            cbidg.size = cbcag();
                            var ccabc = cbcaf();
                            cbidg.cbbfd = new Array(ccabc);
                            for (var cbfaf = 0; cbfaf < cbidg.cbbfd.length; cbfaf++) cbidg.cbbfd[cbfaf] = cbcag();
                            ccabc = cbcaf();
                            if (ccabc > 3) {
                                cbidg.cbbfe = new Array(ccabc);
                                for (var cbfaf = 0; cbfaf < cbidg.cbbfe.length; cbfaf++) cbidg.cbbfe[cbfaf] = cbcag();
                            } else cbidg.cbbfe = cbidg.cbbfd;
                            break;
                        case "text":
                            cbidg.cbfib = $(ccdfh).attr('label');
                            cbidg.cbifi = cbcai() / 10;
                            cbidg.cbdje = cbcai() / 100;
                            cbidg.cbbfd = new Array();
                            cbidg.cbbfd[0] = cbcag();
                            if (cbfia[cbgbc].cbgji >= "001.004") cbidg.cbhfh = cbcai() / 10;
                            cbidg.cbgeh = cbidg.cbbfd[0];
                            cbidg.size = {
                                ccdff: 0,
                                ccdfi: 0
                            };
                            break;
                    }
                    break;
            }
            return cbidg;
        }

        function ccbgf(cbjge) {
            var cbhga = {
                ccdff: 999999999,
                ccdfi: 999999999
            };
            var cbheh = {
                ccdff: -999999999,
                ccdfi: -999999999
            };
            for (var cbijd in cbjge.cbbfd) {
                var ccaac = cbjge.cbbfd[cbijd];
                if (ccaac.ccdff < cbhga.ccdff) cbhga.ccdff = ccaac.ccdff;
                if (ccaac.ccdfi < cbhga.ccdfi) cbhga.ccdfi = ccaac.ccdfi;
                if (ccaac.ccdff > cbheh.ccdff) cbheh.ccdff = ccaac.ccdff;
                if (ccaac.ccdfi > cbheh.ccdfi) cbheh.ccdfi = ccaac.ccdfi;
            }
            cbjge.cbgeh = {
                ccdff: cbhga.ccdff,
                ccdfi: cbhga.ccdfi
            };
            cbjge.size = {
                ccdff: cbheh.ccdff - cbhga.ccdff,
                ccdfi: cbheh.ccdfi - cbhga.ccdfi
            };
        }

        function cbjbc(ccdfh, cbajb) {
            var cbidg = new Object();
            cbidg.cbfbh = $(ccdfh).attr('id');
            cbidg.cbbbi = $(ccdfh).attr('childTheme');
            cbidg.cbchf = ccdae($(ccdfh).attr('enabled'), true);
            cbidg.ccdga = ccdae($(ccdfh).attr('zoom'), false);
            cbjbd(cbidg, ccdfh, cbajb, cbidg.cbfbh);
            cbjah(cbidg, ccdfh, cbajb);
            cbidg.cbgac = cbjeh(ccdfh);
            cbidg.cbgac = cbadc(cbidg.cbgac, cbfia[cbgbc].ccchc.cbgac);
            cbjai(ccdfh, cbidg);
            cbdeh(cbidg, cbfia[cbgbc].ccchc);
            cajih(cbidg, cbfia[cbgbc].ccchc);
            return cbidg;
        }

        function cbjai(ccdfh, obj) {
            var cccjc = $(ccdfh).attr('tooltip');
            if (cccjc) {
                var cbich = new Object();
                cbich.event = 'onmouseover';
                cbich.cccfj = 'infowindow';
                cbich.ccdaj = cbedc(cccjc.replace('.swf', '.html'), cbbdj.cbbec);
                cbich.cbaaa = cbfcj();
                if (!obj.cajif) obj.cajif = new Array();
                obj.cajif.push(cbich);
            }
            var ccabd = $(ccdfh).attr('poitextField');
            if (ccabd) {
                obj.cbgac = new Object();
                obj.cbgac.cbada = $(ccdfh).attr('poitextField');
                var cccha = $(ccdfh).attr('poitextCategory');
                obj.cbgac.cccgj = cbdhb(cccha);
            }
            $(ccdfh).find('color').each(function() {
                cbjaj(this, obj);
            });
            if ($(ccdfh).attr('child')) {
                var cajid = new Object();
                cajid.event = 'onclick';
                cajid.cccfj = 'loadchild';
                cajid.ccdaj = cbedc($(ccdfh).attr('child'), cbbdj.cbbec);
                obj.cajif.push(cajid);
            }
        }

        function cbjaj(ccdfh, obj) {
            if ($(ccdfh).attr('up')) {
                obj.cbdee = new Object();
                obj.cbdee.cbdff = $(ccdfh).attr('up').replace('0x', '#');
                if ($(ccdfh).attr('strokeColor')) obj.cbdee.cccej = $(ccdfh).attr('strokeColor').replace('0x', '#');
                else obj.cbdee.cccej = cbfia[cbgbc].ccchc.cbacf; if ($(ccdfh).attr('strokeWidth')) obj.cbdee.cccfa = Number($(ccdfh).attr('strokeWidth'));
                else obj.cbdee.cccfa = 1; if (!obj.cbdee.cccej) {
                    obj.cbdee.cccej = '#ffffff';
                    obj.cbdee.cccfa = 0;
                }
                obj.cbdee.ccdee = true;
                var cbegj = $(ccdfh).attr('gradient');
                if (cbegj) {
                    cbegj = cbegj.split(',');
                    obj.cbdee.cbegj = new Object();
                    obj.cbdee.cbegj.cbdfh = cbegj[0].replace('0x', '#');
                    obj.cbdee.cbegj.cbdfg = cbegj[1].replace('0x', '#');
                    var cbbcc = cbbgi(obj.cbdee.cbegj.cbdfh);
                    var cbajj = cbbgi(obj.cbdee.cbegj.cbdfg);
                    obj.cbdee.cbegj.cbdfh = '#' + number2Hex(parseInt(cbbcc.ccafc + (cbajj.ccafc - cbbcc.ccafc) * 0.10), 2) + number2Hex(parseInt(cbbcc.cbeaf + (cbajj.cbeaf - cbbcc.cbeaf) * 0.10), 2) + number2Hex(parseInt(cbbcc.cbaef + (cbajj.cbaef - cbbcc.cbaef) * 0.10), 2);
                    obj.cbdee.cbegj.cbdfg = '#' + number2Hex(parseInt(cbbcc.ccafc + (cbajj.ccafc - cbbcc.ccafc) * 0.90), 2) + number2Hex(parseInt(cbbcc.cbeaf + (cbajj.cbeaf - cbbcc.cbeaf) * 0.90), 2) + number2Hex(parseInt(cbbcc.cbaef + (cbajj.cbaef - cbbcc.cbaef) * 0.90), 2);
                    if (cbegj.length > 2) obj.cbdee.cbegj.ccafh = cbegj[2];
                    else obj.cbdee.cbegj.ccafh = 10;
                    obj.cbdee.cbegj.cbadj = true;
                    obj.cbdee.cbegj.cbbja = 'colorAlpha';
                }
            }
            if ($(ccdfh).attr('over')) {
                obj.cbiie = new Object();
                obj.cbiie.cbdff = $(ccdfh).attr('over').replace('0x', '#');
                if ($(ccdfh).attr('strokeColor')) obj.cbiie.cccej = $(ccdfh).attr('strokeColor').replace('0x', '#');
                else obj.cbiie.cccej = cbfia[cbgbc].ccchc.cbacf; if ($(ccdfh).attr('strokeWidth')) obj.cbiie.cccfa = Number($(ccdfh).attr('strokeWidth'));
                else obj.cbiie.cccfa = 1;
                obj.cbiie.ccdee = true;
            }
        }

        function cbjeh(ccdfh) {
            var cbidg;
            $(ccdfh).find('letteredLabel').each(function() {
                cbidg = new Object();
                cbidg.cbada = $(this).attr('attributeName');
                var cccha = $(this).attr('textStyle');
                cbidg.cccgj = cbdhb(cccha);
            });
            return cbidg;
        }

        function cbjbe(ccdfh, cbdec) {
            var cbidg = new Object();
            cbjbi(cbidg, ccdfh);
            cbidg.cbfbh = $(ccdfh).attr('id');
            cbidg.cbajd = $(ccdfh).attr('category');
            cbidg.cbfib = $(ccdfh).attr('label');
            cbjbd(cbidg, ccdfh, cbdec);
            cbjah(cbidg, ccdfh, cbdec);
            cbidg.cbgac = cbjeh(ccdfh);
            return cbidg;
        }

        function cbjba(ccdfh) {
            var cbidg = new Object();
            cbjbi(cbidg, ccdfh);
            cbidg.cbfbh = $(ccdfh).attr('id');
            cbidg.cbajd = $(ccdfh).attr('category');
            cbidg.cbfib = $(ccdfh).attr('label');
            cbjbd(cbidg, ccdfh, cbbdj.cbbec);
            cbjah(cbidg, ccdfh, cbbdj.cbbec);
            cbidg.cbgac = cbjeh(ccdfh);
            cbjai(ccdfh, cbidg);
            return cbidg;
        }

        function cbjei(ccdfh, cbajb) {
            var cbidg = new Object();
            cbjbi(cbidg, ccdfh);
            cbidg.cbfbh = $(ccdfh).attr('id');
            cbidg.cbchf = ccdae($(ccdfh).attr('enabled'));
            cbidg.cbfai = cbedc($(ccdfh).attr('iconUrl'), cbajb);
            cbjah(cbidg, ccdfh, cbajb);
            cbidg.cbgac = cbjeh(ccdfh);
            cbidg.cbgac = cbadc(cbidg.cbgac, cbfia[cbgbc].ccchc.cbgac);
            cajih(cbidg, cbfia[cbgbc].ccchc);
            cbjej(cbidg, ccdfh, cbajb);
            cbhee(cbidg, cbfia[cbgbc].ccchc);
            return cbidg;
        }

        function cbjfa(ccdfh, cbhdh) {
            var cbidg = new Object();
            cbjbi(cbidg, ccdfh);
            cbidg.cbfbh = $(ccdfh).attr('id');
            cbidg.cbajd = $(ccdfh).attr('category');
            cbidg.cbfib = $(ccdfh).attr('label');
            cbidg.cbfjh = $(ccdfh).attr('lat');
            cbidg.cbggb = $(ccdfh).attr('lon');
            cbidg.cbfai = cbedc($(ccdfh).attr('iconUrl'));
            var cccie = $(ccdfh).attr('zindex');
            if (cccie) cbidg.ccdfj = Number(cccie);
            cbjej(cbidg, ccdfh, cbhdh);
            cbjah(cbidg, ccdfh, cbhdh);
            cbidg.cbgac = cbjeh(ccdfh);
            return cbidg;
        }

        function cbjgd(ccdfh, cbbec) {
            var cbidg = new Object();
            cbidg.cbaaa = $(ccdfh).attr('align');
            cbidg.ccdbj = $(ccdfh).attr('verticalMargin');
            if (!cbidg.ccdbj) cbidg.ccdbj = 5;
            cbidg.cbejh = $(ccdfh).attr('horizontalMargin');
            if (!cbidg.cbejh) cbidg.cbejh = 5;
            cbidg.cbifi = $(ccdfh).attr('orientation');
            cbidg.cbagd = cbedc($(ccdfh).attr('buttonsPath'), cbbec);
            cbidg.cbagc = $(ccdfh).attr('buttonsExtension');
            if (!cbidg.cbagc) cbidg.cbagc = 'png';
            cbidg.cccad = ccdae($(ccdfh).attr('showCloseButton'), false);
            cbidg.cccbb = ccdae($(ccdfh).attr('showZoomButtons'), true);
            cbidg.showBackButton = ccdae($(ccdfh).attr('showBackButton'), true);
            cbidg.cccah = ccdae($(ccdfh).attr('showInitialViewButton'), false);
            cbidg.cccba = ccdae($(ccdfh).attr('showSelectByRectangleModeButton'), false);
            cbidg.cccaf = ccdae($(ccdfh).attr('showFullScreenButton'), false);
            cbidg.cccaj = ccdae($(ccdfh).attr('showPrintButton'), false);
            cbidg.cccag = ccdae($(ccdfh).attr('showHelpButton'), false);
            return cbidg;
        }

        function cbjff(ccdfh) {
            var cbidg = new Object();
            cbidg.cbceb = $(ccdfh).attr('div');
            cbidg.cbfhh = $(ccdfh).attr('jsFunction');
            var cccie = $(ccdfh).attr('align').toLowerCase();
            cbidg.cbaaa = cbfcj(cccie);
            return cbidg;
        }

        function cbjeg(cccjb, cbbec) {
            var cbidg = new Object();
            cbidg.cbaaa = cccjb['align'];
            cbidg.ccdbj = cccjb['verticalMargin'];
            if (cbidg.ccdbj == undefined) cbidg.ccdbj = 5;
            cbidg.cbejh = cccjb['horizontalMargin'];
            if (!cbidg.cbejh == undefined) cbidg.cbejh = 5;
            cbidg.cbifi = cccjb['orientation'];
            cbidg.cbagd = cbedc(cccjb['buttonsPath'], cbbec);
            cbidg.cbagc = cccjb['buttonsExtension'];
            if (!cbidg.cbagc) cbidg.cbagc = 'png';
            cbidg.cccad = cccjb['showCloseButton'];
            cbidg.cccbb = cccjb['showZoomButtons'];
            cbidg.showBackButton = cccjb['showBackButton'];
            cbidg.cccah = cccjb['showInitialViewButton'];
            cbidg.cccba = cccjb['showSelectByRectangleModeButton'];
            cbidg.cccaf = cccjb['showFullScreenButton'];
            cbidg.cccaj = cccjb['showPrintButton'];
            cbidg.cccag = cccjb['showHelpButton'];
            return cbidg;
        }

        function cbjdj(cbjij) {
            if (!cbjij) return undefined;
            var cbidg = new Object();
            cbidg.cbceb = cbjij['div'];
            cbidg.cbfhh = cbjij['jsFunction'];
            cbidg.cbaaa = cbjij['align'];
            return cbidg;
        }

        function cbjbg(ccdfh) {
            var cbidg = new Object();
            cbidg.ccdhb = ccdae($(ccdfh).attr('zoomInOutWheel'));
            cbidg.cbijg = ccdae($(ccdfh).attr('pan'));
            return cbidg;
        }

        function cbjcj(cbead) {
            var cbidg = new Object();
            cbidg.ccdhb = cbead['zoomInOutWheel'];
            cbidg.cbijg = cbead['pan'];
            return cbidg;
        }

        function cbjbh(ccdfh) {
            var cbidg = new Object();
            cbjbi(cbidg, ccdfh);
            $(ccdfh).children().each(function(cbhjd) {
                var cbich;
                if (cbidg[this.tagName] == undefined) {
                    cbidg[this.tagName] = new Object();
                    cbich = cbidg[this.tagName];
                } else {
                    if (cbdhh(cbidg[this.tagName]) != "array") {
                        var cbdhc = cbidg[this.tagName];
                        cbidg[this.tagName] = new Array();
                        cbidg[this.tagName].push(cbdhc);
                    }
                    cbidg[this.tagName].push(new Object());
                    cbich = cbidg[this.tagName][cbidg[this.tagName].length - 1];
                }
                cbjbi(cbich, this);
                $(this).children().each(function(cbhjd) {
                    cbich[this.tagName] = new Object();
                    var cbici = cbich[this.tagName];
                    cbjbi(cbici, this);
                });
            });
            return cbidg;
        }

        function cbjbi(cbicj, ccdfh) {
            $.each(ccdfh.attributes, function(cbfaf, cbaci) {
                cbicj[cbaci.name] = ccdad(cbaci.value);
            });
        }

        function cbjfh(cbicj, ccdfh) {
            cbicj.ccahf = new Array();
            $(ccdfh).find('referencePoint').each(function() {
                cbjfe(cbicj, this);
            });
            if (cbicj.ccahf.length != 0 && cbicj.ccahf.length != 3) {
                cbcje.ccdac(12010, cbicj.ccahf.length.toString());
            }
        }

        function cbjfe(cbicj, ccdfh) {
            var cbich = new Object();
            cbich.cbfjh = Number($(ccdfh).attr('lat'));
            cbich.cbggb = Number($(ccdfh).attr('lon'));
            cbich.ccdff = Number($(ccdfh).attr('x'));
            cbich.ccdfi = Number($(ccdfh).attr('y'));
            cbicj.ccahf.push(cbich);
        }

        function cbjbd(cbicj, ccdfh, ccdbc, cbdcf) {
            $(ccdfh).find('style').each(function() {
                cbjfc(cbicj, this, ccdbc, cbdcf);
            });
            $(ccdfh).find('featureStyle').each(function() {
                cbjfc(cbicj, this, ccdbc, cbdcf);
            });
        }

        function cbjfc(cbicj, ccdfh, ccdbc, cbdcf) {
            var cbich = new Object();
            var cccie = $(ccdfh).attr('fillColor');
            if (cccie != undefined) cbich.cbdff = cccie;
            cccie = $(ccdfh).attr('strokeColor');
            if (cccie != undefined) cbich.cccej = cccie;
            cccie = $(ccdfh).attr('strokeWidth');
            if (cccie != undefined) cbich.cccfa = Number(cccie);
            cbich.ccdee = ccdae($(ccdfh).attr('visible'), true);
            cccie = $(ccdfh).attr('scale');
            if (cccie != undefined) cbich.ccbbg = Number(cccie);
            cccie = $(ccdfh).attr('iconUrl');
            if (cccie != undefined) {
                cbich.cbfai = cbedc(cccie, ccdbc);
                cbich.cbfbc = new Image();
                cbich.cbfbc.src = cbich.cbfai;
            }
            cbich.width = Number($(ccdfh).attr('width'));
            cbich.height = Number($(ccdfh).attr('height'));
            if (cbdcf) {
                cbich.cbegj = cbjbj(ccdfh, cbdcf);
            }
            var cccha = $(ccdfh).attr('textStyle');
            if (cccha) cbich.cccgj = cbdhb(cccha);
            switch ($(ccdfh).attr('event').toLowerCase()) {
                case 'onmouseout':
                    cbicj.cbdee = cbich;
                    break;
                case 'onmouseover':
                    cbicj.cbiie = cbich;
                    break;
                case 'onhighlighted':
                    cbicj.cbejd = cbich;
                    break;
            }
        }

        function cbjga(cbicj, ccdfh, ccdbc) {
            cbicj.ccccc = new Array();
            $(ccdfh).find('signStyle').each(function() {
                var cbich = new Object();
                cbich.cbfbh = $(this).attr('id');
                cbich.cbfbf = new Array();
                cbich.cbfbd = new Array();
                cbich.cbfbg = new Array();
                cbich.cbfbb = new Array();
                var cccie = $(this).attr('iconUrlPattern');
                cccie = cccie.split(",");
                var cbfbe = cccie[0];
                cbich.cbhgd = Number(cccie[1]);
                cbich.cbhfc = Number(cccie[2]);
                for (var cbfaf = cbich.cbhgd; cbfaf <= cbich.cbhfc; cbfaf++) {
                    var cbfai = cbedc(cbfbe.replace("*", cbfaf.toString()), ccdbc);
                    cbich.cbfbf.push(cbfai);
                    var cbfbc = new Image();
                    cbfbc.src = cbfai;
                    cbich.cbfbd.push(cbfbc);
                    cbich.cbfbg.push(undefined);
                    cbich.cbfbb.push(undefined);
                }
                cbich.width = $(this).attr('width');
                cbich.height = $(this).attr('height');
                var cccha = $(this).attr('textStyle');
                if (cccha) cbich.cccgj = cbdhb(cccha);
                cbicj.ccccc.push(cbich);
            });
        }

        function cbjej(cbicj, ccdfh, ccdbc, cbdcf) {
            $(ccdfh).find('style').each(function() {
                cbjfd(cbicj, this, ccdbc, cbdcf);
            });
            $(ccdfh).find('markerStyle').each(function() {
                cbjfd(cbicj, this, ccdbc, cbdcf);
            });
        }

        function cbjfd(cbicj, ccdfh, ccdbc, cbdcf) {
            var cbich = new Object();
            var cccie = $(ccdfh).attr('scale');
            if (cccie != undefined) cbich.ccbbg = cccie;
            cccie = $(ccdfh).attr('opacity');
            if (cccie != undefined) cbich.cbifh = cccie;
            cbich.ccdee = ccdae($(ccdfh).attr('visible'), true);
            cccie = $(ccdfh).attr('iconUrl');
            if (cccie != undefined) {
                cbich.cbfai = cbedc(cccie, ccdbc);
                cbich.cbfbc = new Image();
                cbich.cbfbc.src = cbich.cbfai;
            }
            cccie = $(ccdfh).attr('width');
            if (cccie) cbich.width = Number(cccie);
            cccie = $(ccdfh).attr('height');
            if (cccie) cbich.height = Number(cccie);
            switch ($(ccdfh).attr('event').toLowerCase()) {
                case 'onmouseout':
                    cbicj.cbheb = cbich;
                    break;
                case 'onmouseover':
                    cbicj.cbiif = cbich;
                    break;
                case 'onhighlighted':
                    cbicj.cbeje = cbich;
                    break;
            }
        }

        function cbjbj(ccdfh, cbfbh) {
            var cbidg;
            $(ccdfh).find('gradient').each(function() {
                cbidg = new Object();
                cbidg.cbfeb = ccdae($(this).attr('inherit'));
                if (cbidg.cbfeb) {
                    if (cbgbc > 0) {
                        var cbjhf = cbdgd(cbfbh, cbgbc - 1);
                        var cbjhj = cbjhf.cbdee.cbegj;
                        cbidg.cbdfh = cbjhj.cbdfh;
                        cbidg.cbdfg = cbjhj.cbdfg;
                        cbidg.cbbja = cbjhj.cbbja;
                        cbidg.cbehg = cbjhj.cbehg;
                        cbidg.cccfd = cbjhj.cccfd;
                        cbidg.ccafh = cbjhj.ccafh;
                        cbidg.cbadj = cbjhj.cbadj;
                        if (cbjhj.ccagb) {
                            cbidg.ccagb = new Array();
                            for (var cbfaf in cbjhj.ccagb) cbidg.ccagb.push(cbjhj.ccagb[cbfaf]);
                        }
                        cbidg.ccafj = cbjhj.ccafj;
                        cbidg.ccaga = cbjhj.ccaga;
                    }
                } else {
                    cbidg.cbdfh = $(this).attr('fillColorLowest');
                    cbidg.cbdfg = $(this).attr('fillColorHighest');
                    cbidg.cbbja = $(this).attr('dataAttribute');
                    cbidg.cbehg = $(this).attr('header');
                    cbidg.cccfd = $(this).attr('subheader');
                    cbidg.ccafh = $(this).attr('ranges');
                    cbidg.cbadj = false;
                    var ccagc = $(this).attr('rangeValues');
                    if (ccagc.toLowerCase() == 'auto') cbidg.cbadj = true;
                    else {
                        if (ccagc) cbidg.ccagb = ccagc.split(',');
                        else alert("Please set 'auto' or comma-delimited range values in the gradient's rangeValues attribute");
                    }
                    cbidg.ccafj = $(this).attr('rangeTextPrefix');
                    cbidg.ccaga = $(this).attr('rangeTextSufix');
                }
            });
            return cbidg;
        }

        function cbdeh(cbicj, cbcbe) {
            if (!cbcbe) cbcbe = new Object();
            if (!cbicj.cbdee) cbicj.cbdee = new Object();
            cbdef(cbicj.cbdee, cbcbe.cbdee);
            if (!cbicj.cbiie) cbicj.cbiie = new Object();
            cbdef(cbicj.cbiie, cbcbe.cbiie);
            if (!cbicj.cbejd) cbicj.cbejd = new Object();
            cbdef(cbicj.cbejd, cbcbe.cbejd);
        }

        function cbhee(cbicj, cbcbe) {
            if (!cbcbe) cbcbe = new Object();
            if (!cbicj.cbheb) cbicj.cbheb = new Object();
            cbhec(cbicj.cbheb, cbcbe.cbheb);
            if (!cbicj.cbiif) cbicj.cbiif = new Object();
            cbhec(cbicj.cbiif, cbcbe.cbiif);
            if (!cbicj.cbeje) cbicj.cbeje = new Object();
            cbhec(cbicj.cbeje, cbcbe.cbeje);
        }

        function cbhec(cbidd, cbcbg) {
            var cbabf = false;
            for (var ccaed in cbidd) {
                cbabf = true;
                break;
            }
            if (cbabf) {
                if (!cbcbg) {
                    cbidd = new Object();
                    cbidd.ccbbg = 1;
                    cbidd.cbifh = 1;
                } else {
                    cbidd = cbcbg;
                }
            }
            if (!cbidd.ccbbg) {
                if (!cbcbg) cbidd.ccbbg = '1';
                else cbidd.ccbbg = cbcbg.ccbbg;
            }
            if (!cbidd.cbifh) {
                if (!cbcbg) cbidd.cbifh = '1';
                else cbidd.cbifh = cbcbg.cbifh;
            }
            if (!cbidd.cbfai) {
                if (cbcbg) {
                    cbidd.cbfai = cbcbg.cbfai;
                    cbidd.cbfbc = cbcbg.cbfbc;
                }
            }
            if (!cbidd.width) {
                if (cbcbg) cbidd.width = cbcbg.width;
            }
            if (!cbidd.height) {
                if (cbcbg) cbidd.height = cbcbg.height;
            }
            if (cbidd.ccdee == undefined) {
                if (cbcbg) cbidd.ccdee = cbcbg.ccdee;
            }
        }

        function cbdef(cbida, cbcbf) {
            var cbabf = false;
            for (var ccaed in cbida) {
                cbabf = true;
                break;
            }
            if (cbabf) {
                if (!cbcbf) {
                    cbida = new Object();
                    cbida.cbdff = 'rgba(200, 200, 200, 1)';
                    cbida.cccej = 'rgba(100, 100, 100, 1)';
                    cbida.cccfa = 3;
                    cbida.ccbbg = 1;
                    cbida.ccdee = true;
                } else {
                    cbida = cbcbf;
                }
            }
            if (!cbida.cbdff) {
                if (!cbcbf) cbida.cbdff = 'rgba(200, 200, 200, 1)';
                else cbida.cbdff = cbcbf.cbdff;
            }
            if (!cbida.cccej) {
                if (!cbcbf) cbida.cccej = 'rgba(100, 100, 100, 1)';
                else cbida.cccej = cbcbf.cccej;
            }
            if (!cbida.cccfa) {
                if (!cbcbf) cbida.cccfa = 3;
                else cbida.cccfa = cbcbf.cccfa;
            }
            if (!cbida.ccbbg) {
                if (!cbcbf) cbida.ccbbg = 1;
                else cbida.ccbbg = cbcbf.ccbbg;
            }
            if (!cbida.cbfai) {
                if (cbcbf) {
                    cbida.cbfai = cbcbf.cbfai;
                    cbida.cbfbc = cbcbf.cbfbc;
                }
            }
            if (!cbida.width) {
                if (cbcbf) cbida.width = cbcbf.width;
            }
            if (!cbida.height) {
                if (cbcbf) cbida.height = cbcbf.height;
            }
            if (!cbida.cbegj) {
                if (cbcbf) cbida.cbegj = cbcbf.cbegj;
            }
            if (cbida.ccdee == undefined) {
                if (cbcbf) cbida.ccdee = cbcbf.ccdee;
                else cbida.ccdee = true;
            }
            if (!cbida.cccgj) {
                if (cbcbf) cbida.cccgj = cbcbf.cccgj;
            }
        }

        function cbjah(cbicj, ccdfh, ccdbc) {
            cbicj.cajif = new Array();
            $(ccdfh).find('action').each(function() {
                var cbich = new Object();
                cbich.event = $(this).attr('event').toLowerCase();
                var cccie = $(this).attr('target');
                if (cccie) cbich.cccfj = cccie.toLowerCase();
                cccie = $(this).attr('url');
                if (cccie) cbich.ccdaj = cbedc(cccie, ccdbc);
                cccie = $(this).attr('align');
                if (cccie) cbich.cbaaa = cccie.toLowerCase();
                cbich.cbaaa = cbfcj(cbich.cbaaa);
                cbich.cbhjg = $(this).attr('newCategory');
                cbich.cbfhh = $(this).attr('jsFunction');
                cbich.cbfdd = $(this).attr('infoWindowDiv');
                cbich.cbfdc = $(this).attr('infoWindowContentDiv');
                if (cbich.cccfj.toLowerCase() == "loadchild") cbich.cbdih = ccdae($(this).attr('focusOnChild'), false);
                cbicj.cajif.push(cbich);
            });
        }

        function cbjbf(cbicj, ccdfh) {
            cbicj.cbdgb = new Array();
            $(ccdfh).find('filter').each(function() {
                var cbich = new Object();
                cbich.cbfbh = $(this).attr('id');
                cbich.type = $(this).attr('type');
                var cccgf = $(this).attr('offsetX');
                if (cccgf) cbich.offsetX = Number(cccgf);
                cccgf = $(this).attr('offsetY');
                if (cccgf) cbich.offsetY = Number(cccgf);
                cccgf = $(this).attr('blur');
                if (cccgf) cbich.cbafd = Number(cccgf);
                cbich.cbdff = $(this).attr('fillColor');
                switch (cbich.type.toLowerCase()) {
                    case 'shadow':
                        if (cbich.offsetX == undefined) cbich.offsetX = 4;
                        if (cbich.offsetY == undefined) cbich.offsetY = 4;
                        if (cbich.cbafd == undefined) cbich.cbafd = 4;
                        if (!cbich.cbdff) cbich.cbdff = 'rgba(63, 63, 63, 1)';
                        break;
                    case 'glow':
                        if (cbich.cbafd == undefined) cbich.cbafd = 4;
                        if (!cbich.cbdff) cbich.cbdff = 'rgba(63, 63, 63, 1)';
                        break;
                }
                cbicj.cbdgb.push(cbich);
            });
        }

        function cbjci(cbicj, cbdgb) {
            cbicj.cbdgb = new Array();
            for (var cbfaf in cbdgb) {
                var cbdfi = cbdgb[cbfaf];
                var cbich = new Object();
                cbich.cbfbh = cbdfi['id'];
                cbich.type = cbdfi['type'];
                var cccgf = cbdfi['offsetX'];
                if (cccgf != undefined) cbich.offsetX = cccgf;
                cccgf = cbdfi['offsetY'];
                if (cccgf != undefined) cbich.offsetY = cccgf;
                cccgf = cbdfi['blur'];
                if (cccgf != undefined) cbich.cbafd = cccgf;
                cbich.cbdff = cbdfi['fillColor'];
                switch (cbich.type.toLowerCase()) {
                    case 'shadow':
                        if (cbich.offsetX == undefined) cbich.offsetX = 4;
                        if (cbich.offsetY == undefined) cbich.offsetY = 4;
                        if (cbich.cbafd == undefined) cbich.cbafd = 4;
                        if (!cbich.cbdff) cbich.cbdff = 'rgba(63, 63, 63, 1)';
                        break;
                    case 'glow':
                        if (cbich.cbafd == undefined) cbich.cbafd = 4;
                        if (!cbich.cbdff) cbich.cbdff = 'rgba(63, 63, 63, 1)';
                        break;
                }
                cbicj.cbdgb.push(cbich);
            }
        }

        function cbjgb(cbicj, ccdfh) {
            cbicj.ccchb = new Array();
            $(ccdfh).find('textStyle').each(function() {
                var cbich = new Object();
                cbich.cbfbh = $(this).attr('id');
                var cbdga = $(this).attr('filterId');
                cbich.cbdfi = cbdge(cbdga);
                var cccgf = $(this).attr('fontName');
                if (cccgf) cbich.cbdjd = cccgf;
                else cbich.cbdjd = 'arial';
                cccgf = $(this).attr('fontSize');
                if (cccgf) cbich.cbdje = Number(cccgf);
                else cbich.cbdje = 12;
                cccgf = $(this).attr('fontBold');
                if (cccgf) cbich.cbdjb = ccdae(cccgf);
                else cbich.cbdjb = false;
                cccgf = $(this).attr('fontItalic');
                if (cccgf) cbich.cbdjc = ccdae(cccgf);
                else cbich.cbdjc = false;
                cccgf = $(this).attr('align');
                if (cccgf) cbich.cbaaa = $(this).attr('align');
                else cbich.cbaaa = 'center';
                cccgf = $(this).attr('lineWidth');
                if (cccgf) cbich.lineWidth = Number(cccgf);
                else cbich.lineWidth = 0.5;
                cccgf = $(this).attr('strokeColor');
                if (cccgf) cbich.cccej = cccgf;
                else cbich.cccej = '#888';
                cccgf = $(this).attr('fillColor');
                if (cccgf) cbich.cbdff = cccgf;
                else cbich.cbdff = '#fff';
                cccgf = $(this).attr('offsetX');
                if (cccgf) cbich.offsetX = Number(cccgf);
                else cbich.offsetX = 0;
                cccgf = $(this).attr('offsetY');
                if (cccgf) cbich.offsetY = Number(cccgf);
                else cbich.offsetY = 0;
                cbicj.ccchb.push(cbich);
            });
        }

        function cbjef(cbicj, ccchb) {
            cbicj.ccchb = new Array();
            for (var cbfaf in ccchb) {
                var cccgj = ccchb[cbfaf];
                var cbich = new Object();
                cbich.cbfbh = cccgj['id'];
                var cbdga = cccgj['filterId'];
                if (cbdga) cbich.cbdfi = cbdge(cbdga);
                var cccgf = cccgj['fontName'];
                if (cccgf) cbich.cbdjd = cccgf;
                else cbich.cbdjd = 'arial';
                cccgf = cccgj['fontSize'];
                if (cccgf) cbich.cbdje = cccgf;
                else cbich.cbdje = 12;
                cccgf = cccgj['fontBold'];
                if (cccgf) cbich.cbdjb = cccgf;
                else cbich.cbdjb = false;
                cccgf = cccgj['fontItalic'];
                if (cccgf) cbich.cbdjc = cccgf;
                else cbich.cbdjc = false;
                cccgf = cccgj['align'];
                if (cccgf) cbich.cbaaa = cccgf;
                else cbich.cbaaa = 'center';
                cccgf = cccgj['lineWidth'];
                if (cccgf != undefined) cbich.lineWidth = cccgf;
                else cbich.lineWidth = 0.5;
                cccgf = cccgj['strokeColor'];
                if (cccgf) cbich.cccej = cccgf;
                else cbich.cccej = '#888';
                cccgf = cccgj['fillColor'];
                if (cccgf) cbich.cbdff = cccgf;
                else cbich.cbdff = '#fff';
                cccgf = cccgj['offsetX'];
                if (cccgf) cbich.offsetX = Number(cccgf);
                else cbich.offsetX = 0;
                cccgf = cccgj['offsetY'];
                if (cccgf) cbich.offsetY = Number(cccgf);
                else cbich.offsetY = 0;
                cbicj.ccchb.push(cbich);
            }
        }

        function cajih(cbicj, cbcbe) {
            if (!cbicj.cajif || cbicj.cajif.length == 0) {
                if (cbcbe != null && cbcbe.cajif != null && cbcbe.cajif.length > 0) cbicj.cajif = cbcbe.cajif;
            } else {
                cajie(cbicj, cbcbe, 'onmouseover');
                cajie(cbicj, cbcbe, 'onmouseout');
                cajie(cbicj, cbcbe, 'onclick');
            }
        }

        function cajie(obj, cbcbe, cbcjh) {
            var cajif = cajig(obj, cbcjh);
            if (cajif.length == 0) {
                var cbcbd = cajig(cbcbe, cbcjh);
                for (var cbfaf in cbcbd) {
                    obj.cajif.push(cbcbd[cbfaf]);
                }
            }
        }

        function cajig(obj, cbcjh) {
            if (obj == null) return undefined;
            var cajii = new Array();
            for (var cbfaf in obj.cajif) {
                var cajid = obj.cajif[cbfaf];
                if (cajid.event == cbcjh) cajii.push(cajid);
            }
            return cajii;
        }

        function cbadc(cbacj, cbcbh) {
            var cbadb = cbacj;
            if (cbacj == undefined) cbadb = cbcbh;
            return cbadb;
        }

        function ccbcj() {
            var cbdia = new Object();
            var cbehe = false;
            if (cbjae["features"] && cbjae["shapes"]) {
                ccbed.insertFeaturesAndShapes(cbjae['features'], cbjae['shapes']);
            }
            if (cbjae["markers"]) {
                ccbed.insertMarkers(cbjae['markers']);
            }
            if (cbjae["focusBox"] && cbjae["focusBox"] != '') {
                var cbdic = cbjae["focusBox"].split('|');
                cbehe = true;
                for (var cbfaf in cbdic) {
                    if (isNaN(cbdic[cbfaf])) cbehe = false;
                }
                if (Number(cbdic[0]) > Number(cbdic[2])) cbehe = false;
                if (Number(cbdic[1]) > Number(cbdic[3])) cbehe = false;
            }
            if (cbehe) {
                cbdia.cbhga = new Object();
                cbdia.cbhga.ccdff = Number(cbdic[0]);
                cbdia.cbhga.ccdfi = Number(cbdic[1]);
                cbdia.cbheh = new Object();
                cbdia.cbheh.ccdff = Number(cbdic[2]);
                cbdia.cbheh.ccdfi = Number(cbdic[3]);
                cbfga = false;
            } else if (cbjae["focusOnFeature"]) {
                var cbdbh = cbdgc(cbjae["focusOnFeature"]);
                if (cbdbh) {
                    cbdia = cbeeh(cbdbh);
                    cbfga = false;
                } else ccajc("featureNotFound", {
                    "parameter": 'focusOnFeature',
                    "featureId": cbjae['focusOnFeature']
                });
            } else if (cbjae["focusAndHighlightFeature"]) {
                var cbdbh = cbdgc(cbjae["focusAndHighlightFeature"]);
                if (cbdbh) {
                    cbdia = cbeeh(cbdbh);
                    cbdbh.cbejc = true;
                    cbfga = false;
                } else ccajc("focusAndHighlightFeature", {
                    "parameter": 'focusAndHighlightFeature',
                    "featureId": cbjae['focusAndHighlightFeature']
                });
            } else if (cbjae["focusOnFeatureCategories"]) {
                cbdia = cbeeg(cbjae['focusOnFeatureCategories']);
                cbfga = false;
            } else if (cbjae["focusOnPoint"]) {
                var ccaac = {
                    ccdff: cbjae['focusOnPoint']["x"],
                    ccdfi: cbjae['focusOnPoint']["y"]
                };
                if (cbbdj.ccddf || cbbdj.ccddj) ccbaa(ccaac);
                var obj = new Object();
                obj.ccdff = ccaac.ccdff;
                obj.ccdfi = ccaac.ccdfi;
                obj.ccbbg = cbjae['focusOnPoint']["scale"];
                cbdia = cbefi(obj);
                cbfga = false;
            } else {
                cbdia.cbhga = {
                    ccdff: 0,
                    ccdfi: 0
                };
                cbdia.cbheh = {
                    ccdff: cbfia[cbgbc].cbgjd.ccdff,
                    ccdfi: cbfia[cbgbc].cbgjd.ccdfi
                };
            } if (cbjae["clickOnFeature"]) {
                var cbdbh = cbdgc(cbjae["clickOnFeature"]);
                if (cbdbh) {
                    ccdbf.cbdfc = cbjae["clickOnFeature"];
                } else ccajc("featureNotFound", {
                    "parameter": 'clickOnFeature',
                    "featureId": cbjae['clickOnFeature']
                });
            }
            if (cbfia[cbgbc].ccchc.cbhfa) {
                var cbace = cbagj(cbdia);
                if (cbace > cbfia[cbgbc].ccchc.cbhfa) cajjd(cbdia, cbfia[cbgbc].ccchc.cbhfa);
            }
            if (cbfia[cbgbc].ccchc.cbhgh) {
                var cbace = cbagj(cbdia);
                if (cbace < cbfia[cbgbc].ccchc.cbhgh) cajjd(cbdia, cbfia[cbgbc].ccchc.cbhgh);
            }
            cbdja(cbdia, cbbdj.ccdgg);
        }

        function ccbcb(cbffj, cbfig) {
            if (!cbfia[cbgbc].cbgii) return;
            ccbbc.shapesDrawingNextKey = 0;
            if (cbffj) ccdbf.ccbcg = (new Date()).getTime();
            ccbcc(cbffj, cbfig);
        }

        function ccbcc(cbffj, cbfig) {
            for (cajjf in cbfia) {
                if (!ccbbc.shapesDrawingNextKey || cajjf >= ccbbc.ccbif) {
                    if ((cajjf == cbgbc - 1 && cbbdj.ccade != 0) || (cajjf == cbgbc)) ccbce(cajjf, cbffj, cbfig);
                    if (ccbbc.shapesDrawingNextKey) return;
                }
            }
            if (cbffj && !ccbbc.shapesDrawingNextKey) {
                ccbef();
                if (!cbbdj.cbjih) {
                    cbfef();
                    for (var cajjf = cbgbc; cajjf >= 0; cajjf--) ccbcd(cajjf);
                }
                var obj = new Object();
                obj["minScaleFactor"] = cbfia[cbgbc].ccchc.cbhgh;
                obj["maxScaleFactor"] = cbfia[cbgbc].ccdgb;
                obj["scaleFactor"] = cbegg / cbfia[cbgbc].cbgja;
                obj["visibleFeatures"] = ccdbf.ccdef;
                ccajc("zoomFinished", obj);
                ccbgc();
                setTimeout(function() {
                    ccbhd();
                }, 0);
                ccaei();
                cbjjf();
                cccih.cbjje();
                if (!ccdbf.cbbbj && cbfia[cbgbc].cbdhg.ccbbi && cbfia[cbgbc].cbdhg.ccbii && cbfia[cbgbc].cbdhg.cbddh) {
                    if (ccdbf.cbdif) cbdig();
                }
                if (cbffj) ccdbf.cccid = (new Date()).getTime() - ccdbf.ccbcg;
            }
        }

        function cbdig() {
            if (cbgbc == ccdbf.cbdif["ids"].length - 1) {
                cbdhi(ccdbf.cbdif["ids"][cbgbc], ccdbf.cbdif["considerGeolocation"]);
                ccdbf.cbdif = undefined;
            } else cbbcf(obj["ids"][cbgbc + 1]); if (ccdbf.cbdif) ccdbf.cbdif["ids"][cbgbc] = undefined;
        }

        function cbjii(cbche, event) {
            if (!cbfff) return;
            cbiea(cbche);
            if (!cbfgd()) {
                ccdde = cbefj(cbche);
                var cbbfd = cbfia[cbgbc].cbcih.ccdcg(ccdde, cbegg);
                var cbidg = new Object();
                cbidg['source'] = 'pixelInfo';
                cbidg['event'] = event;
                cbidg['pageX'] = ccdde.pageX;
                cbidg['pageY'] = ccdde.pageY;
                cbidg['viewportX'] = ccdde.ccdff;
                cbidg['viewportY'] = ccdde.ccdfi;
                cbidg['lat'] = cbbfd.cbfjh;
                cbidg['lon'] = cbbfd.cbggb;
                var cbiii = cbfia[cbgbc].ccabh.getImageData(ccdde.ccdff, ccdde.ccdfi, 1, 1).data;
                cbidg['r'] = cbiii[0];
                cbidg['g'] = cbiii[1];
                cbidg['b'] = cbiii[2];
                cbcji['formattedLat'] = cbbej(cbbfd.cbfjh, 'lat', cbbdj.cbbfa);
                cbcji['formattedLon'] = cbbej(cbbfd.cbggb, 'lon', cbbdj.cbbfa);
                cbidg['formattedLat'] = cbcji['formattedLat'];
                cbidg['formattedLon'] = cbcji['formattedLon'];
                if (cbbdj.cbjih.cbceb) cbfde(cbbdj.cbjih.cbceb, cbbdj.cbjih.cbceb, cbbdj.cbjih.cbaaa, true);
                if (cbbdj.cbjih.cbfhh) ccbbb(cbbdj.cbjih.cbfhh, cbidg);
            }
        }

        function ccbce(cajjf, cbffj, cbfig) {
            ccbbc.cbhfe = (new Date()).getTime() + 1000;
            ccbcf(cajjf, cbffj);
            if (cbffj) {
                if (cbfia[cajjf].cbhac) cbfia[cajjf].cbhac.hide(0);
                cbchc(cajjf);
                if (!cbfia[cajjf].ccchc.platformFunctionality.cbccj) {
                    if (cbfia[cajjf].cbghh) cbfia[cajjf].cbghh.hide();
                    if (cbfia[cajjf].cbghi) cbfia[cajjf].cbghi.hide();
                }
                if (cajjf == cbgbc) ccahc(cajjf);
            }
            ccada(cajjf, cbffj);
        }

        function ccbfj(ccadb, ccadc) {
            cbgjc.css({
                left: parseInt(ccadb),
                top: parseInt(ccadc)
            });
        }

        function ccbcf(cajjf, cbffj) {
            if (!cbfia[cajjf].cbfie) cbfia[cajjf].cbfie = new Object();
            if (cbfia[cajjf].cbghi && cbfia[cajjf].cbgjd) {
                if (cajjf >= cbgbc - 1) {
                    if (cbegg != cbfia[cajjf].cbfie.cbghi) {
                        cbfia[cajjf].cbghi.show(0);
                        cbfia[cajjf].cbghi.width(cbfia[cajjf].cbgjd.ccdff * cbfia[cajjf].cbgja / cbegg);
                        cbfia[cajjf].cbghi.height(cbfia[cajjf].cbgjd.ccdfi * cbfia[cajjf].cbgja / cbegg);
                        cbfia[cajjf].cbfie.cbghi = cbegg;
                    }
                }
            }
            if ((cbfia[cajjf].cbghh && cbfia[cajjf].cbgjd) && (cbffj || !cbfia[cajjf].cbghi)) {
                if (cajjf >= cbgbc - 1) {
                    if (cbegg != cbfia[cajjf].cbfie.cbghh || cbfia[cajjf].cbghi) {
                        cbfia[cajjf].cbghh.show(0);
                        cbfia[cajjf].cbghh.width(cbfia[cajjf].cbgjd.ccdff * cbfia[cajjf].cbgja / cbegg);
                        cbfia[cajjf].cbghh.height(cbfia[cajjf].cbgjd.ccdfi * cbfia[cajjf].cbgja / cbegg);
                        cbfia[cajjf].cbfie.cbghh = cbegg;
                    }
                }
            }
            if ((cbfia[cajjf].cbgif && cbfia[cajjf].cbgjd) && (cbffj || (!cbfia[cajjf].cbghi && !cbfia[cajjf].cbghh))) {
                if (cajjf >= cbgbc - 1) {
                    if (cbegg != cbfia[cajjf].cbfie.cbghh || cbfia[cajjf].cbghi || cbfia[cajjf].cbghh) {
                        cbfia[cajjf].cbgif.show(0);
                        cbfia[cajjf].cbgif.width(cbfia[cajjf].cbgjd.ccdff * cbfia[cajjf].cbgja / cbegg);
                        cbfia[cajjf].cbgif.height(cbfia[cajjf].cbgjd.ccdfi * cbfia[cajjf].cbgja / cbegg);
                        cbfia[cajjf].cbfie.cbghh = cbegg;
                    }
                }
            }
            if (cbfia[cajjf].cbhab) {
                if (cajjf == cbgbc) {
                    if (cbfia[cajjf].cbegg.cbgjj && cbegg != cbfia[cajjf].cbfie.cbgjj) {
                        var cbdbb = cbfia[cajjf].cbegg.cbgjj / cbegg;
                        cbfia[cajjf].cbhac.show(0);
                        var cbidi = true;
                        if (cbdbb > 10) cbidi = false;
                        if (cbidi) {
                            cbfia[cajjf].cbhac.css('left', cbfia[cajjf].ccdce * cbdbb);
                            cbfia[cajjf].cbhac.css('top', cbfia[cajjf].ccdec * cbdbb);
                            cbfia[cajjf].cbhab.width = cbfia[cajjf].ccded * cbdbb;
                            cbfia[cajjf].cbhab.height = cbfia[cajjf].ccdcd * cbdbb;
                            cbfia[cajjf].cbhaa['scale'](cbdbb, cbdbb);
                            cbfia[cajjf].cbhaa.drawImage(cbfia[cajjf].cbgic, 0, 0);
                            cbfia[cajjf].cbfie.cbgjj = cbegg;
                        }
                    }
                }
            }
        }

        function ccbhd() {
            if (ccdbe) return;
            cbfia[cbgbc].cbegg.cbgjj = cbegg;
        }

        function ccada(cajjf, cbffj) {
            if (cbfia[cajjf].ccach.length == 0) return;
            if (!ccaci(cajjf)) {
                setTimeout("jqmInstances[" + cbfej + "].obj.retryToRedrawPositionedImages(" + cajjf + ", " + cbffj + ");", 100);
                return;
            }
            cbgdh.hideMessage("Loading positioned images...");
            ccbha(cajjf);
            cbaij(cajjf, cbfia[cajjf].ccaca, cbfia[cajjf].ccabi);
            if (ccdbe) {
                {
                    if (!cbfia[cajjf].currentCanvasScale) {
                        cbfia[cajjf].currentCanvasScale = 1;
                        cbfia[cajjf].currentCanvasTranslation = {
                            ccdff: 0,
                            ccdfi: 0
                        };
                    }
                    cbfia[cajjf].ccabh.translate(-cbfia[cajjf].currentCanvasTranslation.ccdff, -cbfia[cajjf].currentCanvasTranslation.ccdfi);
                    cbfia[cajjf].ccabh['scale'](1 / cbfia[cajjf].currentCanvasScale, 1 / cbfia[cajjf].currentCanvasScale);
                }
            }
            cbfia[cajjf].currentCanvasScale = cbfia[cajjf].cbgja / cbegg;
            cbfia[cajjf].ccabh['scale'](cbfia[cajjf].currentCanvasScale, cbfia[cajjf].currentCanvasScale);
            ccbfg(cajjf);
            cbfia[cajjf].currentCanvasTranslation = {
                ccdff: -cbfia[cajjf].cbaic.left,
                ccdfi: -cbfia[cajjf].cbaic.top
            };
            cbfia[cajjf].ccabh.translate(cbfia[cajjf].currentCanvasTranslation.ccdff, cbfia[cajjf].currentCanvasTranslation.ccdfi);
            for (var ccbbe = 0; ccbbe < cbfia[cajjf].ccach.length; ccbbe++) {
                var ccabg = cbfia[cajjf].ccach[ccbbe];
                cbcgc(cajjf, cbfia[cajjf].ccabh, ccabg);
            }
        }

        function ccbbh(cajjf) {
            ccdai();
            if (!cbfia[cajjf].cbgii) return;
            if (!cbfia[cajjf].cbcih.cbbjb) return;
            var cbedb = cbfia[cajjf].cbcih.cbjif(new Object({
                ccdff: 0,
                ccdfi: 0
            }), cbegg);
            var cbjjc = cbfia[0].cbcih.cbeaj(cbedb, cbegg, true);
            cbabh(cajjf, cbjjc);
        }

        function cbabh(cajjf, cbjic) {
            cbfia[cajjf].cbgii.css({
                left: cbjic.ccdff,
                top: cbjic.ccdfi
            });
        }

        function ccdcf() {
            cbdja(cbfia[cbgbc].cbfeg, cbbdj.ccdgg);
            if (cbgbc == 0) cccih.cbeia();
        }

        function ccbfe() {
            clearTimeout(cbdie.cccic);
            cbdie.cccic = setTimeout("jqmInstances[" + cbfej + "].obj.focusAnimation()", 1);
        }

        function ccbfd() {
            clearTimeout(cbdie.cccic);
            cbdie.cccic = setTimeout("jqmInstances[" + cbfej + "].obj.focusAnimationEnd()", 1);
        }

        function cbfef() {
            var cbacd = "jqmMapAreas" + cbfej;
            cbghg[0].useMap = '';
            cbghf.html("<map id='" + cbacd + "' name='" + cbacd + "' >");
            cbghg.css('left', -cbgjc.position().left);
            cbghg.css('top', -cbgjc.position().top);
            cbghg.width(ccdda.width);
            cbghg.height(ccdda.height);
        }

        function ccbcd(cajjf) {
            if (!cbfia[cajjf].ccchc) {
                return;
            }
            if (cbfia[cajjf].ccchc.platformFunctionality.cbahf) {
                return;
            }
            if (cajjf < cbgbc - 1) {
                return;
            }
            if (cajjf != cbgbc && cbbdj.ccade == 0) {
                return;
            }
            ccbha(cajjf);
            ccbfg(cajjf);
            var cbacd = "jqmMapAreas" + cbfej;
            var cbacc = document.getElementById(cbacd);
            var ccbbg = cbfia[cajjf].cbgja / cbegg;
            cbagi(cajjf);
            var total = cbfia[cajjf].ccbie.length;
            for (var ccbbe = total - 1; ccbbe >= 0; ccbbe--) {
                var ccbhh = cbfia[cajjf].ccbie[ccbbe];
                if (ccbhh.ccdcc) {
                    switch (ccbhh.type) {
                        case "box":
                            if (ccbhh.cbdbh.cbiie.width && ccbhh.cbdbh.cbiie.height) {
                                var ccdei = ccbhh.cbdbh.cbiie.width / 2;
                                var cbehd = ccbhh.cbdbh.cbiie.height / 2;
                                var ccdff = Math.round((ccbhh.cbgeh.ccdff - ccdei) * ccbbg) + ccdbf.ccabf.ccdff;
                                var ccdfi = Math.round((ccbhh.cbgeh.ccdfi - cbehd) * ccbbg) + ccdbf.ccabf.ccdfi;
                                var cbbfd = ccdff + "," + ccdfi;
                                ccdff = Math.round((ccbhh.cbgeh.ccdff - ccdei) * ccbbg) + ccdbf.ccabf.ccdff;
                                ccdfi = Math.round((ccbhh.cbgeh.ccdfi + cbehd) * ccbbg) + ccdbf.ccabf.ccdfi;
                                cbbfd += "," + ccdff + "," + ccdfi;
                                ccdff = Math.round((ccbhh.cbgeh.ccdff + ccdei) * ccbbg) + ccdbf.ccabf.ccdff;
                                ccdfi = Math.round((ccbhh.cbgeh.ccdfi + cbehd) * ccbbg) + ccdbf.ccabf.ccdfi;
                                cbbfd += "," + ccdff + "," + ccdfi;
                                ccdff = Math.round((ccbhh.cbgeh.ccdff + ccdei) * ccbbg) + ccdbf.ccabf.ccdff;
                                ccdfi = Math.round((ccbhh.cbgeh.ccdfi - cbehd) * ccbbg) + ccdbf.ccabf.ccdfi;
                                cbbfd += "," + ccdff + "," + ccdfi;
                                ccdff = Math.round((ccbhh.cbgeh.ccdff - ccdei) * ccbbg) + ccdbf.ccabf.ccdff;
                                ccdfi = Math.round((ccbhh.cbgeh.ccdfi - cbehd) * ccbbg) + ccdbf.ccabf.ccdfi;
                                cbbfd += "," + ccdff + "," + ccdfi;
                                cbghe(cbacc, ccbhh.cbdbh.cbfhi, cbfej, cbbfd, cajjf);
                            }
                            break;
                        default:
                            if (ccbhh.cbdbh != undefined && ccbhh.cbdbh.cbchf) {
                                for (var cbijb in ccbhh.cbjgg) {
                                    var cbjge = ccbhh.cbjgg[cbijb];
                                    if (cbjgf(cajjf, cbjge)) {
                                        var cbbfd = "";
                                        var ccaeg = cbjge.cbbfe;
                                        if (!ccaeg) ccaeg = cbjge.cbbfd;
                                        for (var cbijd in ccaeg) {
                                            var ccaac = ccaeg[cbijd];
                                            if (cbbfd != "") cbbfd += ",";
                                            cbbfd += Math.round(ccaac.ccdff * ccbbg + ccdbf.ccabf.ccdff) + "," + Math.round(ccaac.ccdfi * ccbbg + ccdbf.ccabf.ccdfi);
                                        }
                                        cbghe(cbacc, ccbhh.cbdbh.cbfhi, cbfej, cbbfd, cajjf);
                                    }
                                }
                                if (cbfia[cajjf].cbgae && ccbhh.cbdbh && ccbhh.cbdbh.cbgac && ccbhh.cbdbh[ccbhh.cbdbh.cbgac.cbada] && ccbhh.cbdbh.cbgac.cccgj && ccbhh.cbgag == 'o') {
                                    var ccdei = cbfia[cajjf].cbgae.ccdei * ccbbg;
                                    var cbehd = cbfia[cajjf].cbgae.cbehd * ccbbg;
                                    var cbiig = Math.round(ccbhh.cbgaj.ccdff * ccbbg + ccdbf.ccabf.ccdff);
                                    var cbiih = Math.round(ccbhh.cbgaj.ccdfi * ccbbg + ccdbf.ccabf.ccdfi);
                                    cbiih -= cbehd / 2;
                                    switch (ccbhh.cbdbh.cbgac.cccgj.cbaaa) {
                                        case 'left':
                                            break;
                                        case 'center':
                                            cbiig -= ccdei / 2;
                                            break;
                                        case 'right':
                                            cbiig -= ccdei;
                                            break;
                                    }
                                    var cbbfd = cbiig + ',' + cbiih;
                                    cbbfd += ',' + (cbiig + ccdei) + "," + cbiih;
                                    cbbfd += ',' + (cbiig + ccdei) + "," + (cbiih + cbehd);
                                    cbbfd += ',' + cbiig + "," + (cbiih + cbehd);
                                    cbbfd += ',' + cbiig + "," + cbiih;
                                    cbghe(cbacc, ccbhh.cbdbh.cbfhi, cbfej, cbbfd, cajjf);
                                }
                            }
                            break;
                    }
                }
            }
            cbghg[0].useMap = '#' + cbacd;
        }

        function cbagi(cajjf) {
            ccdbf.ccabf.ccdff = parseInt(cbgjc.position().left + cbfia[cajjf].cbgii.position().left);
            ccdbf.ccabf.ccdfi = parseInt(cbgjc.position().top + cbfia[cajjf].cbgii.position().top);
        }

        function cbghe(cbacc, cbfhi, cbfej, cbbfd, cajjf) {
            var cbaca = document.createElement('area');
            cbaca['id'] = cbfhi;
            cbaca['shape'] = 'poly';
            cbaca.href = "javascript:jqmEvent(" + cbfej + ", \"onclick\", \"feature\", " + cbfhi + ", " + cajjf + ");";
            if (cbjjg.cbehf) {
                cbaca.onmouseover = function() {
                    jqmEvent(cbfej, "onmouseover", "feature", cbfhi, cajjf);
                };
                cbaca.onmouseout = function() {
                    jqmEvent(cbfej, "onmouseout", "feature", cbfhi, cajjf);
                };
                cbaca.oncontextmenu = function() {
                    jqmEvent(cbfej, "onrightclick", "feature", cbfhi, cajjf);
                };
                cbaca.ondblclick = function() {
                    jqmEvent(cbfej, "ondblclick", "feature", cbfhi, cajjf);
                };
            }
            cbaca['coords'] = cbbfd;
            cbacc.appendChild(cbaca);
        }

        function ccbic(ccbhh, cajjf) {
            if (ccbhh.type == "box") {
                return ccbhi(ccbhh);
            }
            var ccdcc = true;
            if (ccbhh.cbgeh.ccdff > cbfia[cajjf].cbaic.cbdia.cbheh.ccdff) ccdcc = false;
            if (ccbhh.cbgeh.ccdfi > cbfia[cajjf].cbaic.cbdia.cbheh.ccdfi) ccdcc = false;
            if (ccbhh.cbgeh.ccdff + ccbhh.size.ccdff < cbfia[cajjf].cbaic.cbdia.cbhga.ccdff) ccdcc = false;
            if (ccbhh.cbgeh.ccdfi + ccbhh.size.ccdfi < cbfia[cajjf].cbaic.cbdia.cbhga.ccdfi) ccdcc = false;
            return ccdcc;
        }

        function cbjgf(cajjf, cbjge) {
            var ccdcc = true;
            if (cbjge.cbgeh.ccdff > cbfia[cajjf].cbaic.cbdia.cbheh.ccdff) ccdcc = false;
            if (cbjge.cbgeh.ccdfi > cbfia[cajjf].cbaic.cbdia.cbheh.ccdfi) ccdcc = false;
            if (cbjge.cbgeh.ccdff + cbjge.size.ccdff < cbfia[cajjf].cbaic.cbdia.cbhga.ccdff) ccdcc = false;
            if (cbjge.cbgeh.ccdfi + cbjge.size.ccdfi < cbfia[cajjf].cbaic.cbdia.cbhga.ccdfi) ccdcc = false;
            return ccdcc;
        }

        function ccbhi(ccbhh) {
            var ccdcc = true;
            if (!ccbhh.cbdbh) return false;
            if (ccbhh.cbgeh.ccdff - ccbhh.cbdbh.cbdee.width / 2 > cbfia[cbgbc].cbaic.cbdia.cbheh.ccdff) ccdcc = false;
            if (ccbhh.cbgeh.ccdfi - ccbhh.cbdbh.cbdee.height / 2 > cbfia[cbgbc].cbaic.cbdia.cbheh.ccdfi) ccdcc = false;
            if (ccbhh.cbgeh.ccdff + ccbhh.cbdbh.cbdee.width / 2 < cbfia[cbgbc].cbaic.cbdia.cbhga.ccdff) ccdcc = false;
            if (ccbhh.cbgeh.ccdfi + ccbhh.cbdbh.cbdee.height / 2 < cbfia[cbgbc].cbaic.cbdia.cbhga.ccdfi) ccdcc = false;
            return ccdcc;
        }

        function cccbh(cccbg) {
            var ccdcc = true;
            if (cccbg.ccdff > cbfia[cbgbc].cbaic.cbdia.cbheh.ccdff) ccdcc = false;
            if (cccbg.ccdfi > cbfia[cbgbc].cbaic.cbdia.cbheh.ccdfi) ccdcc = false;
            if (cccbg.ccdff < cbfia[cbgbc].cbaic.cbdia.cbhga.ccdff) ccdcc = false;
            if (cccbg.ccdfi < cbfia[cbgbc].cbaic.cbdia.cbhga.ccdfi) ccdcc = false;
            return ccdcc;
        }

        function cbhbi(cbhae) {
            if (!cbhae.cbgac) return;
            if (!cbhae.cbgad) return false;
            if (!cbhae.cbgad.ccdee) return false;
            if (!cbfia[cbgbc].cbaic) return false;
            var ccdcc = true;
            if (cbhae.cbgad.ccdff + cbhae.cbgac.width > cbfia[cbgbc].cbaic.cbdia.cbheh.ccdff) ccdcc = false;
            if (cbhae.cbgad.ccdfi + cbhae.cbgac.height > cbfia[cbgbc].cbaic.cbdia.cbheh.ccdfi) ccdcc = false;
            if (cbhae.cbgad.ccdff < cbfia[cbgbc].cbaic.cbdia.cbhga.ccdff) ccdcc = false;
            if (cbhae.cbgad.ccdfi < cbfia[cbgbc].cbaic.cbdia.cbhga.ccdfi) ccdcc = false;
            return ccdcc;
        }

        function ccbha(cajjf) {
            if (!cbfia[cajjf].cbgii || !cbfia[cajjf].cbgjd) {
                return;
            }
            cbfia[cajjf].ccded = ccdda.width * (1 + cbbdj.cbiib * 2);
            cbfia[cajjf].ccdcd = ccdda.height * (1 + cbbdj.cbiib * 2);
            cbfia[cajjf].ccdce = -cbgjc.position().left - cbfia[cajjf].cbgii.position().left - ccdda.width * cbbdj.cbiib;
            cbfia[cajjf].ccdec = -cbgjc.position().top - cbfia[cajjf].cbgii.position().top - ccdda.height * cbbdj.cbiib;
        }

        function cbaij(cajjf, cbbcg, cbbch) {
            cbbch.css('left', cbfia[cajjf].ccdce);
            cbbch.css('top', cbfia[cajjf].ccdec);
            cbbcg.width = cbfia[cajjf].ccded;
            cbbcg.height = cbfia[cajjf].ccdcd;
            if (ccdbe) {}
        }

        function cbaie(cajjf) {
            if (cbfia[cajjf] && cbfia[cajjf].cbdhg && cbfia[cajjf].cbdhg.cbaie) return true;
            if (!cbfia[cajjf]) return false;
            for (var ccbbe in cbfia[cajjf].ccbie) {
                var cbdbh = cbfia[cajjf].ccbie[ccbbe].cbdbh;
                if (cbdbh) {
                    if (!cbaig(cbdbh.cbdee)) return false;
                    if (!cbaig(cbdbh.cbiie)) return false;
                    if (!cbaig(cbdbh.cbejd)) return false;
                }
            }
            if (cbbdj.cbhea == "canvas") {
                for (var cbggd in cbfia[cajjf].cbhca) {
                    var cbhae = cbfia[cajjf].cbhca[cbggd];
                    if (cbhae) {
                        if (!cbaig(cbhae.cbheb)) return false;
                        if (!cbaig(cbhae.cbiif)) return false;
                        if (!cbaig(cbhae.cbeje)) return false;
                    }
                }
            }
            for (var cbfaf in cbbdj.ccccc) {
                var cccbj = cbbdj.ccccc[cbfaf];
                if (!cbaif(cccbj)) return false;
            }
            if (ccdbf.cbadd.cbffi()) {
                if (!cbaih()) return false;
            }
            cbfia[cbgbc].cbdhg.cbaie = true;
            return true;
        }

        function ccaci(cajjf) {
            if (cbfia[cajjf] && cbfia[cajjf].cbdhg && cbfia[cajjf].cbdhg.ccaci) return true;
            if (!cbfia[cajjf]) return false;
            for (var ccbbe in cbfia[cajjf].ccach) {
                var ccacc = cbfia[cajjf].ccach[ccbbe];
                if (!ccace(ccacc)) return false;
            }
            cbfia[cbgbc].cbdhg.ccaci = true;
            return true;
        }

        function cbaig(cbdee) {
            if (!cbdee || !cbdee.cbfbc) return true;
            if (cbdee.cbfbc.width == 0 || cbdee.cbfbc.height == 0) return false;
            if (!cbdee.cbfaj) {
                if (cbdee.width) cbdee.cbfaj = cbdee.width;
                else cbdee.cbfaj = cbdee.cbfbc.width;
            }
            if (!cbdee.cbfba) {
                if (cbdee.height) cbdee.cbfba = cbdee.height;
                else cbdee.cbfba = cbdee.cbfbc.height;
            }
            return true;
        }

        function cbaif(cccbj) {
            if (!cccbj || !cccbj.cbfbd) return true;
            for (var cbfaf in cccbj.cbfbd) {
                var cbfbc = cccbj.cbfbd[cbfaf];
                if (cbfbc.width == 0 || cbfbc.height == 0) return false;
                if (!cccbj.cbfbg[cbfaf]) {
                    if (cccbj.width) cccbj.cbfbg[cbfaf] = cccbj.width;
                    else cccbj.cbfbg[cbfaf] = cbfbc.width;
                }
                if (!cccbj.cbfbb[cbfaf]) {
                    if (cccbj.height) cccbj.cbfbb[cbfaf] = cccbj.height;
                    else cccbj.cbfbb[cbfaf] = cbfbc.height;
                }
            }
            return true;
        }

        function ccace(ccacc) {
            if (!ccacc || !ccacc.cbfca) return true;
            if (ccacc.cbfca.width == 0 || ccacc.cbfca.height == 0) return false;
            return true;
        }

        function cbaih() {
            if (ccdbf.cbgfh.width == 0 || ccdbf.cbgfh.height == 0) return false;
            else {
                cbjjf();
                return true;
            }
        }

        function cbjjf() {
            if (!ccdbf.cbadd.cbffi()) return;
            ccdbf.cbgfi["style"].left = (ccdda.width - ccdbf.cbgfh.width - 5).toString() + "px";
            ccdbf.cbgfi["style"].top = (ccdda.height - ccdbf.cbgfh.height - 5).toString() + "px";
            ccdbf.cbgfi["style"]["opacity"] = "100";
        }

        function cbchc(cajjf) {
            if (!cbaie(cajjf)) {
                setTimeout("jqmInstances[" + cbfej + "].obj.retryToDrawMapCanvas('" + cajjf + "');", 50);
                return;
            }
            if (!cbfia[cajjf].ccchc) {
                return;
            }
            var total = cbfia[cajjf].ccbie.length;
            if (ccbbc.shapesDrawingNextKey == 0 || cajjf != ccbbc.ccbif) {
                ccbha(cajjf);
                cbaij(cajjf, cbfia[cajjf].cbgic, cbfia[cajjf].cbgia);
                if (ccdbe) {
                    if (!cbfia[cajjf].currentCanvasScale) {
                        cbfia[cajjf].currentCanvasScale = 1;
                        cbfia[cajjf].currentCanvasTranslation = {
                            ccdff: 0,
                            ccdfi: 0
                        };
                    }
                    cbfia[cajjf].cbghj.translate(-cbfia[cajjf].currentCanvasTranslation.ccdff, -cbfia[cajjf].currentCanvasTranslation.ccdfi);
                    cbfia[cajjf].cbeig.translate(-cbfia[cajjf].currentCanvasTranslation.ccdff, -cbfia[cajjf].currentCanvasTranslation.ccdfi);
                    cbfia[cajjf].cbhcb.translate(-cbfia[cajjf].currentCanvasTranslation.ccdff, -cbfia[cajjf].currentCanvasTranslation.ccdfi);
                    cbfia[cajjf].cbghj["scale"](1 / cbfia[cajjf].currentCanvasScale, 1 / cbfia[cajjf].currentCanvasScale);
                    cbfia[cajjf].cbeig["scale"](1 / cbfia[cajjf].currentCanvasScale, 1 / cbfia[cajjf].currentCanvasScale);
                    cbfia[cajjf].cbhcb["scale"](1 / cbfia[cajjf].currentCanvasScale, 1 / cbfia[cajjf].currentCanvasScale);
                }
                cbfia[cajjf].currentCanvasScale = cbfia[cajjf].cbgja / cbegg;
                cbfia[cajjf].cbghj["scale"](cbfia[cajjf].currentCanvasScale, cbfia[cajjf].currentCanvasScale);
                cbaij(cajjf, cbfia[cajjf].cbeij, cbfia[cajjf].cbeih);
                cbfia[cajjf].cbeig["scale"](cbfia[cajjf].currentCanvasScale, cbfia[cajjf].currentCanvasScale);
                cbaij(cajjf, cbfia[cajjf].cbhce, cbfia[cajjf].cbhcc);
                cbfia[cajjf].cbhcb["scale"](cbfia[cajjf].currentCanvasScale, cbfia[cajjf].currentCanvasScale);
                ccbfg(cajjf);
                cbfia[cajjf].currentCanvasTranslation = {
                    ccdff: -cbfia[cajjf].cbaic.left,
                    ccdfi: -cbfia[cajjf].cbaic.top
                };
                cbfia[cajjf].cbghj.translate(cbfia[cajjf].currentCanvasTranslation.ccdff, cbfia[cajjf].currentCanvasTranslation.ccdfi);
                cbfia[cajjf].cbeig.translate(cbfia[cajjf].currentCanvasTranslation.ccdff, cbfia[cajjf].currentCanvasTranslation.ccdfi);
                cbfia[cajjf].cbhcb.translate(cbfia[cajjf].currentCanvasTranslation.ccdff, cbfia[cajjf].currentCanvasTranslation.ccdfi);
                var cbbha = cbfia[cajjf].cbghj;
                cbbha.globalAlpha = 1;
                cbahd(cajjf);
                cbaec(cajjf);
            }
            var cbegf = false;
            if (ccbbc.shapesDrawingNextKey == 0 || ccbbc.ccbif == cajjf) {
                ccdbf.ccdef = new Array();
                ccbbc.cbhfe = (new Date()).getTime() + 1000;
                for (var ccbbe = ccbbc.shapesDrawingNextKey; ccbbe < total; ccbbe++) {
                    var ccbhh = cbfia[cajjf].ccbie[ccbbe];
                    if ((new Date()).getTime() > ccbbc.cbhfe) {
                        ccbbc.shapesDrawingNextKey = ccbbe;
                        ccbbc.ccbif = cajjf;
                        cccdf();
                        return;
                    }
                    ccbhh.ccdcc = false;
                    if (ccbhh.cbdbh != null && ccbic(ccbhh, cajjf)) {
                        if (cajjf == cbgbc) {
                            if (ccbhh.cbifh != undefined && ccbhh.cbifh != 1) {
                                cbfia[cajjf].cbghj.globalAlpha = ccbhh.cbifh;
                                cbegf = true;
                            } else {
                                if (cbegf) {
                                    cbfia[cajjf].cbghj.globalAlpha = 1;
                                    cbegf = false;
                                }
                            }
                            ccdbf.ccdef.push(ccbhh.cbfbh);
                        }
                        ccbhh.ccdcc = true;
                        if (ccbhh.cbdbh.cbejc) {
                            cbcgd(cajjf, cbfia[cajjf].cbghj, cbfia[cajjf].cbgie, ccbhh, ccbhh.cbdbh.cbejd, false);
                        } else {
                            if (ccbhh.type == "box" || (ccbhh.cbdbh.cbdee && cbfia[cajjf].ccchc.platformFunctionality.cbcdb && (ccbhh.cbdbh.cbdee.cccgj || ccbhh.cbdbh.cbdee.cbdff || ccbhh.cbdbh.cbdee.cccfa))) cbcgd(cajjf, cbfia[cajjf].cbghj, cbfia[cajjf].cbgie, ccbhh, ccbhh.cbdbh.cbdee, false);
                        }
                    }
                }
            }
            if (cbgbc == cajjf) {
                for (var ccbbe = 0; ccbbe < total; ccbbe++) {
                    var ccbhh = cbfia[cajjf].ccbie[ccbbe];
                    if (ccbhh.cbdbh != null) {
                        var cbgei = 0;
                        for (var cbfaf in ccbhh.cccbi) {
                            var cccbg = ccbhh.cccbi[cbfaf];
                            cccbg.ccdcc = cccbh(cccbg, cajjf);
                            if (cccbg.ccdcc) {
                                cbcha(cajjf, cbfia[cajjf].cbghj, cbfia[cajjf].cbgie, ccbhh, cccbg, cbgei);
                                cbgei++;
                            }
                        }
                    }
                }
            }
            cbegf = false;
            for (var ccbbe = 0; ccbbe < total; ccbbe++) {
                var ccbhh = cbfia[cajjf].ccbie[ccbbe];
                ccbhh.ccdcc = false;
                if (ccbhh.cbdbh != null && ccbic(ccbhh, cajjf)) {
                    if (cajjf == cbgbc) {
                        if (ccbhh.cbifh != undefined && ccbhh.cbifh != 1) {
                            cbfia[cajjf].cbghj.globalAlpha = ccbhh.cbifh;
                            cbegf = true;
                        } else {
                            if (cbegf) {
                                cbfia[cajjf].cbghj.globalAlpha = 1;
                                cbegf = false;
                            }
                        }
                    }
                    ccbhh.ccdcc = true;
                    if (ccbhh.cbdbh.cbejc) {
                        cbcgj(cajjf, cbfia[cajjf].cbghj, cbfia[cajjf].cbgie, ccbhh, ccbhh.cbdbh.cbejd, false);
                    } else {
                        if (ccbhh.type == "box" || (ccbhh.cbdbh.cbdee && cbfia[cajjf].ccchc.platformFunctionality.cbcdb && (ccbhh.cbdbh.cbdee.cccgj || ccbhh.cbdbh.cbdee.cbdff || ccbhh.cbdbh.cbdee.cccfa))) cbcgj(cajjf, cbfia[cajjf].cbghj, cbfia[cajjf].cbgie, ccbhh, ccbhh.cbdbh.cbdee, false);
                    }
                }
            }
            ccbbc.shapesDrawingNextKey = 0;
        }

        function ccahc(cajjf) {
            var cbbha = cbfia[cajjf].cbhcb;
            cbbha.globalAlpha = 1;
            cbbha.save();
            var ccbbg = cbfia[cajjf].cbgja / cbegg;
            var total = cbfia[cajjf].cbhca.length;
            for (var cbggd = 0; cbggd < total; cbggd++) {
                var cbhae = cbfia[cajjf].cbhca[cbggd];
                if (cbhbi(cbhae, cajjf)) cbcga(cajjf, cbfia[cajjf].cbhcb, cbfia[cajjf].cbhdc, cbhae);
            }
        }

        function ccbfg(cajjf) {
            cbfia[cajjf].cbaic = new Object();
            cbfia[cajjf].cbaic.left = cbfia[cajjf].ccdce * cbegg / cbfia[cajjf].cbgja;
            cbfia[cajjf].cbaic.top = cbfia[cajjf].ccdec * cbegg / cbfia[cajjf].cbgja;
            cbfia[cajjf].cbaic.width = cbfia[cajjf].ccded * cbegg / cbfia[cajjf].cbgja;
            cbfia[cajjf].cbaic.height = cbfia[cajjf].ccdcd * cbegg / cbfia[cajjf].cbgja;
            cbfia[cajjf].cbaic.cbdia = cbbib(cajjf);
        }

        function cccgg(cbbha, cbggb, cbfjh) {
            var cbeag = new Object({
                cbggb: cbggb,
                cbfjh: cbfjh
            });
            var cbjic = cbfia[cbgbc].cbcih.cbeaj(cbeag, 1);
            cccgh(cbbha, cbjic);
        }

        function cccgh(cbbha, cbjic) {
            cbbha.fillStyle = 'rgb(255,0,0)';
            cbbha.beginPath();
            cbbha.moveTo((cbjic.ccdff - 50), cbjic.ccdfi);
            cbbha.lineTo((cbjic.ccdff + 50), cbjic.ccdfi);
            cbbha.moveTo(cbjic.ccdff, (cbjic.ccdfi - 50));
            cbbha.lineTo(cbjic.ccdff, (cbjic.ccdfi + 50));
            cbbha.closePath();
            cbbha.stroke();
        }

        function cbcgd(cajjf, cbbha, cbced, ccbhh, cbdee, cbfgc) {
            if (!cbbha) {
                return;
            }
            if (!cbdee.ccdee) {
                return;
            }
            cbaid(cbbha);
            switch (ccbhh.type) {
                case "box":
                    cbcge(cajjf, cbbha, cbced, ccbhh, cbdee, cbfgc);
                    break;
                default:
                    cbcgh(cajjf, cbbha, ccbhh, cbdee, cbfgc);
                    break;
            }
        }

        function cbcge(cajjf, cbbha, cbced, ccbhh, cbdee, cbfgc) {
            if (cbdee.cbfbc) {
                if (!cbdee.cbfaj) {
                    if (cbdee.width) cbdee.cbfaj = cbdee.width;
                    else cbdee.cbfaj = cbdee.cbfbc.width;
                }
                if (!cbdee.cbfba) {
                    if (cbdee.height) cbdee.cbfba = cbdee.height;
                    else cbdee.cbfba = cbdee.cbfbc.height;
                }
                var cbiii = {
                    ccdff: ccbhh.cbgeh.ccdff - cbdee.cbfaj / 2,
                    ccdfi: ccbhh.cbgeh.ccdfi - cbdee.cbfba / 2
                };
                if (ccbhh.cbifi != undefined) {
                    cbbha.save();
                    cbbha.translate(ccbhh.cbgeh.ccdff, ccbhh.cbgeh.ccdfi);
                    cbbha.rotate(ccbhh.cbifi / 180 * Math.PI);
                    cbiii = {
                        ccdff: -cbdee.cbfaj / 2,
                        ccdfi: -cbdee.cbfba / 2
                    };
                }
                if (ccdbe) cbcgg(cajjf, cbfia[cbgbc].cbgie, ccbhh, cbdee, cbfgc);
                else {
                    cbbha.drawImage(cbdee.cbfbc, cbiii.ccdff, cbiii.ccdfi, cbdee.width, cbdee.height);
                } if (ccbhh.cbifi != undefined) cbbha.restore();
            }
        }

        function cbcgf(cajjf, cbbha, cbced, ccbhh, cbdee, cbfgc) {
            return;
        }

        function cbcgg(cajjf, cbced, ccbhh, cbdee, cbfgc) {
            var cbfcd = document.createElement('div');
            cbfcd['style'].position = 'absolute';
            cbfcd['style'].left = (ccbhh.cbgeh.ccdff - cbdee.cbfbc.width / 2) * cbfia[cajjf].cbgja / cbegg;
            cbfcd['style'].top = (ccbhh.cbgeh.ccdfi - cbdee.cbfbc.height / 2) * cbfia[cajjf].cbgja / cbegg;
            cbced[0].appendChild(cbfcd);
            var cbhjj = document.createElement('img');
            cbhjj.src = cbdee.cbfbc.src;
            cbfcd.appendChild(cbhjj);
        }

        function cbchb(cajjf, cbced, ccbhh, cccbj, cbfaf, cccbg) {
            var cbfcd = document.createElement('div');
            cbfcd['style'].position = 'absolute';
            cbfcd['style'].left = (cccbg.ccdff - cccbj.cbfbd[cbfaf].width / 2) * cbfia[cajjf].cbgja / cbegg;
            cbfcd['style'].top = (cccbg.ccdfi - cccbj.cbfbd[cbfaf].height / 2) * cbfia[cajjf].cbgja / cbegg;
            cbced[0].appendChild(cbfcd);
            var cbhjj = document.createElement('img');
            cbhjj.src = cccbj.cbfbd[cbfaf].src;
            cbfcd.appendChild(cbhjj);
        }

        function cbcgh(cajjf, cbbha, ccbhh, cbdee, cbfgc) {
            if (!cbdee) {
                cbcje.ccdac(11220, ccbhh.cbfbh);
                return;
            }
            cbbha.beginPath();
            var cccaa = ccbhh.cbjgg[0].type;
            switch (cccaa) {
                case 'polygon':
                case 'circle':
                    if (!cbfgc && ccbhh.cbdbh.cbehb != undefined) {
                        cbbha.fillStyle = ccbhh.cbdbh.cbajc.cbdee.cbegj.cbbdc[ccbhh.cbdbh.cbehb];
                    } else {
                        cbbha.fillStyle = cbdee.cbdff;
                    }
                case 'polyline':
                case 'curve':
                    cbbha.lineWidth = cbdee.cccfa * cbegg / cbfia[cajjf].cbgja;
                    cbbha.lineJoin = "round";
                    cbbha.strokeStyle = cbdee.cccej;
                    break;
            }
            if (ccbhh.cbdbh.cajjg) {
                cbbha.globalAlpha = ccbhh.cbdbh.cajjg;
            } else cbbha.globalAlpha = 1;
            for (var cbijb in ccbhh.cbjgg) {
                var cbjge = ccbhh.cbjgg[cbijb];
                if (cbjgf(cajjf, cbjge)) {
                    switch (cbjge.type) {
                        case "polygon":
                        case "polyline":
                            for (var cbijd in cbjge.cbbfd) {
                                var ccaac = cbjge.cbbfd[cbijd];
                                if (ccbhh.cbdbh.ccbbg && ccbhh.cbdbh.ccbbg != 1 && ccbhh.cbdbh.cbaje) ccaac = {
                                    ccdff: ccbhh.cbdbh.cbaje.ccdff + (ccaac.ccdff - ccbhh.cbdbh.cbaje.ccdff) * ccbhh.cbdbh.ccbbg,
                                    ccdfi: ccbhh.cbdbh.cbaje.ccdfi + (ccaac.ccdfi - ccbhh.cbdbh.cbaje.ccdfi) * ccbhh.cbdbh.ccbbg
                                };
                                if (cbijd == 0) cbbha.moveTo(ccaac.ccdff, ccaac.ccdfi);
                                else cbbha.lineTo(ccaac.ccdff, ccaac.ccdfi); if (ccaac.cajji) {
                                    cbbha.stroke();
                                    ccdbf.cbigd = cbbha.globalAlpha;
                                    cbbha.globalAlpha = ccaac.cajji;
                                    cbbha.beginPath();
                                    cbbha.moveTo(ccaac.ccdff, ccaac.ccdfi);
                                }
                                if (ccaac.cajjh) {
                                    cbbha.stroke();
                                    cbbha.globalAlpha = ccdbf.cbigd;
                                    cbbha.beginPath();
                                    cbbha.moveTo(ccaac.ccdff, ccaac.ccdfi);
                                }
                            }
                            break;
                        case "curve":
                            cbbha.moveTo(cbjge.cbbfd[0].ccdff, cbjge.cbbfd[0].ccdfi);
                            cbbha.bezierCurveTo(cbjge.cbbfd[0].ccdff, cbjge.cbbfd[0].ccdfi, cbjge.cbbfd[1].ccdff, cbjge.cbbfd[1].ccdfi, cbjge.cbbfd[2].ccdff, cbjge.cbbfd[2].ccdfi);
                            break;
                        case "text":
                            if (typeof(cbjge.cbfib) != "string") cbjge.cbfib = String(cbjge.cbfib);
                            while (cbjge.cbfib.indexOf("\\n") != -1) cbjge.cbfib = cbjge.cbfib.replace("\\n", "\n");
                            if (!cbjge.cccgj) cbjge.cccgj = ccbhh.cbdbh.cbajc.cbdee.cccgj;
                            if (!cbjge.cccgj) {
                                cbcje.ccdac(12080, cbjge.cbfib, ccbhh.cbdbh.cbajd);
                                return;
                            }
                            cbbha.save();
                            var cbdje = cbjge.cccgj.cbdje;
                            if (cbjge.cbdje) {
                                cbdje = cbjge.cbdje * 1.3;
                                cbaja(cajjf, cbbha, cbjge.cccgj, true, cbdje);
                            } else cbaja(cajjf, cbbha, cbjge.cccgj, true);
                            cbbha.translate(cbjge.cbbfd[0].ccdff, cbjge.cbbfd[0].ccdfi);
                            if (cbjge.cbifi != 400) {
                                var cbaai = cbcii.cbiaf(cbjge.cbifi);
                                cbbha.rotate(-cbaai / 180 * Math.PI);
                                if (cbbdj.ccddj != 0) {
                                    cbbha.transform(1, 0, cbbdj.ccdeb, 1, 0, 0);
                                    cbbha["scale"](1, 1);
                                }
                            } else {
                                {
                                    cbbha.transform(1, 0, 0, 1, 0, 0);
                                    cbbha["scale"](1, cbbdj.ccdea);
                                }
                            } if (cbjge.cbhfh) {
                                var cbehd = cbdje * 1.2;
                                var ccdfd = cbjge.cbfib.split(" ");
                                var cbcig = new Array();
                                var cbfjg = -1;
                                for (var cbfaf = 0; cbfaf < ccdfd.length; cbfaf++) {
                                    var cbjhh = "";
                                    for (var cbfhg = cbfjg + 1; cbfhg <= cbfaf; cbfhg++) {
                                        if (cbjhh != "") cbjhh += " ";
                                        cbjhh += ccdfd[cbfhg]
                                    }
                                    var ccdei = cbbha.measureText(cbjhh).width;
                                    if (ccdei > cbjge.cbhfh && cbfjg < cbfaf - 1) {
                                        cbcig.push(cbfaf - 1);
                                        cbfjg = cbfaf - 1;
                                    }
                                }
                                cbcig.push(ccdfd.length - 1);
                                var cbihc = (-cbcig.length / 2 + 0.5) * cbehd;
                                var cbfjg = -1;
                                for (var cbfaf = 0; cbfaf < cbcig.length; cbfaf++) {
                                    var cbjhh = "";
                                    for (var cbfhg = cbfjg + 1; cbfhg <= cbcig[cbfaf]; cbfhg++) {
                                        if (cbjhh != "") cbjhh += " ";
                                        cbjhh += ccdfd[cbfhg]
                                    }
                                    cbfjg = cbcig[cbfaf];
                                    var ccdfi = cbihc + cbfaf * cbehd;
                                    if (cbjge.cccgj.lineWidth != 0) cbbha.strokeText(cbjhh, 0, ccdfi);
                                    cbbha.fillText(cbjhh, 0, ccdfi);
                                }
                            } else if (cbjge.cbfib.indexOf("\n") != -1) {
                                var cbehd = cbdje * 1.2;
                                var cbjia = cbjge.cbfib.split("\n");
                                var cbihc = (-cbjia.length / 2 + 0.5) * cbehd;
                                for (var cbfaf = 0; cbfaf < cbjia.length; cbfaf++) {
                                    var ccdfi = cbihc + cbfaf * cbehd;
                                    if (cbjge.cccgj.lineWidth != 0) cbbha.strokeText(cbjia[cbfaf], 0, ccdfi);
                                    cbbha.fillText(cbjia[cbfaf], 0, ccdfi);
                                }
                            } else {
                                if (cbjge.cccgj.lineWidth != 0) cbbha.strokeText(cbjge.cbfib, 0, 0);
                                cbbha.fillText(cbjge.cbfib, 0, 0);
                            }
                            cbbha.restore();
                            break;
                        case 'circle':
                            cbbha.arc(cbjge.cbbfd[0].ccdff, cbjge.cbbfd[0].ccdfi, cbjge.size.ccdff / 2, 0, 2 * Math.PI, false);
                            break;
                    }
                }
            }
            switch (cccaa) {
                case 'polygon':
                case 'circle':
                    cbbha.fill();
                case 'polyline':
                    if (cbdee.cccfa > 0 && cbdee.cccej) cbbha.stroke();
            }
        }

        function cbcgi(cajjf, cbbha, ccbhh, cbdee, cbfgc) {
            if (!cbdee) {
                cbcje.ccdac(11220, ccbhh.cbfbh);
                return;
            }
            if (!ccbhh.cbgad) return;
            if (!ccbhh.cbgad.ccdee) return;
            if (!cbfgc && ccbhh.cbdbh.cbgac != undefined) {
                var cbgce = ccbhh.cbdbh[ccbhh.cbdbh.cbgac.cbada];
                if (cbgce && ccbhh.cbdbh.cbgac.cccgj) {
                    if (ccbhh.cbgag == 'o') {
                        var cbiig = Math.round(ccbhh.cbgaj.ccdff);
                        var cbiih = Math.round(ccbhh.cbgaj.ccdfi);
                        cbiih -= cbfia[cajjf].cbgae.cbehd / 2;
                        switch (ccbhh.cbdbh.cbgac.cccgj.cbaaa) {
                            case 'left':
                                break;
                            case 'center':
                                cbiig -= cbfia[cajjf].cbgae.ccdei / 2;
                                break;
                            case 'right':
                                cbiig -= cbfia[cajjf].cbgae.ccdei;
                                break;
                        }
                        var offsetX = 0;
                        var offsetY = 0;
                        if (ccbhh.cbdbh.cbgac.cccgj.cbdjc) offsetX += cbfia[cajjf].cbgae.cbehd * .2;
                        if (!cbfgc && ccbhh.cbdbh.cbehb != undefined) cbbha.fillStyle = ccbhh.cbdbh.cbajc.cbdee.cbegj.cbbdc[ccbhh.cbdbh.cbehb];
                        else cbbha.fillStyle = cbdee.cbdff;
                        cbbha.beginPath();
                        cbbha.moveTo(cbiig, cbiih);
                        cbbha.lineTo((cbiig + cbfia[cajjf].cbgae.ccdei + offsetX), cbiih);
                        cbbha.lineTo((cbiig + cbfia[cajjf].cbgae.ccdei + offsetX), (cbiih + cbfia[cajjf].cbgae.cbehd + offsetY));
                        cbbha.lineTo(cbiig, (cbiih + cbfia[cajjf].cbgae.cbehd + offsetY));
                        cbbha.lineTo(cbiig, cbiih);
                        cbbha.closePath();
                        cbbha.fill();
                    }
                    cbaja(cajjf, cbbha, ccbhh.cbdbh.cbgac.cccgj, false);
                    if (ccbhh.cbdbh.cbgac.cccgj.lineWidth != 0) cbbha.strokeText(cbgce, ccbhh.cbgaj.ccdff, ccbhh.cbgaj.ccdfi);
                    cbbha.fillText(cbgce, ccbhh.cbgaj.ccdff, ccbhh.cbgaj.ccdfi);
                }
            }
        }

        function cbcha(cajjf, cbbha, cbced, ccbhh, cccbg, cbgei) {
            var cbdbb = cbegg / cbfia[cajjf].cbgja;
            var ccbbe = cbgei % ccbhh.cccbf.length;
            var cbfaf = ccbhh.cccbf[ccbbe].length - ccbhh.ccccc[ccbbe].cbhgd;
            if (cbfaf < 0) cbfaf = 0;
            cbbha.drawImage(ccbhh.ccccc[ccbbe].cbfbd[cbfaf], cccbg.ccdff - ccbhh.ccccc[ccbbe].cbfbg[cbfaf] * cbdbb / 2, cccbg.ccdfi - ccbhh.ccccc[ccbbe].cbfbb[cbfaf] * cbdbb / 2, ccbhh.ccccc[ccbbe].cbfbg[cbfaf] * cbdbb, ccbhh.ccccc[ccbbe].cbfbb[cbfaf] * cbdbb);
            cbbha.save();
            cbaja(cajjf, cbbha, ccbhh.ccccc[ccbbe].cccgj, false);
            if (ccbhh.ccccc[ccbbe].cccgj.lineWidth != 0) cbbha.strokeText(ccbhh.cccbf[ccbbe], cccbg.ccdff, cccbg.ccdfi + 1 * cbdbb);
            cbbha.fillText(ccbhh.cccbf[ccbbe], cccbg.ccdff, cccbg.ccdfi + 1 * cbdbb);
        }

        function cbcgc(cajjf, cbbha, ccabg) {
            var cbice = cbfia[cbgbc].cbcih.cbeaj(ccabg.cbhic.cbicd, cbegg, true);
            var ccbee = cbfia[cbgbc].cbcih.cbeaj(ccabg.cbhic.ccbde, cbegg, true);
            var cbdbb = cbegg / cbfia[cajjf].cbgja;
            var ccbda = (ccbee.ccdff - cbice.ccdff) / (ccabg.cbhic.ccbei.ccdff - ccabg.cbhic.cbicf.ccdff) * cbdbb;
            var ccbdb = (ccbee.ccdfi - cbice.ccdfi) / (ccabg.cbhic.ccbei.ccdfi - ccabg.cbhic.cbicf.ccdfi) * cbdbb;
            var cbgeh = new Object();
            cbgeh.ccdff = cbice.ccdff * cbdbb - (ccabg.cbhic.cbicf.ccdff + 1) * ccbda + ccabg.cbbdd * ccabg.cbhic.cbhfd * ccbda;
            cbgeh.ccdfi = cbice.ccdfi * cbdbb - (ccabg.cbhic.cbicf.ccdfi + 1) * ccbdb + ccabg.ccbae * ccabg.cbhic.cbhfd * ccbdb;
            var ccdei = ccabg.cbfca.width * ccbda;
            var cbehd = ccabg.cbfca.height * ccbdb;
            cbbha.drawImage(ccabg.cbfca, cbgeh.ccdff, cbgeh.ccdfi, ccdei, cbehd);
        }

        function cbcgj(cajjf, cbbha, cbced, ccbhh, cbdee, cbfgc) {
            if (!cbbha) {
                return;
            }
            if (!cbdee.ccdee) {
                return;
            }
            cbaid(cbbha);
            switch (ccbhh.type) {
                case "box":
                    cbcgf(cajjf, cbbha, cbced, ccbhh, cbdee, cbfgc);
                    break;
                default:
                    cbcgi(cajjf, cbbha, ccbhh, cbdee, cbfgc);
                    break;
            }
        }

        function cbcga(cajjf, cbbha, cbced, cbhae) {
            if (!cbhae.cbgac) return;
            var cbgce = cbhae[cbhae.cbgac.cbada];
            if (!cbgce) return;
            cbbha.save();
            var cccgj = cbhae.cbgac.cccgj;
            var cbdje = cccgj.cbdje;
            cbbha.translate(cbhae.cbgad.ccdff, cbhae.cbgad.ccdfi);
            if (cbhae.cbgac.cbdje) {
                cbdje = cbhae.cbgac.cbdje;
                cbaja(cajjf, cbbha, cccgj, true, cbdje, true);
            } else cbaja(cajjf, cbbha, cccgj, false, undefined, true);
            cbbha.textAlign = "left";
            cbbha.textBaseline = "top";
            if (cbgce.indexOf("\\n") != -1) {
                var cbehd = cbdje;
                var cbjia = cbgce.split("\\n");
                var cbihc = (-cbjia.length / 2 + 0.5) * cbehd;
                for (var cbfaf = 0; cbfaf < cbjia.length; cbfaf++) {
                    var ccdfi = cbihc + cbfaf * cbehd;
                    if (cccgj.lineWidth != 0) cbbha.strokeText(cbjia[cbfaf], 0, ccdfi);
                    cbbha.fillText(cbjia[cbfaf], 0, ccdfi);
                }
            } else {
                if (cccgj.lineWidth != 0) cbbha.strokeText(cbgce, 0, 0);
                cbbha.fillText(cbgce, 0, 0);
            }
            cbbha.restore();
        }

        function cbaja(cajjf, cbbha, cccgj, cbhhg, cbdje, ccaje) {
            var ccbch = 1;
            var ccced = "";
            if (cccgj.cbdjb) ccced += "bold ";
            if (cccgj.cbdjc) ccced += "italic ";
            var size = cccgj.cbdje;
            if (cbdje) size = cbdje;
            if (!cbhhg) size *= cbegg / cbfia[cajjf].cbgja;
            if (ccaje && size < 10) {
                ccbch = size / 10;
                cbbha["scale"](ccbch, ccbch);
                size /= ccbch;
            }
            ccced += size + 'px ' + cccgj.cbdjd;
            cbbha.font = ccced;
            var cbaaa = cccgj.cbaaa.toLowerCase();
            if (cbaaa.indexOf('left') != -1) cbbha.textAlign = "left";
            else if (cbaaa.indexOf('right') != -1) cbbha.textAlign = "right";
            else cbbha.textAlign = "center"; if (cbaaa.indexOf('top') != -1) cbbha.textBaseline = "top";
            else if (cbaaa.indexOf('bottom') != -1) cbbha.textBaseline = "bottom";
            else cbbha.textBaseline = "middle";
            cbbha.strokeStyle = cccgj.cccej;
            cbbha.fillStyle = cccgj.cbdff;
            cbbha.lineWidth = cccgj.lineWidth * cbegg / cbfia[cajjf].cbgja;
            if (cccgj.cbdfi != undefined) cbaii(cbbha, cccgj.cbdfi);
            return ccbch;
        }

        function cbaii(cbbha, cbdfi) {
            switch (cbdfi.type) {
                case 'shadow':
                    cbbha.shadowColor = cbdfi.cbdff;
                    cbbha.shadowBlur = cbdfi.cbafd;
                    cbbha.shadowOffsetX = cbdfi.offsetX;
                    cbbha.shadowOffsetY = cbdfi.offsetY;
                    break;
                case 'glow':
                    cbbha.shadowColor = cbdfi.cbdff;
                    cbbha.shadowBlur = cbdfi.cbafd;
                    break;
            }
        }

        function cbaid(cbbha) {
            cbbha.shadowColor = null;
            cbbha.shadowBlur = null;
            cbbha.shadowOffsetX = null;
            cbbha.shadowOffsetY = null;
        }

        function cbdgd(cbdcf, cajjf) {
            for (var cbfaf in cbfia[cajjf].cbdbj) {
                var cbdcd = cbfia[cajjf].cbdbj[cbfaf];
                if (cbdcf == cbdcd.cbfbh) {
                    return cbdcd;
                }
            }
        }

        function cbdgc(featureId, cajjf) {
            if (cajjf == undefined) cajjf = cbgbc;
            for (var cbfaf in cbfia[cajjf].cbddc) {
                var cbdbh = cbfia[cajjf].cbddc[cbfaf];
                if (featureId == cbdbh.cbfbh) {
                    return cbdbh;
                }
            }
            return undefined;
        }

        function cbdgj(ccbia) {
            var cccji = cbfia[cbgbc].ccbie.length;
            for (var cbfaf = cbfif + 1; cbfaf < cccji; cbfaf++) {
                var ccbhh = cbfia[cbgbc].ccbie[cbfaf];
                if (ccbia == ccbhh.cbfbh) {
                    cbfif = cbfaf;
                    return cbegb(cbfaf);
                }
            }
            for (var cbfaf = 0; cbfaf <= cbfif; cbfaf++) {
                var ccbhh = cbfia[cbgbc].ccbie[cbfaf];
                if (ccbia == ccbhh.cbfbh) {
                    cbfif = cbfaf;
                    return cbegb(cbfaf);
                }
            }
            return null;
        }

        function cbegb(cbdhd) {
            var ccbia = cbfia[cbgbc].ccbie[cbdhd].cbfbh;
            var cccji = cbfia[cbgbc].ccbie.length;
            var cbihd = new Array();
            for (var cbfaf = cbdhd; cbfaf < cccji; cbfaf++) {
                var ccbhh = cbfia[cbgbc].ccbie[cbfaf];
                if (ccbia == ccbhh.cbfbh) {
                    cbihd.push(ccbhh);
                }
            }
            return cbihd;
        }

        function cbdgg(cbhbb) {
            for (var cbfaf in cbfia[cbgbc].cbhaf) {
                var cbhaj = cbfia[cbgbc].cbhaf[cbfaf];
                if (cbhbb == cbhaj.cbfbh) {
                    return cbhaj;
                }
            }
            return undefined;
        }

        function cbdgf(cbhbf) {
            for (var cbfaf in cbfia[cbgbc].cbhca) {
                var cbhae = cbfia[cbgbc].cbhca[cbfaf];
                if (cbhbf == cbhae.cbfbh) {
                    return cbhae;
                }
            }
            return null;
        }

        function cbdge(cbdga) {
            if (cbdga) {
                for (var cbfaf in cbbdj.cbdgb) {
                    var cbdfi = cbbdj.cbdgb[cbfaf];
                    if (cbdga.toLowerCase() == cbdfi.cbfbh.toLowerCase()) {
                        return cbdfi;
                    }
                }
            }
            return null;
        }

        function cbdhb(cccha) {
            for (var cbfaf in cbbdj.ccchb) {
                var cccgj = cbbdj.ccchb[cbfaf];
                if (cccha.toLowerCase() == cccgj.cbfbh.toLowerCase()) {
                    return cccgj;
                }
            }
            cbcje.ccdac(11250, cccha);
            return null;
        }

        function cbdha(cccca) {
            for (var cbfaf in cbbdj.ccccc) {
                var cccbj = cbbdj.ccccc[cbfaf];
                if (cccca.toLowerCase() == cccbj.cbfbh.toLowerCase()) return cccbj;
            }
            cbcje.ccdac(11270, cccca);
            return null;
        }

        function ccbih() {
            cbfif = -1;
            ccbbc.cbhfe = (new Date()).getTime() + 1000;
            var cccjg = cbfia[cbgbc].cbddc.length;
            for (var cbfaf = ccbbc.cbacg; cbfaf < cccjg; cbfaf++) {
                if ((new Date()).getTime() > ccbbc.cbhfe) {
                    ccbbc.cbacg = cbfaf;
                    cccdf();
                    return;
                }
                var cbdbh = cbfia[cbgbc].cbddc[cbfaf];
                var ccbie = cbdgj(cbdbh.cbfbh);
                if (ccbie == null) cbdbh.ccbhh = null;
                else {
                    cbdbh.ccbhh = ccbie[0];
                    for (var cbfhg = 0; cbfhg < ccbie.length; cbfhg++) {
                        ccbhh = ccbie[cbfhg];
                        ccbhh.cbdbh = cbdbh;
                    }
                }
            }
            ccbbc.cbacg = undefined;
            cbfia[cbgbc].cbdhg.ccbii = true;
        }

        function cbddg() {
            var cbdcd;
            for (var cbfaf in cbfia[cbgbc].cbddc) {
                var cbdbh = cbfia[cbgbc].cbddc[cbfaf];
                cbdce(cbdbh, cbdcd);
            }
        }

        function cbdce(cbdbh, cbdcd) {
            if (!cbdcd || cbdbh.cbajd != cbdcd.cbfbh) cbdcd = cbdgd(cbdbh.cbajd, cbgbc);
            if (cbdcd) {
                cbdbh.cbajc = cbdcd;
                cbdeh(cbdbh, cbdcd);
                cajih(cbdbh, cbdcd);
                cbdbh.cbbbi = cbadc(cbdbh.cbbbi, cbdcd.cbbbi);
                cbdbh.cbchf = cbadc(cbdbh.cbchf, cbdcd.cbchf);
                cbdbh.ccdga = cbadc(cbdbh.ccdga, cbdcd.ccdga);
                cbdbh.cbgac = cbadc(cbdbh.cbgac, cbdcd.cbgac);
            } else cbcje.ccdac(11216, cbdbh.cbajd);
        }

        function cbddf(cajjf) {
            var cbabc = false;
            for (var cbfaf in cbfia[cajjf].cbdbj) {
                var cbdbf = cbfia[cajjf].cbdbj[cbfaf];
                var cbeaf = cbdbf.cbdee.cbegj;
                if (cbeaf) {
                    cbabc = true;
                    if (cbeaf.cbadj) {
                        cbeaf.cbhhb = 999999999999;
                        cbeaf.cbhfg = -999999999999;
                    }
                }
            }
            if (!cbabc) {
                return;
            }
            for (var cbdai in cbfia[cajjf].cbddc) {
                var cbdbh = cbfia[cajjf].cbddc[cbdai];
                var cbeaf = cbdbh.cbajc.cbdee.cbegj;
                if (cbeaf) {
                    var cbbjc = Number(cbdbh[cbeaf.cbbja]);
                    if (cbbjc < cbeaf.cbhhb) cbeaf.cbhhb = cbbjc;
                    if (cbbjc > cbeaf.cbhfg) cbeaf.cbhfg = cbbjc;
                }
            }
            for (var cbfaf in cbfia[cajjf].cbdbj) {
                var cbdbf = cbfia[cajjf].cbdbj[cbfaf];
                var cbeaf = cbdbf.cbdee.cbegj;
                if (cbeaf) {
                    cbeaf.cbaaf = undefined;
                    if (cbeaf.cbadj) {
                        var ccafi = (cbeaf.cbhfg - cbeaf.cbhhb) / cbeaf.ccafh;
                        var ccafg = Math.floor(cbgfd(ccafi));
                        if (ccafi < 2) ccafi = parseInt(ccafi * Math.pow(10, (-ccafg + 1)) + 1) / Math.pow(10, (-ccafg + 1));
                        else ccafi = parseInt(ccafi);
                        var cbhgg = cbeaf.cbhhb;
                        cbeaf.ccagb = new Array();
                        if (ccafi == 0) cbeaf.cbaaf = cbeaf.cbhhb;
                        else {
                            cbeaf.cbaaf = undefined;
                            for (var cbfaf = 1; cbfaf < cbeaf.ccafh; cbfaf++) {
                                if (ccafi < 2) cbeaf.ccagb.push(parseInt((cbhgg + cbfaf * ccafi) * Math.pow(10, (-ccafg - 1))) / Math.pow(10, (-ccafg - 1)));
                                else cbeaf.ccagb.push(parseInt(cbhgg + cbfaf * ccafi));
                            }
                        }
                    }
                    var cbbcc = cbbgi(cbeaf.cbdfh);
                    var cbajj = cbbgi(cbeaf.cbdfg);
                    cbeaf.cbbdc = new Array();
                    var ccagi = cbeaf.ccafh;
                    if (cbeaf.cbaaf != undefined) ccagi = 1;
                    for (var cbfaf = 0; cbfaf < ccagi; cbfaf++) {
                        cbeaf.cbbdc.push('#' + number2Hex(parseInt(cbbcc.ccafc + (cbajj.ccafc - cbbcc.ccafc) * cbfaf / (cbeaf.ccafh - 1)), 2) + number2Hex(parseInt(cbbcc.cbeaf + (cbajj.cbeaf - cbbcc.cbeaf) * cbfaf / (cbeaf.ccafh - 1)), 2) + number2Hex(parseInt(cbbcc.cbaef + (cbajj.cbaef - cbbcc.cbaef) * cbfaf / (cbeaf.ccafh - 1)), 2));
                    }
                }
            }
            for (var cbfaf in cbfia[cajjf].cbddc) {
                var cbdbh = cbfia[cajjf].cbddc[cbfaf];
                cbdbi(cbdbh, cajjf);
            }
        }

        function cbdbi(cbdbh) {
            if (cbdbh.cbdee) {
                var cbeaf = cbdbh.cbdee.cbegj;
                cbdbh.cbehb = undefined;
                if (cbeaf) {
                    var cbbjc = parseFloat(cbdbh[cbeaf.cbbja]);
                    if (cbbjc != NaN) cbdbh.cbehb = cbeej(cbbjc, cbeaf);
                }
            }
        }

        function cbeej(cbbjc, cbegj) {
            if (cbegj.cbaaf != undefined) return 0;
            for (var cbfaf = 0; cbfaf < cbegj.ccafh - 1; cbfaf++) {
                if (cbbjc <= cbegj.ccagb[cbfaf]) return cbfaf;
            }
            return cbegj.ccafh - 1;
        }

        function ccbef() {
            var cbidg = new Object();
            cbidg['instanceNo'] = cbfej;
            cbidg['action'] = 'showGradientLegend';
            cbidg['gradients'] = new Array();
            for (var cbfaf in cbfia[cbgbc].cbdbj) {
                var cbdbf = cbfia[cbgbc].cbdbj[cbfaf];
                var cbeaf = cbdbf.cbdee.cbegj;
                if (cbeaf) {
                    var cbegi = new Object();
                    cbegi['header'] = cbeaf.cbehg;
                    cbegi['subheader'] = cbeaf.cccfd;
                    cbegi['colors'] = cbeaf.cbbdc;
                    cbegi['rangeTexts'] = new Array();
                    if (cbeaf.cbaaf != undefined) cbegi['rangeTexts'].push(cbeaf.ccafj + cbeaf.cbaaf + cbeaf.ccaga);
                    else {
                        cbegi['rangeTexts'].push('&lt; ' + cbeaf.ccafj + cbeaf.ccagb[0] + cbeaf.ccaga);
                        for (var cbfaf = 1; cbfaf < cbeaf.ccafh - 1; cbfaf++) cbegi['rangeTexts'].push(cbeaf.ccafj + cbeaf.ccagb[cbfaf - 1] + cbeaf.ccaga + ' - ' + cbeaf.ccafj + cbeaf.ccagb[cbfaf] + cbeaf.ccaga);
                        cbegi['rangeTexts'].push('&gt; ' + cbeaf.ccafj + cbeaf.ccagb[cbeaf.ccafh - 2] + cbeaf.ccaga);
                    }
                    cbegi['ranges'] = cbeaf.ccagb.length + 1;
                    cbidg.gradients.push(cbegi);
                }
            }
            if (cbidg['gradients'].length > 0) {
                if (cbbdj.cbdjh) ccbbb(cbbdj.cbdjh, cbidg);
            }
        }

        function cbhcf() {
            var cbhaj;
            for (var cbfaf in cbfia[cbgbc].cbhca) {
                var cbhae = cbfia[cbgbc].cbhca[cbfaf];
                cbhba(cbhae, cbhaj);
            }
        }

        function cbhba(cbhae, cbhaj) {
            if (!cbhae) console.log(cbhae);
            if (!cbhaj || cbhae.cbajd != cbhaj.cbfbh) cbhaj = cbdgg(cbhae.cbajd);
            if (!cbhaj) {
                cbcje.ccdac(11280, cbhae.cbajd);
                return;
            }
            cbhee(cbhae, cbhaj);
            cajih(cbhae, cbhaj);
            cbhae.cbchf = cbadc(cbhae.cbchf, cbhaj.cbchf);
            cbhae.cbfai = cbadc(cbhae.cbfai, cbhaj.cbfai);
            if (!cbhae.cbheb.cbfai) {
                cbhae.cbheb.cbfai = cbhae.cbfai;
                cbhae.cbheb.cbfbc = new Image();
                cbhae.cbheb.cbfbc.src = cbhae.cbheb.cbfai;
            }
            cbhae.cbgac = cbadc(cbhae.cbgac, cbhaj.cbgac);
        }

        function themeInitialActions() {
            if (cccdj) {
                if ((new Date()).getTime() > ccbej + 5000) {
                    alert('Too long to load.');
                    return;
                }
            }
            if (!cbfia[cbgbc].cbdhg.ccbbi && cbfia[cbgbc].cbdhg.ccbii && cbfia[cbgbc].cbdhg.cbddh) {
                cbaia();
                if (cbgbc == 0) {
                    cbfia[cbgbc].cbdhg.ccbbi = true;
                    ccbcj();
                    cccih.cbeia();
                } else {
                    ccbbh(cbgbc);
                    cbfia[cbgbc].cbdhg.ccbbi = true;
                    if (cbfia[cbgbc].ccchc.cbdii && cbfia[cbgbc].ccchc.cbdii != '') {
                        cbdia = cbeeg(cbfia[cbgbc].ccchc.cbdii);
                        cbfga = false;
                        cbdja(cbdia, 1);
                    } else ccbcb(true);
                }
                ccajc('allDataLoaded');
                ccbge();
            }
            if (!cbfia[cbgbc].cbdhg.cbddh && cbfia[cbgbc].cbdhg.cbddj && cbfia[cbgbc].cbdhg.cbdca) {
                cbddg();
                cbfia[cbgbc].cbdhg.cbddh = true;
                cbddf(cbgbc);
            }
            if (!cbfia[cbgbc].cbdhg.ccbii && cbfia[cbgbc].cbdhg.cbddh && cbfia[cbgbc].cbdhg.ccbjc && !ccbbc.cbacg) {
                ccbbc.cbacg = 0;
                ccbih();
            }
            if (!cbfia[cbgbc].cbdhg.cbhcg && cbfia[cbgbc].cbdhg.cbhdf && cbfia[cbgbc].cbdhg.cbhag) {
                cbhcf();
                cbfia[cbgbc].cbdhg.cbhcg = true;
            }
            if (cbfia[cbgbc].cbdhg.cbhcg && !cbfia[cbgbc].cbdhg.cbhci) {
                cbhch();
            }
            if (cbfia[cbgbc].cbcih.cbbjb && cbfia[cbgbc].cbdhg.ccbbi && cbfia[cbgbc].cbdhg.cbhci && !cbfia[cbgbc].cbdhg.cbhde && cbdhj) {
                ccaej(true);
            }
            if (cbfia[cbgbc].cbdhg.ccbbi && cbfia[cbgbc].cbdhg.cbddh && cbfia[cbgbc].cbdhg.ccbii && cbfia[cbgbc].cbdhg.cbhcg && cbfia[cbgbc].cbdhg.cbhci && cbfia[cbgbc].cbdhg.cbhde && cbbdj.cbggi) {
                cbgdh.hideMessage("Processing...");
                if (!cbfia[cbgbc].cbgii) {
                    if (!ccdbf.cbadd.cbcjb) cbcje.ccdac(13040, cbfia[cbgbc].ccbjb);
                    ccdbf.cbadd.cbcjb = true;
                } else {
                    ccajc('allDataProcessed');
                    cbfia[cbgbc].cbdhg.mapIsReady = true;
                    cbgdh.hideMessage("Processing...");
                    if (cbfha) {
                        cbfha = false;
                        ccbcb(true);
                        ccbge();
                    }
                    if (ccdbf.cbdih) {
                        var ccbhj = new Object();
                        ccbhj.ccdff = cbfia[cbgbc].cbgii.position().left * cbegg / cbfia[0].cbgja + cbfia[cbgbc].cbgjd.ccdff / 2 * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
                        ccbhj.ccdfi = cbfia[cbgbc].cbgii.position().top * cbegg / cbfia[0].cbgja + cbfia[cbgbc].cbgjd.ccdfi / 2 * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
                        var cccbc = cbfia[cbgbc].cbgjd.ccdff * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
                        var cccbd = cbfia[cbgbc].cbgjd.ccdfi * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
                        var cbdia = new Object();
                        cbdia.cbhga = {
                            ccdff: ccbhj.ccdff - cccbc / 2,
                            ccdfi: ccbhj.ccdfi - cccbd / 2
                        };
                        cbdia.cbheh = {
                            ccdff: ccbhj.ccdff + cccbc / 2,
                            ccdfi: ccbhj.ccdfi + cccbd / 2
                        };
                        cbfia[cbgbc].cbfeg = undefined;
                        ccdbf.cbdih = false;
                        cbdja(cbdia, cbbdj.ccdgg);
                    }
                }
            } else {
                if (ccdbf.cbgbf) {
                    cbgbf();
                }
                ccbgh();
            }
        }

        function cbaia() {
            cbfia[cbgbc].ccdgb = cbfia[cbgbc].cbgjd.ccdff / ccdda.width;
            var ccbbj = cbfia[cbgbc].cbgjd.ccdfi / ccdda.height;
            if (ccbbj > cbfia[cbgbc].ccdgb) cbfia[cbgbc].ccdgb = ccbbj;
            cbfia[cbgbc].ccdgb /= 0.95;
        }

        function ccbge() {
            if (cbfia[cbgbc].ccchc.ccahj > 0) cbfia[cbgbc].ccchc.ccaid = setTimeout("jqmInstances[" + cbfej + "].obj.reloadThemeOnInterval(" + cbgbc + ");", cbfia[cbgbc].ccchc.ccahj * 1000);
        }

        function cbhch() {
            cbgdh.showMessage("Creating markers...");
            switch (cbbdj.cbhea) {
                case "dom":
                    cbhda.html('');
                    for (var cbggd in cbfia[cbgbc].cbhca) {
                        var cbhae = cbfia[cbgbc].cbhca[cbggd];
                        cbhbd(cbhae);
                    }
                    break;
                case "canvas":
                    break;
            }
            cbfia[cbgbc].cbdhg.cbhci = true;
            cbgdh.hideMessage("Creating markers...");
        }

        function cbhbd(cbhae) {
            var cbfce = 'jqmMarkerImg' + cbfej + "-" + cbgbc + '-' + cbhae.cbfhi;
            var cbcec = cbfce.replace('jqmMarkerImg', 'jqmMarkerDiv');
            var cbfcd = document.createElement('div');
            cbfcd['id'] = cbcec;
            cbfcd['style']['position'] = 'absolute';
            cbfcd['style']['margin'] = '0px';
            cbfcd['style']['border'] = '0px';
            cbfcd['style']['padding'] = '0px';
            cbfcd['style']['font-size'] = '0px';
            if (cbhae.ccdfj) cbfcd['style']['z-index'] = cbhae.ccdfj;
            cbhda[0].appendChild(cbfcd);
            var cbfcc = document.createElement('a');
            cbfcc['style']['font-size'] = '0px';
            cbfcd.appendChild(cbfcc);
            var cbhjj = document.createElement('img');
            cbhjj['id'] = cbfce;
            cbhjj.src = cbhae.cbheb.cbfai;
            cbhjj.border = 0;
            cbfcc.appendChild(cbhjj);
            cbhae.cbfcf = $('#' + cbfce);
            cbhae.cbfcc = cbfcc;
            cbhae.cbced = $('#' + cbcec);
            cbhae.cbced.css('opacity', 0);
            setMarkerEvents(cbhae);
            if (cbhae.cbheb.width && cbhae.cbheb.height) {
                cbhae.cbfaj = cbhae.cbheb.width;
                cbhae.cbfba = cbhae.cbheb.height;
            } else {
                cbhae.cbfcf.load(function() {
                    var ccdfa = cbgch.cbege(this.src);
                    if (!ccdfa) {
                        var width = Math['max'](this.width, $(this).width());
                        var height = Math['max'](this.height, $(this).height());
                        cbgch.ccbhc(this.src, width, height);
                    }
                });
            }
        }

        function setMarkerEvents(cbhae) {
            if (cbhae.cbchf) {
                if (cbjjg.cbehf) {
                    cbhae.cbfcc.onmouseover = function() {
                        jqmEvent(cbfej, "onmouseover", "marker", cbhae.cbfhi, cbgbc);
                    };
                    cbhae.cbfcc.onmouseout = function() {
                        jqmEvent(cbfej, "onmouseout", "marker", cbhae.cbfhi, cbgbc);
                    };
                }
                cbhae.cbfcc.href = 'javascript:jqmEvent(' + cbfej + ', "onclick", "marker", ' + cbhae.cbfhi + ", " + cbgbc + ");";
            }
        }

        function ccaej(ccagj) {
            if (!cbgjc || !cbfia[cbgbc].cbgii) {
                return;
            }
            ccaif();
            var ccaha = false;
            cbagi(cbgbc);
            if (ccbbc.cbhdi == 0) {
                cbaid(cbfia[cbgbc].cbghj);
                cbbcd(cbgbc);
            }
            var total = 0;
            if (cbfia[cbgbc].cbhca) total = cbfia[cbgbc].cbhca.length;
            ccbbc.cbhfe = (new Date()).getTime() + 1000;
            for (var cbggd = ccbbc.cbhdi; cbggd < total; cbggd++) {
                if ((new Date()).getTime() > ccbbc.cbhfe) {
                    ccbbc.cbhdi = cbggd;
                    ccbbc.cbhdj = ccagj;
                    cccdf();
                    return;
                }
                var cbhae = cbfia[cbgbc].cbhca[cbggd];
                if (cbhae.cbfei == undefined || !cbhae.cbfei || ccagj) {
                    if (!cbhae.cbfaj || !cbhae.cbfba) {
                        switch (cbbdj.cbhea) {
                            case 'dom':
                                if (!cbhae.cbheb) console.log("-error");
                                else {
                                    var ccdfa = cbgch.cbege(cbhae.cbheb.cbfai);
                                    if (!ccdfa) {
                                        if ((cbhae.cbced || cbbdj.cbhea != 'dom') && cbhae.cbced.width() != 0) {
                                            cbgch.ccbhc(cbhae.cbheb.cbfai, cbhae.cbfcf.width(), cbhae.cbfcf.height());
                                            ccdfa = cbgch.cbege(cbhae.cbheb.cbfai);
                                        }
                                    }
                                    if ((!cbhae.cbced && cbbdj.cbhea == 'dom') || !ccdfa) {
                                        ccaha = true;
                                    } else {
                                        cbhae.cbfaj = ccdfa.width;
                                        cbhae.cbfba = ccdfa.height;
                                    }
                                }
                                break;
                            case "canvas":
                                if (cbhae.cbheb.cbfbc) {
                                    cbhae.cbfaj = cbhae.cbheb.cbfbc.width;
                                    cbhae.cbfba = cbhae.cbheb.cbfbc.height;
                                } else ccaha = true;
                                break;
                        }
                    }
                    if (cbhae.cbfaj && cbhae.cbfba) {
                        if (ccagj || !cbhae.cbfei) {
                            if (cbhae.cbhhh && cbhae.cbhhh.ccdff != undefined && cbhae.cbhhh.ccdfi != undefined) {} else {
                                var cbeag = new Object({
                                    cbfjh: cbhae.cbfjh,
                                    cbggb: cbhae.cbggb
                                });
                                cbhae.cbhhh = cbfia[cbgbc].cbcih.cbeai(cbeag);
                            }
                            ccafa(cbhae);
                        }
                        if (cbbdj.cbhea == "canvas" && cbhae.cbheb.ccdee) {
                            cbfia[cbgbc].cbhcb.globalAlpha = cbhae.cbheb.cbifh;
                            if (ccdbe) cbcgg(cbgbc, cbced, cbhae, cbheb, false);
                            else {
                                cbfia[cbgbc].cbhcb.drawImage(cbhae.cbheb.cbfbc, cbhae.cbhhh.ccdff - cbhae.cbfaj / 2 / cbfia[cbgbc].currentCanvasScale, cbhae.cbhhh.ccdfi - cbhae.cbfba / 2 / cbfia[cbgbc].currentCanvasScale, cbhae.cbfaj / cbfia[cbgbc].currentCanvasScale, cbhae.cbfba / cbfia[cbgbc].currentCanvasScale);
                            }
                        }
                    }
                }
            }
            cbahc();
            ccahc(cbgbc);
            ccbbc.cbhdi = 0;
            cbgdh.hideMessage("Putting markers in place...");
            if (!ccaha) cbfia[cbgbc].cbdhg.cbhde = true;
        };

        function ccafa(cbhae) {
            switch (cbbdj.cbhea) {
                case 'dom':
                    var cbjic = cbfia[cbgbc].cbcih.cbhia(cbhae.cbhhh, cbegg);
                    cbjic.ccdff += ccdbf.ccabf.ccdff;
                    cbjic.ccdfi += ccdbf.ccabf.ccdfi;
                    cbhae.cbihj = Math.round(cbhae.cbfaj * cbhae.cbheb.ccbbg / 2);
                    cbhae.cbiia = Math.round(cbhae.cbfba * cbhae.cbheb.ccbbg / 2);
                    cbhae.cbihg = Math.round(cbjic.ccdff) - cbhae.cbihj;
                    cbhae.cbiic = Math.round(cbjic.ccdfi) - cbhae.cbiia;
                    cbhae.cbiid = Math.round(cbhae.cbfaj * cbhae.cbheb.ccbbg);
                    cbhae.cbihf = Math.round(cbhae.cbfba * cbhae.cbheb.ccbbg);
                    cbhae.cbced.css('left', cbhae.cbihg);
                    cbhae.cbfei = true;
                    cbhae.cbced.css('top', cbhae.cbiic);
                    cbhae.cbfcf.width(cbhae.cbiid);
                    cbhae.cbfcf.height(cbhae.cbihf);
                    cbhae.cbced.css('opacity', cbhae.cbheb.cbifh);
                    if (cbhae.cbheb.ccdee) cbhae.cbced.css('display', 'block');
                    else cbhae.cbced.css('display', 'none');
                    break;
                case "canvas":
                    cbhae.cbihj = cbhae.cbfaj * cbhae.cbheb.ccbbg / 2 * cbfia[cbgbc].currentCanvasScale;
                    cbhae.cbiia = cbhae.cbfba * cbhae.cbheb.ccbbg / 2 * cbfia[cbgbc].currentCanvasScale;
                    break;
            }
            cbhae.cbfei = true;
        }

        function ccaei() {
            for (var cbche in cbfia[cbgbc].cbdad) ccaeh(cbfia[cbgbc].cbdad[cbche]);
        }

        function ccaeh(cbdac) {
            var cbjic = cbfia[cbgbc].cbcih.cbeaj(cbdac, cbegg);
            cbdac.cbfac["style"]["left"] = cbjic.ccdff + "px";
            cbdac.cbfac["style"]["top"] = cbjic.ccdfi + "px";
        }

        function ccbff(cajjf, obj, cbbha, cbgac, cbgce, cbhhh, cbiid, cbihf) {
            if (!cbgce) return;
            cbbha.save();
            var ccbci = cbaja(cbgbc, cbbha, cbgac.cccgj, false, undefined, true);
            var cbdbb = cbegg / cbfia[cajjf].cbgja;
            var ccdei = cbbha.measureText(cbgce).width * ccbci;
            var cbehd = cbgac.cccgj.cbdje * cbdbb;
            var ccadc, ccadb;
            switch (jQuery.trim(cbgac.cccgj.cbaaa).toLowerCase()) {
                case "top":
                case "top-left":
                case "top-right":
                    ccadc = cbhhh.ccdfi + cbihf / 2 * cbdbb;
                    break;
                case "bottom":
                case "bottom-left":
                case "bottom-right":
                    ccadc = cbhhh.ccdfi - cbihf / 2 * cbdbb - cbehd / 2;
                    break;
                case "center":
                case "left":
                case "right":
                    ccadc = cbhhh.ccdfi - cbehd / 2;
                    break;
            }
            switch (jQuery.trim(cbgac.cccgj.cbaaa).toLowerCase()) {
                case "left":
                case "top-left":
                case "bottom-left":
                    ccadb = cbhhh.ccdff + cbiid / 2 * cbdbb;
                    break;
                case "right":
                case "top-right":
                case "bottom-right":
                    ccadb = cbhhh.ccdff - cbiid / 2 * cbdbb - ccdei;
                    break;
                case "top":
                case "bottom":
                case "center":
                    ccadb = cbhhh.ccdff - ccdei / 2;
                    break;
            }
            obj.cbgad = new Object();
            obj.cbgad.ccdff = ccadb + cbgac.cccgj.offsetX * cbdbb;
            obj.cbgad.ccdfi = ccadc + cbgac.cccgj.offsetY * cbdbb;
            obj.cbgad.ccdei = ccdei;
            obj.cbgad.cbehd = cbehd;
            cbbha.restore();
        }

        function cbhbe(cbhae) {
            if (cbbdj.cbhea == 'dom') {
                if (cbhae.cbiif.cbfai) cbhae.cbfcf.src = cbhae.cbiif.cbfai;
                var cbcce = Math.round(cbhae.cbfaj * (cbhae.cbiif.ccbbg - cbhae.cbheb.ccbbg) / 2);
                var cbccf = Math.round(cbhae.cbfba * (cbhae.cbiif.ccbbg - cbhae.cbheb.ccbbg) / 2);
                cbhae.cbfcf.width(cbhae.cbiid + 2 * cbcce);
                cbhae.cbfcf.height(cbhae.cbihf + 2 * cbccf);
                cbhae.cbced.css('left', parseFloat(cbhae.cbced.css('left')) - cbcce);
                cbhae.cbced.css('top', parseFloat(cbhae.cbced.css('top')) - cbccf);
                cbhae.cbced.css('opacity', cbhae.cbiif.cbifh);
            }
        }

        function cbhef(cbhae) {
            if (cbbdj.cbhea == 'dom') {
                if (cbhae.cbheb.cbfai) cbhae.cbfcf.src = cbhae.cbheb.cbfai;
                cbhae.cbced.css('left', cbhae.cbihg);
                cbhae.cbced.css('top', cbhae.cbiic);
                cbhae.cbfcf.width(cbhae.cbiid);
                cbhae.cbfcf.height(cbhae.cbihf);
                cbhae.cbced.css('opacity', cbhae.cbheb.cbifh);
            }
        }

        function cbebi(cbhhh) {
            if (!cbecb) {
                var cbfce = 'jqmGeolocationIconImg' + cbfej;
                cbeca = new Image();
                cbeca.src = cbedc(cbbdj.cbecc, cbbdj.cbbec);
                var cbhjj = document.createElement('img');
                cbhjj['id'] = cbfce;
                cbhjj.src = cbeca.src;
                cbhjj.border = 0;
                cbebj[0].appendChild(cbhjj);
                cbecb = $('#' + cbfce);
                cbecb.css('opacity', 0);
            }
            if (cbeca.width != 0) {
                cbagi(cbgbc);
                var left = cbhhh.ccdff * cbfia[cbgbc].cbgja / cbegg - cbeca.width / 2 + ccdbf.ccabf.ccdff;
                var top = cbhhh.ccdfi * cbfia[cbgbc].cbgja / cbegg - cbeca.height / 2 + ccdbf.ccabf.ccdfi;
                cbebj.css('left', left);
                cbebj.css('top', top);
                cbecb.css('opacity', 1);
            }
        }

        function cbdda(cbdbh) {
            cbdbh.cbejc = true;
            cbcgd(cbgbc, cbfia[cbgbc].cbghj, cbfia[cbgbc].cbgie, cbdbh.ccbhh, cbdbh.cbejd, false);
        }

        function cbdea(cbdbh) {
            cbdbh.cbejc = false;
            cbcgd(cbgbc, cbfia[cbgbc].cbghj, cbfia[cbgbc].cbgie, cbdbh.ccbhh, cbdbh.cbdee, false);
        }

        function cbdej() {
            for (var cbfaf = 0 in cbfia[cbgbc].cbddc) {
                var cbdbh = cbfia[cbgbc].cbddc[cbfaf];
                if (cbdbh.cbejc) {
                    cbdbh.cbejc = false;
                    if (cbfia[cbgbc].ccchc.platformFunctionality.cbcdb) cbcgd(cbgbc, cbfia[cbgbc].cbghj, cbfia[cbgbc].cbgie, cbdbh.ccbhh, cbdbh.cbdee, false);
                }
            }
        }

        function ccbca(cbdbh, ccbbg) {
            cbdbh.ccbbg = ccbbg;
            var ccbie = cbdgj(cbdbh.cbfbh);
            cbdbh.cbaje = cbahj(ccbie);
            for (var ccbbe in ccbie) {
                var ccbhh = ccbie[ccbbe];
                cbcgd(cbgbc, cbfia[cbgbc].cbghj, cbfia[cbgbc].cbgie, ccbhh, cbdbh.cbdee, false);
            }
        }

        function cbahj(ccbie) {
            var cbhhd = new cbhgf();
            for (var cbfaf in ccbie) {
                var ccbhh = ccbie[cbfaf];
                var cbhhe = {
                    cbhga: {
                        ccdff: ccbhh.cbgeh.ccdff,
                        ccdfi: ccbhh.cbgeh.ccdfi
                    },
                    cbheh: {
                        ccdff: ccbhh.cbgeh.ccdff + ccbhh.size.ccdff,
                        ccdfi: ccbhh.cbgeh.ccdfi + ccbhh.size.ccdfi
                    }
                };
                cbhhd.cbbbd(cbhhe);
            }
            return {
                ccdff: (cbhhd.cbhga.ccdff + cbhhd.cbheh.ccdff) / 2,
                ccdfi: (cbhhd.cbhga.ccdfi + cbhhd.cbheh.ccdfi) / 2
            };
        }

        function ccdah() {
            for (var cbfaf = 0 in cbfia[cbgbc].cbddc) {
                var cbdbh = cbfia[cbgbc].cbddc[cbfaf];
                if (cbdbh.ccbbg && cbdbh.ccbbg != 1) cbdbh.ccbbg = undefined;
            }
            ccbcb(true);
        }

        function cbgbf() {
            ccdbf.cbgbf = false;
            if (cbgbc == 0) cccih.cbeia();
            else {
                if (ccdbf.cbaad) cccih.cccac();
            } if (cbghg) cbghg.hide();
            for (var cbfaf = 0; cbfaf < cbfia.length; cbfaf++) {
                if (cbfaf < cbgbc) {
                    cbfia[cbfaf].cbgii.css('opacity', cbbdj.ccade);
                    if (cbfaf < cbgbc - 1 || cbbdj.ccade == 0) {
                        if (cbfia[cbfaf].cbgia) cbfia[cbfaf].cbgia.hide();
                    }
                } else if (cbfaf == cbgbc) {
                    cbfia[cbfaf].cbgii.css('opacity', '1');
                    if (cbghg) cbghg.show();
                    if (cbfia[cbfaf].cbgia) cbfia[cbfaf].cbgia.show();
                }
            }
        }

        function cbeja(cajjf) {
            cbeif(cajjf);
        }

        function cbeif(cajjf) {
            if (!cbfia[cajjf].cbaic) return;
            cbfia[cajjf].cbeig.clearRect(cbfia[cajjf].cbaic.left, cbfia[cajjf].cbaic.top, cbfia[cajjf].cbaic.width, cbfia[cajjf].cbaic.height);
            if (ccdbe) cbfia[cajjf].cbejg.empty();
        }

        function cbbcd(cajjf) {
            if (cbfia[cajjf].cbaic) {
                cbfia[cajjf].cbhcb.clearRect(cbfia[cajjf].cbaic.left, cbfia[cajjf].cbaic.top, cbfia[cajjf].cbaic.left + cbfia[cajjf].cbaic.width, cbfia[cajjf].cbaic.top + cbfia[cajjf].cbaic.height);
                if (ccdbe) cbfia[cajjf].cbhdc.empty();
            }
        }

        function cbiee() {
            cbief.clearRect(0, 0, ccdda.width, ccdda.height);
        }

        function cbdci(cbdbh, cajjf) {
            if (!cbdbh.ccbhh) return;
            cbfia[cajjf].cbeih.show();
            if (cbdbh.ccbhh.type && cbdbh.ccbhh.type == "box") cbcgd(cajjf, cbfia[cajjf].cbeig, cbfia[cajjf].cbejg, cbdbh.ccbhh, cbdbh.cbiie, true);
            else cbcgh(cajjf, cbfia[cajjf].cbeig, cbdbh.ccbhh, cbdbh.cbiie, true);
        }

        function ccbah(cbidf, cbicj, cajid) {
            if (!cbfff) return;
            var ccdaj = cbjac(cbicj, cajid.ccdaj);
            if (cajid.cccfj) {
                switch (cajid.cccfj.toLowerCase()) {
                    case '_parent':
                        parent.location.href = ccdaj;
                        break;
                    case '_self':
                        location.href = ccdaj;
                        break;
                    case '_blank':
                        window.open(ccdaj);
                        break;
                    case 'featurecategorychange':
                    case 'categorychange':
                        cbdch(cbicj, cajid.cbhjg);
                        cbddf(cbgbc);
                        cbfia[cbgbc].cbdhg.cbaie = false;
                        ccbcb(true);
                        break;
                    case 'featuresunhighlight':
                    case 'unhighlightfeatures':
                        cbdej();
                        break;
                    case 'highlightfeature':
                    case 'featurehighlight':
                        cbdda(cbicj);
                        break;
                    case 'loadchild':
                        if (ccdbf.cbddi) {
                            ccdbf.cbbbj = ccdaj;
                            ccdbf.cbdih = cajid.cbdih;
                        }
                        break;
                    case 'infowindow':
                        if (cajid.cbfdd) {
                            cbfde(cajid.cbfdd, cajid.cbfdc, cajid.cbaaa, cajid.event == 'onmouseover');
                            if (cajid.cbfhh) {
                                cbicj['event'] = cajid.event;
                                cbicj['type'] = cbidf;
                                if (ccdde) {
                                    cbicj['pageX'] = ccdde.pageX;
                                    cbicj['pageY'] = ccdde.pageY;
                                    cbicj['viewportX'] = ccdde.ccdff;
                                    cbicj['viewportY'] = ccdde.ccdfi;
                                }
                                ccbbb(cajid.cbfhh, cbicj);
                            }
                        } else if (cajid.ccdaj) cbfea(ccdaj, cajid.cbaaa, cajid.event == 'onmouseover');
                        break;
                    case 'js':
                        cbicj['event'] = cajid.event;
                        cbicj['type'] = cbidf;
                        if (ccdde) {
                            cbicj['pageX'] = ccdde.pageX;
                            cbicj['pageY'] = ccdde.pageY;
                            cbicj['viewportX'] = ccdde.ccdff;
                            cbicj['viewportY'] = ccdde.ccdfi;
                        }
                        ccbbb(cajid.cbfhh, cbicj);
                        break;
                    case 'redraw':
                        ccbcb(true, 0);
                        break;
                    default:
                        cbcje.ccdac(12040, cajid.cccfj);
                        break;
                }
            }
        }

        function cbdch(cbicj, cbhjg) {
            var cbdcd = cbdgd(cbhjg, cbgbc);
            if (cbdcd) {
                if (!cbicj.cbigb) cbicj.cbigb = cbicj.cbajd;
                cbicj.cbajd = cbhjg;
                cbicj["categoryId"] = cbhjg;
                cbicj.cbajc = cbdcd;
                cbicj.cbdee = cbdcd.cbdee;
                cbicj.cbiie = cbdcd.cbiie;
                cbicj.cajif = cbdcd.cajif;
                cbicj.cbchf = cbdcd.cbchf;
                cbicj.ccdga = cbdcd.ccdga;
                cbicj.cbgac = cbdcd.cbgac;
            } else cbcje.ccdac(11213, cbhjg);
        }

        function cbbaa(cbdbh, cajjj) {
            if (cajjj == 1) cbdbh.cajjg = undefined;
            else cbdbh.cajjg = cajjj;
        }

        function cbbab(cbdbh, featureStyleInstance) {
            var cbiae = new Object();
            var cbach = cbdbh.cbdee;
            if (featureStyleInstance["event"]) {
                switch (featureStyleInstance["event"].toLowerCase()) {
                    case "onmouseover":
                        cbach = cbdbh.cbiie;
                        break;
                    case "onhighlighted":
                        cbach = cbdbh.cbejd;
                        break;
                    case "onmouseout":
                    default:
                        break;
                }
            }
            cbiae.cbdff = cbach.cbdff;
            cbiae.cccej = cbach.cccej;
            cbiae.cccfa = cbach.cccfa;
            var cccie = featureStyleInstance["fillColor"];
            if (cccie) cbiae.cbdff = cccie;
            cccie = featureStyleInstance["strokeColor"];
            if (cccie) cbiae.cccej = cccie;
            cccie = featureStyleInstance["strokeWidth"];
            if (cccie != undefined) cbiae.cccfa = cccie;
            cccie = featureStyleInstance["visible"];
            cbiae.ccdee = ccdae(cccie, true);
            if (featureStyleInstance["event"]) {
                switch (featureStyleInstance["event"].toLowerCase()) {
                    case "onmouseover":
                        cbdbh.cbiie = cbiae;
                        break;
                    case "onhighlighted":
                        cbdbh.cbejd = cbiae;
                        break;
                    case "onmouseout":
                    default:
                        cbdbh.cbdee = cbiae;
                        break;
                }
            } else cbdbh.cbdee = cbiae;
        }

        function cbabj(featureId) {
            var total = cbfia[cbgbc].ccbie.length;
            for (var ccbbe = 0; ccbbe < total; ccbbe++) {
                var ccbhh = cbfia[cbgbc].ccbie[ccbbe];
                if (ccbhh.cbfbh == featureId) ccbhh.cbifh = 1;
                else ccbhh.cbifh = cbbdj.ccade;
            }
        }

        function ccajd() {
            var total = cbfia[cbgbc].ccbie.length;
            for (var ccbbe = 0; ccbbe < total; ccbbe++) {
                var ccbhh = cbfia[cbgbc].ccbie[ccbbe];
                ccbhh.cbifh = 1;
            }
        }

        function cbfea(ccdaj, cbaaa, cbfgc) {
            for (var cbfaf in cbgda) {
                var cbgcj = cbgda[cbfaf];
                if (cbgcj.ccdaj == ccdaj) {
                    cbgcj.cbaaa = cbaaa;
                    if (cbgcj.cbfad) {
                        cbfda(cbgcj);
                        cbfdg(cbgcj, cbfgc);
                        cbfdh(cbgcj);
                    }
                    return;
                }
            }
            var cbfci = new Object();
            cbfci.ccdaj = ccdaj;
            cbfci.cbfhi = cbgda.length;
            var cbejj = '<div id="infoWindow_' + cbfej + "_" + cbfci.cbfhi + '" style="position: relative; border: 1px;" >\n';
            cbejj += '  <div class="ui-overlay" >\n';
            cbejj += '    <div class="ui-widget-overlay"></div>\n';
            cbejj += '    <div id="infoWindow_' + cbfej + "_" + cbfci.cbfhi + '_shadow" class="ui-widget-shadow ui-corner-all" style="position: absolute; left: 0px; top: 0px; "></div>\n';
            cbejj += '  </div>\n';
            cbejj += '<div id="infoWindow_' + cbfej + "_" + cbfci.cbfhi + '_background" style="position: absolute; left: 0px; top: 0px; padding: 10px;" class="ui-widget ui-widget-content ui-corner-all" align="right" >\n';
            if (!cbfgc) cbejj += '<a href="javascript:" onclick="$(\'#infoWindow_' + cbfej + "_" + cbfci.cbfhi + '\').hide();" style="font-size: 9px;" >Close</a>\n';
            cbejj += '  <div id="infoWindow_' + cbfej + "_" + cbfci.cbfhi + '_content" class="ui-dialog-content ui-widget-content" style="background: none; border: 0; font-size: 11px;" align="left" >\n';
            cbejj += '    Loading infoWindow...\n';
            cbejj += '  </div>\n';
            cbejj += '</div>\n';
            cbfdj.append(cbejj);
            cbfci.cbicj = $('#infoWindow_' + cbfej + "_" + cbfci.cbfhi);
            cbfci.ccbhf = $('#infoWindow_' + cbfej + "_" + cbfci.cbfhi + '_shadow');
            cbfci.cbaej = $('#infoWindow_' + cbfej + "_" + cbfci.cbfhi + '_background');
            cbfci.cbbei = $('#infoWindow_' + cbfej + "_" + cbfci.cbfhi + '_content');
            cbfci.ccdee = false;
            cbfci.cbaaa = cbaaa;
            cbfci.cbicj.hide();
            cbfci.cbfae = function(data) {
                cbfci.cbfad = data;
                cbfda(cbfci);
                cbfdg(cbfci, cbfgc);
                if (cbfci.cbaaa != 'mouse') cbfdh(cbfci);
            };
            cbgda.push(cbfci);
            $.get(cbfci.ccdaj, cbfci.cbfae);
        }

        function cbfde(cbfdd, cbfdc, cbaaa, cbfgc) {
            if (!cbfdc) cbfdc = cbfdd;
            var cbced = $('#' + cbfdd);
            var cbbeh = $('#' + cbfdc);
            if (cbced.length == 0) {
                cbcje.ccdac(12050, cbfdd);
                return;
            }
            var ccdbh = 'jqm' + cbfdd;
            if (!cbfdf[ccdbh]) {
                cbfdf[ccdbh] = cbbeh.html();
                if (cbced.css('z-index') == 'auto') cbced.css('z-index', '500');
                cbced.css('position', 'absolute');
            }
            cbbeh.html(cbfdb(cbfdf[ccdbh]));
            var cbgcj = new Object();
            cbgcj.cbaaa = cbaaa;
            cbgcj.cbaej = cbced;
            cbgcj.cbicj = cbced;
            if (cbfgc) {
                cbbhg = cbgcj;
                cbbhg.ccdee = true;
            }
            if ((typeof cbced['data']('overlay') == "object") && (typeof cbced['data']('overlay')['load'] == "function")) {
                cbced['data']('overlay')['load']();
            } else {
                cbced.show();
            }
            cbfdh(cbgcj);
        }

        function cbfda(cbfci) {
            var cbejj = cbfdb(cbfci.cbfad);
            cbfci.cbbei.html(cbejj);
        }

        function cbfdb(cbejj) {
            var cbfaa = cbejj;
            for (var ccaed in cbcji) {
                if (cbcji.hasOwnProperty(ccaed)) {
                    cbfaa = ccaja(cbfaa, "##" + ccaed + "##", cbcji[ccaed]);
                    cbfaa = ccaja(cbfaa, "%%" + ccaed + "%%", cbcji[ccaed]);
                }
            }
            return cbfaa;
        }

        function cbfdg(cbfci, cbfgc) {
            cbfci.cbicj.show();
            cbfci.ccdee = true;
            if (cbfgc) cbbhg = cbfci;
            cbfci.ccbhf.css('width', cbfci.cbaej.outerWidth());
            cbfci.ccbhf.css('height', cbfci.cbaej.outerHeight());
        }

        function cbbhh() {
            if (cbbhg.cbicj != undefined) cbbhg.cbicj.hide();
            cbbhg.ccdee = false;
        }

        function cbfcj(cbaac) {
            var cbidg = new Object();
            if (cbaac == undefined) {
                cbidg.type = "mouse";
                cbidg.ccdff = 20;
                cbidg.ccdfi = 20;
                return cbidg;
            }
            var cbaab = cbaac.split(',');
            cbidg.type = jQuery.trim(cbaab[0]);
            switch (cbidg.type) {
                case "mouse":
                case "top-left":
                case "top-right":
                case "bottom-left":
                case "bottom-right":
                case "center":
                    cbidg.ccdff = parseInt(cbaab[1]);
                    cbidg.ccdfi = parseInt(cbaab[2]);
                    break;
                case "left":
                case "right":
                    cbidg.ccdff = parseInt(cbaab[1]);
                    break;
                case "top":
                case "bottom":
                    cbidg.ccdfi = parseInt(cbaab[1]);
                    break;
            }
            return cbidg;
        }

        function cbfdi() {
            if (cbbhg && cbbhg.ccdee) cbfdh(cbbhg);
        }

        function cbfdh(cbfci) {
            var cbfhf = cbfci.cbaej.outerWidth();
            var cbfhd = cbfci.cbaej.outerHeight();
            var cccje, cbgaa;
            var cbfhe = cbfci.cbicj.parent();
            var cbcce = ccdcj.offset().left - cbfhe.offset().left;
            var cbccf = ccdcj.offset().top - cbfhe.offset().top;
            switch (cbfci.cbaaa.type) {
                case "mouse":
                    if (!ccdde) return;
                    cbgaa = ccdde.ccdff + cbfci.cbaaa.ccdff;
                    cccje = ccdde.ccdfi + cbfci.cbaaa.ccdfi;
                    break;
                case "top":
                    cbgaa = ccdda.width / 2 - cbfhf / 2;
                    cccje = cbfci.cbaaa.ccdfi;
                    break;
                case "bottom":
                    cbgaa = ccdda.width / 2 - cbfhf / 2;
                    cccje = ccdda.height - cbfhd - cbfci.cbaaa.ccdfi;
                    break;
                case "left":
                    cbgaa = cbfci.cbaaa.ccdff;
                    cccje = ccdda.height / 2 - cbfhd / 2;
                    break;
                case "right":
                    cbgaa = ccdda.width - cbfhf - cbfci.cbaaa.ccdff;
                    cccje = ccdda.height / 2 - cbfhd / 2;
                    break;
                case "top-left":
                    cbgaa = cbfci.cbaaa.ccdff;
                    cccje = cbfci.cbaaa.ccdfi;
                    break;
                case "top-right":
                    cbgaa = ccdda.width - cbfhf - cbfci.cbaaa.ccdff;
                    cccje = cbfci.cbaaa.ccdfi;
                    break;
                case "bottom-left":
                    cbgaa = cbfci.cbaaa.ccdff;
                    cccje = ccdda.height - cbfhd - cbfci.cbaaa.ccdfi;
                    break;
                case "bottom-right":
                    cbgaa = ccdda.width - cbfhf - cbfci.cbaaa.ccdff;
                    cccje = ccdda.height - cbfhd - cbfci.cbaaa.ccdfi;
                    break;
                case "center":
                    cbgaa = ccdda.width / 2 - cbfhf / 2 + cbfci.cbaaa.ccdff;
                    cccje = ccdda.height / 2 - cbfhd / 2 + cbfci.cbaaa.ccdfi;
                    break;
            }
            if (cccje < 5) cccje = 5;
            if (cccje + cbfhd > ccdda.height - 5) cccje = ccdda.height - cbfhd - 5;
            if (cbgaa < 5) cbgaa = 5;
            if (cbgaa + cbfhf > ccdda.width - 5) cbgaa = ccdda.width - cbfhf - 5;
            if (cbfci.cbaaa.type == 'mouse') {
                if (ccdde.ccdff > cbgaa - cbfci.cbaaa.ccdff && ccdde.ccdff < cbgaa + cbfhf + cbfci.cbaaa.ccdff && ccdde.ccdfi > cccje - cbfci.cbaaa.ccdfi && ccdde.ccdfi < cccje + cbfhd + cbfci.cbaaa.ccdfi) {
                    if (ccdde.ccdfi > ccdda.height / 2) cccje = ccdde.ccdfi - cbfhd - cbfci.cbaaa.ccdfi;
                    else cccje = ccdde.ccdfi + cbfci.cbaaa.ccdfi;
                }
            }
            cbfci.cbicj.css({
                left: cbgaa + cbcce,
                top: cccje + cbccf
            });
        }

        function ccdag(cajjf, cbidf) {
            cbbhh();
            switch (cbidf) {
                case 'feature':
                    cbeja(cajjf);
                    break;
                case 'marker':
                    cbhef(cbcji);
                    break;
            }
        }

        function cbjdc(obj) {
            var cbidg;
            if (obj) {
                cbidg = new Object();
                cbidg.cbada = obj['attributeName'];
                var cccha = obj['textStyle'];
                cbidg.cccgj = cbdhb(cccha);
            }
            return cbidg;
        }

        function cbjca(cajid) {
            var cbich = new Object();
            cbich.event = cajid['event'].toLowerCase();
            var cccie = cajid['target'];
            if (cccie) cbich.cccfj = cccie.toLowerCase();
            cccie = cajid['url'];
            if (cccie) cbich.ccdaj = cbedc(cccie, '');
            cccie = cajid['align'];
            if (cccie) {
                cbich.cbaaa = cccie.toLowerCase();
                cbich.cbaaa = cbfcj(cbich.cbaaa);
            }
            cbich.cbhjg = cajid['newCategory'];
            cbich.cbfhh = cajid['jsFunction'];
            cbich.cbfdd = cajid['infoWindowDiv'];
            cbich.cbfdc = cajid['infoWindowContentDiv'];
            return cbich;
        }

        function cbjcg(obj, cbdcf) {
            var cbich = new Object();
            var cccie = obj['fillColor'];
            if (cccie) cbich.cbdff = cccie;
            cccie = obj['strokeColor'];
            if (cccie) cbich.cccej = cccie;
            cccie = obj['strokeWidth'];
            if (cccie) cbich.cccfa = cccie;
            cbich.ccdee = ccdae(obj['visible'], true);
            cccie = obj['scale'];
            if (cccie) cbich.ccbbg = cccie;
            cccie = obj['opacity'];
            if (cccie) cbich.cbifh = cccie;
            cccie = obj['iconUrl'];
            if (cccie) {
                cbich.cbfai = cbedc(cccie, '');
                cbich.cbfbc = new Image();
                cbich.cbfbc.src = cbich.cbfai;
            }
            cbich.width = obj['width'];
            cbich.height = obj['height'];
            if (cbdcf) cbich.cbegj = cbjdb(obj['gradient'], cbdcf);
            cccie = obj['visible'];
            if (cccie != undefined) cbich.ccdee = cccie;
            return cbich;
        }

        function cbjcd(cbdbj) {
            var cbdcb;
            if (cbdbj) cbdcb = new Array();
            for (var cbfaf in cbdbj) {
                var cbdcd = cbdbj[cbfaf];
                var cbdcg = cbjce(cbdcd);
                cbdcb.push(cbdcg);
            }
            return cbdcb;
        }

        function cbjce(cbdcd) {
            var cbidg = new Object();
            cbidg.cbfbh = cbdcd['id'];
            var cccie = cbdcd['childTheme'];
            if (cccie) cbidg.cbbbi = cccie;
            cccie = cbdcd['enabled'];
            if (cccie) cbidg.cbchf = ccdae(cccie, true);
            cccie = cbdcd['zoom'];
            if (cccie) cbidg.ccdga = ccdae(cccie, false);
            cccie = cbdcd['styles'];
            if (cccie) cbjch(cbidg, cccie, cbidg.cbfbh);
            cccie = cbdcd['featureStyles'];
            if (cccie) cbjch(cbidg, cccie, cbidg.cbfbh);
            cccie = cbdcd['markerStyles'];
            if (cccie) cbjch(cbidg, cccie, cbidg.cbfbh);
            cbidg.cajif = cbjcb(cbdcd['actions']);
            cbidg.cbgac = cbjdc(cbdcd['letteredLabel']);
            cbidg.cbgac = cbadc(cbidg.cbgac, cbfia[cbgbc].ccchc.cbgac);
            cbdeh(cbidg, cbfia[cbgbc].ccchc);
            cajih(cbidg, cbfia[cbgbc].ccchc);
            return cbidg;
        }

        function cbjcf(cbddc) {
            var cbdeb;
            if (cbddc) cbdeb = new Array();
            for (var cbfaf in cbddc) {
                var cbdbh = cbddc[cbfaf];
                var cbddb = cbjcc(cbdbh);
                cbddb.cbfhi = cbdeb.length;
                cbddb['index'] = cbddb.cbfhi;
                cbdeb.push(cbddb);
            }
            return cbdeb;
        }

        function cbjee(ccbie) {
            var ccbjf;
            if (ccbie) ccbjf = new Array();
            for (var cbfaf in ccbie) {
                var ccbhh = ccbie[cbfaf];
                var ccbid = cbjec(ccbhh);
                ccbid.cbfhi = ccbjf.length;
                ccbjf.push(ccbid);
            }
            ccbjc();
            return ccbjf;
        }

        function cbjde(cbhaf) {
            var cbhah;
            if (cbhaf) cbhah = new Array();
            for (var cbfaf in cbhaf) {
                var cbhaj = cbhaf[cbfaf];
                var cbhbc = cbjdg(cbhaj);
                cbhah.push(cbhbc);
            }
            return cbhah;
        }

        function cbjdg(cbhaj) {
            var cbidg = new Object();
            cbidg.cbfbh = cbhaj['id'];
            cccie = cbhaj['enabled'];
            if (cccie) cbidg.cbchf = ccdae(cccie);
            cccie = cbhaj['iconUrl'];
            if (cccie) cbidg.cbfai = cccie;
            cccie = cbhaj['styles'];
            if (cccie) cbjch(cbidg, cccie, cbidg.cbfbh);
            cccie = cbhaj['featureStyles'];
            if (cccie) cbjch(cbidg, cccie, cbidg.cbfbh);
            cccie = cbhaj['markerStyles'];
            if (cccie) cbjdi(cbidg, cccie, cbidg.cbfbh);
            cbidg.cajif = cbjcb(cbhaj['actions']);
            cbidg.cbgac = cbjdc(cbhaj['letteredLabel']);
            cbidg.cbgac = cbadc(cbidg.cbgac, cbfia[cbgbc].ccchc.cbgac);
            cbhee(cbidg, cbfia[cbgbc].ccchc);
            cajih(cbidg, cbfia[cbgbc].ccchc);
            return cbidg;
        }

        function cbjdf(cbhca) {
            cbhdg = new Array();
            for (var cbfaf in cbhca) {
                var cbhae = cbhca[cbfaf];
                var cbhbj = cbjdd(cbhae);
                cbhbj.cbfhi = cbhdg.length;
                cbhdg.push(cbhbj);
            }
            return cbhdg;
        }

        function cbjdb(cbegj, cbdcf) {
            var cbeha;
            if (cbegj) {
                cbeha = new Object();
                cbeha.cbfeb = ccdae(cbegj['inherit']);
                if (cbeha.cbfeb) {
                    if (cbgbc > 0) {
                        var cbjhf = cbdgd(cbdcf, cbgbc - 1);
                        var cbjhj = cbjhf.cbdee.cbegj;
                        cbeha.cbdfh = cbjhj.cbdfh;
                        cbeha.cbdfg = cbjhj.cbdfg;
                        cbeha.cbbja = cbjhj.cbbja;
                        cbeha.cbehg = cbjhj.cbehg;
                        cbeha.cccfd = cbjhj.cccfd;
                        cbeha.ccafh = cbjhj.ccafh;
                        cbeha.cbadj = cbjhj.cbadj;
                        if (cbjhj.ccagb) {
                            cbeha.ccagb = new Array();
                            for (var cbfaf in cbjhj.ccagb) cbeha.ccagb.push(cbjhj.ccagb[cbfaf]);
                        }
                        cbeha.ccafj = cbjhj.ccafj;
                        cbeha.ccaga = cbjhj.ccaga;
                    }
                } else {
                    cbeha.cbdfh = cbegj['fillColorLowest'];
                    cbeha.cbdfg = cbegj['fillColorHighest'];
                    cbeha.cbbja = cbegj['dataAttribute'];
                    cbeha.cbehg = cbegj['header'];
                    cbeha.cccfd = cbegj['subheader'];
                    cbeha.ccafh = cbegj['ranges'];
                    cbeha.cbadj = false;
                    var ccagc = cbegj['rangeValues'];
                    if (ccagc.toLowerCase() == 'auto') cbeha.cbadj = true;
                    else {
                        if (ccagc) cbeha.ccagb = ccagc.split(',');
                        else alert("Please set 'auto' or comma-delimited range values in the gradient's rangeValues attribute");
                    }
                    cbeha.ccafj = cbegj['rangeTextPrefix'];
                    cbeha.ccaga = cbegj['rangeTextSufix'];
                }
            }
        }

        function cbjcc(cbdbh) {
            var cbddb;
            if (cbdbh) {
                cbddb = new Object();
                cbjda(cbddb, cbdbh);
                cbddb.cbfbh = cbdbh["id"];
                cbddb.cbajd = cbdbh["categoryId"];
                if (!cbddb.cbajd) cbddb.cbajd = cbdbh["category"];
                cbddb.cbfib = cbdbh["label"];
                if (cbdbh['styles']) cbjch(cbddb, cbdbh['styles'], undefined);
                if (cbdbh['featureStyles']) cbjch(cbddb, cbdbh['featureStyles'], undefined);
                cbddb.cajif = cbjcb(cbdbh['actions']);
                cbddb.cbgac = cbjdc(cbdbh['letteredLabel']);
            }
            return cbddb;
        }

        function cbjec(ccbhh) {
            var cbidg = new Object();
            cbidg.cbfbh = ccbhh["id"];
            switch (cbfia[cbgbc].cbgig) {
                case 'jqm_boxes':
                    cbidg.type = "box";
                    cbidg.cbgeh = new Object();
                    cbidg.cbgeh.ccdff = parseFloat(ccbhh['x']);
                    cbidg.cbgeh.ccdfi = parseFloat(ccbhh['y']);
                    if (ccbhh['orientation']) cbidg.cbifi = parseFloat(ccbhh['orientation']);
                    cbidg.size = new Object();
                    cbidg.size.ccdff = 0;
                    cbidg.size.ccdfi = 0;
                    break;
                case 'jqm_shapes':
                case 'jqm_shapes_r':
                case 'jqm_shapes_rg':
                case 'jqm_shapes_e001':
                    var cbaji = ccbhh['centroid'];
                    if (cbaji) {
                        cbaji = cbaji.split(',');
                        cbidg.cbajh = {
                            ccdff: parseFloat(cbaji[0]),
                            ccdfi: parseFloat(cbaji[1])
                        };
                    }
                    var cbgba = ccbhh['letteredLabelPosition'];
                    if (cbgba) {
                        cbgba = cbgba.split(',');
                        cbidg.cbgaj = {
                            ccdff: parseFloat(cbgba[0]),
                            ccdfi: parseFloat(cbgba[1])
                        };
                    }
                    cbidg.cbgai = ccbhh['letteredLabelLineLinkSide'];
                    cbidg.cbgag = ccbhh['letteredLabelInner'];
                    break;
            }
            if (ccbhh['parts']) {
                if (cbidg.type == "box") cbidg.type = undefined;
                cbidg.cbjgg = new Array();
                for (var cbfaf in ccbhh['parts']) cbidg.cbjgg.push(cbjed(ccbhh['parts'][cbfaf], ccbhh));
            }
            ccbig(cbidg);
            if (cbbdj.ccddf || cbbdj.ccddj) ccbab(cbidg);
            return cbidg;
        }

        function cbjed(cbjge, ccbhh) {
            var cbidg = new Object();
            cbidg.type = cbjge['type'];
            if (!cbidg.type) cbidg.type = ccbhh.type;
            var cbgfc = cbjge['loc'];
            if (cbgfc) {
                cbgfc = cbgfc.split(',');
                cbidg.cbgeh = {
                    ccdff: parseInt(cbgfc[0]),
                    ccdfi: parseInt(cbgfc[1])
                };
            }
            var ccccg = cbjge['size'];
            if (ccccg) {
                ccccg = ccccg.split(',');
                cbidg.size = {
                    ccdff: parseInt(ccccg[0]),
                    ccdfi: parseInt(ccccg[1])
                };
            }
            if (cbjge['coords']) {
                var cbbfg = ccccj(cbjge['coords']);
                cbidg.cbbfd = new Array(cbbfg.length);
                for (var cbfaf = 0; cbfaf < cbbfg.length; cbfaf++) {
                    var ccaac = cbbfg[cbfaf].split(',');
                    cbidg.cbbfd[cbfaf] = {
                        ccdff: parseInt(ccaac[0]),
                        ccdfi: parseInt(ccaac[1])
                    };
                    if (ccaac.length > 2) {
                        switch (ccaac[2].toLowerCase()) {
                            case "as":
                                cbidg.cbbfd[cbfaf].cajji = Number(ccaac[3]);
                                break;
                            case "ae":
                                cbidg.cbbfd[cbfaf].cajjh = true;
                                break;
                        }
                    }
                }
            } else if (cbjge['geoCoords']) {
                var cbbfg = ccccj(cbjge['geoCoords']);
                switch (cbidg.type) {
                    case 'polyline':
                    case 'polygon':
                    case 'circle':
                        cbidg.cbbfd = new Array(cbbfg.length);
                        for (var cbfaf = 0; cbfaf < cbbfg.length; cbfaf++) {
                            var ccaac = cbbfg[cbfaf].split(',');
                            ccaac = cbfia[cbgbc].cbcih.cbeai({
                                cbggb: parseFloat(ccaac[0]),
                                cbfjh: parseFloat(ccaac[1])
                            }, true);
                            cbidg.cbbfd[cbfaf] = {
                                ccdff: ccaac.ccdff,
                                ccdfi: ccaac.ccdfi
                            };
                        }
                        break;
                    case 'curve':
                        cbidg.cbbfd = new Array(3);
                        var ccaac = cbbfg[0].split(',');
                        ccaac = cbfia[cbgbc].cbcih.cbeai({
                            cbggb: Number(ccaac[0]),
                            cbfjh: Number(ccaac[1])
                        }, true);
                        cbidg.cbbfd[0] = {
                            ccdff: ccaac.ccdff,
                            ccdfi: ccaac.ccdfi
                        };
                        ccaac = cbbfg[1].split(',');
                        ccaac = cbfia[cbgbc].cbcih.cbeai({
                            cbggb: Number(ccaac[0]),
                            cbfjh: Number(ccaac[1])
                        }, true);
                        cbidg.cbbfd[2] = {
                            ccdff: ccaac.ccdff,
                            ccdfi: ccaac.ccdfi
                        };
                        ccaac = cbcii.cbedd(cbidg.cbbfd[0], cbidg.cbbfd[2], Number(cbjge['height']), Number(cbjge['balance']));
                        cbidg.cbbfd[1] = {
                            ccdff: ccaac.ccdff,
                            ccdfi: ccaac.ccdfi
                        };
                        break;
                }
            } else cbcje.ccdac(11240); if (cbjge['coordsMapAreas']) {
                var cbbfg = ccccj(cbjge['coordsMapAreas']);
                cbidg.cbbfe = new Array(cbbfg.length);
                for (var cbfaf = 0; cbfaf < cbbfg.length; cbfaf++) {
                    var ccaac = cbbfg[cbfaf].split(',');
                    cbidg.cbbfe[cbfaf] = {
                        ccdff: parseInt(ccaac[0]),
                        ccdfi: parseInt(ccaac[1])
                    };
                }
            } else {
                cbidg.cbbfe = cbidg.cbbfd;
            }
            switch (cbidg.type) {
                case "text":
                    cbidg.cbfib = cbjge['label'];
                    cbidg.cbaaa = cbjge['align'];
                    cbidg.cbifi = cbjge['orientation'];
                    var cccha = cbjge['textStyle'];
                    if (!cccha) cccha = ccbhh["textStyle"];
                    cbidg.cccgj = cbdhb(cccha);
                    cbidg.cbdje = cbjge['fontSize'];
                    cbidg.cbgeh = cbidg.cbbfd[0];
                    cbidg.size = {
                        ccdff: 0,
                        ccdfi: 0
                    };
                    break;
                case "circle":
                    cbidg.ccafd = cbjge['radius'];
                    if (!cbfia[cbgbc].cbcih.cbbjb) cbcje.ccdac(13060);
                    else {
                        cbidg.size = cbfia[cbgbc].cbcih.cbedg(cbidg.cbbfd[0], cbidg.ccafd);
                        cbidg.cbgeh = {
                            ccdff: cbidg.cbbfd[0].ccdff - cbidg.size.ccdff / 2,
                            ccdfi: cbidg.cbbfd[0].ccdfi - cbidg.size.ccdfi / 2
                        };
                    }
                    break;
            }
            if (!cbidg.cbgeh || !cbidg.size) ccbgf(cbidg);
            return cbidg;
        }

        function cbjdd(cbhae) {
            var cbhbj;
            if (cbhae) {
                cbhbj = new Object();
                cbjda(cbhbj, cbhae);
                cbhbj.cbfbh = cbhae['id'];
                cbhbj.cbajd = cbhae['categoryId'];
                if (!cbhbj.cbajd) cbhbj.cbajd = cbhae['category'];
                cbhbj.cbfib = cbhae['label'];
                cbhbj.cbfjh = cbhae['lat'];
                cbhbj.cbggb = cbhae['lon'];
                cbhbj.cbhhh = {
                    ccdff: Number(cbhae['x']),
                    ccdfi: Number(cbhae['y'])
                };
                if (cbbdj.ccddf || cbbdj.ccddj) ccbaa(cbhbj.cbhhh);
                var cccie = cbhae['zindex'];
                if (cccie) cbhbj.ccdfj = Number(cbhae['zindex']);
                if (cbhae['styles']) cbjdi(cbhbj, cbhae['styles'], undefined);
                if (cbhae['markerStyles']) cbjdi(cbhbj, cbhae['markerStyles'], undefined);
                cbhbj.cajif = cbjcb(cbhae['actions']);
                cbhbj.cbgac = cbjdc(cbhae['letteredLabel']);
            }
            return cbhbj;
        }

        function cbjda(cbide, cbidc) {
            $.each(cbidc, function(cbfaf, cbaci) {
                cbide[cbfaf] = ccdad(cbaci);
            });
        }

        function cbjeb(obj) {
            var cbidg = new Object();
            cbidg.cbfcb = obj['imagesUrl'];
            cbidg.cbdij = obj['focusOnImages'];
            cbidg.ccbaf = Number(obj['rows']);
            cbidg.cbbde = Number(obj['columns']);
            cbidg.cbdab = obj['extension'];
            cbidg.cbicf = new Object();
            cbidg.cbicf.ccdff = obj['nwPixel']['x'];
            cbidg.cbicf.ccdfi = obj['nwPixel']['y'];
            cbidg.cbicd = new Object();
            cbidg.cbicd.cbfjh = obj['nwGeo']['lat'];
            cbidg.cbicd.cbggb = obj['nwGeo']['lon'];
            cbidg.ccbei = new Object();
            cbidg.ccbei.ccdff = obj['sePixel']['x'];
            cbidg.ccbei.ccdfi = obj['sePixel']['y'];
            cbidg.ccbde = new Object();
            cbidg.ccbde.cbfjh = obj['seGeo']['lat'];
            cbidg.ccbde.cbggb = obj['seGeo']['lon'];
            cbidg.cajjg = Number(obj['alpha']);
            cbidg.cbhfd = Number(obj["maxPixels"]);
            return cbidg;
        }

        function cbegc(cbche) {
            var cbihd = new Array();
            for (var cbfaf = 0; cbfaf < cbche['touches'].length; cbfaf++) cbihd.push(cbefj(cbche['touches'][cbfaf]));
            return cbihd;
        }

        function cbefj(cbche) {
            var cbidg = new Object();
            var pageX = cbche.pageX;
            var pageY = cbche.pageY;
            cbidg.ccdff = pageX - ccdcj.offset().left;
            cbidg.ccdfi = pageY - ccdcj.offset().top;
            cbidg.pageX = pageX;
            cbidg.pageY = pageY;
            return cbidg;
        }

        function ccajc(cajid, obj) {
            if (!cbfia[cbgbc] || !cbfia[cbgbc].ccchc) return;
            if (!cbbdj.cbdjh) return;
            if (eval('typeof ' + cbbdj.cbdjh) != 'function') {
                cbcje.ccdac(12060, cbbdj.cbdjh);
                return;
            }
            var cbidg = new Object();
            cbidg['instanceNo'] = cbfej;
            cbidg['action'] = cajid;
            cbidg['event'] = cajid;
            cbidg['level'] = cbgbc;
            cbidg['themeId'] = cbfia[cbgbc].ccchc.cbfbh;
            if (cbfic) cbidg['lastClickedObject'] = cbfic;
            cbidg['clickedFeatures'] = cbbce;
            cbidg['currentFocusBox'] = cbeeb();
            cbidg['scale'] = cbegg;
            for (var ccaed in obj) {
                if (obj.hasOwnProperty(ccaed)) cbidg[ccaed] = obj[ccaed];
            }
            ccbbb(cbbdj.cbdjh, cbidg);
        }

        function cbfgd() {
            if (!ccaae || !ccaah) return false;
            var cccib = (new Date()).getTime();
            var cccie;
            if (ccaae.cccjj) cccie = cccib - ccaae.cccib > 1000 || Math.abs(ccaae.cccjj[0].ccdff - ccaah.cccjj[0].ccdff) > 10 || Math.abs(ccaae.cccjj[0].ccdfi - ccaah.cccjj[0].ccdfi) > 10;
            else cccie = cccib - ccaae.cccib > 1000 || Math.abs(ccaah.ccabe.ccdff - ccaae.ccabe.ccdff) > 10 || Math.abs(ccaah.ccabe.ccdfi - ccaae.ccabe.ccdfi) > 10;
            return cccie;
        }

        function ccaij(cajjf) {
            while (cbgbc > cajjf) {
                ccaig();
                cbgbc--;
            }
        }

        function ccaig() {
            if (cbfia[cbgbc] && cbfia[cbgbc].cbgii) cbfia[cbgbc].cbgii.remove();
            ccaih();
            cbfia.pop();
            if (cbbce.length > 0) cbbce.pop()
        }

        function ccaih() {
            if (cbfia[cbgbc] && cbfia[cbgbc].ccchc && cbfia[cbgbc].ccchc.ccaid) clearTimeout(cbfia[cbgbc].ccchc.ccaid);
        }

        function cbdcj(cbdbh, cbbeg) {
            var cbdia = cbeeh(cbdbh, cbbeg);
            ccdbf.cbdid = cbdbh.cbfbh;
            cbfga = false;
            cbdja(cbdia, cbbdj.ccdgg);
        }

        function cbbcf(featureId) {
            for (var cajjf = cbgbc; cajjf > cbgbc - 2; cajjf--) {
                if (cajjf >= 0) {
                    var cbdbh = cbdgc(featureId, cajjf);
                    if (cbdbh) {
                        jqmEvent(cbfej, "onclick", "feature", cbdbh.cbfhi, cajjf);
                        return;
                    }
                }
            }
            ccajc('featureNotFound', {
                "method": "Maps.clickOnFeature",
                "featureId": featureId
            });
        }

        function cbdhi(featureId, cbbeg) {
            var cbdbh = cbdgc(featureId);
            if (!cbdbh) ccajc('featureNotFound', {
                "method": 'Maps.focusAndHighlightFeatureAction',
                "featureId": featureId
            });
            else {
                cbdda(cbdbh);
                cbdcj(cbdbh, cbbeg);
                if (ccdbf.cbaad) cccih.cccac();
                cbfia[cbgbc].cbdhg.cccdg = true;
            }
        }

        function cbeeg(cbdbg, cbbeg) {
            var cbdia = new cbhgf();
            for (var cbfaf in cbfia[cbgbc].cbddc) {
                var cbdbh = cbfia[cbgbc].cbddc[cbfaf];
                if (ccceh(cbdbh.cbajd, cbdbg)) {
                    var cbdbe = cbeeh(cbdbh, cbbeg);
                    if (cbdbe) cbdia.cbbbd(cbdbe);
                }
            }
            if (cbfia[cbgbc].ccchc.cbhfa) {
                var cbace = cbagj(cbdia);
                if (cbace > cbfia[cbgbc].ccchc.cbhfa) cajjd(cbdia, cbfia[cbgbc].ccchc.cbhfa);
            }
            if (cbfia[cbgbc].ccchc.cbhgh) {
                var cbace = cbagj(cbdia);
                if (cbace < cbfia[cbgbc].ccchc.cbhgh) cajjd(cbdia, cbfia[cbgbc].ccchc.cbhgh);
            }
            return cbdia;
        }

        function cajjd(cbdia, cbiad) {
            var cbace = cbagj(cbdia);
            var cccbc = (cbdia.cbheh.ccdff - cbdia.cbhga.ccdff) * cbiad / cbace;
            var cccbd = (cbdia.cbheh.ccdfi - cbdia.cbhga.ccdfi) * cbiad / cbace;
            cbdia.cbhga = {
                ccdff: (cbdia.cbheh.ccdff + cbdia.cbhga.ccdff) / 2 - cccbc / 2,
                ccdfi: (cbdia.cbheh.ccdfi + cbdia.cbhga.ccdfi) / 2 - cccbd / 2
            };
            cbdia.cbheh = {
                ccdff: (cbdia.cbheh.ccdff + cbdia.cbhga.ccdff) / 2 + cccbc / 2,
                ccdfi: (cbdia.cbheh.ccdfi + cbdia.cbhga.ccdfi) / 2 + cccbd / 2
            };
        }

        function cbeeh(cbdbh, cbbeg) {
            if (!cbdbh.ccbhh) {
                return;
            }
            var ccbhj = new Object();
            ccbhj.ccdff = cbfia[cbgbc].cbgii.position().left * cbegg / cbfia[0].cbgja + (cbdbh.ccbhh.cbgeh.ccdff + cbdbh.ccbhh.size.ccdff / 2) * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
            ccbhj.ccdfi = cbfia[cbgbc].cbgii.position().top * cbegg / cbfia[0].cbgja + (cbdbh.ccbhh.cbgeh.ccdfi + cbdbh.ccbhh.size.ccdfi / 2) * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
            var cbdia = new Object();
            var cccbc = cbdbh.ccbhh.size.ccdff * (1 + cbbdj.ccdgh) * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
            var cccbd = cbdbh.ccbhh.size.ccdfi * (1 + cbbdj.ccdgh) * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
            if (cbdbh.ccbhh.type == "box") {
                cccbc = cbdbh.cbiie.width * (1 + cbbdj.ccdgh) * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
                cccbd = cbdbh.cbiie.height * (1 + cbbdj.ccdgh) * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
            }
            cbdia.cbhga = {
                ccdff: ccbhj.ccdff - cccbc / 2,
                ccdfi: ccbhj.ccdfi - cccbd / 2
            };
            cbdia.cbheh = {
                ccdff: ccbhj.ccdff + cccbc / 2,
                ccdfi: ccbhj.ccdfi + cccbd / 2
            };
            if (cbbeg) cbdib(cbdia);
            if (cbbdj.ccdgi) {
                var cbace = cbagj(cbdia);
                var cccif = cbfia[0].cbgja * cbace;
                if (cccif < cbbdj.ccdgi) {
                    cccbc = (cbdia.cbheh.ccdff - cbdia.cbhga.ccdff) * cbbdj.ccdgi / cccif;
                    cccbd = (cbdia.cbheh.ccdfi - cbdia.cbhga.ccdfi) * cbbdj.ccdgi / cccif;
                    var cbafg = {
                        ccdff: (cbdia.cbhga.ccdff + cbdia.cbheh.ccdff) / 2,
                        ccdfi: (cbdia.cbhga.ccdfi + cbdia.cbheh.ccdfi) / 2
                    };
                    cbdia.cbhga = {
                        ccdff: cbafg.ccdff - cccbc / 2,
                        ccdfi: cbafg.ccdfi - cccbd / 2
                    };
                    cbdia.cbheh = {
                        ccdff: cbafg.ccdff + cccbc / 2,
                        ccdfi: cbafg.ccdfi + cccbd / 2
                    };
                }
            }
            return cbdia;
        }

        function cbefa(obj) {
            if (!obj || !obj.cbfjh || !obj.cbggb) return undefined;
            var ccaac = cbfia[cbgbc].cbcih.cbeai(obj);
            ccaac.ccbbg = obj.ccbbg;
            return cbefi(ccaac);
        }

        function cbefi(obj) {
            var cbaje = new Object();
            cbaje.ccdff = cbfia[cbgbc].cbgii.position().left * cbegg / cbfia[0].cbgja + obj.ccdff * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
            cbaje.ccdfi = cbfia[cbgbc].cbgii.position().top * cbegg / cbfia[0].cbgja + obj.ccdfi * cbfia[cbgbc].cbgja / cbfia[0].cbgja;
            var cbdia = new Object();
            var cccbc = ccdda.width * obj.ccbbg / cbfia[0].cbgja;
            var cccbd = ccdda.height * obj.ccbbg / cbfia[0].cbgja;
            cbdia.cbhga = {
                ccdff: cbaje.ccdff - cccbc / 2,
                ccdfi: cbaje.ccdfi - cccbd / 2
            };
            cbdia.cbheh = {
                ccdff: cbaje.ccdff + cccbc / 2,
                ccdfi: cbaje.ccdfi + cccbd / 2
            };
            return cbdia;
        }

        function cbdib(cbdia) {
            if (cbebf.cbidi) {
                if (!cbeca) return;
                else {
                    var cbdbb = cbegg / cbfia[cbgbc].cbgja;
                    if (cbdia.cbhga.ccdff > cbebf.ccdff - cbeca.width * cbdbb) cbdia.cbhga.ccdff = cbebf.ccdff - cbeca.width * cbdbb;
                    if (cbdia.cbhga.ccdfi > cbebf.ccdfi - cbeca.height * cbdbb) cbdia.cbhga.ccdfi = cbebf.ccdfi - cbeca.height * cbdbb;
                    if (cbdia.cbheh.ccdff < cbebf.ccdff + cbeca.width * cbdbb) cbdia.cbheh.ccdff = cbebf.ccdff + cbeca.width * cbdbb;
                    if (cbdia.cbheh.ccdfi < cbebf.ccdfi + cbeca.height * cbdbb) cbdia.cbheh.ccdfi = cbebf.ccdfi + cbeca.height * cbdbb;
                }
            }
        }

        function cbdja(cbdia, ccdgj) {
            if (!cbdia) return;
            if (cbdia.cbheh.ccdff <= cbdia.cbhga.ccdff || cbdia.cbheh.ccdfi <= cbdia.cbhga.ccdfi) {
                cbdia = cbfid;
            }
            cbfid = cbdia;
            if (cbegg == -1) {
                cbdie.cbidj = new Object();
                cbdie.cbidj.cbhga = new Object();
                cbdie.cbidj.cbheh = new Object();
                cbdie.cbidj.cbhga.ccdff = -cbfia[cbgbc].cbgjd.ccdff / 2 * 10;
                cbdie.cbidj.cbheh.ccdff = cbfia[cbgbc].cbgjd.ccdff / 2 * 12;
                cbdie.cbidj.cbhga.ccdfi = -cbfia[cbgbc].cbgjd.ccdfi / 2 * 10;
                cbdie.cbidj.cbheh.ccdfi = cbfia[cbgbc].cbgjd.ccdfi / 2 * 12;
                cbegg = cbfia[cbgbc].cbgja * 11;
            } else {
                cbdie.cbidj = cbbih(0);
            }
            cbdie.cbhje = new Object();
            cbdie.cbhje.cbhga = {
                ccdff: cbdia.cbhga.ccdff,
                ccdfi: cbdia.cbhga.ccdfi
            };
            cbdie.cbhje.cbheh = {
                ccdff: cbdia.cbheh.ccdff,
                ccdfi: cbdia.cbheh.ccdfi
            };
            cbdie.cccdi = ccdgj;
            cbdie.cccdh = 0;
            cbeic();
            ccbfe();
        }

        function cbbih(cajjf) {
            var cbafh = new Object();
            cbafh.cbhga = cbfia[cajjf].cbcih.ccdch({
                ccdff: 0,
                ccdfi: 0
            }, cbegg);
            cbafh.cbheh = cbfia[cajjf].cbcih.ccdch({
                ccdff: ccdda.width,
                ccdfi: ccdda.height
            }, cbegg);
            return cbafh;
        }

        function cbbib(cajjf) {
            var cbafh = new Object();
            cbafh.cbhga = cbfia[cajjf].cbcih.ccdch({
                ccdff: -ccdda.width * cbbdj.cbiib,
                ccdfi: -ccdda.height * cbbdj.cbiib
            }, cbegg);
            cbafh.cbheh = cbfia[cajjf].cbcih.ccdch({
                ccdff: ccdda.width * (1 + cbbdj.cbiib),
                ccdfi: ccdda.height * (1 + cbbdj.cbiib)
            }, cbegg);
            return cbafh;
        }

        function ccdha() {
            cbfga = false;
            cbdja(ccdga(cbbdj.ccdgc), cbbdj.ccdgd);
            if (ccdbf.cbaad) cccih.cccac();
            cbfia[cbgbc].cbdhg.cccdg = true;
        }

        function ccdhe() {
            cbfga = false;
            cbdja(ccdga(1 - 1 / (1 - cbbdj.ccdgc)), cbbdj.ccdgd);
            if (ccdbf.cbaad) cccih.cccac();
            cbfia[cbgbc].cbdhg.cccdg = true;
        }

        function ccdga(cbdbb, ccahe) {
            var cbifj = cbdbb;
            var cbbhc = cbbih(0);
            if (ccahe) cbbhc = ccahe;
            var cbbhf = cbbih(cbgbc);
            var cbbic = cbagj(cbbhf);
            var cccea = "";
            if (cbfia[cbgbc].ccdgb && cbfia[cbgbc].ccchc.cbgcd) {
                cccea += "1 ";
                if (cbbic / (1 + cbdbb) > cbfia[cbgbc].ccdgb) {
                    cccea += "2 ";
                    cbdbb = cbbic / cbfia[cbgbc].ccdgb - 1;
                    if (cbdbb > 0) {
                        return undefined;
                    }
                }
            }
            cccea += "3 ";
            if (cbfia[cbgbc].ccchc.cbhgh) {
                cccea += "4 ";
                if (cbbic / (1 + cbdbb) < cbfia[cbgbc].ccchc.cbhgh) {
                    cbdbb = cbbic / cbfia[cbgbc].ccchc.cbhgh - 1;
                    cccea += "5 currentScaleFactor:" + cbbic + ' factor:' + cbdbb + ' l[level].theme.minScaleFactor:' + cbfia[cbgbc].ccchc.cbhgh + ' ';
                    if (cbdbb < 0) {
                        return undefined;
                    }
                }
            }
            cccea += "6 ";
            var cbhjf = new Object();
            cbhjf.cbhga = new Object();
            cbhjf.cbhga.ccdff = cbbhc.cbhga.ccdff + (cbbhc.cbheh.ccdff - cbbhc.cbhga.ccdff) * cbdbb / 2;
            cbhjf.cbhga.ccdfi = cbbhc.cbhga.ccdfi + (cbbhc.cbheh.ccdfi - cbbhc.cbhga.ccdfi) * cbdbb / 2;
            cbhjf.cbheh = new Object();
            cbhjf.cbheh.ccdff = cbbhc.cbheh.ccdff - (cbbhc.cbheh.ccdff - cbbhc.cbhga.ccdff) * cbdbb / 2;
            cbhjf.cbheh.ccdfi = cbbhc.cbheh.ccdfi - (cbbhc.cbheh.ccdfi - cbbhc.cbhga.ccdfi) * cbdbb / 2;
            return cbhjf;
        }

        function cbeic() {
            if (cbghg) cbfef();
            if (cbhda) cbhda.hide();
            if (cbebj) cbebj.hide();
            for (var cbfaf = 0; cbfaf < cbfia.length; cbfaf++) {
                if (cbfaf == cbgbc || (cbbdj.ccade != 0 && cbfaf >= cbgbc - 1)) {
                    if (cbfia[cbfaf].ccchc && !cbfia[cbfaf].ccchc.platformFunctionality.cbccj) {
                        if (cbfia[cbfaf].cbghh) cbfia[cbfaf].cbghh.show();
                        else {
                            if (cbfia[cbfaf].cbghi) cbfia[cbfaf].cbghi.show();
                        }
                    }
                }
                if (cbfia[cbfaf].ccchc && !cbfia[cbfaf].ccchc.platformFunctionality.cbccj || (cbgbc >= 2 && cbfaf != cbgbc)) {
                    if (cbfia[cbfaf].cbghh) cbfia[cbfaf].cbghh.show();
                    if (cbfia[cbfaf].cbghi) cbfia[cbfaf].cbghi.show();
                }
                if (cbfia[cbfaf].cbeih) cbfia[cbfaf].cbeih.hide();
                if (cbfia[cbfaf].cbhcc) cbfia[cbfaf].cbhcc.hide();
                if (cbfia[cbfaf].cbgif) cbfia[cbfaf].cbgif.hide();
                if (cbfia[cbfaf].cbdaf) cbfia[cbfaf].cbdaf.hide();
            }
            setTimeout(function() {
                cbeid();
            }, 0);
        }

        function cbeid() {
            for (var cbfaf = 0; cbfaf < cbfia.length; cbfaf++) {
                if (cbfia[cbfaf].cbgia) cbfia[cbfaf].cbgia.hide();
            }
        }

        function cccab() {
            if (cbghg) cbghg.show();
            if (cbhda) cbhda.show();
            if (cbbdj.cbecd) {
                cbebg();
                cbebj.show();
            }
            for (var cbfaf = 0; cbfaf < cbfia.length; cbfaf++) {
                if (cbfia[cbfaf].cbghi && cbfia[cbfaf].cbghh) {
                    cbfia[cbfaf].cbghh.show();
                }
                if (cbfia[cbfaf].ccchc && !cbfia[cbfaf].ccchc.platformFunctionality.cbccj || (cbgbc >= 2 && cbfaf != cbgbc)) {
                    if (cbfia[cbfaf].cbghh) cbfia[cbfaf].cbghh.hide();
                    if (cbfia[cbfaf].cbghi) cbfia[cbfaf].cbghi.hide();
                }
                if (cbfia[cbfaf].cbeih) cbfia[cbfaf].cbeih.show();
                if (cbfia[cbfaf].cbhcc) cbfia[cbfaf].cbhcc.show();
                if ((cbfaf == cbgbc - 1 && cbbdj.ccade != 0) || (cbfaf == cbgbc)) {
                    if (cbfia[cbfaf].cbgia) cbfia[cbfaf].cbgia.show();
                }
                if (cbfia[cbfaf].cbgif) cbfia[cbfaf].cbgif.hide();
                if (cbfia[cbfaf].cbdaf) cbfia[cbfaf].cbdaf.show();
            }
            if (cbfia[cbgbc].cbhac) cbfia[cbgbc].cbhac.hide();
        }

        function cbcai() {
            var cccee = cbfia[cbgbc].cbchh.substr(cbfia[cbgbc].cbchg, 4);
            cbfia[cbgbc].cbchg += 4;
            return parseInt(cccee, 16);
        }

        function cbcaf() {
            var cccee = cbfia[cbgbc].cbchh.substr(cbfia[cbgbc].cbchg, 8);
            cbfia[cbgbc].cbchg += 8;
            return parseInt(cccee, 16);
        }

        function cbcae() {
            var cbbfc = parseInt(cbfia[cbgbc].cbchh.substr(cbfia[cbgbc].cbchg, 8), 16);
            cbbfc /= 100000;
            cbbfc -= 180;
            cbfia[cbgbc].cbchg += 8;
            return cbbfc;
        }

        function cbcag() {
            var cbidg = new Object();
            cbidg.ccdff = parseInt(cbfia[cbgbc].cbchh.substr(cbfia[cbgbc].cbchg, 4), 16);
            cbidg.ccdff /= 10;
            cbfia[cbgbc].cbchg += 4;
            cbidg.ccdfi = parseInt(cbfia[cbgbc].cbchh.substr(cbfia[cbgbc].cbchg, 4), 16);
            cbidg.ccdfi /= 10;
            cbfia[cbgbc].cbchg += 4;
            return cbidg;
        }

        function cbcah(cccfe) {
            if (!cbfia[cbgbc].cbchh) return undefined;
            var cccfb = cbfia[cbgbc].cbchh.substr(cbfia[cbgbc].cbchg, cccfe);
            cbfia[cbgbc].cbchg += cccfe;
            return cccfb;
        }

        function ccbbb(cbeae, obj) {
            window[cbeae](obj);
        }

        function ccbfh() {
            cbfia[cbgbc].cbfeg = new Object();
            cbfia[cbgbc].cbfeg.cbhga = new Object();
            cbfia[cbgbc].cbfeg.cbhga.ccdff = cbdie.cbhje.cbhga.ccdff;
            cbfia[cbgbc].cbfeg.cbhga.ccdfi = cbdie.cbhje.cbhga.ccdfi;
            cbfia[cbgbc].cbfeg.cbheh = new Object();
            cbfia[cbgbc].cbfeg.cbheh.ccdff = cbdie.cbhje.cbheh.ccdff;
            cbfia[cbgbc].cbfeg.cbheh.ccdfi = cbdie.cbhje.cbheh.ccdfi;
        }

        function cbffa() {
            var cbdjg = new Object();
            cbdjg.cbhga = new Object();
            cbdjg.cbheh = new Object();
            var cbgab = cbdie.cccdh / cbdie.cccdi;
            cbdjg.cbhga.ccdff = cbdie.cbidj.cbhga.ccdff + (cbdie.cbhje.cbhga.ccdff - cbdie.cbidj.cbhga.ccdff) * cbgab;
            cbdjg.cbhga.ccdfi = cbdie.cbidj.cbhga.ccdfi + (cbdie.cbhje.cbhga.ccdfi - cbdie.cbidj.cbhga.ccdfi) * cbgab;
            cbdjg.cbheh.ccdff = cbdie.cbidj.cbheh.ccdff + (cbdie.cbhje.cbheh.ccdff - cbdie.cbidj.cbheh.ccdff) * cbgab;
            cbdjg.cbheh.ccdfi = cbdie.cbidj.cbheh.ccdfi + (cbdie.cbhje.cbheh.ccdfi - cbdie.cbidj.cbheh.ccdfi) * cbgab;
            return cbdjg;
        }

        function cbgfe(cbbge) {
            var cbbgj = (new Date()).getTime();
            console.log(cbbge + ": " + (cbbgj - cbbgf));
            cbbgf = cbbgj;
        }

        function cbaib(cbche) {
            cbche = cbche ? cbche : window['event'];
            if (cbche.stopPropagation) cbche.stopPropagation();
            if (cbche.preventDefault) cbche.preventDefault();
            cbche.cancelBubble = true;
            cbche.cancel = true;
            cbche.ccaji = false;
            return false;
        }

        function cajjc(ccdaj) {
            if (!ccdaj) return;
            var ccdbb = ccdaj;
            if (!cbbdj.cbaae) {
                var ccbeh = '?';
                if (ccdbb.indexOf('?') != -1) ccbeh = '&';
                ccdbb += ccbeh + 'jqmrand=' + Math.random();
            }
            return ccdbb;
        }

        function cbgbd() {
            if (!cbfia[cbgbc].cbdhg.cccdg) {
                ccaig();
                cbgbc--;
                cbfic = undefined;
                ccajc('levelBack');
                cbhda.html('');
                cbfia[cbgbc].cbdhg.cbhci = false;
                cbfia[cbgbc].cbdhg.cbhde = false;
                cbfia[cbgbc].cbdhg.cccdg = false;
                themeInitialActions();
                cbgbf();
            } else {
                cbfic = undefined;
                cbfia[cbgbc].cbdhg.cccdg = false;
                ccajd();
            }
            while (cbbce.length > cbgbc) cbbce.pop();
            ccdcf();
        }

        function ccbga(cbaah) {
            cbhhf = cbaah;
            switch (cbhhf) {
                case "regular":
                    cbieg();
                    break;
                case "selectByRectangle":
                    cbiei();
                    break;
            }
            cccih.cbbad(cbaah);
        }

        function cccfg() {
            if (cbhhf == 'selectByRectangle') {
                cbhhf = 'regular';
            } else {
                cbhhf = 'selectByRectangle'
            }
            ccbga(cbhhf);
        }

        function fullScreenChanged() {
            if (ccdbf.cbeaa) {
                ccdbf.cbeaa = false;
                return;
            }
            if (!(window.navigator.standalone || (document.fullScreenElement && document.fullScreenElement != null) || (document.mozFullScreen || document.webkitIsFullScreen))) cccff();
        }

        function cccff() {
            if (!ccdbf.cbdjj) ccbed.showFullScreen();
            else ccbed.showRegularSize();
            cccih.cbbac(ccdbf.cbdjj);
        }

        function cbiei() {
            if (typeof(cbgjc.draggable) == "function") cbgjc.draggable('destroy');
            cbieh.show();
        }

        function cbieg() {
            ccbgc();
            cbieh.hide();
        }

        function cbifa(cbche) {
            switch (cbhhf) {
                case 'selectByRectangle':
                    if (cbche.button == 0) {
                        ccbeb.ccbec = new Array();
                        ccbeb.ccdcb = new Array();
                        ccbeb.ccdcb.push({
                            ccdff: ccdde.ccdff,
                            ccdfi: ccdde.ccdfi
                        });
                        ccbeb.cbcfh = (new Date()).getTime();
                    }
                    break;
            }
        }

        function cbifb(cbche) {
            switch (cbhhf) {
                case 'selectByRectangle':
                    if (ccbeb.ccdcb && ccbeb.ccdcb.length >= 1) {
                        ccbeb.ccdcb[1] = {
                            ccdff: ccdde.ccdff,
                            ccdfi: ccdde.ccdfi
                        };
                        cbiee();
                        cbcgb(ccbeb.ccdcb[0], ccbeb.ccdcb[1], cbbdj.ccbdj);
                        ccbea();
                    } else {
                        var cccib = (new Date()).getTime();
                        if (!cbahg.cbfjd || cccib - cbahg.cbfjd > .5) {
                            cbahi(false);
                            cbahg.cbfjd = cccib;
                        }
                    }
                    break;
                    break;
            }
        }

        function cbifc(cbche) {
            switch (cbhhf) {
                case 'selectByRectangle':
                    var cccib = (new Date()).getTime();
                    if (!ccbeb.ccdcb || ccbeb.ccdcb.length == 0 || (cccib - ccbeb.cbcfh < 1000 && (!ccbeb.ccdcb[1] || (Math.abs(ccbeb.ccdcb[0].ccdff - ccbeb.ccdcb[1].ccdff) < 1 && Math.abs(ccbeb.ccdcb[0].ccdfi - ccbeb.ccdcb[1].ccdfi) < 10)))) {
                        var cbidb = cbdgi(false);
                        if (cbidb) {
                            if (cbidb.type == 'feature') {
                                var cbdbh = cbfia[cbgbc].cbddc[cbidb.cbfhi];
                                switch (cbche.button) {
                                    case 0:
                                        ccbeb.ccbec.push(cbdbh);
                                        break;
                                    case 2:
                                        jqmEvent(cbfej, "onrightclick", "feature", cbidb.cbfhi, cbgbc);
                                        return;
                                        break;
                                }
                            }
                        }
                    }
                    ccbeg(ccbeb.ccbec, "selectionByRectangle");
                    ccbeb.ccdcb = new Array();
                    cbeja(cbgbc);
                    cbiee();
                    break;
                    break;
            }
        }

        function cbcgb(cbiij, cbijb, cbdff) {
            var cbbha = cbief;
            cbbha.fillStyle = cbdff;
            cbbha['fillRect'](cbiij.ccdff, cbiij.ccdfi, cbijb.ccdff - cbiij.ccdff, cbijb.ccdfi - cbiij.ccdfi);
        }

        function ccbea() {
            var cbjjb = new Array();
            var cbiii = cbfia[cbgbc].cbcih.ccdch(ccbeb.ccdcb[0], cbegg);
            cbjjb.push(cbiii);
            cbiii = cbfia[cbgbc].cbcih.ccdch(ccbeb.ccdcb[1], cbegg);
            cbjjb.push(cbiii);
            var ccbec = cbded(cbjjb);
            if (!ccbbf(ccbeb.ccbec, ccbec)) {
                cbeja(cbgbc);
                for (var cbfaf in ccbec) {
                    cbdci(ccbec[cbfaf], cbgbc);
                }
                ccbeb.ccbec = ccbec;
                ccbeg(ccbeb.ccbec, "selectionByRectangleMouseMove");
            }
        }

        function ccbeg(ccbec, cbcjh) {
            if (!cbbdj.cbdjh) return;
            var cbidg = new Object();
            cbidg['action'] = cbcjh;
            cbidg['selectedFeatures'] = ccbec;
            ccbbb(cbbdj.cbdjh, cbidg);
        }

        function cbded(cbjjb) {
            var cbdeb = new Array();
            var cbhhd = new Object();
            cbhhd.cbhga = {
                ccdff: Math['min'](cbjjb[0].ccdff, cbjjb[1].ccdff),
                ccdfi: Math['min'](cbjjb[0].ccdfi, cbjjb[1].ccdfi)
            };
            cbhhd.cbheh = {
                ccdff: Math['max'](cbjjb[0].ccdff, cbjjb[1].ccdff),
                ccdfi: Math['max'](cbjjb[0].ccdfi, cbjjb[1].ccdfi)
            };
            for (var cbfaf in cbfia[cbgbc].ccbie) {
                var ccbhh = cbfia[cbgbc].ccbie[cbfaf];
                if (ccbib(ccbhh, cbhhd) && ccbhh.cbdbh) cbdeb.push(ccbhh.cbdbh);
            }
            return cbdeb;
        }

        function ccbib(ccbhh, cbhhd) {
            if (ccbhh.cbgeh.ccdff > cbhhd.cbheh.ccdff) return false;
            if (ccbhh.cbgeh.ccdfi > cbhhd.cbheh.ccdfi) return false;
            if (ccbhh.cbgeh.ccdff + ccbhh.size.ccdff < cbhhd.cbhga.ccdff) return false;
            if (ccbhh.cbgeh.ccdfi + ccbhh.size.ccdfi < cbhhd.cbhga.ccdfi) return false;
            if (ccbhh.type == "box") return true;
            for (var cbijb in ccbhh.cbjgg) {
                var cbjge = ccbhh.cbjgg[cbijb];
                var ccaeg = cbjge.cbbfe;
                if (!ccaeg) ccaeg = cbjge.cbbfd;
                for (var cbijd in ccaeg) {
                    var ccaac = ccaeg[cbijd];
                    if (ccabb(ccaac, cbhhd)) {
                        return true;
                    }
                    if (cbijd > 0) {
                        if (ccbdf(ccaeg[cbijd - 1], ccaeg[cbijd], cbhhd)) return true;
                    }
                }
                if (ccaeg) {
                    if (ccbdf(ccaeg[ccaeg.length - 1], ccaeg[0], cbhhd)) return true;
                }
            }
            return false;
        }

        function ccabb(ccaac, cbhhd) {
            return (ccaac.ccdff >= cbhhd.cbhga.ccdff && ccaac.ccdff <= cbhhd.cbheh.ccdff && ccaac.ccdfi >= cbhhd.cbhga.ccdfi && ccaac.ccdfi <= cbhhd.cbheh.ccdfi);
        }

        function ccbdf(cbjgi, cbjgj, cbhhd) {
            var cbiii = ccbdi(cbjgi, cbjgj, cbhhd.cbhga, {
                ccdff: cbhhd.cbhga.ccdff,
                ccdfi: cbhhd.cbheh.ccdfi
            });
            if (cbiii) return true;
            cbiii = ccbdi(cbjgi, cbjgj, cbhhd.cbheh, {
                ccdff: cbhhd.cbheh.ccdff,
                ccdfi: cbhhd.cbhga.ccdfi
            });
            if (cbiii) return true;
            cbiii = ccbdh(cbjgi, cbjgj, cbhhd.cbhga, {
                ccdff: cbhhd.cbheh.ccdff,
                ccdfi: cbhhd.cbhga.ccdfi
            });
            if (cbiii) return true;
            cbiii = ccbdh(cbjgi, cbjgj, cbhhd.cbheh, {
                ccdff: cbhhd.cbhga.ccdff,
                ccdfi: cbhhd.cbheh.ccdfi
            });
            if (cbiii) return true;
            return false;
        }

        function ccbdi(cbjgi, cbjgj, cbjha, cbjhb) {
            if (cbjgi.ccdff == cbjgj.ccdff) return undefined;
            var cbjgh = new Object();
            cbjgh.ccdff = cbjha.ccdff;
            if ((cbjgh.ccdff < cbjgi.ccdff && cbjgh.ccdff < cbjgj.ccdff) || (cbjgh.ccdff > cbjgi.ccdff && cbjgh.ccdff > cbjgj.ccdff)) return undefined;
            cbjgh.ccdfi = cbjgi.ccdfi + (cbjgh.ccdff - cbjgi.ccdff) / (cbjgj.ccdff - cbjgi.ccdff) * (cbjgj.ccdfi - cbjgi.ccdfi);
            if ((cbjgh.ccdfi < cbjha.ccdfi && cbjgh.ccdfi < cbjhb.ccdfi) || (cbjgh.ccdfi > cbjha.ccdfi && cbjgh.ccdfi > cbjhb.ccdfi)) return undefined;
            return cbjgh;
        }

        function ccbdh(cbjgi, cbjgj, cbjha, cbjhb) {
            if (cbjgi.ccdfi == cbjgj.ccdfi) return undefined;
            var cbjgh = new Object();
            cbjgh.ccdfi = cbjha.ccdfi;
            cbjgh.ccdff = cbjgi.ccdff + (cbjgh.ccdfi - cbjgi.ccdfi) / (cbjgj.ccdfi - cbjgi.ccdfi) * (cbjgj.ccdff - cbjgi.ccdff);
            if ((cbjgh.ccdfi < cbjgi.ccdfi && cbjgh.ccdfi < cbjgj.ccdfi) || (cbjgh.ccdfi > cbjgi.ccdfi && cbjgh.ccdfi > cbjgj.ccdfi)) return undefined;
            if ((cbjgh.ccdff < cbjha.ccdff && cbjgh.ccdff < cbjhb.ccdff) || (cbjgh.ccdff > cbjha.ccdff && cbjgh.ccdff > cbjhb.ccdff)) return undefined;
            return cbjgh;
        }

        function cbfed(cbjgi, cbjgj, cbjha, cbjhb) {
            var cbjgh = cbffb(cbjgi, cbjgj, cbjha, cbjhb);
            if (Math.abs(cbjgj.ccdff - cbjgi.ccdff) < Math.abs(cbjhb.ccdff - cbjha.ccdff)) {
                if (cbjgh.ccdfi > cbjgi.ccdfi && cbjgh.ccdfi > cbjgj.ccdfi) return undefined;
                if (cbjgh.ccdfi < cbjgi.ccdfi && cbjgh.ccdfi < cbjgj.ccdfi) return undefined;
            } else {
                if (cbjgh.ccdff > cbjgi.ccdff && cbjgh.ccdff > cbjgj.ccdff) return undefined;
                if (cbjgh.ccdff < cbjgi.ccdff && cbjgh.ccdff < cbjgj.ccdff) return undefined;
            }
            return cbjgh
        }

        function ccbbf(cbddd, cbdde) {
            if (!cbddd || !cbdde) return false;
            if (cbddd.length != cbdde.length) return false;
            for (var cbfaf in cbddd) {
                if (cbddd[cbfaf].cbfbh != cbdde[cbfaf].cbfbh) return false;
            }
            return true;
        }

        function cbeed(cbjjj) {
            for (var cbfaf in cbjjj) {
                var platformFunctionality = cbjjj[cbfaf];
                if (platformFunctionality.cbfbh == cbjjg.cbfbh) return platformFunctionality;
            }
            for (var cbfaf in cbjjj) {
                var platformFunctionality = cbjjj[cbfaf];
                if (platformFunctionality.cbfbh == 'default') return platformFunctionality;
            }
            var platformFunctionality = new Object();
            platformFunctionality.cbfbh = 'default';
            platformFunctionality.cbahf = cbjjg.cbfge || cbjjg.cbfhb;
            platformFunctionality.cbcdb = true;
            platformFunctionality.cbccj = true;
            return platformFunctionality;
        }

        function cbdgi(cbfgc) {
            if (!cbfia[cbgbc].cbcih.cbbjb) return undefined;
            if (!ccdde) return undefined;
            if (cccih.cbbbc(ccdde)) return undefined;
            var ccaaj = cbfia[cbgbc].cbcih.ccdch(ccdde, cbegg);
            if (cbfia[cbgbc].cbhca) {
                var total = cbfia[cbgbc].cbhca.length;
                if (cbfia[cbgbc].cbdhg.cbabe == undefined && cbfia[cbgbc].cbdhg.cbhde) cbfia[cbgbc].cbdhg.cbabe = cbbbb(cbgbc);
            }
            if (!cbfgc || cbfia[cbgbc].cbdhg.cbabe) {
                for (var cbfaf = total - 1; cbfaf >= 0; cbfaf--) {
                    var cbhae = cbfia[cbgbc].cbhca[cbfaf];
                    if (cbhae.cbheb.ccdee && cbfgj(cbhae, ccaaj)) {
                        var cbidg = new Object();
                        cbidg.type = 'marker';
                        cbidg.cbfhi = cbhae.cbfhi;
                        cbidg.cbgbc = cbgbc;
                        return cbidg;
                    }
                }
            }
            for (var cajjf = cbgbc; cajjf >= 0; cajjf--) {
                if (cajjf == cbgbc || (cajjf == cbgbc - 1 && cbbdj.ccade != 0)) {
                    if (cbfia[cajjf].cbdhg.cbabd == undefined && cbfia[cajjf].cbdhg.ccbii) cbfia[cbgbc].cbdhg.cbabd = cbbba(cajjf);
                    if (!cbfgc || cbfia[cbgbc].cbdhg.cbabd) {
                        var total = cbfia[cajjf].cbddc.length;
                        ccaaj = cbfia[cajjf].cbcih.ccdch(ccdde, cbegg);
                        for (var cbfaf = total - 1; cbfaf >= 0; cbfaf--) {
                            var cbdbh = cbfia[cajjf].cbddc[cbfaf];
                            if (cbdbh.ccbhh && cbdbh.ccbhh.ccdcc && cbdbh.cbchf) {
                                if (cbfgi(cbdbh, ccaaj)) {
                                    var cbidg = new Object();
                                    cbidg.type = 'feature';
                                    cbidg.cbfhi = cbdbh.cbfhi;
                                    cbidg.cbgbc = cajjf;
                                    return cbidg;
                                }
                            }
                        }
                    }
                }
            }
        }

        function cbbbb(cajjf) {
            for (var cbggd in cbfia[cajjf].cbhca) {
                var cbhae = cbfia[cajjf].cbhca[cbggd];
                if (!cbbdh(cbhae)) return true;
            }
            return false;
        }

        function cbbba(cajjf) {
            for (var cbdai in cbfia[cajjf].cbddc) {
                var cbdbh = cbfia[cajjf].cbddc[cbdai];
                if (!cbbdg(cbdbh)) return true;
            }
            return false;
        }

        function cbbdh(cbhae) {
            if (cbhae.cbiif) {
                if (cbhae.cbiif.cbfai && cbhae.cbheb.cbfai != cbhae.cbiif.cbfai) return false;
                if (cbhae.cbiif.ccbbg && cbhae.cbheb.ccbbg != cbhae.cbiif.ccbbg) return false;
                if (cbhae.cbiif.cbifh && cbhae.cbheb.cbifh != cbhae.cbiif.cbifh) return false;
            }
            var cajif = cbdfj(cbhae.cajif, "event", 'onmouseover');
            if (cajif.length > 0) return false;
            return true;
        }

        function cbbdg(cbdbh) {
            if (cbdbh.cbiie) {
                if (cbdbh.cbiie.cbdff && cbdbh.cbdee.cbdff != cbdbh.cbiie.cbdff) return false;
                if (cbdbh.cbiie.cccej && cbdbh.cbdee.cccej != cbdbh.cbiie.cccej) return false;
                if (cbdbh.cbiie.cccfa && cbdbh.cbdee.cccfa != cbdbh.cbiie.cccfa) return false;
                if (cbdbh.cbiie.cbfai && cbdbh.cbdee.cbfai != cbdbh.cbiie.cbfai) return false;
                if (cbdbh.cbiie.width && cbdbh.cbdee.width != cbdbh.cbiie.width) return false;
                if (cbdbh.cbiie.height && cbdbh.cbdee.height != cbdbh.cbiie.height) return false;
            }
            var cajif = cbdfj(cbdbh.cajif, "event", 'onmouseover');
            if (cajif.length > 0) return false;
            return true;
        }

        function cbcif(cbche) {
            if (cbche) cbche.preventDefault();
            cccab();
            ccbcb(true);
            if (ccdbf.cbaad) cccih.cccac();
            cbfia[cbgbc].cbdhg.cccdg = true;
            ccaej(true);
        }

        function cbfgi(cbdbh, cbjic) {
            switch (cbdbh.ccbhh.type) {
                case "box":
                    if (cbdbh.cbiie.width && cbdbh.cbiie.height) {
                        var ccdei = cbdbh.cbiie.width / 2;
                        var cbehd = cbdbh.cbiie.height / 2;
                        cbagi(cbgbc);
                        return (cbjic.ccdff >= cbdbh.ccbhh.cbgeh.ccdff - ccdei && cbjic.ccdff <= cbdbh.ccbhh.cbgeh.ccdff + ccdei && cbjic.ccdfi >= cbdbh.ccbhh.cbgeh.ccdfi - cbehd && cbjic.ccdfi <= cbdbh.ccbhh.cbgeh.ccdfi + cbehd);
                    }
                    break;
                default:
                    if (!cbfgf(cbdbh.ccbhh, cbjic)) return false;
                    for (var cbfaf = 0 in cbdbh.ccbhh.cbjgg) {
                        if (cbfgg(cbdbh.ccbhh.cbjgg[cbfaf], cbjic)) {
                            return true;
                        }
                    }
                    return false;
                    break;
            }
        }

        function cbfgj(cbhae, cbjic) {
            if (cbjic.ccdff < cbhae.cbhhh.ccdff - cbhae.cbfaj / cbfia[cbgbc].cbgja * cbegg / 2) return false;
            if (cbjic.ccdfi < cbhae.cbhhh.ccdfi - cbhae.cbfba / cbfia[cbgbc].cbgja * cbegg / 2) return false;
            if (cbjic.ccdff > cbhae.cbhhh.ccdff + cbhae.cbfaj / cbfia[cbgbc].cbgja * cbegg / 2) return false;
            if (cbjic.ccdfi > cbhae.cbhhh.ccdfi + cbhae.cbfba / cbfia[cbgbc].cbgja * cbegg / 2) return false;
            return true;
        }

        function cbfgf(obj, cbjic) {
            if (cbjic.ccdff < obj.cbgeh.ccdff) return false;
            if (cbjic.ccdfi < obj.cbgeh.ccdfi) return false;
            if (cbjic.ccdff > obj.cbgeh.ccdff + obj.size.ccdff) return false;
            if (cbjic.ccdfi > obj.cbgeh.ccdfi + obj.size.ccdfi) return false;
            return true;
        }

        function cbfgg(cbjge, cbjic) {
            if (!cbfgf(cbjge, cbjic)) {
                return false;
            }
            return cbfgh(cbjge.cbgeh, cbjge.cbbfe, cbjic);
        }

        function cbfgh(cbbff, cbbfd, cbjic) {
            var ccadd = new Object();
            ccadd.ccdff = cbbff.ccdff - 1;
            ccadd.ccdfi = cbbff.ccdfi - 1;
            var cbffc = 0;
            for (var cbfaf in cbbfd) {
                var cbiij = cbbfd[cbfaf];
                var cbijb = cbbfd[0];
                if (cbfaf < cbbfd.length - 1) cbijb = cbbfd[Number(cbfaf) + 1];
                if (cbcfa(ccadd, cbjic, cbiij, cbijb)) cbffc++;
            }
            return (cbffc % 2 != 0);
        }

        function cbcfa(cbiij, cbijb, cbijd, cbijf) {
            if (Math['min'](cbiij.ccdff, cbijb.ccdff) > Math['max'](cbijd.ccdff, cbijf.ccdff)) return false;
            if (Math['min'](cbiij.ccdfi, cbijb.ccdfi) > Math['max'](cbijd.ccdfi, cbijf.ccdfi)) return false;
            if (Math['max'](cbiij.ccdff, cbijb.ccdff) < Math['min'](cbijd.ccdff, cbijf.ccdff)) return false;
            if (Math['max'](cbiij.ccdfi, cbijb.ccdfi) < Math['min'](cbijd.ccdfi, cbijf.ccdfi)) return false;
            var cbiii = cbffb(cbiij, cbijb, cbijd, cbijf);
            if (!cbiii) return false;
            if (cbiii.ccdff > cbiij.ccdff && cbiii.ccdff > cbijb.ccdff) return false;
            if (cbiii.ccdff < cbiij.ccdff && cbiii.ccdff < cbijb.ccdff) return false;
            if (cbiii.ccdfi > cbiij.ccdfi && cbiii.ccdfi > cbijb.ccdfi) return false;
            if (cbiii.ccdfi < cbiij.ccdfi && cbiii.ccdfi < cbijb.ccdfi) return false;
            if (cbiii.ccdff > cbijd.ccdff && cbiii.ccdff > cbijf.ccdff) return false;
            if (cbiii.ccdff < cbijd.ccdff && cbiii.ccdff < cbijf.ccdff) return false;
            if (cbiii.ccdfi > cbijd.ccdfi && cbiii.ccdfi > cbijf.ccdfi) return false;
            if (cbiii.ccdfi < cbijd.ccdfi && cbiii.ccdfi < cbijf.ccdfi) return false;
            return true;
        }

        function cbffb(cbiij, cbijb, cbijd, cbijf) {
            var ccadd = new Object();
            if (cbiij.ccdff == cbijb.ccdff && cbiij.ccdfi == cbijb.ccdfi) return;
            if (cbijd.ccdff == cbijf.ccdff && cbijd.ccdfi == cbijf.ccdfi) return;
            if (cbiij.ccdff == cbijb.ccdff && cbijd.ccdff == cbijf.ccdff) return;
            if (cbiij.ccdfi == cbijb.ccdfi && cbijd.ccdfi == cbijf.ccdfi) return null;
            if (cbiij.ccdff == cbijb.ccdff) {
                ccadd.ccdff = cbiij.ccdff;
                ccadd.ccdfi = cbijd.ccdfi + (ccadd.ccdff - cbijd.ccdff) / (cbijf.ccdff - cbijd.ccdff) * (cbijf.ccdfi - cbijd.ccdfi);
                return ccadd;
            }
            if (cbiij.ccdfi == cbijb.ccdfi) {
                ccadd.ccdfi = cbiij.ccdfi;
                ccadd.ccdff = cbijd.ccdff + (ccadd.ccdfi - cbijd.ccdfi) / (cbijf.ccdfi - cbijd.ccdfi) * (cbijf.ccdff - cbijd.ccdff);
                return ccadd;
            }
            if (cbijd.ccdff == cbijf.ccdff) {
                ccadd.ccdff = cbijd.ccdff;
                ccadd.ccdfi = cbiij.ccdfi + (ccadd.ccdff - cbiij.ccdff) / (cbijb.ccdff - cbiij.ccdff) * (cbijb.ccdfi - cbiij.ccdfi);
                return ccadd;
            }
            if (cbijd.ccdfi == cbijf.ccdfi) {
                ccadd.ccdfi = cbijd.ccdfi;
                ccadd.ccdff = cbiij.ccdff + (ccadd.ccdfi - cbiij.ccdfi) / (cbijb.ccdfi - cbiij.ccdfi) * (cbijb.ccdff - cbiij.ccdff);
                return ccadd;
            }
            var cajhj = 1 / (cbijb.ccdff - cbiij.ccdff);
            var cbaeg = -1 / (cbijb.ccdfi - cbiij.ccdfi);
            var cbagg = cbijb.ccdff * cajhj + cbijb.ccdfi * cbaeg;
            var cajia = 1 / (cbijf.ccdff - cbijd.ccdff);
            var cbaeh = -1 / (cbijf.ccdfi - cbijd.ccdfi);
            var cbagh = cbijd.ccdff * cajia + cbijd.ccdfi * cbaeh;
            if (cajhj * cbaeh == cajia * cbaeg) return;
            ccadd.ccdfi = (cbagh - cajia * cbagg / cajhj) * (cajhj / (cajhj * cbaeh - cajia * cbaeg));
            ccadd.ccdff = (cbagg - cbaeg * ccadd.ccdfi) / cajhj;
            return ccadd;
        }

        function cbcdc() {
            if (cbcci.cbbid == undefined || cbcci.cbbie == undefined || cbcci.cbbid != $(window).scrollLeft() || cbcci.cbbie != $(window).scrollTop()) {
                cbcci.cbbid = $(window).scrollLeft();
                cbcci.cbbie = $(window).scrollTop();
                return true;
            }
            return false;
        }

        function ccacg() {
            if (!cbfia[cbgbc] || !cbfia[cbgbc].cbcih || !cbfia[cbgbc].cbcih.cbbjb || !cbdhj) {
                setTimeout("jqmInstances[" + cbfej + "].obj.retryToLoadPositionedImageMosaics();", 100);
                return;
            }
            for (var cbfaf in ccbbc.ccacf) ccacj(ccbbc.ccacf[cbfaf]);
            ccbbc.ccacf = new Array();
        }

        function ccacj(cbjib) {
            cbgdh.showMessage("Loading positioned images...");
            if (cbjib.cbdij || cbfga) {
                var cbice = cbfia[cbgbc].cbcih.cbeaj(cbjib.cbicd, cbegg, true);
                var ccbee = cbfia[cbgbc].cbcih.cbeaj(cbjib.ccbde, cbegg, true);
                var cbdia = new Object();
                var cbdbb = cbegg / cbfia[cbgbc].cbgja;
                cbdia.cbhga = {
                    ccdff: cbice.ccdff * cbdbb - (ccbee.ccdff - cbice.ccdff) * .2,
                    ccdfi: cbice.ccdfi * cbdbb - (ccbee.ccdfi - cbice.ccdfi) * .2
                };
                cbdia.cbheh = {
                    ccdff: ccbee.ccdff * cbdbb - (ccbee.ccdff - cbice.ccdff) * .2,
                    ccdfi: ccbee.ccdfi * cbdbb + (ccbee.ccdfi - cbice.ccdfi) * .2
                };
                cbdja(cbdia, cbbdj.ccdgg);
            }
            for (var ccbae = 0; ccbae < cbjib.ccbaf; ccbae++) {
                for (var cbbdd = 0; cbbdd < cbjib.cbbde; cbbdd++) {
                    var ccabg = new ccacd();
                    ccabg.cbfca = new Image();
                    ccabg.cbfca.src = cbjib.cbfcb + "_" + ccbae + "-" + cbbdd + "." + cbjib.cbdab;
                    ccabg.cbfca['onload'] = function() {
                        ccada(cbgbc, true);
                    };
                    ccabg.cbfca['onerror'] = function() {
                        cbcje.ccdac(11230, this.src);
                    };
                    ccabg.cajjg = cbjib.cajjg;
                    ccabg.cbhic = cbjib;
                    ccabg.ccbae = ccbae;
                    ccabg.cbbdd = cbbdd;
                    cbfia[cbgbc].ccach.push(ccabg);
                }
            }
        }

        function cbifg(cbche) {
            var ccaaf = new Object();
            ccaaf.cbgij = cbgjc.position();
            ccaaf.cbbih = cbbih(0);
            ccaaf.cccib = (new Date()).getTime();
            ccaaf.cccjj = cbegc(cbche);
            ccaaf.ccabe = ccaaf.cccjj[0];
            return ccaaf;
        }

        function cbiff(cbche) {
            var ccaai = new Object();
            ccaai.cccjj = cbegc(cbche);
            ccaai.ccabe = ccaai.cccjj[0];
            ccdde = ccaai.cccjj[0];
            return ccaai;
        }

        function cbiea(cbche) {
            ccaah = new Object();
            ccaah.ccabe = cbefj(cbche);
            ccaba.cccib = (new Date()).getTime();
            ccdde = ccaah.ccabe;
        }

        function cbecf(position) {
            cbebf.cbidi = true;
            cbebf.cbcjc = '';
            cbebf.cbfjh = position['coords']['latitude'];
            cbebf.cbggb = position['coords']['longitude'];
            cbebf.cajic = position['coords']['accuracy'];
            cbece();
        }

        function cbece() {
            if (!cbfia[cbgbc].cbcih.cbbjb) return;
            if (!cbebf.cbfih || !cbebf.cbfij || cbebf.cbfih != !cbebf.cbfjh || cbebf.cbfij != !cbebf.cbggb) {
                var cbhhh = cbfia[cbgbc].cbcih.cbeai(cbebf);
                if (cbfia[0].ccchc.ccahf.length != 0) {
                    var cbhhi = cbfia[0].cbcih.cbeda(cbebf, cbfia[0].ccchc.ccahf);
                    var cbeah = cbfia[0].cbcih.cbhhj(cbhhi);
                    cbhhh = cbfia[cbgbc].cbcih.cbeai(cbeah);
                }
                cbebf.ccdff = cbhhh.ccdff;
                cbebf.ccdfi = cbhhh.ccdfi;
                cbebf.cbfih = cbebf.cbfjh;
                cbebf.cbfij = cbebf.cbggb;
                var cbdbc = cbegg / cbfia[0].cbgja;
                var cbdbd = cbegg / cbfia[cbgbc].cbgja;
                var cbhad = cbfia[0].cbgjd.ccdff * .5;
                var cbidi = true;
                if (cbfia[cbgbc].cbgii.position().left + cbebf.ccdff / cbdbd < cbgjc.position().left - cbhad) {
                    cbidi = false;
                }
                if (cbfia[cbgbc].cbgii.position().left + cbebf.ccdff / cbdbd > cbgjc.position().left + cbfia[0].cbgjd.ccdff / cbdbc + cbhad) {
                    cbidi = false;
                }
                if (cbfia[cbgbc].cbgii.position().top + cbebf.ccdfi / cbdbd < cbgjc.position().top - cbhad) {
                    cbidi = false;
                }
                if (cbfia[cbgbc].cbgii.position().top + cbebf.ccdfi > cbgjc.position().top + cbfia[0].cbgjd.ccdfi / cbdbc + cbhad) {
                    cbidi = false;
                }
                if (cbidi) {
                    cbebi(cbhhh);
                } else {
                    cbebf.cbidi = false;
                }
            }
        }

        function cbebh(cbcjc) {
            cbebf.cbidi = false;
            cbebf.cbcjc = cbcjc;
        }

        function cbebg() {
            if (cbjae['forceGeolocation']) {
                cbebf.cbidi = true;
                cbebf.cbcjc = '';
                cbebf.cbfjh = cbjae['forceGeolocation']['lat'];
                cbebf.cbggb = cbjae['forceGeolocation']['lon'];
                cbebf.cajic = 0;
                cbece();
            } else {
                if (navigator['geolocation']) {
                    navigator['geolocation']['getCurrentPosition'](cbecf, cbebh);
                } else {
                    cbebf.cbidi = false;
                    cbebf.cbcjc = 'Sorry, this browser does not support the geolocation object.';
                }
            }
        }

        function cbagj(cbhge) {
            var cbace = (cbhge.cbheh.ccdff - cbhge.cbhga.ccdff) / ccdda.width;
            var ccbbj = (cbhge.cbheh.ccdfi - cbhge.cbhga.ccdfi) / ccdda.height;
            if (ccbbj > cbace) cbace = ccbbj;
            return cbace;
        }

        function cbfeh() {
            while (cbgbc > 0) cbgbd();
            if (cbfia[cbgbc].cbdhg.cccdg) cbgbd();
        };

        function cccai(cbhae) {
            cbhae.cbheb.ccdee = true;
        }

        function cbeie(cbhae) {
            cbhae.cbheb.ccdee = false;
        }

        function cccae(cbdbh) {
            cbdbh.cbdee.ccdee = true;
        }

        function cbeib(cbdbh) {
            cbdbh.cbdee.ccdee = false;
        }

        function cbahi(cbfjj) {
            clearTimeout(cbahg.cccic);
            if (cbahg.cbchf && cbfia[cbgbc].cbcih.cbbjb && !ccdbf.ccdaa && ccdde && (!cbahg.ccdde || !cbahg.cbahe || (cbahg.ccdde.ccdff != ccdde.ccdff || cbahg.ccdde.ccdfi != ccdde.ccdfi))) {
                var cbcde = cbeef(cbahg.ccdde, ccdde);
                if (cbcde > 2) cbahg.cbahe = false;
                if (cbahg.ccdde && ccdde && cbcde <= 2) {
                    var cbidb = cbdgi(true);
                    cbahg.cbahe = true;
                    if (cbidb) {
                        if (!cbahg.cbidb || !cbahg.cbaag || cbidb.type != cbahg.cbidb.type || cbidb.cbfhi != cbahg.cbidb.cbfhi || cbidb.cbgbc != cbahg.cbidb.cbgbc) {
                            setTimeout(function() {
                                ccbed.cbdaa('onmouseover', cbahg.cbidb.type, cbahg.cbidb.cbfhi, cbahg.cbidb.cbgbc);
                            }, 0);
                            cbgjc.css('cursor', 'pointer');
                            cbahg.cbaag = true;
                        }
                    } else {
                        cbahg.cbaag = false;
                        if (cbahg && cbahg.cbidb) ccdag(cbahg.cbidb.cbgbc, cbahg.cbidb.type);
                        cbgjc.css('cursor', 'default');
                    }
                    cbahg.cbidb = cbidb;
                } else {
                    cbahg.cbaag = false;
                    if (cbahg && cbahg.cbidb) ccdag(cbahg.cbidb.cbgbc, cbahg.cbidb.type);
                    cbgjc.css('cursor', 'default');
                }
            }
            if (ccdde && (!cbahg.ccdde || cbahg.ccdde.ccdff != ccdde.ccdff || cbahg.ccdde.ccdfi != ccdde.ccdfi)) {
                cbahg.ccdde = ccdde;
            }
            if (cbfjj) cbfji();
        }

        function cbhjc(cbgff) {
            if (!cbgfj) return false;
            return (cbgfj.indexOf(cbgff) != -1);
        }

        function ccdfe(cbgga) {
            var cbibi = new Date();
            cbgfg.append(cbibi.getHours() + ":" + cbibi.getMinutes() + ':' + (cbibi.getSeconds() + cbibi.getMilliseconds() / 1000).toFixed(3) + " " + cbgga + "<br>");
        }

        function ccbgc() {
            ccdbf.cbijh = new Object();
            if (cbbdj.cbeac.cbijg) {
                if (cbfia[cbgbc].ccchc.cbgcc) {
                    var cbgbi = {
                        ccdff: cbfia[cbgbc].cbgii.position().left,
                        ccdfi: cbfia[cbgbc].cbgii.position().top
                    };
                    var cbgjg = {
                        ccdff: cbgjc.position().left,
                        ccdfi: cbgjc.position().top
                    };
                    var cbdbb = cbfia[cbgbc].cbgja / cbegg;
                    var cbhgb = new Object();
                    cbhgb.ccdff = -cbgbi.ccdff + ccdcj.offset().left + ccdda.width - cbfia[cbgbc].cbgjd.ccdff * cbdbb;
                    cbhgb.ccdfi = -cbgbi.ccdfi + ccdcj.offset().top + ccdda.height - cbfia[cbgbc].cbgjd.ccdfi * cbdbb;
                    var cbhgc = new Object();
                    cbhgc.ccdff = -cbgbi.ccdff + ccdcj.offset().left;
                    cbhgc.ccdfi = -cbgbi.ccdfi + ccdcj.offset().top;
                    ccdbf.cbijh.cbhga = {
                        ccdff: Math["min"](cbhgb.ccdff, cbhgc.ccdff),
                        ccdfi: Math["min"](cbhgb.ccdfi, cbhgc.ccdfi)
                    };
                    var cbhei = new Object();
                    cbhei.ccdff = -cbgbi.ccdff + ccdcj.offset().left;
                    cbhei.ccdfi = -cbgbi.ccdfi + ccdcj.offset().top;
                    var cbhej = new Object();
                    cbhej.ccdff = -cbgbi.ccdff + ccdcj.offset().left + ccdda.width - cbfia[cbgbc].cbgjd.ccdff * cbdbb;
                    cbhej.ccdfi = -cbgbi.ccdfi + ccdcj.offset().top + ccdda.height - cbfia[cbgbc].cbgjd.ccdfi * cbdbb;
                    ccdbf.cbijh.cbheh = {
                        ccdff: Math["max"](cbhei.ccdff, cbhej.ccdff),
                        ccdfi: Math["max"](cbhei.ccdfi, cbhej.ccdfi)
                    };
                    if (cbjjg.cbehf) {
                        if (typeof(cbgjc.draggable) == "function") {
                            cbgjc.draggable({
                                containment: [ccdbf.cbijh.cbhga.ccdff, ccdbf.cbijh.cbhga.ccdfi, ccdbf.cbijh.cbheh.ccdff, ccdbf.cbijh.cbheh.ccdfi],
                                ccbdc: 'false'
                            });
                        }
                    }
                } else {
                    if (cbjjg.cbehf) {
                        if (typeof(cbgjc.draggable) == "function") cbgjc.draggable();
                    }
                }
            }
        }

        function cbeeb() {
            if (!cbfia[cbgbc].cbgii) {
                if (!ccdbf.cbadd.cbcjb) cbcje.ccdac(13040, cbfia[cbgbc].ccbjb);
                ccdbf.cbadd.cbcjb = true;
                return;
            }
            var cbdia = cbbih(0);
            return cbdia.cbhga.ccdff + '|' + cbdia.cbhga.ccdfi + '|' + cbdia.cbheh.ccdff + '|' + cbdia.cbheh.ccdfi;
        }

        function cbahh(cajjf) {
            cbfia[cajjf].ccaeb = {
                ccdff: 999999999,
                ccdfi: 999999999
            };
            cbfia[cajjf].ccaea = {
                ccdff: -999999999,
                ccdfi: -999999999
            };
            var total = cbfia[cajjf].ccbie.length;
            for (var ccbbe = 0; ccbbe < total; ccbbe++) {
                var ccbhh = cbfia[cajjf].ccbie[ccbbe];
                for (var cbiij = 0; cbiij < ccbhh.cbjgg.length; cbiij++) {
                    var cbjge = ccbhh.cbjgg[cbiij];
                    for (var cbiii = 0; cbiii < cbjge.cbedj.length; cbiii++) {
                        var ccaac = cbjge.cbedj[cbiii];
                        var ccadf = cbcii.cbeba(ccaac, false);
                        if (ccadf.ccdff < cbfia[cajjf].ccaeb.ccdff) cbfia[cajjf].ccaeb.ccdff = ccadf.ccdff;
                        if (ccadf.ccdfi < cbfia[cajjf].ccaeb.ccdfi) cbfia[cajjf].ccaeb.ccdfi = ccadf.ccdfi;
                        if (ccadf.ccdff > cbfia[cajjf].ccaea.ccdff) cbfia[cajjf].ccaea.ccdff = ccadf.ccdff;
                        if (ccadf.ccdfi > cbfia[cajjf].ccaea.ccdfi) cbfia[cajjf].ccaea.ccdfi = ccadf.ccdfi;
                    }
                }
            }
            cbfia[cajjf].cbgja = (cbfia[cajjf].ccaea.ccdff - cbfia[cajjf].ccaeb.ccdff) / cbfia[cajjf].cbgjd.ccdff / cbcii.cbhfj;
            if ((cbfia[cajjf].ccaea.ccdfi - cbfia[cajjf].ccaeb.ccdfi) / cbfia[cajjf].cbgjd.ccdfi / cbcii.cbhfj > cbfia[cajjf].cbgja) cbfia[cajjf].cbgja = (cbfia[cajjf].ccaea.ccdfi - cbfia[cajjf].ccaeb.ccdfi) / cbfia[cajjf].cbgjd.ccdfi / cbcii.cbhfj;
            cbfia[cajjf].cbgja = Math.floor(cbfia[cajjf].cbgja * 1.05);
            var ccadh = {
                ccdff: (cbfia[cajjf].ccaeb.ccdff + cbfia[cajjf].ccaea.ccdff) / 2,
                ccdfi: (cbfia[cajjf].ccaeb.ccdfi + cbfia[cajjf].ccaea.ccdfi) / 2
            };
            cbfia[cajjf].cbebc = cbcii.ccadg(ccadh);
        }

        function cbahb(cajjf) {
            var total = cbfia[cajjf].ccbie.length;
            for (var ccbbe = 0; ccbbe < total; ccbbe++) {
                var ccbhh = cbfia[cajjf].ccbie[ccbbe];
                for (var cbiij = 0; cbiij < ccbhh.cbjgg.length; cbiij++) {
                    var cbjge = ccbhh.cbjgg[cbiij];
                    cbjge.cbbfd = new Array(cbjge.cbedj.length);
                    for (var cbiii = 0; cbiii < cbjge.cbedj.length; cbiii++) cbjge.cbbfd[cbiii] = cbfia[cajjf].cbcih.cbeai(cbjge.cbedj[cbiii]);
                    cbjge.cbedj = undefined;
                    ccbgf(cbjge);
                }
                ccbig(ccbhh);
                if (ccbhh.cbede) ccbhh.cbajh = cbfia[cajjf].cbcih.cbeai(ccbhh.cbede);
                if (ccbhh.cbefb) ccbhh.cbgaj = cbfia[cajjf].cbcih.cbeai(ccbhh.cbefb);
            }
        }

        function cbjhi(obj) {
            return;
            obj["href"] = location.href;
            obj["product"] = "JQueryMaps.Map";
            obj["license"] = cbbdj.cbgcb;
            $.ajax({
                type: "GET",
                url: obj["pingUrl"],
                data: obj,
                error: function() {}
            });
        }

        function ccafb(ccddb) {
            var ccdfa = cbgch.cbege(ccddb.cbfcf.src);
            if (!ccdfa) {
                setTimeout(function() {
                    ccafb(ccddb);
                }, 500);
                return;
            }
            switch (ccddb.cbaaa.toLowerCase()) {
                case "top":
                case "top-left":
                case "top-right":
                    ccadc = ccddb.ccdfi;
                    break;
                case "bottom":
                case "bottom-left":
                case "bottom-right":
                    ccadc = ccdda.height - ccdfa.height - ccddb.ccdfi;
                    break;
                case "center":
                case "left":
                case "right":
                    ccadc = ccdda.height / 2 - ccdfa.height / 2 + ccddb.ccdfi;
                    break;
            }
            switch (ccddb.cbaaa.toLowerCase()) {
                case "left":
                case "top-left":
                case "bottom-left":
                    ccadb = ccddb.ccdff;
                    break;
                case "right":
                case "top-right":
                case "bottom-right":
                    ccadb = ccdda.width - ccdfa.width - ccddb.ccdff;
                    break;
                case "top":
                case "bottom":
                case "center":
                    ccadb = ccdda.width / 2 - ccdfa.width / 2 + ccddb.ccdff;
                    break;
            }
            ccddb.cbfcf["style"]["top"] = ccadc + "px";
            ccddb.cbfcf["style"]["left"] = ccadb + "px";
            ccddb.cbfcf["style"]["opacity"] = "100";
        }

        function cbaec(cajjf) {
            var cccji = 0;
            if (cbfia[cajjf].ccbie) cccji = cbfia[cajjf].ccbie.length;
            var cccjh = 0;
            if (cbfia[cajjf].cbhca) cccjh = cbfia[cajjf].cbhca.length;
            if (cajjf != cbgbc) cccjh = 0;
            for (var ccbbe = 0; ccbbe < cccji; ccbbe++) {
                var ccbhh = cbfia[cajjf].ccbie[ccbbe];
                if (!ccbhh.cbgad) ccbhh.cbgad = new Object();
                ccbhh.cbgad.ccdee = true;
            }
            for (var cbggd = 0; cbggd < cccjh; cbggd++) {
                var cbhae = cbfia[cajjf].cbhca[cbggd];
                if (!cbhae.cbgad) cbhae.cbgad = new Object();
                cbhae.cbgad.ccdee = true;
            }
            if (!cbfia[cajjf].ccchc.cbaec) return;
            for (var cbgge = 0; cbgge < cccji + cccjh; cbgge++) {
                var cbicg;
                if (cbgge < cccji) cbicg = cbfia[cajjf].ccbie[cbgge];
                else cbicg = cbfia[cajjf].cbhca[cbgge - cccji]; if (cbicg.cbgad && cbicg.cbgad.ccdee) {
                    for (var cbggf = cbgge + 1; cbggf < cccjh + cccji; cbggf++) {
                        var cbich;
                        if (cbggf < cccji) cbich = cbfia[cajjf].ccbie[cbggf];
                        else cbich = cbfia[cajjf].cbhca[cbggf - cccji]; if (cbich.cbgad && cbgah(cbicg.cbgad, cbich.cbgad)) {
                            cbich.cbgad.ccdee = false;
                            if (cbggf < cccji) ccdbf.ccahd = true;
                            else ccdbf.ccahc = true;
                        }
                    }
                }
            }
        }

        function cbgah(cbafe, cbaff) {
            if (cbafe.ccdff == undefined || cbafe.ccdfi == undefined || cbaff.ccdff == undefined || cbaff.ccdfi == undefined) return false;
            if (cbafe.ccdei == undefined || cbafe.cbehd == undefined || cbaff.ccdei == undefined || cbaff.cbehd == undefined) return false;
            if (cbafe.ccdff + cbafe.ccdei < cbaff.ccdff) return false;
            if (cbafe.ccdfi + cbafe.cbehd < cbaff.ccdfi) return false;
            if (cbaff.ccdff + cbaff.ccdei < cbafe.ccdff) return false;
            if (cbaff.ccdfi + cbaff.cbehd < cbafe.ccdfi) return false;
            return true;
        }

        function cbahc() {
            var cbeab = true;
            for (var cajjf = 0; cajjf <= cbgbc; cajjf++) {
                if (!cbahd(cajjf)) cbeab = false;
            }
            if (cbeab) ccdbf.cbfii = cbegg;
        }

        function cbahd(cajjf) {
            if (cbegg == ccdbf.cbfii && cbfia[cajjf].cbgae) return false;
            var cbeab = true;
            var total = cbfia[cajjf].cbhca.length;
            if (cajjf == cbgbc) {
                for (var cbggd = 0; cbggd < total; cbggd++) {
                    var cbhae = cbfia[cbgbc].cbhca[cbggd];
                    if (!cbhae.cbfei) cbeab = false;
                    if (cbhae.cbgac && cbhae.cbhhh && cbhae.cbiid && cbhae.cbihf) ccbff(cajjf, cbhae, cbfia[cbgbc].cbhcb, cbhae.cbgac, cbhae[cbhae.cbgac.cbada], cbhae.cbhhh, cbhae.cbiid, cbhae.cbihf);
                }
            }
            if (cbgbc - cajjf <= 1) {
                cbfia[cajjf].cbgae = {
                    ccdei: 0,
                    cbehd: 0
                };
                var ccbbg = cbfia[cajjf].cbgja / cbegg;
                total = cbfia[cajjf].ccbie.length;
                var cbbha = cbfia[cajjf].cbghj;
                cbbha.save();
                for (var ccbbe = 0; ccbbe < total; ccbbe++) {
                    var ccbhh = cbfia[cajjf].ccbie[ccbbe];
                    if (ccbhh.cbdbh && ccbhh.cbdbh.cbgac) {
                        var cbgce = ccbhh.cbdbh[ccbhh.cbdbh.cbgac.cbada];
                        if (cbgce != "") {
                            ccbff(cajjf, ccbhh, cbbha, ccbhh.cbdbh.cbgac, cbgce, ccbhh.cbgaj, 0, 0);
                            if (ccbhh.cbgag == 'o') {
                                var cbhad = ccbhh.cbdbh.cbgac.cccgj.cbdje / ccbbg * .25;
                                var ccdei = Math.round(ccbhh.cbgad.ccdei + cbhad * 2);
                                var cbehd = Math.round(ccbhh.cbgad.cbehd + cbhad * 2);
                                if (ccdei > cbfia[cajjf].cbgae.ccdei) cbfia[cajjf].cbgae.ccdei = ccdei;
                                if (cbehd > cbfia[cajjf].cbgae.cbehd) cbfia[cajjf].cbgae.cbehd = cbehd;
                            }
                        }
                    }
                }
                cbfia[cajjf].cbgae.ccdei = parseInt(cbfia[cajjf].cbgae.ccdei);
                cbfia[cajjf].cbgae.cbehd = parseInt(cbfia[cajjf].cbgae.cbehd);
                cbbha.restore();
            }
            if (cbgbc - cajjf <= 1) cbaec(cajjf);
            return cbeab;
        }

        function ccbai(obj) {
            var cbaba = new Object();
            cbaba.ccbjj = cbjec(obj.ccbjj);
            cbaba.cbhbh = cbfia[cbgbc].cbhca.length;
            cbaba.cbhbf = "jqmAnimation-" + ccdbf.cbabb.length;
            var cbhae = new Object();
            cbhae.cbfhi = cbfia[cbgbc].cbhca.length;
            cbhae.cbfbh = cbaba.cbhbf;
            cbhae.cbajd = obj.cbhaj;
            var ccaac = obj.ccbjj["parts"][0]["coords"][0];
            cbhae.cbhhh = {
                ccdff: ccaac["x"],
                ccdfi: ccaac["y"]
            };
            cbhba(cbhae, undefined);
            cbfia[cbgbc].cbhca.push(cbhae);
            cbhbd(cbhae);
            cbaba.cbbhb = 0;
            cbaba.cbbhi = 0;
            cbaba.cbbia = 0;
            cbaba.cbbif = 0;
            cbaba.cccch = obj.cccch;
            cbaba.cbffd = obj.cbffd;
            cbaba.cbffe = setInterval(function() {
                ccbaj();
            }, cbaba.cbffd * 1000);
            ccdbf.cbabb.push(cbaba);
        }

        function ccbaj() {
            for (var cbfaf in ccdbf.cbabb) {
                var cbaba = ccdbf.cbabb[cbfaf];
                var cbcea = cbaba.cccch * cbaba.cbffd / cbfia[cbgbc].cbgja * cbegg;
                var cajje = 0;
                var cbegh = false;
                var cbjgg = cbaba.ccbjj.cbjgg;
                while (!cbegh) {
                    var cbija = cbjgg[cbaba.cbbhi].cbbfd[cbaba.cbbia];
                    var cbiij = {
                        ccdff: cbija.ccdff,
                        ccdfi: cbija.ccdfi
                    };
                    var cbijb = cbjgg[cbaba.cbbhi].cbbfd[cbaba.cbbia + 1];
                    if (cbaba.cbbif != 0) {
                        cbiij.ccdff = cbiij.ccdff + (cbijb.ccdff - cbiij.ccdff) * cbaba.cbbif;
                        cbiij.ccdfi = cbiij.ccdfi + (cbijb.ccdfi - cbiij.ccdfi) * cbaba.cbbif;
                    }
                    var cbcde = cbeef(cbiij, cbijb);
                    if (cajje + cbcde > cbcea && cbaba.cbbia < cbjgg[cbaba.cbbhi].cbbfd.length - 1) {
                        var ccbdg = cbeef(cbija, cbijb);
                        var cbcdg = cbaba.cbbif * ccbdg + cbcea - cajje;
                        cbaba.cbbif = cbcdg / ccbdg;
                        cbegh = true;
                        cajje = 0;
                    } else {
                        cbaba.cbbif = 0;
                        cbaba.cbbia += 1;
                        if (cbaba.cbbia >= cbjgg[cbaba.cbbhi].cbbfd.length - 1) {
                            cbaba.cbbia = 0;
                            cbaba.cbbhi += 1;
                            if (cbaba.cbbhi >= cbjgg.length) cbaba.cbbhi = 0;
                            cbegh = true
                        } else cajje += cbcde;
                    }
                }
                var cbiij = cbjgg[cbaba.cbbhi].cbbfd[cbaba.cbbia];
                var cbijb = cbjgg[cbaba.cbbhi].cbbfd[cbaba.cbbia + 1];
                var cbhae = cbfia[cbgbc].cbhca[cbaba.cbhbh];
                cbhae.cbhhh = {
                    ccdff: cbiij.ccdff + (cbijb.ccdff - cbiij.ccdff) * cbaba.cbbif,
                    ccdfi: cbiij.ccdfi + (cbijb.ccdfi - cbiij.ccdfi) * cbaba.cbbif
                };
                cbhae.cbifi = cbaha(cbiij, cbijb);
                cbagi(cbgbc);
                ccafa(cbhae);
            }
        }

        function ccaif() {
            cbhda.css('left', -cbgjc.position().left);
            cbhda.css('top', -cbgjc.position().top);
        }
        this.changeFeatureAlphaByIndex = function(featureIndex, alphaValue) {
            if (cbbji) {
                console.log("changeFeatureAlphaByIndex " + featureIndex);
            }
            var cbdbh = cbfia[cbgbc].cbddc[featureIndex];
            if (cbdbh) cbbaa(cbdbh, alphaValue);
            else ccajc('featureNotFound', {
                "method": 'Maps.changeFeatureAlphaByIndex',
                "featureIndex": featureIndex
            });
        };
        this.changeFeatureAlphasByIndex = function(featureIndexes, alphaValue) {
            if (cbbji) {
                console.log("changeFeatureAlphasByIndex " + featureIndexes);
            }
            for (var cbdai in featureIndexes) {
                var cbdbh = cbfia[cbgbc].cbddc[featureIndexes[cbdai]];
                if (cbdbh) cbbaa(cbdbh, alphaValue);
                else ccajc('featureNotFound', {
                    "method": 'Maps.changeFeatureAlphasByIndex',
                    "featureIndexes": featureIndexes
                });
            }
            ccbcb(true);
        };
        this.changeFeatureCategoriesByCondition = function(obj) {
            if (cbbji) {
                console.log("changeFeatureCategoriesByCondition");
                console.log(obj);
            }
            var cbbdi = obj['conditions'];
            cbbdi = ccaja(cbbdi, 'feature.', 'oneFeature.');
            for (var cbfaf in cbfia[cbgbc].cbddc) {
                var oneFeature = cbfia[cbgbc].cbddc[cbfaf];
                if (eval(cbbdi)) {
                    cbdch(oneFeature, obj['newCategory']);
                }
            }
            cbddf(cbgbc);
            cbfia[cbgbc].cbdhg.cbaie = false;
            ccbcb(true);
        };
        this.changeFeatureCategoryById = function(cbidh) {
            if (cbbji) {
                console.log("changeFeatureCategoryById");
                console.log(cbidh);
            }
            ccbed.changeFeatureCategoriesById(cbidh);
        };
        this.changeFeatureCategoriesById = function(cbidh) {
            if (cbbji) {
                console.log("changeFeatureCategoriesById");
                console.log(cbidh);
            }
            for (var cbfaf in cbidh) {
                var obj = cbidh[cbfaf];
                var oneFeature = cbdgc(obj['id']);
                if (oneFeature) cbdch(oneFeature, obj['newCategory']);
                else ccajc('featureNotFound', {
                    "method": 'Maps.changeFeatureCategoriesById',
                    "featureId": obj["id"]
                });
            }
            cbddf(cbgbc);
            cbfia[cbgbc].cbdhg.cbaie = false;
            ccbcb(true);
        };
        this.changeFeatureStyleByIndex = function(featureIndex, featureStyleInstance) {
            if (cbbji) {
                console.log("changeFeatureStyleByIndex " + featureIndex);
            }
            var cbdbh = cbfia[cbgbc].cbddc[featureIndex];
            if (cbdbh) cbbab(cbdbh, featureStyleInstance);
            else ccajc('featureNotFound', {
                "method": 'Maps.changeFeatureStyleByIndex',
                "featureIndex": featureIndex
            });
        };
        this.changeFeatureStylesByIndex = function(featureIndexes, featureStyleInstance) {
            if (cbbji) {
                console.log("changeFeatureStylesByIndex " + featureIndexes);
            }
            for (var cbdai in featureIndexes) {
                var cbdbh = cbfia[cbgbc].cbddc[featureIndexes[cbdai]];
                if (cbdbh) cbbab(cbdbh, featureStyleInstance);
                else ccajc('featureNotFound', {
                    "method": 'Maps.changeFeatureStylesByIndex',
                    "featureIndexes": featureIndexes
                });
            }
            ccbcb(true);
        };
        this.changeMarkerCategoriesByIndex = function(cbidh) {
            if (cbbji) {
                console.log("changeMarkerCategoriesByIndex");
                console.log(cbidh);
            }
            for (var cbfaf in cbidh) {
                var obj = cbidh[cbfaf];
                var cbhae = cbfia[cbgbc].cbhca[obj['index']];
                cbhae.cbajd = obj['category'];
                if (obj['newCategory']) cbhae.cbajd = obj['newCategory'];
                cbhae.ccdfj = obj['zindex'];
                cbhae.cbheb = undefined;
                cbhae.cbiif = undefined;
                cbhae.cbeje = undefined;
                cbhae.cajif = undefined;
                cbhae.cbchf = undefined;
                cbhae.cbfai = undefined;
                cbhae.cbgac = undefined;
                cbhba(cbhae, undefined);
                if (cbhae.cbheb.width && cbhae.cbheb.height) {
                    cbhae.cbfaj = cbhae.cbheb.width;
                    cbhae.cbfba = cbhae.cbheb.height;
                }
                cbhae.cbfei = false;
                cbhae.cbfcf[0].src = cbhae.cbheb.cbfai;
                if (cbhae.ccdfj) cbhae.cbced.css('z-index', cbhae.ccdfj);
                setMarkerEvents(cbhae);
                if (cbhae.cbgac) ccbff(cbgbc, cbhae, cbfia[cbgbc].cbhcb, cbhae.cbgac, cbhae[cbhae.cbgac.cbada], cbhae.cbhhh, cbhae.cbiid, cbhae.cbihf);
            }
            ccaej(false);
        };
        this.changeViewportSize = function(obj) {
            if (cbbji) {
                console.log("changeViewportSize " + parseInt(obj["width"]) + "," + parseInt(obj["height"]) + "(existing " + ccdcj.width() + "," + ccdcj.height() + ' ' + ccdda.width + "," + ccdda.height);
            }
            if (ccdda.width == parseInt(obj["width"]) && ccdda.height == parseInt(obj["height"])) {
                return;
            }
            ccdcj[0]["style"]["width"] = obj["width"] + "px";
            ccdcj[0]["style"]["height"] = obj["height"] + "px";
            cbcci.cbbii = obj["width"];
            cbcci.cbbhe = obj["height"];
            ccdai();
            if (cbfid.cbhga) cbdja(cbfid, 1);
        };
        this.checkIfMapIsReady = function() {
            if (cbbji) {
                console.log("checkIfMapIsReady");
            }
            return cbfia[cbgbc].cbdhg.mapIsReady;
        };
        this.clickOnFeature = function(featureId) {
            if (cbbji) {
                console.log("clickOnFeature " + featureId);
            }
            cbbcf(featureId);
        };
        this.createMarkers = function() {
            if (cbbji) {
                console.log("createMarkers");
            }
            cbfia[cbgbc].cbdhg.cbhde = false;
            cbfia[cbgbc].cbdhg.cbhci = false;
            themeInitialActions();
        };
        this.displayInitialView = function() {
            if (cbbji) {
                console.log("displayInitialView");
            }
            if (!cbfia[cbgbc] || !cbfia[cbgbc].cbdhg.mapIsReady) return;
            cbfeh();
        };
        this.disableFeaturesLoadChild = function() {
            if (cbbji) {
                console.log("disableFeaturesLoadChild");
            }
            ccdbf.cbddi = false;
        };
        this.disableFeaturesZoom = function() {
            if (cbbji) {
                console.log("disableFeaturesZoom");
            }
            ccdbf.cbdfb = false;
        };
        this.enableFeaturesLoadChild = function() {
            if (cbbji) {
                console.log("enableFeaturesLoadChild");
            }
            ccdbf.cbddi = true;
        };
        this.enableFeaturesZoom = function() {
            if (cbbji) {
                console.log("enableFeaturesZoom");
            }
            ccdbf.cbdfb = true;
        };
        this.exportToPNG = function() {
            if (cbbji) {
                console.log("exportToPNG");
            }
            if (ccdbe) return;
            return cbfia[cbgbc].cbgic.toDataURL("image/png");
        };
        this.focusAndHighlightFeature = function(obj, backCompatibility) {
            if (cbbji) {
                console.log("focusAndHighlightFeature " + backCompatibility);
                console.log(obj);
            }
            var featureId = obj;
            var cbbeg = backCompatibility;
            if (typeof(obj) == 'object') {
                featureId = obj['id'];
                cbbeg = obj['considerGeolocation'];
            }
            cbdhi(featureId, cbbeg);
        };
        this.focusAndHighlightFeatureMultiLevel = function(obj) {
            if (cbbji) {
                console.log("focusAndHighlightFeatureMultiLevel");
                console.log(obj);
            }
            ccdbf.cbdif = obj;
            if (cbgbc != 0) cbfeh();
            cbbcf(obj["ids"][0]);
        };
        this.focusOnFeature = function(obj, backCompatibility) {
            if (cbbji) {
                console.log("focusOnFeature " + backCompatibility);
                console.log(obj);
            }
            var featureId = obj;
            var cbbeg = backCompatibility;
            if (typeof(obj) == 'object') {
                featureId = obj['id'];
                cbbeg = obj['considerGeolocation'];
            }
            var cbdbh = cbdgc(featureId);
            if (!cbdbh) ccajc('featureNotFound', {
                "method": 'Maps.focusOnFeature',
                "featureId": featureId
            });
            else {
                cbdcj(cbdbh, cbbeg);
                if (ccdbf.cbaad) cccih.cccac();
                cbfia[cbgbc].cbdhg.cccdg = true;
            }
        };
        this.focusOnPoint = function(latLonAndScale) {
            if (cbbji) {
                console.log("focusOnPoint " + latLonAndScale);
            }
            var obj = new Object();
            obj.cbfjh = latLonAndScale['lat'];
            obj.cbggb = latLonAndScale['lon'];
            obj.ccbbg = latLonAndScale['scale'];
            var cbdia = cbefa(obj);
            cbfga = false;
            cbdja(cbdia, cbbdj.ccdgg);
            if (ccdbf.cbaad) cccih.cccac();
            cbfia[cbgbc].cbdhg.cccdg = true;
        };
        this.getBackToPreviousLevel = function() {
            if (cbbji) {
                console.log("getBackToPreviousLevel");
            }
            cbgbd();
        };
        this.getClickedFeatures = function() {
            if (cbbji) {
                console.log("getClickedFeatures");
            }
            return cbbce;
        };
        this.getCurrentFocusBox = function() {
            if (cbbji) {
                console.log("getCurrentFocusBox");
            }
            return cbeeb();
        };
        this.getCurrentLevel = function() {
            if (cbbji) {
                console.log("getCurrentLevel");
            }
            return cbgbc;
        };
        this.getCurrentThemeUrl = function() {
            if (cbbji) {
                console.log("getCurrentThemeUrl");
            }
            return cbfia[cbgbc].ccchc.url;
        };
        this.getFeatures = function() {
            if (cbbji) {
                console.log("getFeatures");
            }
            return cbfia[cbgbc].cbddc;
        };
        this.getFeatureIdsByCategory = function(cbajd) {
            if (cbbji) {
                console.log("getFeatureIdsByCategory " + cbajd);
            }
            return ccbed.getFeatureIdsByCategory(cbajd);
        };
        this.getFeatureIdsByCategory = function(cbajd) {
            if (cbbji) {
                console.log("getFeatureIdsByCategory " + cbajd);
            }
            var cbfbi = new Array();
            for (var cbfaf in cbfia[cbgbc].cbddc) {
                var cbdbh = cbfia[cbgbc].cbddc[cbfaf];
                if (cbdbh.cbajd == cbajd) cbfbi.push(cbdbh);
            }
            return cbfbi;
        };
        this.getGeographicDistance = function(cbijc, cbije) {
            if (cbbji) {
                console.log("getGeographicDistance");
                console.log(cbijc);
                console.log(cbije);
            }
            var cbijb = {
                cbfjh: cbijc['lat'],
                cbggb: cbijc['lon']
            };
            var cbijd = {
                cbfjh: cbije['lat'],
                cbggb: cbije['lon']
            };
            return cbcii.cbeei(cbijb, cbijd);
        };
        this.getLastMarker = function(cbajd) {
            if (cbbji) {
                console.log("getLastMarker " + cbajd);
            }
            for (var cbfaf = cbfia[cbgbc].cbhca.length - 1; cbfaf <= 0; cbfaf--) {
                var cbhae = cbfia[cbgbc].cbhca[cbfaf];
                if (!cbajd || ccceh(cbhae.cbajd, cbajd)) return cbhae;
            }
            return undefined;
        };
        this.getLevelsData = function() {
            if (cbbji) {
                console.log("getLevelsData");
            }
            var cbgbj = new Array();
            for (var cajjf in cbfia) {
                var cbgbh = new Object();
                cbgbh['originObject'] = cbfia[cbgbc].cbihb;
                cbgbj.push(cbgbh);
            }
            return cbgbj;
        };
        this.getMagneticHeading = function(cbijc, cbije) {
            if (cbbji) {
                console.log("getMagneticHeading");
                console.log(cbijc);
                console.log(cbije);
            }
            var cbijb = {
                cbfjh: cbijc['lat'],
                cbggb: cbijc['lon']
            };
            var cbijd = {
                cbfjh: cbije['lat'],
                cbggb: cbije['lon']
            };
            return cbcii.cbeff(cbijb, cbijd);
        };
        this.getMarkers = function() {
            if (cbbji) {
                console.log("getMarkers");
            }
            return cbfia[cbgbc].cbhca;
        };
        this.hideBackButton = function() {
            if (cbbji) {
                console.log("hideBackButton");
            }
            ccdbf.cbaad = false;
            cccih.cbeia();
        };
        this.hideFeatureById = function(featureId) {
            if (cbbji) {
                console.log("hideFeatureById " + featureId);
            }
            var cbdbh = cbdgc(featureId);
            if (cbdbh) {
                cbeib(cbdbh);
                ccbcb(true);
            } else ccajc('featureNotFound', {
                "method": 'Maps.hideFeatureById',
                "featureId": featureId
            });
        };
        this.hideFeatureByIndex = function(featureIndex) {
            if (cbbji) {
                console.log("hideFeatureByIndex " + featureIds);
            }
            var cbdbh = cbfia[cbgbc].cbddc[featureIndex];
            if (cbdbh) cbeib(cbdbh);
            else ccajc('featureNotFound', {
                "method": 'Maps.hideFeatureByIndex',
                "featureIndex": featureIndex
            });
        };
        this.hideFeaturesByCategory = function(featureCategoriesMask) {
            if (cbbji) {
                console.log("hideFeaturesByCategory " + featureCategoriesMask);
            }
            cbgdh.showMessage("Changing features visibility...");
            for (var cbfaf in cbfia[cbgbc].cbddc) {
                var cbdbh = cbfia[cbgbc].cbddc[cbfaf];
                if (ccceh(cbdbh.cbajd, featureCategoriesMask)) {
                    cbeib(cbdbh);
                }
            }
            ccbcb(true);
            cbgdh.hideMessage("Changing features visibility...");
        };
        this.hideFeaturesById = function(featureIds) {
            if (cbbji) {
                console.log("hideFeatureByIds " + featureIds);
            }
            for (var cbdai in featureIds) {
                var cbdbh = cbdgc(featureIds[cbdai]);
                if (cbdbh) cbeib(cbdbh);
                else ccajc('featureNotFound', {
                    "method": 'Maps.hideFeaturesById',
                    "featureId": featureId
                });
            }
            ccbcb(true);
        };
        this.hideFeaturesByIndex = function(featureIndexes) {
            if (cbbji) {
                console.log("hideFeaturesByIndex " + featureIndexes);
            }
            for (var cbdai in featureIndexes) {
                var cbdbh = cbfia[cbgbc].cbddc[featureIndexes[cbdai]];
                if (cbdbh) cbeib(cbdbh);
                else ccajc('featureNotFound', {
                    "method": 'Maps.hideFeaturesByIndex',
                    "featureId": featureId
                });
            }
            ccbcb(true);
        };
        this.hideMarkerLetteredLabelsByIndex = function(markerIndexes) {
            if (cbbji) {
                console.log("hideMarkerLetteredLabelsByIndex");
                console.log(markerIndexes);
            }
            for (var cbfaf in markerIndexes) {
                var cbhae = cbfia[cbgbc].cbhca[markerIndexes[cbfaf]];
                if (cbhae.cbgaf) cbhae.cbgaf['style']['display'] = 'none';
            }
        };
        this.hideMarkersByCategory = function(markerCategoriesMask) {
            if (cbbji) {
                console.log("hideMarkersByCategory " + markerCategoriesMask);
            }
            cbgdh.showMessage("Changing markers visibility...");
            for (var cbfaf in cbfia[cbgbc].cbhca) {
                var cbhae = cbfia[cbgbc].cbhca[cbfaf];
                if (ccceh(cbhae.cbajd, markerCategoriesMask)) {
                    cbeie(cbhae);
                }
            }
            if (cbbdj.cbhea == "canvas") ccaej(false);
            cbgdh.hideMessage("Changing markers visibility...");
        };
        this.highlightFeature = function(featureId) {
            if (cbbji) {
                console.log("highlightFeature " + featureId);
            }
            var cbdbh = cbdgc(featureId);
            if (!cbdbh) ccajc('featureNotFound', {
                "method": 'Maps.highlightFeature',
                "featureId": featureId
            });
            else cbdda(cbdbh);
        };
        this.highlightFeatures = function(featureIds) {
            ccbed.highlightFeaturesById(featureIds);
        };
        this.highlightFeaturesById = function(featureIds) {
            if (cbbji) {
                console.log("highlightFeatures");
                console.log(featureIds);
            }
            cbdej();
            for (var cbfaf = 0; cbfaf < featureIds.length; cbfaf++) {
                var cbdbh = cbdgc(featureIds[cbfaf]);
                if (!cbdbh) ccajc('featureNotFound', {
                    "method": 'Maps.highlightFeatures',
                    "featureId": featureId
                });
                else {
                    if (!cbdbh.ccbhh) ccajc('shapeFeatureNotFound', {
                        "method": 'Maps.highlightFeatures',
                        "featureId": featureId
                    });
                    else cbdda(cbdbh);
                }
            }
            ccbcb(true);
        };
        this.insertDiv = function(obj) {
            if (cbbji) {
                console.log("insertDiv");
                console.log(obj);
            }
            if (cbfia[cbgbc].cbdad) cbfia[cbgbc].cbdad = new Array();
            var cbeci;
            if (obj["viewportX"] != undefined && obj["viewportY"] != undefined) cbeci = cbfia[cbgbc].cbcih.ccdcg({
                ccdff: obj["viewportX"],
                ccdfi: obj["viewportY"]
            }, cbegg);
            if (!cbeci) return undefined;
            var cbcee = document.createElement("div");
            if (obj["id"]) cbcee["id"] = obj["id"];
            cbcee["style"]["position"] = "absolute";
            cbfia[cbgbc].cbdaf[0].appendChild(cbcee);
            cbfia[cbgbc].cbdad.push({
                cbfac: cbcee,
                cbfjh: cbeci.cbfjh,
                cbggb: cbeci.cbggb
            });
            ccaeh(cbfia[cbgbc].cbdad[cbfia[cbgbc].cbdad.length - 1]);
            return cbcee;
        };
        this.insertFeatureAndShape = function(jqmFeatureInstance, jqmShapeInstance) {
            if (cbbji) {
                console.log("insertFeatureAndShape");
                console.log(jqmFeatureInstance);
                console.log(jqmShapeInstance);
            }
            var cbidg = new Object();
            cbidg['featureIndex'] = cbfia[cbgbc].cbddc.length;
            cbidg['shapeIndex'] = cbfia[cbgbc].ccbie.length;
            var cbddb = cbjcc(jqmFeatureInstance);
            cbddb.cbfhi = cbfia[cbgbc].cbddc.length;
            cbddb['index'] = cbddb.cbfhi;
            cbfia[cbgbc].cbddc.push(cbddb);
            var cbdcd;
            cbdce(cbfia[cbgbc].cbddc[cbfia[cbgbc].cbddc.length - 1], cbdcd);
            var ccbid = cbjec(jqmShapeInstance, jqmShapeInstance.cbgig);
            ccbid.cbfhi = cbfia[cbgbc].ccbie.length;
            cbfia[cbgbc].ccbie.push(ccbid);
            cbfia[cbgbc].ccbie[cbfia[cbgbc].ccbie.length - 1].cbdbh = cbfia[cbgbc].cbddc[cbfia[cbgbc].cbddc.length - 1];
            cbfia[cbgbc].cbddc[cbfia[cbgbc].cbddc.length - 1].ccbhh = cbfia[cbgbc].ccbie[cbfia[cbgbc].ccbie.length - 1];
            return cbidg;
        };
        this.insertFeaturesAndShapes = function(jqmFeatureInstances, jqmShapeInstances) {
            if (cbbji) {
                console.log("insertFeaturesAndShapes");
                console.log(jqmFeatureInstances);
                console.log(jqmShapeInstances);
            }
            var cbidg = new Array();
            for (var cbfaf = 0; cbfaf < jqmFeatureInstances.length; cbfaf++) {
                cbidg.push(ccbed.insertFeatureAndShape(jqmFeatureInstances[cbfaf], jqmShapeInstances[cbfaf]));
            }
            return cbidg;
        };
        this.insertImageToViewport = function(obj) {
            if (cbbji) {
                console.log("insertImageToViewport");
                console.log(obj);
            }
            if (!ccdbf.ccddc) ccdbf.ccddc = new Array();
            var ccdeh = document.createElement("img");
            ccdeh["style"]["position"] = "absolute";
            ccdeh["src"] = obj["url"];
            ccdeh["style"]["opacity"] = "0";
            if (obj["zindex"]) ccdeh["style"]["z-index"] = (obj["zindex"]);
            $(ccdeh).load(function() {
                var ccdfa = cbgch.cbege(this.src);
                if (!ccdfa) {
                    var width = Math['max'](this.width, $(this).width());
                    var height = Math['max'](this.height, $(this).height());
                    cbgch.ccbhc(this.src, width, height);
                }
            });
            var ccddb = {
                ccdaj: obj["url"],
                cbaaa: obj["align"],
                ccdff: Number(obj["x"]),
                ccdfi: Number(obj["y"]),
                cbfcf: ccdeh
            };
            ccdbf.ccddc.push(ccddb);
            ccdcj[0].appendChild(ccdeh);
            ccafb(ccddb);
        };
        this.insertMarker = function(jqmMarkerInstance) {
            if (cbbji) {
                console.log("insertMarker");
                console.log(jqmMarkerInstance);
            }
            var cbhae = cbjdd(jqmMarkerInstance);
            cbhae.cbfhi = cbfia[cbgbc].cbhca.length;
            cbhba(cbhae, undefined);
            cbfia[cbgbc].cbhca.push(cbhae);
        };
        this.insertMarkers = function(jqmMarkerInstances) {
            if (cbbji) {
                console.log("insertMarkers");
                console.log(jqmMarkerInstances);
            }
            for (var cbfhg in jqmMarkerInstances) this.insertMarker(jqmMarkerInstances[cbfhg]);
            this.createMarkers();
            this.refreshMarkers();
        };
        this.loadInitialTheme = function(cccia, cbjaf) {
            if (cbbji) {
                console.log("loadInitialTheme " + cccia);
                console.log(cbjaf);
            }
            while (cbgbc > 0) {
                ccaig();
                cbgbc--;
            }
            ccaig();
            cbfee();
            cbbce = new Array();
            cbjae = new Object();
            for (var cbfhi in cbjaf) cbjae[cbfhi] = cbjaf[cbfhi];
            if (cbjae["viewRotationAngle"] != undefined) cbbdj.ccddf = cbjae["viewRotationAngle"];
            if (cbjae["viewTiltAngle"] != undefined) cbbdj.ccddj = cbjae["viewTiltAngle"];
            if (cbjae["verticalTextsWhenTilt"] != undefined) cbbdj.ccdca = cbjae["verticalTextsWhenTilt"];
            cbgeg(cccia);
        };
        this.loadMarkers = function(cbheg) {
            if (cbbji) {
                console.log("loadMarkers " + cbheg);
            }
            cbgee(cbheg);
            ccbgh();
        };
        this.loadPositionedImagesMosaic = function(jqmPositionedImagesMosaicInstance) {
            if (cbbji) {
                console.log("loadPositionedImagesMosaic");
                console.log(jqmPositionedImagesMosaicInstance);
            }
            var cbjib = cbjeb(jqmPositionedImagesMosaicInstance);
            ccbbc.ccacf.push(cbjib);
            ccacg();
        };
        this.loadTheme = function(cccia) {
            if (cbbji) {
                console.log("loadTheme " + cccia);
            }
            ccaig();
            cbfee();
            cbgeg(cccia);
        };
        this.mapIsReady = function() {
            if (cbbji) {
                console.log("mapIsReady");
            }
            return ccbed.checkIfMapIsReady();
        };
        this.redraw = function() {
            if (cbbji) {
                console.log("redraw");
            }
            ccbcb(true);
        };
        this.refreshMarkers = function() {
            if (cbbji) {
                console.log("refreshMarkers");
            }
            ccaej(true);
        };
        this.reloadInitialTheme = function() {
            if (cbbji) {
                console.log("reloadInitialTheme");
            }
            ccaij(0);
            var cccia = cbfia[cbgbc].ccchc.url;
            ccaig();
            cbbce = new Array();
            cbfee();
            cbgeg(cccia);
        };
        this.removeAnimations = function() {
            if (cbbji) {
                console.log("removeAnimations");
            }
            var cbhbg = new Array();
            for (var cbfaf = ccdbf.cbabb.length - 1; cbfaf >= 0; cbfaf--) {
                var cbaba = ccdbf.cbabb[cbfaf];
                cbhbg.push(cbaba.cbhbf);
                clearInterval(cbaba.cbffe);
            }
            this["removeMarkersById"](cbhbg);
            ccdbf.cbabb = new Array();
            this.createMarkers();
        };
        this.removeDivs = function() {
            if (cbbji) {
                console.log("removeDivs");
            }
            cbfia[cbgbc].cbdad = new Object();
            cbfia[cbgbc].cbdaf.empty();
        };
        this.removeFeatures = function() {
            if (cbbji) {
                console.log("removeFeatures");
            }
            cbfia[cbgbc].cbddc = new Array();
            cbfia[cbgbc].ccbie = new Array();
        };
        this.removeFeaturesByCategory = function(categoryIdString) {
            if (cbbji) {
                console.log("removeFeaturesByCategory " + categoryIdString);
            }
            var cbdei = new Array();
            var ccbjh = new Array();
            var ccaii = 0;
            for (var cbdai in cbfia[cbgbc].cbddc) {
                var cbdbh = cbfia[cbgbc].cbddc[cbdai];
                if (cbdbh.cbajd == categoryIdString) {
                    cbdei.push(cbdai);
                    ccbjh.push(cbdbh.ccbhh.cbfhi);
                    ccaii++;
                } else {
                    if (cbdbh.ccbhh) cbdbh.ccbhh.cbfhi -= ccaii;
                }
            }
            for (var ccbbe = cbdei.length - 1; ccbbe >= 0; ccbbe--) cbfia[cbgbc].cbddc.splice(cbdei[ccbbe], 1);
            for (var ccbbe = ccbjh.length - 1; ccbbe >= 0; ccbbe--) cbfia[cbgbc].ccbie.splice(ccbjh[ccbbe], 1);
        };
        this.removeImagesFromViewport = function() {
            if (cbbji) {
                console.log("removeImagesFromViewport");
            }
            if (!ccdbf.ccddc) return;
            for (var cbfaf = ccdbf.ccddc.length - 1; cbfaf >= 0; cbfaf--) {
                var ccddb = ccdbf.ccddc[cbfaf];
                ccddb.cbfcf["parentNode"]["removeChild"](ccddb.cbfcf);
                ccdbf.ccddc.splice(cbfaf);
            }
        };
        this.removeMarkers = function() {
            if (cbbji) {
                console.log("removeMarkers");
            }
            cbfia[cbgbc].cbhca = new Array();
            cbhch();
        };
        this.removeMarkersById = function(markerIds) {
            if (cbbji) {
                console.log("removeMarkersById");
            }
            for (var cbggd in markerIds) {
                for (var cbfaf = cbfia[cbgbc].cbhca.length - 1; cbfaf >= 0; cbfaf--) {
                    var cbhae = cbfia[cbgbc].cbhca[cbfaf];
                    if (markerIds[cbggd] == cbhae.cbfbh) cbfia[cbgbc].cbhca.splice(cbfaf, 1);
                }
            }
            this.createMarkers();
        };
        this.removePositionedImages = function() {
            if (cbbji) {
                console.log("removePositionedImages");
            }
            for (cbfaf in cbfia) cbfia[cbfaf].ccach = new Array();
        };
        this.replaceShapeByIndex = function(featureIndex, shapeIndex, jqmShapeInstance) {
            if (cbbji) {
                console.log("replaceShapeByIndex " + featureIndex + ' ' + shapeIndex);
                console.log(jqmShapeInstance);
            }
            cbfia[cbgbc].ccbie[shapeIndex] = cbjec(jqmShapeInstance);
            cbfia[cbgbc].ccbie[shapeIndex].cbfhi = shapeIndex;
            cbfia[cbgbc].ccbie[shapeIndex].cbdbh = cbfia[cbgbc].cbddc[featureIndex];
            cbfia[cbgbc].cbddc[shapeIndex].ccbhh = cbfia[cbgbc].ccbie[shapeIndex];
        };
        this.resetFeatureCategories = function() {
            if (cbbji) {
                console.log("resetFeatureCategories");
            }
            for (var cbfaf in cbfia[cbgbc].cbddc) {
                var cbdbh = cbfia[cbgbc].cbddc[cbfaf];
                if (cbdbh.cbigb) cbdch(cbdbh, cbdbh.cbigb);
            }
            cbddf(cbgbc);
            cbfia[cbgbc].cbdhg.cbaie = false;
            ccbcb(true);
        };
        this.runAnimation = function(animationInstance) {
            if (cbbji) {
                console.log("runAnimation");
                console.log(animationInstance);
            }
            ccbai({
                cbhaj: animationInstance["markerCategory"],
                ccbjj: animationInstance["shapeToFollow"],
                cbffd: animationInstance["interval"],
                cccch: animationInstance["speed"]
            });
        };
        this.scaleFeature = function(featureId, featureScale) {
            if (cbbji) {
                console.log("scaleFeature " + featureId + " " + featureScale);
            }
            var cbdbh = cbdgc(featureId);
            if (!cbdbh) ccajc('featureNotFound', {
                "method": 'Maps.scaleFeature',
                "featureId": featureId
            });
            else ccbca(cbdbh, featureScale);
        };
        this.setChildTheme = function(ccchc) {
            if (cbbji) {
                console.log("setChildTheme");
            }
            cbfic = undefined;
            cbgbc++;
            ccdbf.cbgbf = true;
            cbfee();
            ccbfh();
            ccbgg(ccchc);
        };
        this.setCoordinatesFormat = function(coordinatesFormatPattern) {
            if (cbbji) {
                console.log("setCoordinatesFormat " + coordinatesFormatPattern);
            }
            if (!coordinatesFormatPattern) return;
            switch (coordinatesFormatPattern.toLowerCase()) {
                case 'ddmmss':
                case 'ddmm.mm':
                case 'dd.dddd':
                    cbbdj.cbbfa = coordinatesFormatPattern.toLowerCase();
                    break;
                default:
                    alert('Wrong coordinates format: ' + coordinatesFormatPattern + '. Please use ddmmss, ddmm.mm or dd.dddd.');
                    break;
            }
        };
        this.setFormattedLatLon = function(obj) {
            if (cbbji) {
                console.log("setFormattedLatLon");
            }
            obj['formattedLat'] = cbbej(obj['lat'], 'lat', cbbdj.cbbfa);
            obj['formattedLon'] = cbbej(obj['lon'], 'lon', cbbdj.cbbfa);
        };
        this.setGradient = function(cbeaf) {
            if (cbbji) {
                console.log("setGradient");
            }
            var cccgd = [cbgbc];
            if (!cbeaf['level'] || cbeaf['level'] == '*') {
                cccgd = new Array();
                for (cbfaf = 0; cbfaf < cbfia.length; cbfaf++) cccgd.push(cbfaf);
            }
            for (var cbfaf in cccgd) {
                var cccgc = cccgd[cbfaf];
                var cbdbf = cbdgd(cbeaf['category'], cccgc);
                if (cbdbf) {
                    var cbgca = cbdbf.cbdee.cbegj;
                    if (cbgca) {
                        if (cbeaf.fillColorLowest) cbgca.cbdfh = cbeaf.fillColorLowest;
                        if (cbeaf.fillColorHighest) cbgca.cbdfg = cbeaf.fillColorHighest;
                        if (cbeaf['dataAttribute']) cbgca.cbbja = cbeaf['dataAttribute'];
                        if (cbeaf.header) cbgca.cbehg = cbeaf.header;
                        if (cbeaf.subheader) cbgca.cccfd = cbeaf.subheader;
                        if (cbeaf.ranges) cbgca.ccafh = cbeaf.ranges;
                        if (cbeaf.rangeValues) {
                            if (cbeaf.rangeValues.toLowerCase() == 'auto') cbgca.cbadj = true;
                            else cbgca.ccagb = cbeaf.rangeValues.split(',');
                        }
                        if (cbeaf.rangeTextPrefix) cbgca.ccafj = cbeaf.rangeTextPrefix;
                        if (cbeaf.rangeTextSufix) cbgca.ccaga = cbeaf.rangeTextSufix;
                    }
                    cbddf(cccgc);
                }
            }
            ccbcb(true);
        };
        this.setMode = function(cbaah) {
            if (cbbji) {
                console.log("setMode " + cbaah);
            }
            ccbga(cbaah);
        };
        this.setPixelInfo = function(obj) {
            if (cbbji) {
                console.log("setPixelInfo");
                console.log(obj);
            }
            var cbjic = cbfia[cbgbc].cbcih.cbebb({
                cbfjh: obj['lat'],
                cbggb: obj['lon']
            }, cbegg, false);
            var cbiii = cbfia[cbgbc].ccabh.getImageData(cbjic.ccdff, cbjic.ccdfi, 1, 1).data;
            obj['r'] = cbiii[0];
            obj['g'] = cbiii[1];
            obj['b'] = cbiii[2];
        };
        this.setTheme = function(ccchc) {
            if (cbbji) {
                console.log("setTheme");
                console.log(ccchc);
            }
            cbfic = undefined;
            ccaig();
            cbfee();
            ccbfh();
            ccbgg(ccchc);
        };
        this.showBackButton = function() {
            if (cbbji) {
                console.log("showBackButton");
            }
            ccdbf.cbaad = true;
            cccih.cccac();
        };
        this.showFeatureById = function(featureId) {
            if (cbbji) {
                console.log("showFeatureById " + featureId);
            }
            var cbdbh = cbdgc(featureId);
            if (cbdbh) {
                cccae(cbdbh);
                ccbcb(true);
            } else ccajc('featureNotFound', {
                "method": 'Maps.showFeatureById',
                "featureId": featureId
            });
        };
        this.showFeatureByIndex = function(featureIndex) {
            if (cbbji) {
                console.log("showFeatureByIndex " + featureIndex);
            }
            var cbdbh = cbfia[cbgbc].cbddc[featureIndex];
            if (cbdbh) cccae(cbdbh);
            else ccajc('featureNotFound', {
                "method": 'Maps.showFeatureByIndex',
                "featureIndex": featureIndex
            });
        };
        this.showFeaturesByCategory = function(featureCategoriesMask) {
            if (cbbji) {
                console.log("showFeaturesByCategory " + featureCategoriesMask);
            }
            cbgdh.showMessage("Changing features visibility...");
            for (var cbfaf in cbfia[cbgbc].cbddc) {
                var cbdbh = cbfia[cbgbc].cbddc[cbfaf];
                if (ccceh(cbdbh.cbajd, featureCategoriesMask)) {
                    cccae(cbdbh);
                }
            }
            ccbcb(true);
            cbgdh.hideMessage("Changing features visibility...");
        };
        this.showFeaturesById = function(featureIds) {
            if (cbbji) {
                console.log("showFeatureByIds " + featureIds);
            }
            for (var cbdai in featureIds) {
                var cbdbh = cbdgc(featureIds[cbdai]);
                if (cbdbh) cccae(cbdbh);
                else ccajc('featureNotFound', {
                    "method": 'Maps.showFeaturesById',
                    "featureId": featureId
                });
            }
            ccbcb(true);
        };
        this.showFeaturesByIndex = function(featureIndexes) {
            if (cbbji) {
                console.log("showFeaturesByIndex " + featureIndexes);
            }
            for (var cbdai in featureIndexes) {
                var cbdbh = cbfia[cbgbc].cbddc[featureIndexes[cbdai]];
                if (cbdbh) cccae(cbdbh);
                else ccajc('featureNotFound', {
                    "method": 'Maps.showFeaturesByIndex',
                    "featureIndexes": featureIndexes
                });
            }
            ccbcb(true);
        };
        this.showFeaturesByProperty = function(obj) {
            if (cbbji) {
                console.log("showFeaturesByProperty");
                console.log(obj);
            }
            cbgdh.showMessage("Changing features visibility...");
            for (var cbfaf in cbfia[cbgbc].cbddc) {
                var cbdbh = cbfia[cbgbc].cbddc[cbfaf];
                if (ccceh(cbdbh[obj["propertyName"]], obj["propertyValue"])) {
                    cccae(cbdbh);
                }
            }
            ccbcb(true);
            cbgdh.hideMessage("Changing features visibility...");
        };
        this.showFullScreen = function() {
            if (cbbji) {
                console.log("showFullScreen");
            }
            ccdbf.cbdjj = true;
            if (ccdbf.cbeji) {
                ccbbd(ccdcj[0], "RequestFullScreen");
            }
            if (!cbbdj.cbjjh.cbigc) {
                cbbdj.cbjjh.cbigc = cbbdj.cbjjh.cbcda;
                ccdcj.parents().andSelf()["filter"]('div').each(function() {
                    this.cbigg = this["style"]["position"];
                    this.cbigf = this["style"]["left"];
                    this.cbigh = this["style"]["top"];
                    this.cbigi = this["style"]["width"];
                    this.cbige = this["style"]["height"];
                });
            }
            cbcci.cbbii = undefined;
            cbbdj.cbjjh.cbcda = "fullScreen";
            cccih.cbbac(ccdbf.cbdjj);
        };
        this.showMarkersByCategory = function(markerCategoriesMask) {
            if (cbbji) {
                console.log("showMarkersByCategory " + markerCategoriesMask);
            }
            cbgdh.showMessage("Changing markers visibility...");
            for (var cbfaf in cbfia[cbgbc].cbhca) {
                var cbhae = cbfia[cbgbc].cbhca[cbfaf];
                if (ccceh(cbhae.cbajd, markerCategoriesMask)) {
                    cccai(cbhae);
                }
            }
            if (cbbdj.cbhea == "canvas") ccaej(false);
            cbgdh.hideMessage("Changing markers visibility...");
        };
        this.showRegularSize = function() {
            if (cbbji) {
                console.log("showRegularSize");
            }
            ccdbf.cbdjj = false;
            if (ccdbf.cbeji) ccbbd(document, "CancelFullScreen");
            if (cbbdj.cbjjh.cbigc) {
                cbbdj.cbjjh.cbcda = cbbdj.cbjjh.cbigc;
                document['body']['style']['overflow'] = ccdbf.cbiga;
                ccdcj.parents().andSelf()["filter"]('div').each(function() {
                    this["style"]["position"] = this.cbigg;
                    this["style"]["left"] = this.cbigf;
                    this["style"]["top"] = this.cbigh;
                    this["style"]["width"] = this.cbigi;
                    this["style"]["height"] = this.cbige;
                });
                ccdai();
                if (cbfid.cbhga) cbdja(cbfid, 1);
                ccajc('windowResized', {
                    "newSize": {
                        "width": cbbdj.cbjjh.cbigi,
                        "height": cbbdj.cbjjh.cbige
                    }
                });
            }
            cccih.cbbac(ccdbf.cbdjj);
        };
        this.stopTriggeringEvents = function() {
            if (cbbji) {
                console.log("stopTriggeringEvents");
            }
            cbfff = false;
            cbbhh();
        };
        this.triggerEvents = function() {
            if (cbbji) {
                console.log("triggerEvents");
            }
            cbfff = true;
        };
        this.unhighlightFeature = function(featureId) {
            if (cbbji) {
                console.log("unhighlightFeature " + featureId);
            }
            var cbdbh = cbdgc(featureId);
            if (!cbdbh) ccajc('featureNotFound', {
                "method": 'Maps.unhighlightFeature',
                "featureId": featureId
            });
            else cbdea(cbdbh);
        };
        this.unhighlightFeatures = function() {
            if (cbbji) {
                console.log("unhighlightFeatures");
            }
            cbdej();
            ccbcb(true);
        };
        this.unscaleFeatures = function() {
            if (cbbji) {
                console.log("unscaleFeatures");
            }
            ccdah();
        };
        this.zoomIn = function() {
            if (cbbji) {
                console.log("zoomIn");
            }
            ccdha();
        };
        this.zoomOut = function() {
            if (cbbji) {
                console.log("zoomOut");
            }
            ccdhe();
        };
        this.zoomScaleFactor = function(scaleFactor) {
            if (cbbji) console.log("zoomScaleFactor " + scaleFactor);
            var cbbhc = cbbih(cbgbc);
            var cbbic = cbagj(cbbhc);
            cbdbb = (cbbic - scaleFactor) / cbbic;
            cbfga = false;
            cbdja(ccdga(cbdbb), cbbdj.ccdgd);
            if (ccdbf.cbaad) cccih.cccac();
            cbfia[cbgbc].cbdhg.cccdg = true;
        };
        this.disableCalculatedMouseOver = function() {
            cbahg.cbchf = false;
            if (cbahg && cbahg.cbidb) ccdag(cbahg.cbidb.cbgbc, cbahg.cbidb.type);
        };
        this.enableCalculatedMouseOver = function() {
            cbahg.cbchf = true;
        };
        this.checkGeolocation = function() {
            cbebg();
        };
        this.placeToolbar = function() {
            cccih.cbjje();
        };
        this.retryToDrawMapCanvas = function(cajjf) {
            cbchc(cajjf);
        };
        this.runThemeInitialActions = function() {
            themeInitialActions();
        };
        this.check = function(cbbaf) {
            checkDisplay(cbbaf);
        };
        this.cbdaa = function(cbcjh, cbidf, cbfhi, cajjf) {
            cbcjh = cbcjh.toLowerCase();
            if (cbcjh == 'onclick') {
                if (cbfgd()) return;
                if (ccdbf.cbaee) return;
                if (cbfia[cajjf].ccchc.platformFunctionality.cbahf && (!cbidf || cbfhi == undefined || cajjf == undefined)) {
                    var cbidb = cbdgi(false);
                    if (cbidb) {
                        cbidf = cbidb.type;
                        cbfhi = cbidb.cbfhi;
                        cajjf = cbidb.cbgbc;
                    } else {
                        cbidf == undefined;
                    }
                }
            }
            if (cbcji == undefined || cbfhi != cbcji.cbfhi || cbidf != cbcjj) {
                switch (cbidf) {
                    case 'feature':
                        if (!cbfia[cajjf].cbddc) return;
                        var cbdbh = cbfia[cajjf].cbddc[cbfhi];
                        cbcji = cbdbh;
                        break;
                    case 'marker':
                        if (!cbfia[cajjf].cbhca) return;
                        var cbhae = cbfia[cajjf].cbhca[cbfhi];
                        cbcji = cbhae;
                        break;
                }
            }
            if (!cbcji) return;
            if (cbidf == undefined) return;
            if (cbcjh == 'onclick') {
                cbfic = cbcji;
            }
            if (cbidf == 'feature' && cbcjh == 'onclick' && cbcji.ccdga && ccdbf.cbdfb) {
                if (cajjf < cbgbc) {
                    while (cbgbc > cajjf) cbgbd();
                }
                if (cbidf == 'feature') {
                    cbbce[cajjf] = cbcji;
                }
                cbfia[cajjf].cbdhg.cccdg = true;
                if (ccdbf.cbaad) cccih.cccac();
                cbdcj(cbcji, false);
            }
            var cajif = cbdfj(cbcji.cajif, "event", cbcjh);
            switch (cbcjh) {
                case 'onmouseover':
                    switch (cbidf) {
                        case 'feature':
                            cbdci(cbcji, cajjf);
                            break;
                        case 'marker':
                            cbhbe(cbcji);
                            break;
                    }
                    break;
                case "onmouseout":
                case "onclick":
                case "onrightclick":
                case "ondblclick":
                    ccdag(cajjf, cbidf);
                    break;
            }
            for (cbfaf in cajif) {
                ccbah(cbidf, cbcji, cajif[cbfaf]);
            }
        };
        this.reloadThemeOnInterval = function(cajjf) {
            if (cajjf >= cbfia.length) return;
            if (cbfia[cbgbc].ccchc.ccaic) {
                ccaij(cajjf);
                var cccia = cbfia[cajjf].ccchc.url;
                ccaig();
                cbfee();
                cbgeg(cccia);
                return;
            }
            if (cajjf != cbgbc) return;
            var cbabg = false;
            if (cbfia[cbgbc].ccchc.ccahh) {
                cbfia[cbgbc].cbdhg.cbdca = false;
                cbfia[cbgbc].cbdhg.cbddh = false;
                cbabg = true;
                cbfia[cbgbc].cbdbj = new Array();
                cbgdb();
            }
            if (cbfia[cbgbc].ccchc.ccahi) {
                cbfia[cbgbc].cbdhg.cbddj = false;
                cbfia[cbgbc].cbdhg.cbddh = false;
                cbfia[cbgbc].cbdhg.ccbii = false;
                cbabg = true;
                cbfia[cbgbc].cbddc = new Array();
                cbgdc();
            }
            if (cbfia[cbgbc].ccchc.ccaia) {
                cbfia[cbgbc].cbdhg.cbhag = false;
                cbfia[cbgbc].cbdhg.cbhcg = false;
                cbabg = true;
                cbfia[cbgbc].cbhaf = new Array();
                cbged();
            }
            if (cbfia[cbgbc].ccchc.ccaib) {
                cbfia[cbgbc].cbdhg.cbhdf = false;
                cbfia[cbgbc].cbdhg.cbhcg = false;
                cbfia[cbgbc].cbdhg.cbhde = false;
                cbabg = true;
                cbfia[cbgbc].cbhca = new Array();
                cbgee(cbfia[cbgbc].ccchc.cbheg);
            }
            if (cbabg) {
                cbfha = true;
                ccbgh();
            }
        };
        this.toolbarAction = function(cbagb) {
            if (!cbdhj) return;
            switch (cbagb.toLowerCase()) {
                case 'back':
                    cbgbd();
                    break;
                case 'fullscreen':
                    ccdbf.cbeaa = true;
                    cccff();
                    break;
                case 'zoomin':
                    ccdha();
                    break;
                case 'zoomout':
                    ccdhe();
                    break;
                case 'close':
                    ccdcj.hide();
                    ccajc('mapClosed');
                    document['body']['style']['overflow'] = ccdbf.cbiga;
                    break;
                case 'selectbyrectanglemode':
                    cccfg();
                    break;
                case 'print':
                    ccajc('buttonClicked', {
                        "button": 'aboutToPrint'
                    });
                    window['print']();
                    break;
            }
            ccajc('buttonClicked', {
                "button": cbagb
            });
        };
        this.resumeRunningActions = function() {
            if (ccbbc.shapesDrawingNextKey) ccbcc(true);
            if (ccbbc.cbhdi) ccaej(ccbbc.cbhdj);
            if (ccbbc.cbacg) ccbih();
        };
        this.retryToLoadPositionedImageMosaics = function() {
            ccacg();
        };
        this.retryToRedrawPositionedImages = function(cajjf, cbffj) {
            ccada(cajjf, cbffj);
        };
        this.focusAnimation = function() {
            cbdhj = false;
            cbdie.cccdh++;
            if (cbdie.cccdh <= cbdie.cccdi) {
                var cbdjf = cbffa();
                var cbace = cbagj(cbdjf);
                var ccadb = ccdda.width / 2 - (cbdjf.cbhga.ccdff + (cbdjf.cbheh.ccdff - cbdjf.cbhga.ccdff) / 2) / cbace;
                var ccadc = ccdda.height / 2 - (cbdjf.cbhga.ccdfi + (cbdjf.cbheh.ccdfi - cbdjf.cbhga.ccdfi) / 2) / cbace;
                cbegg = cbfia[0].cbgja * cbace;
                ccbfj(ccadb, ccadc);
                ccbbh(cbgbc);
                ccbcb(false);
            }
            if (cbdie.cccdh >= cbdie.cccdi) {
                ccbfd();
            } else {
                ccbfe();
            }
        };
        this.focusAnimationEnd = function() {
            var cccib = (new Date()).getTime();
            if (cbhid && cbhid.cccib + 300 > cccib) {
                ccbfd();
                return;
            }
            cbdhj = true;
            if (ccaae && ccaae.cbbih) return;
            cccab();
            for (var cajjf = 1; cajjf <= cbgbc; cajjf++) {
                ccbbh(cajjf);
            }
            if (!ccdbf.cbbbj && ccdbf.cbdid) cbabj(ccdbf.cbdid);
            ccdbf.cbdid = undefined;
            ccbcb(true);
            ccaif();
            ccbbc.cbhdi = 0;
            if (cbfia[cbgbc].cbcih.cbbjb && cbfia[cbgbc].cbdhg.ccbbi && cbfia[cbgbc].cbdhg.cbhci) {
                cbgdh.showMessage("Putting markers in place...");
                ccaej(true);
            }
            if (!cbfia[cbgbc].cbfeg) ccbfh();
            if (ccdbf.cbbbj != undefined) {
                cbfia[cbgbc].cbdhg.cccdg = false;
                cbgbc++;
                ccdbf.cbgbf = true;
                cbfee();
                ccbfh();
                cbgeg(ccdbf.cbbbj);
                ccdbf.cbbbj = undefined;
            }
            if (ccdbf.cbdfc) {
                cbbcf(ccdbf.cbdfc);
                ccdbf.cbdfc = undefined;
            }
        };

        function cbgdf(cbgdd, cccci) {
            var cbgea;
            var cbgeb = new Array();
            var cbgde = $('#' + cbgdd);
            if (!cbgdd || cbgde.html() == null) cbgde = undefined;
            var cbfab = "<table border='0' ><tr align='center'><td><img src='" + cccci + "' /></td></tr>" + "<tr align='center'><td align='center'><div id='jqmLoadingTextDiv" + cbfej + "' style='width: 100%; " + "text-align: center; '></div></td></tr></table>";
            if (!cbgde) {
                ccdcj.append('<div id="jqmLoadingInfoDiv' + cbfej + '"  style="display: none; background: #CAE4FF; position: absolute; "/></div>');
                cbgde = $('#jqmLoadingInfoDiv' + cbfej);
                cbgde.append(cbfab);
            } else {
                cbgde.css('position', 'absolute');
                if (cbgde.html().indexOf('##content##') != -1) cbgde.html(cbgde.html().replace('##content##', cbfab));
                else if (cbgde.html().indexOf('%%content%%') != -1) cbgde.html(cbgde.html().replace('%%content%%', cbfab));
                else cbgde.html(cbfab);
            } if (cbgde) {
                cbgde.css('z-index', 400);
                cbgea = $("#jqmLoadingTextDiv" + cbfej);
            }

            function ccbfc() {
                cbgde.show();
                var cbfhe = cbgde.parent();
                var cbcce = ccdcj.offset().left;
                var cbccf = ccdcj.offset().top;
                if (cbfhe.offset()) {
                    cbcce -= cbfhe.offset().left;
                    cbccf -= cbfhe.offset().top;
                }
                var cbhfh = cbefh(cbgde);
                var cbhfb = cbefg(cbgde);
                var ccadb = cbcce + ccdda.width / 2 - cbhfh / 2;
                var ccadc = cbccf + ccdda.height / 2 - cbhfb / 2;
                cbgde.css({
                    left: ccadb,
                    top: ccadc
                });
            };
            this.showMessage = function(cbgdj) {
                cbgeb.push(cbgdj);
                cbbgd();
                if (cbgeb.length > 0) {
                    ccbfc();
                }
            };
            this.hideMessage = function(cbgdj) {
                var cccgi = -1;
                if (!Array.prototype.indexOf) {
                    for (var cbfaf = 0; cbfaf < cbgeb.length; cbfaf++)
                        if (cbgeb[cbfaf] == cbgdj) cccgi = cbfaf;
                } else {
                    cccgi = cbgeb.indexOf(cbgdj);
                } if (cccgi != -1) {
                    cbgeb.splice(cccgi, 1);
                    cbbgd();
                    if (cbgeb.length == 0) {
                        cbgde.hide();
                    } else {
                        ccbfc();
                    }
                }
            };

            function cbbgd() {
                cbgea.html('');
                for (var cbfaf in cbgeb) {
                    cbgea.append(cbgeb[cbfaf] + '<br>');
                }
                if (cbgeb > 0) ccbfc();
            }
        }

        function cbhgf() {
            this.cbhga = new ccaad(999999999999, 999999999999);
            this.cbheh = new ccaad(-999999999999, -999999999999);
            this.cbbbe = function(cbiii) {
                if (cbiii.ccdfg < this.cbhga.ccdff) this.cbhga.ccdff = cbiii.ccdff;
                if (cbiii.ccdff > this.cbheh.ccdff) this.cbheh.ccdff = cbiii.ccdff;
                if (cbiii.ccdfi < this.cbhga.ccdfi) this.cbhga.ccdfi = cbiii.ccdfi;
                if (cbiii.ccdfi > this.cbheh.ccdfi) this.cbheh.ccdfi = cbiii.ccdfi;
            };
            this.cbbbd = function(cbhge) {
                if (cbhge.cbhga.ccdff < this.cbhga.ccdff) this.cbhga.ccdff = cbhge.cbhga.ccdff;
                if (cbhge.cbheh.ccdff > this.cbheh.ccdff) this.cbheh.ccdff = cbhge.cbheh.ccdff;
                if (cbhge.cbhga.ccdfi < this.cbhga.ccdfi) this.cbhga.ccdfi = cbhge.cbhga.ccdfi;
                if (cbhge.cbheh.ccdfi > this.cbheh.ccdfi) this.cbheh.ccdfi = cbhge.cbheh.ccdfi;
            };
        }

        function ccaad(ccdff, ccdfi) {
            this.ccdff = ccdff;
            this.ccdfi = ccdfi;
        }

        function ccacd() {
            this.cbfca;
            this.cajjg;
            this.ccbbg;
            this.cbgeh;
        }

        function cccij(ccdcj, cbgdd, cbbee, cbcef) {
            var cbbed = cbbee;
            var cccja;
            var cbaei;
            var cbcec = 'jqmToolbarDiv' + cbfej;
            var cbfah = new Array();
            var cccii = new Object();
            ccdcj.append('<div id="' + cbcec + '" style="z-index:' + cbcef + '; position: absolute; " />');
            cccja = $('#' + cbcec);
            var ccbeh = " ";
            if (cbbed.cbifi.toLowerCase() == 'vertical') ccbeh = "<br />";
            if (cbbed.cccad) cbfah.push(cajja(cccja, cbbed.cbagd, cbbed.cbagc, "Close", "Close the map", ccbeh));
            if (cbbed.cccbb) {
                cbfah.push(cajja(cccja, cbbed.cbagd, cbbed.cbagc, "zoomIn", "Zoom In", ccbeh));
                cbfah.push(cajja(cccja, cbbed.cbagd, cbbed.cbagc, "zoomOut", "Zoom Out", ccbeh));
            }
            if (cbbed.cccah) cbfah.push(cajja(cccja, cbbed.cbagd, cbbed.cbagc, "initialView", "Go to initial view", ccbeh));
            if (cbbed.cccag) cbfah.push(cajja(cccja, cbbed.cbagd, cbbed.cbagc, "help", "Get Help", ccbeh));
            if (cbbed.cccaf && cbbdj.cbjjh.cbcda.toLowerCase != 'fullscreen' && cbbdj.cbjjh.cbcda.toLowerCase != 'fullscreenonclick') cbfah.push(cajja(cccja, cbbed.cbagd, cbbed.cbagc, "fullScreen", "Full screen on/off", ccbeh));
            if (cbbed.cccba) cbfah.push(cajja(cccja, cbbed.cbagd, cbbed.cbagc, "selectByRectangleMode", "Select by rectangle", ccbeh));
            if (cbbed.cccaj) cbfah.push(cajja(cccja, cbbed.cbagd, cbbed.cbagc, "print", "Print", ccbeh));
            if (cbbed.showBackButton) {
                cbaei = cajja(cccja, cbbed.cbagd, cbbed.cbagc, "back", "Go Back", ccbeh);
                cbfah.push(cbaei);
            }
            cbjje();
            if (cbaei) cbaei.hide();

            function cajja(cccja, cbagd, cbagc, cbagb, cbage, ccbeh, cbdag) {
                if (!cbdag) cbdag = '';
                var cccdc = cbagd + cbagb + "." + cbagc;
                var cccdd = cbagd + cbagb + "Over." + cbagc;
                if (cccja.html() != '') cccja.append(ccbeh);
                var cbfce = "jqmToolbar_" + cbagb + cbfej + "Button";
                var cbaga = "<a href='javascript:jqmInstances[" + cbfej + "].obj.toolbarAction(\"" + cbagb + "\");' >" + "<img id='" + cbfce + "' title='" + cbage + "' src='" + cccdc + "'";
                if (cbjjg.cbehf) cbaga += " onmouseover='this.src=\"" + cccdd + "\";jqmInstances[" + cbfej + "].obj.disableCalculatedMouseOver();'" + " onmouseout='this.src=\"" + cccdc + "\";jqmInstances[" + cbfej + "].obj.enableCalculatedMouseOver();'";
                cbaga += cbdag + " border='0' /></a>";
                cccja.append(cbaga);
                return $("#" + cbfce);
            }

            function cbjje() {
                for (var cbfaf in cbfah) {
                    var cbfag = cbfah[cbfaf];
                    if (cbfag.width() == 0) {
                        var cccic = setTimeout("jqmInstances[" + cbfej + "].obj.placeToolbar()", 100);
                        break;
                    }
                }
                var ccadb, ccadc;
                switch (cbbed.cbaaa.toLowerCase()) {
                    case "top":
                    case "top-left":
                    case "top-right":
                        ccadc = cbbed.ccdbj;
                        break;
                    case "bottom":
                    case "bottom-left":
                    case "bottom-right":
                        ccadc = ccdda.height - cccja.height() - cbbed.ccdbj;
                        break;
                    case "center":
                    case "left":
                    case "right":
                        ccadc = ccdda.height / 2 - cccja.height() / 2 - cbbed.ccdbj;
                        break;
                }
                switch (cbbed.cbaaa.toLowerCase()) {
                    case "left":
                    case "top-left":
                    case "bottom-left":
                        ccadb = cbbed.cbejh;
                        break;
                    case "right":
                    case "top-right":
                    case "bottom-right":
                        ccadb = ccdda.width - cccja.width() - cbbed.cbejh;
                        break;
                    case "top":
                    case "bottom":
                    case "center":
                        ccadb = ccdda.width / 2 - cccja.width() / 2 - cbbed.cbejh;
                        break;
                }
                cccja.css({
                    top: ccadc + 'px',
                    left: ccadb + 'px'
                });
                cccii.top = cccja.position().top;
                cccii.left = cccja.position().left;
                cccii.width = cccja.width();
                cccii.height = cccja.height();
            }
            this.cccac = function() {
                if (cbaei) cbaei.show();
            };
            this.cbeia = function() {
                if (cbaei) cbaei.hide();
            };
            this.cbjje = function() {
                cbjje();
            };
            this.cbbad = function(cbaah) {
                var cbfce = "jqmToolbar_" + cbaah + 'Mode' + cbfej + "Button";
                for (var cbfaf in cbfah) {
                    var cbfag = cbfah[cbfaf];
                    if (cbfag.attr('id') == cbfce) {
                        cbfag.attr('src', cbfag.attr('src').replace('Mode.', 'ModeOn.'));
                        cbfag.attr('onmouseout', cbfag.attr('onmouseout').replace('Mode.', 'ModeOn.'));
                    } else {
                        cbfag.attr('src', cbfag.attr('src').replace('ModeOn.', 'Mode.'));
                        cbfag.attr('onmouseout', cbfag.attr('onmouseout').replace('ModeOn.', 'Mode.'));
                    }
                }
            };
            this.cbbac = function(ccbgb) {
                var cbfce = "jqmToolbar_fullScreen" + cbfej + "Button";
                for (var cbfaf in cbfah) {
                    var cbfag = cbfah[cbfaf];
                    if (cbfag.attr('id') == cbfce) {
                        if (ccbgb) {
                            cbfag.attr('src', cbfag.attr('src').replace('fullScreen.', 'fullScreenOn.'));
                            cbfag.attr('onmouseout', cbfag.attr('onmouseout').replace('fullScreen.', 'fullScreenOn.'));
                        } else {
                            cbfag.attr('src', cbfag.attr('src').replace('fullScreenOn.', 'fullScreen.'));
                            cbfag.attr('onmouseout', cbfag.attr('onmouseout').replace('fullScreenOn.', 'fullScreen.'));
                        }
                    }
                }
            };
            this.cbbbc = function(ccaac) {
                if (ccaac.ccdff > cccii.left && ccaac.ccdff < cccii.left + cccii.width && ccaac.ccdfi > cccii.top && ccaac.ccdfi < cccii.top + cccii.height) return true;
                else return false;
            };
        }

        function cbgci() {
            var cbfjf;
            var cbfig;
            var ccdbd = new Array();
            var ccdfb = new Array();
            this.cbege = function(ccdaj) {
                if (ccdaj == cbfjf) {
                    if (cbfig == -1) return undefined;
                    else return ccdfb[cbfig];
                }
                cbfjf = ccdaj;
                for (var cbfaf in ccdbd) {
                    if (ccdbd[cbfaf] == ccdaj) {
                        cbfig = cbfaf;
                        return ccdfb[cbfig];
                    }
                }
                cbfig = -1;
                return undefined;
            };
            this.ccbhc = function(ccdaj, ccdej, cbehj) {
                ccdbd.push(ccdaj);
                ccdfb.push({
                    width: Number(ccdej),
                    height: Number(cbehj)
                });
                cbfjf = undefined;
            };
        }

        function cbcii(cajjf) {
            var cbhig = new Array();
            var cbgja, cbgjd, cbebc, ccadh, ccadi;
            var engineLevel = cajjf;
            this.cbbjb = false;
            cbcii.cbcbj = Math.PI / 180;
            cbcii.cbhfj = 0.0004;
            this.cajjb = function(cbacb) {
                cbhig.push(cbacb);
            };
            this.ccbgd = function(ccadj) {
                ccadi = ccadj;
            };
            this.ccbfa = function(cbgjb, cbgje, cbebd) {
                cbgja = cbgjb;
                cbgjd = cbgje;
                cbebc = cbebd;
                if (!cbgja) {
                    cbcje.ccdac(11210);
                    return;
                }
                if (!cbgjd) {
                    cbcje.ccdac(11220);
                    return;
                }
                if (!cbebc) {
                    cbcje.ccdac(11030);
                    return;
                }
                ccadh = cbcii.cbeba(cbebc, true);
            };
            this.cbeaj = function(cbeag, cbbhd, cbaed) {
                return cbeaj(cbeag, cbbhd, cbaed);
            };
            this.cbebb = function(cbeag, cbbhd, cbaed) {
                return cbjig(cbeaj(cbeag, cbbhd, cbaed));
            };
            this.cbeai = function(cbeag, cbaed) {
                return cbeai(cbeag, cbaed);
            };
            this.cbedg = function(cbhhh, ccafd) {
                var cbeag = cbhhj(cbhhh);
                var cbijb = {
                    cbfjh: cbeag.cbfjh + 0.001,
                    cbggb: cbeag.cbggb
                };
                var cbcdh = cbcii.cbeei(cbeag, cbijb);
                var cbccb = ccafd * 0.001 / cbcdh;
                cbijb = {
                    cbfjh: cbeag.cbfjh,
                    cbggb: cbeag.cbggb + 0.001
                };
                var cbcdi = cbcii.cbeei(cbeag, cbijb);
                var cbccc = ccafd * 0.001 / cbcdi;
                cbijb = {
                    cbfjh: cbeag.cbfjh + cbccb,
                    cbggb: cbeag.cbggb - cbccc
                };
                var cbjid = cbeai(cbijb, true);
                cbijb = {
                    cbfjh: cbeag.cbfjh - cbccb,
                    cbggb: cbeag.cbggb + cbccc
                };
                var cbjie = cbeai(cbijb, true);
                var ccccf = {
                    ccdff: cbjie.ccdff - cbjid.ccdff,
                    ccdfi: cbjie.ccdfi - cbjid.ccdfi
                };
                return ccccf;
            };
            this.cbjif = function(cbjic, cbbhd) {
                return cbjif(cbjic, cbbhd);
            };
            this.cbhhj = function(cbhhh) {
                return cbhhj(cbhhh);
            };
            this.ccdch = function(ccddd, cbbhd) {
                return ccdch(ccddd, cbbhd);
            };
            this.ccdci = function(ccddd) {
                return ccdci(ccddd);
            };
            this.ccdcg = function(ccddd, cbbhd) {
                return cbjif(ccdci(ccddd), cbbhd);
            };
            this.cbeda = function(cbecj, ccahf) {
                return cbeda(cbecj, ccahf);
            };
            this.cbhia = function(cbhhh, cbbhd) {
                var cbjja = new Object();
                cbjja.ccdff = cbhhh.ccdff / cbbhd * cbgja;
                cbjja.ccdfi = cbhhh.ccdfi / cbbhd * cbgja;
                return cbjja;
            };
            cbcii.cbeei = function(cbijb, cbijd) {
                switch (ccadi) {
                    case "mercator":
                        var cbggb = cbijd.cbggb - cbijb.cbggb;
                        var cajhi = (90.0 - cbijb.cbfjh) * cbcii.cbcbj;
                        var cbagf = (90.0 - cbijd.cbfjh) * cbcii.cbcbj;
                        var cbbfh = (Math.cos(cajhi) * Math.cos(cbagf)) + (Math.sin(cajhi) * Math.sin(cbagf) * Math.cos(cbggb * cbcii.cbcbj));
                        var ccafd = Number('3963.205');
                        if (cbbfh < -1.0) {
                            return Math.PI * ccafd;
                        } else if (cbbfh >= 1.0) {
                            return 0;
                        } else {
                            return Math.acos(cbbfh) * ccafd;
                        }
                        break;
                    case "none":
                        return cbeef({
                            ccdff: cbijb.cbggb,
                            ccdfi: cbijb.cbfjh
                        }, {
                            ccdff: cbijd.cbggb,
                            ccdfi: cbijd.cbfjh
                        });
                        break;
                }
            };
            cbcii.cbega = function(cbijb, cbijd) {
                var cbgfa = cbcii.cbeba(cbijb);
                var cbgfb = cbcii.cbeba(cbijd);
                var cccfi = (cbgfb.ccdff - cbgfa.ccdff) / (cbgfb.ccdfi - cbgfa.ccdfi);
                var cbaai = Math.atan(cccfi) / Math.PI * 180;
                if (cbgfb.ccdfi < cbgfa.ccdfi) {
                    cbaai += 180;
                }
                if (cbaai < 0) {
                    cbaai += 360;
                }
                return cbaai;
            };
            cbcii.cbeff = function(cbijb, cbijd) {
                var cbehi = cbcii.cbega(cbijb, cbijd);
                var cbcab = cbcii.cbefe(cbijb);
                var cbihd = cbehi - cbcab;
                if (cbihd > 360) {
                    cbihd -= 360;
                } else {
                    if (cbihd < 0) {
                        cbihd += 360;
                    }
                }
                return cbihd;
            };
            cbcii.ccbfi = function(cbccg) {
                cbcii.cbggh = cbccg;
            };
            cbcii.cbefe = function(cbijb) {
                var ccbae = Math.floor((cbijb.cbfjh - (cbcii.cbggh.cbhga.cbfjh - cbcii.cbggh.cccdh / 2)) / cbcii.cbggh.cccdh);
                var cbbdd = Math.floor((cbijb.cbggb - (cbcii.cbggh.cbhga.cbggb - cbcii.cbggh.cccdh / 2)) / cbcii.cbggh.cccdh);
                var ccbag = cbcii.cbggh.ccbaf[ccbae];
                var cbcac = Number(ccbag[cbbdd]) / 100;
                return cbcac;
            };
            cbcii.cbedd = function(cbiij, cbijb, height, cbafa) {
                var cbjjd = new Object();
                cbjjd.ccdff = cbiij.ccdff + (cbijb.ccdff - cbiij.ccdff) * cbafa;
                cbjjd.ccdfi = cbiij.ccdfi + (cbijb.ccdfi - cbiij.ccdfi) * cbafa;
                var cbbga = new Object();
                var cccbe = 1;
                if (cbijb.ccdff < cbiij.ccdff) cccbe = -1;
                cbbga.ccdff = cbjjd.ccdff + (cbijb.ccdfi - cbiij.ccdfi) * height * cccbe;
                cbbga.ccdfi = cbjjd.ccdfi - (cbijb.ccdff - cbiij.ccdff) * height * cccbe;
                return cbbga;
            };
            cbcii.cbiaf = function(cbaaj) {
                var cbaai = cbaaj;
                while (cbaai <= -90) cbaai += 180;
                if (cbaai > 90) cbaai -= 180;
                return cbaai;
            };

            function cbjif(cbjic, cbbhd) {
                cbjic.ccdff /= cbgja / cbbhd;
                cbjic.ccdfi /= cbgja / cbbhd;
                return cbhhj(cbjic);
            }

            function cbhhj(cbjic) {
                var ccadf = new Object();
                ccadf.ccdff = ccadh.ccdff + (cbjic.ccdff - cbgjd.ccdff / 2) * cbgja * cbcii.cbhfj;
                ccadf.ccdfi = ccadh.ccdfi - (cbjic.ccdfi - cbgjd.ccdfi / 2) * cbgja * cbcii.cbhfj;
                var cbeag = cbcii.ccadg(ccadf);
                return cbeag;
            }

            function cbeaj(cbeag, cbbhd, cbaed) {
                var cbjic = cbeai(cbeag, cbaed);
                cbjic.ccdff *= cbgja / cbbhd;
                cbjic.ccdfi *= cbgja / cbbhd;
                return cbjic;
            }

            function cbeai(cbeag, cbaed) {
                var ccadf = cbcii.cbeba(cbeag, cbaed);
                var cbjic = new Object();
                cbjic.ccdff = cbgjd.ccdff / 2 + (ccadf.ccdff - ccadh.ccdff) / cbgja / cbcii.cbhfj;
                cbjic.ccdfi = cbgjd.ccdfi / 2 - (ccadf.ccdfi - ccadh.ccdfi) / cbgja / cbcii.cbhfj;
                return cbjic;
            }

            function ccdci(ccddd) {
                var cbjja = new Object();
                cbjja.ccdff = -cbgjc.position().left - cbfia[engineLevel].cbgii.position().left + ccddd.ccdff;
                cbjja.ccdfi = -cbgjc.position().top - cbfia[engineLevel].cbgii.position().top + ccddd.ccdfi;
                return cbjja;
            }

            function ccdch(ccddd, cbbhd) {
                var cbjja = ccdci(ccddd);
                cbjja.ccdff *= cbbhd / cbgja;
                cbjja.ccdfi *= cbbhd / cbgja;
                return cbjja;
            }

            function cbjig(cbjic) {
                var ccddd = new Object();
                ccddd.ccdff = cbjic.ccdff + cbgjc.position().left + cbfia[engineLevel].cbgii.position().left;
                ccddd.ccdfi = cbjic.ccdfi + cbgjc.position().top + cbfia[engineLevel].cbgii.position().top;
                return ccddd;
            }
            cbcii.cbeba = function(cbggc, cbaed) {
                switch (ccadi) {
                    case "mercator":
                        var cbcei = cbffg(cbggc.cbfjh);
                        var cbjhd = new Object({
                            ccdff: cbggc.cbggb * 40044944 / 360,
                            ccdfi: cbcei * 40044944
                        });
                        if (!cbaed && cbhig.length > 0) {
                            cbjhd = cbabi(cbggc, cbjhd);
                        }
                        return new Object({
                            ccdff: cbjhd.ccdff,
                            ccdfi: cbjhd.ccdfi
                        });
                        break;
                    case "none":
                        return {
                            ccdff: cbggc.cbggb,
                            ccdfi: cbggc.ccdfi
                        };
                        break;
                }
            };
            cbcii.ccadg = function(cbhfi) {
                switch (ccadi) {
                    case "mercator":
                        var cbcej = cbhfi.ccdfi / 40044944;
                        cbcej = 0.5 - cbcej;
                        var cbceg = cbehc(cbcej);
                        return new Object({
                            cbfjh: cbceg,
                            cbggb: cbhfi.ccdff / 40044944 * 360
                        });
                        break;
                    case "none":
                        return {
                            cbggb: cbhfi.ccdff,
                            cbfjh: cbhfi.ccdfi
                        };
                        break;
                }
            };

            function cbehc(cbchd) {
                var cbcfj = 2 * Math.atan(Math.exp(Math.PI * (1 - 2 * cbchd))) - Math.PI / 2;
                var cbbjg = cbcfj * 180 / Math.PI;
                if (cbbjg < -85) {
                    cbbjg = -85;
                }
                if (cbbjg > 85) {
                    cbbjg = 85;
                }
                return cbbjg;
            }

            function cbffg(cbceh) {
                var cbcfi = cbceh * Math.PI / 180;
                var cbcfj = 0.5 * Math.log((1 + Math.sin(cbcfi)) / (1 - Math.sin(cbcfi)));
                return -((1 - cbcfj / Math.PI) / 2 - 0.5);
            }

            function cbabi(cbjhc, cbjhe) {
                var cbjhd = new Object({
                    ccdff: cbjhe.ccdff,
                    ccdfi: cbjhe.ccdfi
                });
                for (var cbfaf = 0; cbfaf < cbhig.length; cbfaf++) {
                    if (!cbhig[cbfaf].cbajg) {
                        var cbajf = new Object();
                        cbajf.cbggb = (cbhig[cbfaf].cbigj.cbhga.cbggb + cbhig[cbfaf].cbigj.cbheh.cbggb) / 2;
                        cbajf.cbfjh = (cbhig[cbfaf].cbigj.cbhga.cbfjh + cbhig[cbfaf].cbigj.cbheh.cbfjh) / 2;
                        cbhig[cbfaf].cbajg = cbcii.cbeba(cbajf, true);
                        cbhig[cbfaf].cccge = cbcii.cbeba(cbhig[cbfaf].cccga, true);
                    }
                    if (cbjhc.cbggb >= cbhig[cbfaf].cbigj.cbhga.cbggb && cbjhc.cbggb <= cbhig[cbfaf].cbigj.cbheh.cbggb && cbjhc.cbfjh >= cbhig[cbfaf].cbigj.cbhga.cbfjh && cbjhc.cbfjh <= cbhig[cbfaf].cbigj.cbheh.cbfjh) {
                        cbjhd.ccdff = cbhig[cbfaf].cccge.ccdff + (cbjhe.ccdff - cbhig[cbfaf].cbajg.ccdff) * cbhig[cbfaf].ccbbg;
                        cbjhd.ccdfi = cbhig[cbfaf].cccge.ccdfi + (cbjhe.ccdfi - cbhig[cbfaf].cbajg.ccdfi) * cbhig[cbfaf].ccbbg;
                    }
                }
                return cbjhd;
            }

            function cbeda(cbecj, ccahf) {
                var ccaec = cbcii.cbeba(cbecj);
                var ccaef = new Array();
                for (var cbfaf in ccahf) {
                    ccaef.push(cbcii.cbeba(ccahf[cbfaf]));
                }
                var cbiii = {
                    ccdff: ccaec.ccdff + (ccaef[2].ccdff - ccaef[0].ccdff),
                    ccdfi: ccaec.ccdfi + (ccaef[2].ccdfi - ccaef[0].ccdfi)
                };
                var cbijb = cbffb(ccaef[0], ccaef[1], cbiii, ccaec);
                var cbdaj = (cbijb.ccdff - ccaef[0].ccdff) / (ccaef[1].ccdff - ccaef[0].ccdff);
                if (Math.abs(ccaef[1].ccdfi - ccaef[0].ccdfi) > Math.abs(ccaef[1].ccdff - ccaef[0].ccdff)) cbdaj = (cbijb.ccdfi - ccaef[0].ccdfi) / (ccaef[1].ccdfi - ccaef[0].ccdfi);
                cbiii = {
                    ccdff: ccaec.ccdff + (ccaef[1].ccdff - ccaef[0].ccdff),
                    ccdfi: ccaec.ccdfi + (ccaef[1].ccdfi - ccaef[0].ccdfi)
                };
                var cbijd = cbffb(ccaef[0], ccaef[2], cbiii, ccaec);
                var cbdba = (cbijd.ccdff - ccaef[0].ccdff) / (ccaef[2].ccdff - ccaef[0].ccdff);
                if (Math.abs(ccaef[2].ccdfi - ccaef[0].ccdfi) > Math.abs(ccaef[2].ccdff - ccaef[0].ccdff)) cbdba = (cbijd.ccdfi - ccaef[0].ccdfi) / (ccaef[2].ccdfi - ccaef[0].ccdfi);
                var ccdff = ccahf[0].ccdff + (ccahf[1].ccdff - ccahf[0].ccdff) * cbdaj + (ccahf[2].ccdff - ccahf[0].ccdff) * cbdba;
                var ccdfi = ccahf[0].ccdfi + (ccahf[1].ccdfi - ccahf[0].ccdfi) * cbdaj + (ccahf[2].ccdfi - ccahf[0].ccdfi) * cbdba;
                return {
                    ccdff: ccdff,
                    ccdfi: ccdfi
                };
            }
        }

        function cbcjf() {
            var cbhij = new Array();
            cbhij.push({
                cbcja: 11010,
                cbcjg: 'The shapes feed needs to provide the map scale.'
            });
            cbhij.push({
                cbcja: 11020,
                cbcjg: 'The shapes feed needs to provide the map size.'
            });
            cbhij.push({
                cbcja: 11030,
                cbcjg: 'The shapes feed needs to provide the geographic center.'
            });
            cbhij.push({
                cbcja: 11210,
                cbcjg: 'The feature category "##0##" could not be found.'
            });
            cbhij.push({
                cbcja: 11213,
                cbcjg: 'The feature category "##0##" could not be found.'
            });
            cbhij.push({
                cbcja: 11216,
                cbcjg: 'The feature category "##0##" could not be found.'
            });
            cbhij.push({
                cbcja: 11220,
                cbcjg: 'The shape "##0##" has no style set.'
            });
            cbhij.push({
                cbcja: 11230,
                cbcjg: 'Error while loading "##0##". On iOS, please note that images cannot be larger than 2000px wide or tall.'
            });
            cbhij.push({
                cbcja: 11240,
                cbcjg: 'No coords or geoCoords were set in a injected shape.'
            });
            cbhij.push({
                cbcja: 11250,
                cbcjg: 'The text style "##0##" could not be found in the general configuration.'
            });
            cbhij.push({
                cbcja: 11260,
                cbcjg: 'A part of the shape "##0##" has no type.'
            });
            cbhij.push({
                cbcja: 11270,
                cbcjg: 'The sign style "##0##" could not be found in the general configuration.'
            });
            cbhij.push({
                cbcja: 11280,
                cbcjg: 'The marker category "##0##" could not be found.'
            });
            cbhij.push({
                cbcja: 12010,
                cbcjg: 'Invalid number of reference points (##0##).'
            });
            cbhij.push({
                cbcja: 12020,
                cbcjg: 'Inserted shape has no coordinates.'
            });
            cbhij.push({
                cbcja: 12030,
                cbcjg: 'The feature "##0##" could not be found at this.changeFeatureCategoryById.'
            });
            cbhij.push({
                cbcja: 12040,
                cbcjg: 'The action target "##0##" is not supported.'
            });
            cbhij.push({
                cbcja: 12050,
                cbcjg: 'The DIV "##0##" specified for an info window does not exist.'
            });
            cbhij.push({
                cbcja: 12060,
                cbcjg: 'The callback function "##0##" specified in the general configuration does not exist.'
            });
            cbhij.push({
                cbcja: 12080,
                cbcjg: 'No text style defined for text "##0##" on category ##1##.'
            });
            cbhij.push({
                cbcja: 13000,
                cbcjg: 'The authorization file "##0##" could not be found.'
            });
            cbhij.push({
                cbcja: 13010,
                cbcjg: 'The authorization file was not specified.'
            });
            cbhij.push({
                cbcja: 13020,
                cbcjg: 'The server "##0##" seems not to be authorized.  Please contact the jQueryMaps team at jquerymaps.com.'
            });
            cbhij.push({
                cbcja: 13030,
                cbcjg: 'The date "##0##" seems not to be authorized.  Please contact the jQueryMaps team at jquerymaps.com.'
            });
            cbhij.push({
                cbcja: 13040,
                cbcjg: 'The theme with ID "##0##" seems not to be authorized.  Please contact the jQueryMaps team at jquerymaps.com.'
            });
            cbhij.push({
                cbcja: 13060,
                cbcjg: 'You cannot create circles before the geospatial engine is ready.'
            });
            cbhij.push({
                cbcja: 13080,
                cbcjg: 'The shapes XML feed does not have theme ID.'
            });
            cbhij.push({
                cbcja: 13100,
                cbcjg: 'The geolocation icon image does not exist.'
            });
            this.ccdac = function(cbcjd, cbijj, cbjaa, cbjab) {
                var cbhii = cbdgh(cbcjd);
                if (cbhii) {
                    var cccfc = cbhii.cbcjg.replace('##0##', cbijj).replace('##1##', cbjaa).replace('##2##', cbjab);
                    cbihi('Error ' + cbhii.cbcja + '. ' + cccfc);
                } else cbihi('Error ' + cbcjd + '. No description available.');
            };

            function cbdgh(cbcjd) {
                for (var cbfaf = 0; cbfaf < cbhij.length; cbfaf++) {
                    var cbhii = cbhij[cbfaf];
                    if (cbcjd == cbhii.cbcja) return cbhii;
                }
                return undefined;
            }

            function cbihi(cbhja) {
                alert(cbhja);
            }
        }

        function cbade() {
            var cbaea = new Object();
            this.cbjbb = function(cbadi) {
                cbaea.cbbjh = false;
                cbaea.cbadi = cbadi;
                cbaea.ccabe = 0;
                cbaea.cbiag = ccagg(2, 6);
                if (cbaea.cbbjh) console.log("av.noSense01 " + cbaea.cbiag);
                cbaea.cbfhj = ccage(8);
                if (cbaea.cbbjh) console.log("av.keys " + cbaea.cbfhj);
                cbaea.cbiah = ccagg(2, cbaea.cbfhj[1]);
                if (cbaea.cbbjh) console.log("av.keys " + cbaea.cbfhj);
                cbaea.cbcib = ccagf();
                if (cbaea.cbbjh) console.log("av.noSense02 " + cbaea.cbiah);
                cbaea.cbiai = ccagg(2, cbaea.cbfhj[7]);
                if (cbaea.cbbjh) console.log("av.noSense03 " + cbaea.cbiai);
                cbaea.cbgcb = ccagh(32);
                if (cbaea.cbbjh) console.log("av.license " + cbaea.cbgcb);
                cbaea.cbiaj = ccagg(2, cbaea.cbfhj[4]);
                if (cbaea.cbbjh) console.log("av.noSense04 " + cbaea.cbiaj);
                cbaea.cbica = cbcbb(4, cbaea.cbfhj[5]);
                if (cbaea.cbbjh) console.log("av.numberOfDomains " + cbaea.cbica);
                cbaea.cbiba = ccagg(2, cbaea.cbfhj[3]);
                if (cbaea.cbbjh) console.log("av.noSense05 " + cbaea.cbiba);
                cbaea.cbcfd = new Array();
                cbaea.cbibg = new Array();
                for (var cbfaf = 0; cbfaf < cbaea.cbica; cbfaf++) {
                    cbaea.cbcfd[cbfaf] = ccagh(32);
                    if (cbaea.cbbjh) console.log("av.domainCodes[i] " + cbfaf + " " + cbaea.cbcfd[cbfaf]);
                    cbaea.cbibg[cbfaf] = ccagg(1, cbaea.cbfhj[2]);
                    if (cbaea.cbbjh) console.log("av.noSenses06[i] " + cbfaf + " " + cbaea.cbibg[cbfaf]);
                }
                cbaea.cbibb = ccagg(2, cbaea.cbfhj[1]);
                if (cbaea.cbbjh) console.log("av.keys " + cbaea.cbfhj);
                var cccie = ccagh(1);
                cbaea.cbbjf = (cccie == "7");
                if (cbaea.cbbjh) console.log("tmp (dateControl) " + cccie);
                if (cbaea.cbbjf) {
                    cbaea.cccde = cbcbb(8, cbaea.cbfhj[2]);
                    cbaea.cbcie = cbcbb(8, cbaea.cbfhj[7]);
                }
                cbaea.cbibc = ccagg(2, cbaea.cbfhj[3]);
                cbaea.cbbjj = true;
                cbaea.cbicb = cbcbb(4, cbaea.cbfhj[2]);
                cbaea.cbbjj = false;
                if (cbaea.cbbjh) console.log("av.numberOfThemes " + cbaea.cbicb);
                cbaea.cbibd = ccagg(2, cbaea.cbfhj[6]);
                cbaea.ccche = new Array();
                cbaea.cbibh = new Array();
                for (var cbfaf = 0; cbfaf < cbaea.cbicb; cbfaf++) {
                    cbaea.ccche[cbfaf] = ccagh(32);
                    cbaea.cbibh[cbfaf] = ccagg(1, cbaea.cbfhj[7]);
                }
                cbaea.cbibe = ccagg(2, cbaea.cbfhj[3]);
                var cccie = ccagh(1);
                cbaea.cbffi = (cccie == "7");
                cbaea.cbibf = ccagg(2, cbaea.cbfhj[5]);
            };
            this.cbffi = function() {
                return cbaea.cbffi;
            };
            this.cbbai = function() {
                var cbdji = window.location.hostname;
                var cccig = cbdji.split(".");
                var cbcfe = new Array();
                for (var cbfaf = 0; cbfaf < cccig.length; cbfaf++) {
                    cbcfe[cbfaf] = "";
                    for (var cbfhg = cbfaf; cbfhg < cccig.length; cbfhg++) {
                        if (cbfhg != cbfaf) cbcfe[cbfaf] += ".";
                        cbcfe[cbfaf] += cccig[cbfhg];
                    }
                }
                for (var cbfaf = 0; cbfaf < cbcfe.length; cbfaf++) {
                    if (cbbaj(cbcfe[cbfaf])) return true;
                }
                return false;
            };

            function cbbaj(cbcfb) {
                var cbcfc = cbedh(cbcfb, 16, cbaea.cbfhj[7]);
                for (var cbfaf = 0; cbfaf < cbaea.cbcfd.length; cbfaf++) {
                    if (cbaea.cbcfd[cbfaf] == cbcfc) return true;
                }
                return false;
            }
            this.cbbbg = function(ccchf) {
                if (ccchf == "") {
                    cbcje.ccdac(13080);
                    return false;
                }
                var ccchd = cbedh(ccchf, 16, cbaea.cbfhj[5]);
                for (var cbfaf = 0; cbfaf < cbaea.ccche.length; cbfaf++) {
                    if (cbaea.ccche[cbfaf] == ccchd) return true;
                }
                return false;
            };
            this.cbbah = function() {
                if (!cbaea.cbbjf) return true;
                var cbbjd = new Date();
                var cbbje = cbbjd.getFullYear() + cbbjd.getMonth() + cbbjd.getDate();
                return (cbbje >= cbaea.cccde && cbbje <= cbaea.cbcie);
            };
            this.cbefd = function() {
                return "iVBORw0KGgoAAAANSUhEUgAAAEwAAAARCAMAAABAWbowAAAACXBIWXMAAArrAAAK6wGCiw1aAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAH" + "janVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXX" + "Pues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCI" + "AUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3" + "AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAK" + "CRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk" + "5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v" + "9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzA" + "BhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4Ic" + "FIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+" + "Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+c" + "QYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+Io" + "UspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4" + "hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61Mb" + "U2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0Tg" + "nnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79u" + "p+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJg" + "YmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lO" + "k06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKc" + "RpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+B" + "Z7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e" + "1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5q" + "PNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi" + "/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQ" + "rAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5" + "eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aX" + "Dm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P6" + "6Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKa" + "RptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7" + "hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfV" + "P1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6x" + "mv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADq" + "YAAAOpgAABdvkl/FRgAAAwBQTFRF3T8k30ow4VQ8419J5WpV53Zj6YJw645+7ZuN8Kib8rWr9MO699HL+uDc/O/t////6urq1tbWwsLCr6+voqKinZ" + "2dlZWVi4uLenp6aWlpWVlZSUlJOTk5KysrHBwcDg4OAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + "AAAAAAAAAAAAAAAAAAAAAAAAAAD9V1RQAAACJ0Uk5T////////////////////////////////////////////AA3Qw3EAAAGXSURBVHjarJTdcuMg" + "DIU/QGCInc00b9D3f7fONI5jjPnZCzvTdnaT3kQ3CCEOR2ck1DsfvMbO6Jdh8YE67e7BKWqan2Xf1sEAcTnY/ycIoI+f+ljGgncyPgErXTZAsu1Bgg" + "bqJ8NyLRAvhGfUzAoUUY/OBdD9XOK2vf5Zuwmkm3QvlFv2VpVKi+DVaGiKbCqkpSJCtqlgDjrfGgQnANh1x27VbI46phHfj8ilfNGVbFkPC3npHDF6" + "onfEaViCvTP7YXVbfJohZl/X8r2OZBsakrfgG3gHvmXJ38CKTTuhdhfXe4Bcf4gtM0mAZgBM266b2uW5iN/BUvCbaMOkFaAbcesSv72xxcDk0gGqaK" + "BBAyiCCOsc9C58GDT4YapFPCak6ALcxVo6QdwmWjFAFxMsEW4JYt7Lu2tWLv0JYEjx2gdiZuzfIG1dUOOgyAB2dACmW2bEg0sz0qslgg6oE+h+BDAF" + "70x8NASHnP6JTffKvvos1J0mMT5s2ODmX6dTCL5cf0kyR0UZ269g6v1lvwZnzflVUGf+DgCuQa6oq2sVfAAAAABJRU5ErkJggg==";
            };

            function ccagg(cbehh, cbcia) {
                var cbgbb = cbcbb(cbehh, cbcia);
                return ccagh(cbgbb);
            }

            function ccage(cbgbb) {
                var cbihd = new Array();
                for (var cbfaf = 0; cbfaf < cbgbb; cbfaf++) cbihd[cbfaf] = ccagh(1);
                return cbihd;
            }

            function ccagf() {
                return ccage(20);
            }

            function cbcbb(cbgbb, cbcba) {
                var cbchi = ccagh(cbgbb * 2);
                var cbcaj = cbcbc(cbchi, cbcba);
                if (cbaea.cbbjh && cbaea.cbbjj) console.log('encrypted: ' + cbchi + '  decryptKey: ' + cbcba + '  decrypted: ' + cbcaj);
                return Number(cbcaj);
            }

            function ccagh(cbgbb) {
                var cbihd = cbaea.cbadi.substr(cbaea.ccabe, cbgbb);
                cbaea.ccabe += cbgbb;
                return cbihd;
            }

            function cbcbc(cbchi, cbcba) {
                var cbfec = cbchi.length;
                var cbihd = "";
                for (var cbfaf = 0; cbfaf < cbfec; cbfaf += 2) {
                    var cbbae = Number(cbchi.substr(cbfaf, 2));
                    cbbae = (cbbae / cbcba).toString();
                    cbihd += cbbae;
                }
                return cbihd;
            }

            function cbedh(cccea, cbihh, cbchj) {
                var cbbci = cbedi(cccea, cbihh, cbchj);
                var cbbcj = cbcic(cbbci, cbchj);
                var cbbda = cbcid(cbbcj, cbaea.cbcib);
                return cbbda;
            }

            function cbedi(cccea, cbihh) {
                if (!cccea) return undefined;
                var cbihd = "";
                for (cbfaf = 0; cbfaf < cbihh; ++cbfaf) {
                    var cbfhg = cbfaf % cccea.length;
                    var cbied = cccea.charCodeAt(cbfhg);
                    var cbibj = cbied * (cbfaf + 1);
                    var cbbae = cbibj % 10;
                    cbihd += cbbae;
                }
                return cbihd;
            }

            function cbcic(cbicc, cbchj) {
                var cbfec = cbicc.length;
                var cbihd = "";
                for (var cbfaf = 0; cbfaf < cbfec; ++cbfaf) {
                    var cbbae = Number(cbicc.substr(cbfaf, 1));
                    var cbhjb = Number(cbchj);
                    cbbae = (cbbae * cbhjb).toString();
                    if (cbbae.length < 2) cbbae = "0" + cbbae;
                    cbihd += cbbae;
                }
                return cbihd;
            }

            function cbcid(cbicc, cbcib) {
                var cbihd = "";
                for (cbfaf = 0; cbfaf < cbicc.length; ++cbfaf) {
                    var cbbae = Number(cbicc.substr(cbfaf, 1));
                    cbihd += cbcib[cbbae];
                }
                return cbihd;
            }
        }
    };
    JQueryMaps.Misc = function() {
        JQueryMaps.Misc.getPlatformCapabilities = function() {
            var cbidg = new Object();
            var ccdaf = navigator.userAgent.toLowerCase();
            if (ccdaf.indexOf('ipad') != -1 || ccdaf.indexOf('ipod') != -1 || ccdaf.indexOf('iphone') != -1) {
                cbidg.cbfgb = true;
            } else if (ccdaf.indexOf('android') != -1) {
                cbidg.cbffh == true;
            } else if (ccdaf.indexOf('iemobile') != -1 || ccdaf.indexOf('opera mobile') != -1 || ccdaf.indexOf('palmos') != -1 || ccdaf.indexOf('webos') != -1 || ccdaf.indexOf('googlebot-mobile') != -1) {
                cbidg.cbfge = true;
            }
            if ('ontouchstart' in window) {
                cbidg.cbfhc = true;
                if (ccdaf.indexOf('mobile') != -1) cbidg.cbfge = true;
                else cbidg.cbfhb = true;
            }
            cbidg.cbehf = (!(cbidg.cbfge || cbidg.cbfhb));
            cbidg.cbfbh = 'computer';
            if (cbidg.cbfge) cbidg.cbfbh = 'phone';
            if (cbidg.cbfhb) cbidg.cbfbh = 'tablet';
            if (navigator.userAgent.indexOf("MSIE")) {
                cbidg.cbafi = "msie";
                var ccdaf = navigator.userAgent;
                var ccagd = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (ccagd.exec(ccdaf) != null) cbidg.cbafj = parseFloat(RegExp.$1);
            }
            return cbidg;
        };
    };
};

function cbdfj(cbfcg, ccaee, value) {
    if (!cbfcg) return undefined;
    var cbihe = new Array();
    var cccjf = cbfcg.length;
    for (var cbfaf = 0; cbfaf < cccjf; cbfaf++) {
        var element = cbfcg[cbfaf];
        if (element[ccaee] == value) {
            cbihe.push(element);
        }
    }
    return cbihe;
}

function ccaja(cccef, ccajb, ccdfc) {
    return cccef.replace(new RegExp(ccajb, 'g'), ccdfc);
}

function cbjac(cbicj, ccdba) {
    if (!ccdba) return ccdba;
    var ccdbb = ccdba;
    for (var ccaed in cbicj) {
        if (cbicj.hasOwnProperty(ccaed)) {
            ccdbb = ccaja(ccdbb, "##" + ccaed + "##", cbicj[ccaed]);
            ccdbb = ccaja(ccdbb, "%%" + ccaed + "%%", cbicj[ccaed]);
        }
    }
    return ccdbb;
}

function cbdhh(cbicj) {
    if (typeof(cbicj) == 'object') {
        if (cbicj.length) return 'array';
        else return 'object';
    }
    return typeof(cbicj);
}

function ccdae(ccdbg, cbcbi) {
    if (!ccdbg) return cbcbi;
    switch (typeof(ccdbg)) {
        case 'boolean':
            return ccdbg;
            break;
        case 'string':
            switch (ccdbg.toLowerCase()) {
                case 'true':
                case 'yes':
                    return true;
                    break;
                case 'false':
                case 'no':
                    return false;
                    break;
            }
            break;
    }
    return cbcbi;
}

function ccdad(ccdbg) {
    if (cbdhh(ccdbg) == 'string') {
        switch (ccdbg.toLowerCase()) {
            case 'true':
            case 'yes':
                return true;
                break;
            case 'false':
            case 'no':
                return false;
                break;
        }
    }
    return ccdbg;
}

function cbdah(ccdaj) {
    var cbfaf = decodeURI(ccdaj).lastIndexOf("/");
    return ccdaj.substr(0, cbfaf + 1);
}

function cbedc(ccdaj, cbbhj) {
    if (ccdaj == undefined || ccdaj == '') return undefined;
    var ccdbb = ccdaj;
    if (ccdbb.substr(0, 7) != "http://" && ccdbb.substr(0, 8) != "https://" && ccdbb.substr(0, 1) != "/") ccdbb = cbbhj + ccdbb;
    return ccdbb;
}

function cbbgh(cbbgg) {
    var cbbdb = cbbgg.toLowerCase();
    var cbidg = new Object();
    cbidg.cajjj = 1;
    if (cccei(cbbdb, 'rgba')) {
        var cbbdf = cbbdb.lastIndexOf(',');
        cbidg.cajjj = parseFloat(cbbdb.substr(cbbdf + 1));
        cbbdb = cbbdb.substr(0, cbbdf) + ')';
        cbbdb = cbbdb.replace('rgba', 'rgb');
    }
    if (cccei(cbbdb, 'rgb')) {
        var cbjag = cbbdb.indexOf('(');
        var ccajj = cbbdb.substr(cbjag + 1).split(',');
        cbidg.cbbdb = "#" + number2Hex(parseInt(ccajj[0]), 2) + number2Hex(parseInt(ccajj[1]), 2) + number2Hex(parseInt(ccajj[2]), 2);
    } else {
        if (cbbdb.length == 4) {
            cbidg.cbbdb = "#";
            for (var cbfaf = 1; cbfaf < 4; cbfaf++) {
                cbidg.cbbdb += number2Hex(parseInt(cbbdb.substr(cbfaf, 1), 16) / 15 * 255, 2);
            }
        } else cbidg.cbbdb = cbbdb;
    }
    return cbidg;
}

function cbbgi(cbbgg) {
    if (!cbbgg) return undefined;
    var cbbdb = cbbgg;
    var cbidg = new Object();
    cbidg.cajhi = 1;
    if (cccei(cbbdb, 'rgba')) {
        var cbbdf = cbbdb.lastIndexOf(',');
        cbidg.cajhi = parseFloat(cbbdb.substr(cbbdf + 1));
        cbbdb = cbbdb.toLowerCase().substr(0, cbbdf) + ')';
        cbbdb = cbbdb.replace('rgba', 'rgb');
    }
    if (cccei(cbbdb, 'rgb')) {
        var cbjag = cbbdb.indexOf('(');
        var ccajj = cbbdb.substr(cbjag + 1).split(',');
        cbidg.ccafc = parseInt(ccajj[0]);
        cbidg.cbeaf = parseInt(ccajj[1]);
        cbidg.cbaef = parseInt(ccajj[2]);
    } else {
        if (cbbdb.length == 4) {
            cbidg.ccafc = parseInt(cbbdb.substr(1, 1), 16) / 15 * 255;
            cbidg.cbeaf = parseInt(cbbdb.substr(2, 1), 16) / 15 * 255;
            cbidg.cbaef = parseInt(cbbdb.substr(3, 1), 16) / 15 * 255;
        } else {
            cbidg.ccafc = parseInt(cbbdb.substr(1, 2), 16);
            cbidg.cbeaf = parseInt(cbbdb.substr(3, 2), 16);
            cbidg.cbaef = parseInt(cbbdb.substr(5, 2), 16);
        }
    }
    return cbidg;
}

function number2Hex(numberValue, ccajh) {
    var ccajg = numberValue.toString(16);
    while (ccajg.length < ccajh) ccajg = "0" + ccajg;
    return ccajg;
}

function cbfbj(cbdfi) {
    var ccajg;
    switch (cbdfi.type) {
        case 'shadow':
            var ccbhg = parseInt(Math.sqrt(cbdfi.offsetX * cbdfi.offsetX + cbdfi.offsetY * cbdfi.offsetY));
            var ccbhe;
            if (cbdfi.offsetX == 0) {
                if (cbdfi.offsetY >= 0) ccbhe = 0;
                else ccbhe = 180;
            } else {
                ccbhe = Math.atan(-cbdfi.offsetY / cbdfi.offsetX) / Math.PI * 180;
                if (cbdfi.offsetY > 0) ccbhe += 180;
            }
            ccajg = ' shadow(Strength=' + ccbhg + ', Direction=' + ccbhe + ', Color=' + cbbgh(cbdfi.cbdff).cbbdb + ')';
            break;
        case 'glow':
            ccajg = ' shadow(Strength=' + cbdfi.offset + ', Color=' + cbbgh(cbdfi.cbdff).cbbdb + ')';
            break;
    }
    return ccajg;
}

function cbgfd(value) {
    return Math.log(value) / Math.log(10);
}

function cccei(ccceb, cccea) {
    return ccceb.substr(0, cccea.length) == cccea;
}

function ccceg(ccceb, cccea) {
    return ccceb.substr(ccceb.length - cccea.length, cccea.length) == cccea;
}

function ccceh(ccceb, cccec) {
    if (ccceb == cccec) return true;
    if (ccceb == undefined) return false;
    if (cccec == undefined) return false;
    ccceb = ccceb.toLowerCase();
    cccec = cccec.toLowerCase();
    if (ccceb == cccec) return true;
    if (cccei(ccceb, '*') && ccceg(ccceb, '*')) {
        var ccahg = new RegExp(ccceb.substr(1, ccceb.length - 2));
        return ccahg.test(cccec);
    }
    if (cccei(ccceb, '*')) {
        return ccceg(cccec, ccceb.substr(1));
    }
    if (ccceg(ccceb, '*')) {
        return cccei(cccec, ccceb.substr(0, ccceb.length - 1));
    }
    if (cccei(cccec, '*') && ccceg(cccec, '*')) {
        var ccahg = new RegExp(cccec.substr(1, cccec.length - 2));
        return ccahg.test(ccceb);
    }
    if (cccei(cccec, '*')) {
        return ccceg(ccceb, cccec.substr(1));
    }
    if (ccceg(cccec, '*')) {
        return cccei(ccceb, cccec.substr(0, cccec.length - 1));
    }
}

function cbefh(obj) {
    var cbhfg = 0;
    $(obj).children().each(function() {
        var cbbca = parseInt($(this).width());
        if (cbbca > cbhfg) {
            cbhfg = cbbca;
        }
    });
    return cbhfg;
}

function cbefg(obj) {
    var cbhfg = 0;
    $(obj).children().each(function() {
        var cbbbh = parseInt($(this).height());
        if (cbbbh > cbhfg) {
            cbhfg = cbbbh;
        }
    });
    return cbhfg;
}

function cbbej(value, cbbfb, cbbfa) {
    if (value == undefined) return '';
    var cbihd = '';
    switch (cbbfa) {
        case 'ddmmss':
            var cajib = Math.abs(value);
            var cbcca = Math.floor(cajib);
            var cbhha = cajib - cbcca;
            var cbhgj = Math.floor(cbhha * 60);
            var ccbdd = Math.floor((cbhha - cbhgj / 60) * 3600 + .5);
            cbihd = cbcca + "&deg;";
            if (cbhgj < 10) cbihd += "0";
            cbihd += cbhgj + "'";
            if (ccbdd < 10) cbihd += "0";
            cbihd += ccbdd + "&quot;";
            if (cbbfb == 'lat') {
                if (value < 0) cbihd += "S";
                else cbihd += "N";
            } else {
                if (value < 0) cbihd += "W";
                else cbihd += "E";
            }
            break;
        case 'ddmm.mm':
            var cajib = Math.abs(value);
            var cbcca = Math.floor(cajib);
            var cbhha = cajib - cbcca;
            var cbhgj = (cbhha * 60).toFixed(2);
            cbihd = cbcca + "&deg;";
            cbihd += cbhgj + "'";
            if (cbbfb == 'lat') {
                if (value < 0) cbihd += "S";
                else cbihd += "N";
            } else {
                if (value < 0) cbihd += "W";
                else cbihd += "E";
            }
            break;
        case 'dd.dddd':
        default:
            cbihd = value.toFixed(4) + "&deg;";
            break;
    }
    return cbihd;
}

function cbeef(cbijb, cbijd) {
    return Math.sqrt((cbijd.ccdff - cbijb.ccdff) * (cbijd.ccdff - cbijb.ccdff) + (cbijd.ccdfi - cbijb.ccdfi) * (cbijd.ccdfi - cbijb.ccdfi));
}

function ccccj(cccef) {
    var cccda = new Array();
    if (cccef.indexOf(';') != -1) cccda = cccef.split(';');
    else {
        var cccdb = cccef.split(',');
        for (var cbfaf = 0; cbfaf < cccdb.length; cbfaf += 2) cccda.push(cccdb[cbfaf] + ',' + cccdb[cbfaf + 1]);
    }
    return cccda;
}

function cbegd(cbjad) {
    if (location.href.indexOf("?") != -1) {
        var cbjae = location.href.split("?")[1].split("&");
        for (var cbfaf in cbjae) {
            cbiji = cbjae[cbfaf].split('=');
            if (cbiji[0] == cbjad) return cbiji[1];
        }
    }
}
var cbjhg = ["webkit", "ms", "o", ""];

function cbbbf(obj, method) {
    var cbiii = 0,
        cbggd, cccfh;
    while (cbiii < cbjhg.length && !obj[cbggd]) {
        cbggd = method;
        if (cbjhg[cbiii] == "") {
            cbggd = cbggd.substr(0, 1).toLowerCase() + cbggd.substr(1);
        }
        cbggd = cbjhg[cbiii] + cbggd;
        cccfh = typeof obj[cbggd];
        if (cccfh != "undefined") {
            return (cccfh == "function");
        }
        cbiii++;
    }
}

function ccbbd(obj, method) {
    var cbiii = 0,
        cbggd, cccfh;
    while (cbiii < cbjhg.length && !obj[cbggd]) {
        cbggd = method;
        if (cbjhg[cbiii] == "") {
            cbggd = cbggd.substr(0, 1).toLowerCase() + cbggd.substr(1);
        }
        cbggd = cbjhg[cbiii] + cbggd;
        cccfh = typeof obj[cbggd];
        if (cccfh != "undefined") {
            return (cccfh == "function" ? obj[cbggd]() : obj[cbggd]);
        }
        cbiii++;
    }
}

function cbaha(cbiij, cbijb) {
    if (cbijb.ccdff == cbiij.ccdff) {
        if (cbijb.ccdfi > cbiij.ccdfi) cbaai = 270;
        else cbaai = 90;
    } else {
        var cbfch = (cbiij.ccdfi - cbijb.ccdfi) / (cbijb.ccdff - cbiij.ccdff);
        cbaai = Math.atan(cbfch) / Math.PI * 180;
        if (cbijb.ccdff - cbiij.ccdff < 0) cbaai += 180;
        if (cbaai < 0) cbaai += 360;
    }
    return cbaai;
}

function jqmEvent(cbfej, cbcjh, cbidf, cbfhi, cajjf) {
    jqmInstances[cbfej].obj.cbdaa(cbcjh, cbidf, cbfhi, cajjf);
}
if (jqmInstances == undefined) var jqmInstances = new Array();
JQueryMaps();
JQueryMaps.Struct();
JQueryMaps.Map();
JQueryMaps.Misc();
