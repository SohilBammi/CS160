import { ScreenCTemplate } from "screenc";
import { Screen1Template } from "screen1";
import { Screen2Template } from "screen2";
import { Screen3Template } from "screen3";
import { Screen4Template } from "screen4";
import { Screen5Template } from "screen5";
import { Screen6Template } from "screen6";
import { Screen7Template } from "screen7";
import { Screen8Template } from "screen8";
import { Screen9Template } from "screen9";
import { Screen10Template } from "screen10";
import { Screen11Template } from "screen11";
import { Screen12Template } from "screen12";
import { Screen13Template } from "screen13";
import { Screen14Template } from "screen14";

var ScreenTemplate = Column.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0, 
    skin: new Skin({fill: "#202020"}),
    contents: [
    ]
}));

var final = 1;
var currentScreen = new ScreenTemplate();
application.add(currentScreen);

var NavButton = Container.template($ => ({
    active: true, top: 2, bottom: 2, right: 2, left: 2,
    behavior: Behavior({
        onCreate: function(content){
            this.upSkin = new Skin({
                fill: "transparent", 
                borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                stroke: "white"
            });
            this.downSkin = new Skin({
                fill: "#3AFF3E", 
                borders: {left: 1, right: 1, top: 1, bottom: 1}, 
                stroke: "white"
            });
            content.skin = this.upSkin;
        },
        onTouchBegan: function(content){
            content.skin = this.downSkin;
        },
        onTouchEnded: function(content){
            content.skin = this.upSkin;
            application.remove(currentScreen);  // Remove the old screen from the application
            currentScreen = new $.nextScreen;  // Make the new screen
            application.add(currentScreen);  // Add the new screen to the application
        },
    }),
   contents: [
        Label($, { top: 0, bottom: 0, left: 0, right: 0, 
            style: new Style({ font: "20px", color: "white" }), 
            string: $.string })
   ]
}));

var navBar = new Line({ top:0, height: 43, left: 0, right: 0,
    skin: new Skin({ fill: "black" }),
    contents: [
        new NavButton({ string: "Calories", nextScreen: ScreenCTemplate }),
        new NavButton({ string: "Plates of Spaghetti", nextScreen: Screen1Template }),
        new NavButton({ string: "Bananas", nextScreen: Screen2Template }),
    ]
});
var navBar2 = new Line({ top:48, height: 43, left: 0, right: 0,
    skin: new Skin({ fill: "black" }),
    contents: [
        new NavButton({ string: "Pop Tarts", nextScreen: Screen3Template }),
        new NavButton({ string: "Big Macs", nextScreen: Screen4Template }),
        new NavButton({ string: "Medium Fries", nextScreen: Screen5Template }),
    ]
});
var navBar3 = new Line({ top:96, height: 43, left: 0, right: 0,
    skin: new Skin({ fill: "black" }),
    contents: [
        new NavButton({ string: "Tacos", nextScreen: Screen6Template }),
        new NavButton({ string: "Slices of Bread", nextScreen: Screen7Template }),
        new NavButton({ string: "Chocolate Cakes", nextScreen: Screen8Template }),
    ]
});
var navBar4 = new Line({ top:144, height: 43, left: 0, right: 0,
    skin: new Skin({ fill: "black" }),
    contents: [
        new NavButton({ string: "Plates of Pad Thai", nextScreen: Screen9Template }),
        new NavButton({ string: "IHOP Chorizo Fiesta Omelettes", nextScreen: Screen10Template }),
        new NavButton({ string: "Bottles of Coconut Water", nextScreen: Screen11Template }),
    ]
});
var navBar5 = new Line({ top:192, height: 43, left: 0, right: 0,
    skin: new Skin({ fill: "black" }),
    contents: [
        new NavButton({ string: "Boba Milk Teas with Grass Jelly", nextScreen: Screen12Template }),
        new NavButton({ string: "Cups of Black Coffee", nextScreen: Screen13Template }),
        new NavButton({ string: "Grand Caramel Frappuccinos", nextScreen: Screen14Template }),
    ]
});
application.add(navBar);
application.add(navBar2);
application.add(navBar3);
application.add(navBar4);
application.add(navBar5);