// VIEWPORT
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var PIXEL_RATIO = window.devicePixelRatio || 1;

var STAGE = new Kinetic.Stage({
    container: 'viewport',
    width: WIDTH,
    height: HEIGHT
});

var background = new Kinetic.Layer({});
var foreground = new Kinetic.Layer({});
var ui = new Kinetic.Layer({});

function setViewSize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    STAGE.setWidth(WIDTH * PIXEL_RATIO);
    STAGE.setHeight(HEIGHT * PIXEL_RATIO);
    STAGE.draw();
}
setViewSize();
window.addEventListener('resize', setViewSize);
window.addEventListener('orientationchange', setViewSize);

STAGE.add(background);
STAGE.add(foreground);
STAGE.add(ui);

// CLASSES

/** Annotation constructor. Annotations act as labels for information.
 * @constructor
 * @augments Kinetic.Group
 * @param {Integer} [param.width] set width of annotation
 * @param {Integer} [param.height] set height of annotation
 * @param {String} [param.text] set the text of annotation
 * @param {Integer} [param.x] set the x position of annotation
 * @param {Integer} [param.y] set the y position of annotation
 * @param {Object} [param.layer] set the annotation's layer
 * @param {Integer} [param.fontSize] set the font size
 * @param {String} [param.fontFamily] set the font family
 * @param {String} [param.fill] set the fill color of the annotation base
 * @param {Boolean} [param.multiline] notifies the annotation of the multiline text.
 * @param {String} [param.fontColor] set the color of the font
 */
var Annotation = function (param) {
    Kinetic.Group.call(this, {width: param.width || 100, height: param.height || 50, x: 0, y: 0});
    this.className = "Annotation";
    this.base = new Kinetic.Rect({width: param.width || 100, height: param.height || 50, x: 0, y: 0, fill: param.fill || "white", stroke: "black", strokeWidth: 1});
    this.text = new Kinetic.Text({width: param.width || 100, height: param.height || 50, x: 0, y: 0, text: param.text || "Annotation", fill: param.fontColor || "black", strokeWidth: 1, fontFamily: param.fontFamily || "Arial", fontSize: param.fontSize || 15, align: "center"});
    var textHeight = this.text.getTextHeight() * (this.text.attrs.text.split("\n").length);
    //console.log(this.text.getTextHeight() + " " + (this.text.attrs.text.split("\n").length) + " " + textHeight);
    this.text.offsetY((-1 * (param.height || 50) / 2) + (textHeight / 2));
    //console.log("(-1 * " + (param.height || 50) + " / 2 + (" + textHeight + " / 2)");
    this.add(this.base);
    this.add(this.text);
    this.position({x: param.x || WIDTH / 2 - param.width / 2, y: param.y || HEIGHT / 2 - param.height / 2});

    if (param.layer != undefined) {
        param.layer.add(this);
    }
};
Annotation.prototype = Object.create(Kinetic.Group.prototype);
Annotation.prototype.constructor = Annotation;

/** Button constructor. Buttons are clickable elements with attached events.
 * @constructor
 * @augments Annotation
 * @param {Integer} [param.width] set width of button
 * @param {Integer} [param.height] set height of button
 * @param {String} [param.text] set the text of button
 * @param {Integer} [param.x] set the x position of button
 * @param {Integer} [param.y] set the y position of button
 * @param {Object} [param.layer] set the button's layer
 * @param {Integer} [param.fontSize] set the font size
 * @param {String} [param.fontFamily] set the font family
 * @param {String} [param.fill] set the fill color of the button base
 * @param {String} [param.fontColor] set the font color
 */
var Button = function (param) {
    Annotation.call(this, param);
    this.className = "Button";
    this.text.text = param.text || "Button";
    //this.text.setWidth(this.text.getTextWidth());
    //this.text.setHeight(this.text.getTextHeight());
    //this.position({x: 0, y: 0});
    //this.text.position({x: param.width / 2 - this.text.getTextWidth() / 2, y: param.height / 2 - this.text.getTextHeight() / 2});
    //this.position({x: param.x || WIDTH / 2 - param.width / 2, y: param.y || HEIGHT / 2 - param.height / 2});
    this.base.strokeWidth(2);

    this.base.on("click tap", function(evt) {
        evt.target.parent._onActivate();
        //evt.target.parent.onActivate();
    });
    this.text.on("click tap", function(evt) {
        evt.target.parent._onActivate();
        //evt.target.parent.onActivate();
    });

    if (param.layer != undefined) {
        param.layer.add(this);
    }

    this.refreshColors = function() {
        this._originalColor = this.base.fill();
        this._darkColor = shadeColor(this._originalColor, -50);
    };
    this.refreshColors();

    //this._originalColor = this.base.fill();
    //this._darkColor = shadeColor(this._originalColor, -50);
    // Animation are a pain in the butt for this...
    /*
    var self = this;
    this.clickAnim = new Kinetic.Animation(function(frame) {
        self.base.fill(self._darkColor);
        if (frame.time >= 75) {
            frame.time = 0;
            self.base.fill(self._originalColor);
            self.clickAnim.stop();
            self.onActivate(); // Yeah, button anims!
        }
    }, self.getLayer());
    */
};
Button.prototype = Object.create(Annotation.prototype);
Button.prototype.constructor = Button;

Button.prototype.onActivate = function(){};
Button.prototype._onActivate = function() {
    //this.clickAnim.start();
    var self = this;
    self.base.fill(self._darkColor);
    self.getLayer().draw();
    setTimeout(function() {
        self.base.fill(self._originalColor);
        self.getLayer().draw();
        self.onActivate(); // Yeah, button anims!
    }, 50);
};


/** Pane constructor. Panes are draggable windows with content and a close button.
 * @constructor
 * @augments Kinetic.Group
 * @param {Integer} [param.width] set width of button
 * @param {Integer} [param.height] set height of button
 * @param {Object} [param.layer] set the layer to add the pane to
 * @param {String} [param.buttonColor] set the close button's color
 * @param {String} [param.buttonStroke] set the close button's stroke color
 * @param {Integer} [param.x] set the pane's x position
 * @param {Integer} [param.y] set the pane's y position
 * @param {String} [param.message] sets the pane's message/body/info
 * @param {Integer} [param.fontSize] sets the message's font size
 * @param {Boolean} [param.centeredMessage] decides whether or not to center a SINGLE line message in the pane
 * @param {String} [param.title] sets the area at the top of the pane to display a particular string
 * @param {Boolean} [param.center] centers the message in the pane.
 * @param {Integer} [param.buttons] creates several editable buttons on the bottom of the pane
 * @param {Boolean} [param.noClose] takes away the default close button
 * @param {Boolean} [param.yesNo] sets up a defualt two button yes no prompt
 */
var Pane = function (param) {
    param.width = param.width || 300;
    param.height = param.height || 100;
    if (param.yesNo == true) {
        param.buttons = 2;
        param.noClose = true;
    }
    if (param.buttons >= 1) {
        param.height += 70;
    }
    Kinetic.Group.call(this, {width: param.width, height: param.height, x: 0, y: 0});
    this.className = "Pane";
    var self = this;
    this.base = new Kinetic.Rect({width: param.width, height: param.height, x: 0, y: 0, stroke: "black", fill: "white", strokeWidth: 1});
    this.add(this.base);
    if (param.noClose != true) {
        this.button = new Button({width: 25, height: 25, text: "X"});
        this.button.position({x: (param.width) - 25, y: 0});
        this.button.base.setAttrs({fill: param.buttonColor || "#EEEEEE", stroke: param.buttonStroke || "rgba(238, 238, 238, 1)"});
        this.button.text.setAttr("fontSize", 15);
    }

    if (param.buttons >= 1) {
        this.message = new Kinetic.Text({width: param.width - 10, height: param.height - 25 - 70, x: 5, y: 25, fill: "black", text: param.message || "", fontSize: param.fontSize || 15});
    } else {
        this.message = new Kinetic.Text({width: param.width - 10, height: param.height - 25, x: 5, y: 25, fill: "black", text: param.message || "", fontSize: param.fontSize || 15});
    }
    if (param.center != false) {
        this.message.setAttr("align", "center");
        this.message.offsetY(-10);
    }
    if (param.noClose == true || false) {
        this.title = new Kinetic.Text({width: param.width, height: 25, x: 1, y: 1, fill: "black", text: (param.title || "").toUpperCase(), fontStyle: "bold", fontSize: 20, align: "center"});
    } else {
        this.title = new Kinetic.Text({width: param.width - 25, height: 25, x: 1, y: 1, fill: "black", text: (param.title || "").toUpperCase(), fontStyle: "bold", fontSize: 20, align: "center"});
    }

    if (param.buttons >= 1) {
        this.option1 = new Button({width: 75, height: 50, text: "Option 1", x: (param.width) - 85, y: (param.height) - 60});
        this.add(this.option1);
    }
    if (param.buttons >= 2) {
        this.option2 = new Button({width: 75, height: 50, text: "Option 2", x: (param.width) - (85 * 2), y: (param.height) - 60});
        this.add(this.option2);
    }
    if (param.buttons >= 3) {
        this.option3 = new Button({width: 75, height: 50, text: "Option 3", x: (param.width) - (85 * 3), y: (param.height) - 60});
        this.add(this.option3);
    }

    this.add(this.title);
    this.add(this.message);
    if (param.noClose != true)
        this.add(this.button);
    if (param.x == undefined && param.y == undefined)
        this.position({x: WIDTH / 2 - (param.width) / 2, y: HEIGHT / 2 - (param.height) / 2});
    else
        this.position({x: param.x || 0, y: param.y || 0});
    this.setDraggable(true);

    this.close = function() {
        self.destroy();
        param.layer.draw();
    };

    if (param.noClose != true) {
        this.button.onActivate = this.close;
    }

    if (param.yesNo == true) {
        this.option1.base.fill("#44FF44");
        this.option1.text.setText(DIALOG.yes[LANGUAGE]);
        this.option1.refreshColors();
        this.option2.base.fill("#FF4444");
        this.option2.text.setText(DIALOG.no[LANGUAGE]);
        this.option2.refreshColors();

        this.option2.onActivate = function() {
            self.close();
        }
    }

    this.base.on("mousedown touchstart", function(evt) {
        evt.target.parent._onDown();
        evt.target.parent.onDown();
    });

    if (param.layer != undefined) {
        param.layer.add(this);
        this.draw();
    }
};
Pane.prototype = Object.create(Kinetic.Group.prototype);
Pane.prototype.constructor = Pane;

Pane.prototype.onDown = function() { };
Pane.prototype._onDown = function() {
    this.moveToTop();
};

// FUNCTIONS

var fitImageFullscreen = function(image) {
    var sizeX = image.getWidth() / WIDTH;
    var sizeY = image.getHeight() / HEIGHT;
    var ratio = 1;
    if (sizeX < sizeY) {
        ratio = WIDTH / image.getWidth();
    } else {
        ratio = HEIGHT / image.getHeight();
    }
    image.scaleX(ratio);
    image.scaleY(ratio);
    image.position({x: WIDTH / 2 - (image.getWidth() * ratio) / 2, y: HEIGHT / 2 - (image.getHeight() * ratio) / 2});
};

var fitImageMostScreen = function(image) {
    var sizeX = image.getWidth() / WIDTH;
    var sizeY = image.getHeight() / HEIGHT;
    var ratio = 1;
    if (sizeX < sizeY) {
        ratio = HEIGHT / image.getHeight();
    } else {
        ratio = WIDTH / image.getWidth();
    }
    image.scaleX(ratio);
    image.scaleY(ratio);
    image.position({x: WIDTH / 2 - (image.getWidth() * ratio) / 2, y: HEIGHT / 2 - (image.getHeight() * ratio) / 2});
};

var shadeColor = function(color, percent) {
    color = colorNameToHex(color);
    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
};

function blendColors(c0, c1, p) {
    c0 = colorNameToHex(c0);
    c1 = colorNameToHex(c1);
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}

var colorNameToHex = function(color) {
    var colors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
        "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
        "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
        "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
        "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
        "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
        "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
        "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
        "honeydew":"#f0fff0","hotpink":"#ff69b4",
        "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
        "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
        "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
        "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
        "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
        "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
        "navajowhite":"#ffdead","navy":"#000080",
        "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
        "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
        "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
        "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
        "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
        "violet":"#ee82ee",
        "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
        "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colors[color.toLowerCase()] != 'undefined')
        return colors[color.toLowerCase()];

    return color;
};

var roundTwoPlaces = function(amount) {
    return Math.round(amount * 100) / 100;
};