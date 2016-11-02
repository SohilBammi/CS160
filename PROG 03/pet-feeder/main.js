import Pins from "pins";

var count = 30;
var labelStyle = new Style( { font: "bold 40px", color:"black" } );
var buttonSkin = new Skin({ fill : ["#7DBF2E", "#5f9023"] });
var titleLabel = new Label({ left:0, right:0, height:40, string:"PetFeedr", style: labelStyle, skin:buttonSkin });
var lastTimeFedLabel = new Label({ left:0, right:0, top:10, height:40, string:"Last Date: N/A", style: labelStyle });

let textStyle = new Style({ font: "bold 50px", color: "white" });
let ErrorContainer = Container.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,
    skin: new Skin({ fill: $.backgroundColor }),
    contents: [
        Label($, {
            top: 70, bottom: 70, left: 70, right: 70,
            style: textStyle,  string: $.string
        }),
    ],
}));

var whiteSkin = new Skin( { fill: "white" } );
var labelStyle = new Style( { font: "bold 40px", color: "black" } );

var portionsLeft = "Portions Left: "+count;
var counterLabel = new Label({ left:0, right:0, top:15, height:40, string:portionsLeft, style: labelStyle });
var buttonSkin = new Skin({ fill : ["#7DBF2E", "#5f9023"] });

var restockButton = Container.template($ => ({
    left: 20, right: 20, top: 10, height: 40, active: true, skin: buttonSkin, state:0,
    contents: [
        new Label({name:"restockString", left:0, right:0, height:40, string:"Restock", style: labelStyle})
    ],
    Behavior: class extends Behavior {
    	onTouchBegan(content){
    		content.state = 1;
        }
        onTouchEnded(content){
        	content.state = 0;
			count = 30;
			counterLabel.string = "Portions Left: "+ count;
        }
    }
}));

var mainColumn = new Column({
    left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin,
    contents: [
    	titleLabel,
        counterLabel,
        lastTimeFedLabel,
        new restockButton()
    ]
});

Handler.bind("/setCount", Behavior({
    onInvoke: function(handler, message){
    	if(count>0){
    		count--;
        }
        var currDate = new Date();
        var day = currDate.getDay();
        var month = currDate.getMonth()+1;
        var dateString = month+"/"+day;
        lastTimeFedLabel.string = "Last Date: "+dateString;
        counterLabel.string = "Portions Left: "+ count;
        message.responseText = JSON.stringify( { count: count } );
        message.status = 200;
    }
}));


class ApplicationBehavior extends Behavior {
    onLaunch(application) {
        application.shared = true;
        application.add(mainColumn);
        Pins.configure({
            analogSensor: {
                require: "Analog",
                pins: {
                     analog: { pin: 54 }
                }
              },
              bowlSensor: {
                require: "Analog",
                pins: {
                     analog: { pin: 56 }
                }
              },
            led: {
                require: "Digital", // use built-in digital BLL
                pins: {
                    ground: { pin: 51, type: "Ground" },
                    digital: { pin: 52, direction: "output" },
                }
            },    
        },  success => {
            if (success) {
                Pins.share("ws", {zeroconf: true, name: "pins-share-led"});
                trace("Configured pins.\n");
            } else {
                   application.add(new ErrorContainer({ string: "Error", backgroundColor: "red" }));
                   trace("Failed to configure pins.\n");
               };
        });
    }
    onQuit(application) {
        application.shared = false;
    }
}

application.behavior = new ApplicationBehavior();