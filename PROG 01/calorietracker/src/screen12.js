/*
 *     Copyright (C) 2010-2016 Marvell International Ltd.
 *     Copyright (C) 2002-2010 Kinoma, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */
 
 var quantity = 0;
 var quantity1= 0;
 var quantity2= 0;
 var quantity3= 0;
 var quantity4= 0;
 var quantity5= 0;
 var quantity6= 0;
 var quantity7= 0;
 var quantity8= 0;
 var quantity9= 0;
 var quantity10= 0;
 var quantity11= 0;
 var quantity12= 0;
 var quantity13= 0;
 var itemNames = ["Boba Milk Teas with Grass Jelly", "Plates of Spaghetti", "Bananas", "Pop Tarts", "Big Macs", 
  "Medium Fries", "Tacos", "Slices of Bread", "Chocolate Cakes", "Plates of Pad Thai", "IHOP Chorizo Fiesta Omelettes", "Harmless Coconut Water Bottles", 
  "Cups of Black Coffee", "Grande Caramel Frapuccinos"];
 var itemCalories = [600, 105, 200, 563, 365, 189, 79, 350, 889, 1990, 120, 316, 5, 420];

 function updateCalories(){
 	var totalCalories = itemCalories[0] * quantity;
 	quantity1 = totalCalories / itemCalories[1];
 	quantity1 = Math.round(quantity1*100)/100;
 	quantity1Label.string = ""+quantity1;
 	quantity2 = totalCalories / itemCalories[2];
 	quantity2 = Math.round(quantity2*100)/100;
 	quantity2Label.string = ""+quantity2;
 	quantity3 = totalCalories / itemCalories[3];
 	quantity3 = Math.round(quantity3*100)/100;
 	quantity3Label.string = ""+quantity3;
 	quantity4 = totalCalories / itemCalories[4];
 	quantity4 = Math.round(quantity4*100)/100;
 	quantity4Label.string = ""+quantity4;
 	quantity5 = totalCalories / itemCalories[5];
 	quantity5 = Math.round(quantity5*100)/100;
 	quantity5Label.string = ""+quantity5;
 	quantity6 = totalCalories / itemCalories[6];
 	quantity6 = Math.round(quantity6*100)/100;
 	quantity6Label.string = ""+quantity6;
 	quantity7 = totalCalories / itemCalories[7];
 	quantity7 = Math.round(quantity7*100)/100;
 	quantity7Label.string = ""+quantity7;
 	quantity8 = totalCalories / itemCalories[8];
 	quantity8 = Math.round(quantity8*100)/100;
 	quantity8Label.string = ""+quantity8;
 	quantity9 = totalCalories / itemCalories[9];
 	quantity9 = Math.round(quantity9*100)/100;
 	quantity9Label.string = ""+quantity9;
 	quantity10 = totalCalories / itemCalories[10];
 	quantity10 = Math.round(quantity10*100)/100;
 	quantity10Label.string = ""+quantity10;
 	quantity11 = totalCalories / itemCalories[11];
 	quantity11 = Math.round(quantity11*100)/100;
 	quantity11Label.string = ""+quantity11;
 	quantity12 = totalCalories / itemCalories[12];
 	quantity12 = Math.round(quantity12*100)/100;
 	quantity12Label.string = ""+quantity12;
 	quantity13 = totalCalories / itemCalories[13];
 	quantity13 = Math.round(quantity13*100)/100;
 	quantity13Label.string = ""+quantity13;
 }

import { 
    Button,
    ButtonBehavior 
} from 'buttons';

 let MyAddButtonTemplate = Button.template($ => ({
    top: 5, right: 5, height: 25, width: 25,
    contents: [
        Label($, {left: 0, right: 0, height: 20, string: "+"})
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	quantity = quantity + 1;
        	quantityLabel.string = ""+quantity;
        	updateCalories();
        }
    }
}));

 let MySubButtonTemplate = Button.template($ => ({
    top: 5, right: 40, height: 25, width: 25,
    contents: [
        Label($, {left: 0, right: 0, height: 20, string: "-"})
    ],
    Behavior: class extends ButtonBehavior {
        onTap(button){
        	if(quantity > 0)
        		quantity = quantity - 1;
        	quantityLabel.string = ""+quantity;
        	updateCalories();
        }
    }
}));

var titleLabel = new Label({
	left: 5,
	top: 8,
	string: itemNames[0]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantityLabel = new Label({ 
	left: 200, 
	top: 8,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity
});

var title1Label = new Label({
	left: 5,
	top: 25,
	string: itemNames[1]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity1Label = new Label({ 
	left: 200, 
	top: 25,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity1
});


var title2Label = new Label({
	left: 5,
	top: 40,
	string: itemNames[2]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity2Label = new Label({ 
	left: 200, 
	top: 40,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity2
});

var title3Label = new Label({
	left: 5,
	top: 55,
	string: itemNames[3]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity3Label = new Label({ 
	left: 200, 
	top: 55,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity3
});

var title4Label = new Label({
	left: 5,
	top: 70,
	string: itemNames[4]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity4Label = new Label({ 
	left: 200, 
	top: 70,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity4
});

var title5Label = new Label({
	left: 5,
	top: 85,
	string: itemNames[5]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity5Label = new Label({ 
	left: 200, 
	top: 85,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity5
});

var title6Label = new Label({
	left: 5,
	top: 100,
	string: itemNames[6]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity6Label = new Label({ 
	left: 200, 
	top: 100,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity6
});

var title7Label = new Label({
	left: 5,
	top: 115,
	string: itemNames[7]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity7Label = new Label({ 
	left: 200, 
	top: 115,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity7
});

var title8Label = new Label({
	left: 5,
	top: 130,
	string: itemNames[8]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity8Label = new Label({ 
	left: 200, 
	top: 130,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity8
});

var title9Label = new Label({
	left: 5,
	top: 145,
	string: itemNames[9]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity9Label = new Label({ 
	left: 200, 
	top: 145,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity9
});

var title10Label = new Label({
	left: 5,
	top: 160,
	string: itemNames[10]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity10Label = new Label({ 
	left: 200, 
	top: 160,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity10
});

var title11Label = new Label({
	left: 5,
	top: 175,
	string: itemNames[11]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity11Label = new Label({ 
	left: 200, 
	top: 175,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity11
});

var title12Label = new Label({
	left: 5,
	top: 190,
	string: itemNames[12]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity12Label = new Label({ 
	left: 200, 
	top: 190,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity12
});

var title13Label = new Label({
	left: 5,
	top: 205,
	string: itemNames[13]+":",
	style: new Style({ font: "15px", color: "white" })
});

var quantity13Label = new Label({ 
	left: 200, 
	top: 205,  
    style: new Style({ font: "15px", color: "white" }), 
    string: quantity13
});
         
var buttonContainer = new Container(
{
	right: 0,
	top: 0,
	width: 50, 
	height: 50, 
	skin: new Skin({fill: "#ffffff"}),
	contents: [
		new MyAddButtonTemplate,
		new MySubButtonTemplate
	]	
});

export var Screen12Template = Container.template($ => ({
   left: 0, right: 0, top: 0, bottom: 0,
   skin: new Skin({fill: "#202020"}),
   contents: [
   	  titleLabel,
   	  quantityLabel,
   	  new MyAddButtonTemplate,
      new MySubButtonTemplate,
      title1Label,
   	  quantity1Label,
   	  title2Label,
   	  quantity2Label,
   	  title3Label,
   	  quantity3Label,
   	  title4Label,
   	  quantity4Label,
   	  title5Label,
   	  quantity5Label,
   	  title6Label,
   	  quantity6Label,
   	  title7Label,
   	  quantity7Label,
   	  title8Label,
   	  quantity8Label,
   	  title9Label,
   	  quantity9Label,
   	  title10Label,
   	  quantity10Label,
   	  title11Label,
   	  quantity11Label,
   	  title12Label,
   	  quantity12Label,
   	  title13Label,
   	  quantity13Label
      
   ]
}));
