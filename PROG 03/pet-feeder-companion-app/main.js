import Pins from "pins";

var deviceURL = "";

var whiteSkin = new Skin( { fill:"white" } );
var labelStyle = new Style( { font: "bold 40px", color:"black" } );
var greatStyle = new Style( { font: "bold 40px", color:"green" } );
var medStyle = new Style( { font: "bold 40px", color:"orange" } );
var badStyle = new Style( { font: "bold 40px", color:"red" } );
var buttonSkin = new Skin({ fill : ["#7DBF2E", "#5f9023"] });

var titleLabel = new Label({ left:0, right:0, height:40, string:"PetFeedr", style: labelStyle, skin:buttonSkin });
var counterLabel = new Label({ left:0, right:0, top:30, height:40, string:"Food Stock: 100%", style: greatStyle });
var lastTimeFedLabel = new Label({ left:0, right:0, top:20, height:40, string:"Last Date: N/A", style: labelStyle });
var bowlLabel = new Label({ left:0, right:0, top:20, height:40, string:"Bowl: N/A", style: labelStyle });
var petStandLabel = new Label({ left:0, right:0, top:20, height:40, string:"Pet Status: N/A", style: labelStyle });
var deviceStatusLabel = new Label({ left:0, right:0, top:20, height:40, string:"Device: N/A", style: labelStyle });

var FeedButton = Container.template($ => ({
    left: 20, right: 20, top: 35, height: 50, active: true, skin: buttonSkin, state:0,
    contents: [
        new Label({name:"feedString", left:0, right:0, height:40, string:"Feed Pet", style: labelStyle})
    ],
    Behavior: class extends Behavior {
    	onTouchBegan(content){
    		content.state = 1;
    		application.distribute("onToggleLight", 1);
        }
        onTouchEnded(content){
        	content.state = 0;
        	application.distribute("onToggleLight", 0);
            if (deviceURL != "") new Message(deviceURL + "setCount").invoke(Message.JSON).then(json => {  
            counterLabel.style = greatStyle;
            var currDate = new Date();
            var day = currDate.getDay();
            var month = currDate.getMonth()+1;
            var dateString = month+"/"+day;
            lastTimeFedLabel.string = "Last Date: "+dateString;
            var percent = Math.round(json.count/30*100);
            if(percent<66) counterLabel.style = medStyle;
            if(percent<33)
             counterLabel.style = badStyle;
            if(percent==0){
             counterLabel.string = "Food Stock: Err";
            }
            else {
            	counterLabel.string = "Food Stock: "+percent +"%"; 
            }  
            	});
        }
        onToggleLight(content, value) {
            content.feedString.string = (value) ? "Feeding Pet" : "Feed Pet";
        }
    }
}));

var mainColumn = new Column({
    left: 0, right: 0, top: 0, bottom: 0,
    active: true, skin: whiteSkin, state: 0,
    contents: [
    	titleLabel,
        counterLabel,
        lastTimeFedLabel,
        bowlLabel,
        petStandLabel,
        deviceStatusLabel,
        new FeedButton()
    ]
});

Handler.bind("/discover", Behavior({
    onInvoke: function(handler, message){
        deviceURL = JSON.parse(message.requestText).url;
    }
}));

Handler.bind("/forget", Behavior({
    onInvoke: function(handler, message){
        deviceURL = "";
    }
}));

let remotePins;
var ApplicationBehavior = Behavior.template({
    onToggleLight(application, value) {
        if (remotePins){
            remotePins.invoke("/led/write", value)
        }
    },
    onDisplayed: function(application) {
        application.discover("pet-feeder.project.kinoma.marvell.com");
        application.add(mainColumn);
        let discoveryInstance = Pins.discover(
            connectionDesc => {
                if (connectionDesc.name == "pins-share-led") {
                    trace("Connecting to remote pins\n");
                    remotePins = Pins.connect(connectionDesc);
                    if(remotePins){
                     deviceStatusLabel.string = "Status: Connected";
                     deviceStatusLabel.style = greatStyle;
                     remotePins.repeat("/analogSensor/read", 500, function(result){
                     	if(result>0.1){
                     	
                     		petStandLabel.string = "Pet Status: Here";
                     		petStandLabel.style = greatStyle;
                    	}
                    	else{
	                    	petStandLabel.string = "Pet Status: Away";
                     		petStandLabel.style = badStyle;
                    	}
                      });
                      remotePins.repeat("/bowlSensor/read", 500, function(result){
                      	if(result<=1){
                      		bowlLabel.string = "Bowl: Full";
                     		bowlLabel.style = greatStyle;
                     	}
                      	if(result<0.7){
                      		bowlLabel.string = "Bowl: Med";
                     		bowlLabel.style = medStyle;
                     	}
                      	if(result<0.3){
                      		bowlLabel.string = "Bowl: Low";
                     		bowlLabel.style = badStyle;
                     	}
                     	if(result==0){
	                     	bowlLabel.string = "Bowl: Empty";
                    	}
                      });
                    }
                }
            }, 
            connectionDesc => {
                if (connectionDesc.name == "pins-share-led") {
                    trace("Disconnected from remote pins\n");
                    deviceStatusLabel.string = "Status: Disconnected";
                    deviceStatusLabel.style = badStyle;
                    remotePins = undefined;
                }
            }
        );
    },
    onQuit: function(application) {
        application.forget("pet-feeder.project.kinoma.marvell.com");
    },
});
application.behavior = new ApplicationBehavior();