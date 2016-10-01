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
 
 
var comicImg = new Picture({left:0, right: 0, top:25, bottom:25, height: 150});
var flickrImg = new Picture({left:0, right: 0, top:25, bottom:25, height: 150});
var flickrApiKey = 'de86d9f0464fa0a2b3f9ef7653d0cd51';
var comicUrl = '';
var currentComic = 1;
var comicTitle = ''; 
var flickrTitle = '';
var flickrSearchUrl = '';
var flickrPhotoUrl = '';

function setComicTitle(title) {
  comicTitle = title;
}

function setFlickrTitle(title) {
  flickrTitle = title;
}

function setSearchUrl(title) {
  var tagString = title.split(' ').join(',');
  flickrSearchUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+flickrApiKey+'&tags='+tagString+'&tag_mode=any&format=json&nojsoncallback=1';
  trace(flickrSearchUrl+'\n');
}

function setComicUrl() {
	comicUrl = 'http://xkcd.com/'+currentComic+'/info.0.json';
}
setComicUrl();

import {
    VerticalScroller,
    VerticalScrollbar,
    TopScrollerShadow,
    BottomScrollerShadow
} from 'scroller';

let darkGraySkin = new Skin({ fill: "#202020" });
let titleStyle = new Style({ font: "20px", color: "white" });
let buttonStyle = new Style({font: '14px', color: 'black'});
let contStyle = new Style({font: '16px', color: 'black'});

var comicTitleLabel = new Label({
      left: 0, right:0, top: 5, color: '#000000',
      style: contStyle,
      string: 'XKCD Comic'
    });

var flickrTitleLabel = new Label({
      left: 0, right:0, top: 5, color: '#000000',
      style: contStyle,
      string: 'Flickr Image'
    });


let MainContainer = Container.template($ => ({
    left: 0, right: 0, top: 0, bottom: 0,
    contents: [
        VerticalScroller($, { 
            active: true, top: 25, bottom: 0,
            contents: [
                $.contentToScrollVertically,
                VerticalScrollbar(), 
                TopScrollerShadow(), 
                BottomScrollerShadow(),    
            ]                     
        }),
        new Container({ 
            top: 0, height: 25, left: 0, right: 0, skin: darkGraySkin, 
            style: titleStyle, 
            contents: [
                new Label({ string: "Comic Fetcher" }),
            ]
        })
    ]
}));

var prevButton = new Container({
  left: 40, right: 230, top: 10, bottom: 10, skin: new Skin({fill:'#8c8c8c'}),
  active: true,
  contents: [
    new Label({
      left: 0, right:0, top: 0, bottom: 0, color: '#000000',
      style: buttonStyle,
      string: 'Prev'
    })
  ],
  behavior: Behavior({
    onTouchEnded(content) {
      if(currentComic>1){
      		currentComic--;
        }
        setComicUrl();
      var uiCallback = function(imageURL) {
        setComicImg(imageURL);
      };
      getComicImg(uiCallback);
    }
  })
});

var nextButton = new Container({
  left: 230, right: 40, top: 10, bottom: 10, skin: new Skin({fill:'#8c8c8c'}),
  active: true,
  contents: [
    new Label({
      left: 0, right:0, top: 0, bottom: 0, color: '#000000',
      style: buttonStyle,
      string: 'Next'
    })
  ],
  behavior: Behavior({
    onTouchEnded(content) {
      if(currentComic<1739){
          currentComic++;
        }
        setComicUrl();
      var uiCallback = function(imageURL) {
        setComicImg(imageURL);
      };
      getComicImg(uiCallback);
    }
  })
});

var randomButton = new Container({
  left: 100, right: 100, top: 10, bottom: 10, skin: new Skin({fill:'#8c8c8c'}),
  active: true,
  contents: [
    new Label({
      left: 0, right:0, top: 0, bottom: 0, color: '#000000',
      style: buttonStyle,
      string: 'Randomize'
    })
  ],
  behavior: Behavior({
    onTouchEnded(content) {
      currentComic = Math.floor(Math.random() * (1739))+1;
      setComicUrl();
      var uiCallback = function(imageURL) {
        setComicImg(imageURL);
      };
      getComicImg(uiCallback);
    }
  })
});

function setFlickrPhotoUrl(){
    trace('reached photoURL \n');
    let message = new Message(flickrSearchUrl);
    let promise = message.invoke(Message.TEXT)
    promise.then(text => {
      if (0 == message.error && 200 == message.status) {
          try {
            var responseObject = JSON.parse(text);
            if(responseObject.photos.photo[0].id){
                var photoId = responseObject.photos.photo[0].id;
                flickrTitleLabel.string = responseObject.photos.photo[0].title;
                flickrPhotoUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key='+flickrApiKey+'&photo_id='+photoId+'&format=json&nojsoncallback=1';
                trace(flickrPhotoUrl+'\n');
                setFlickrPhoto();
            }
            else {
                trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
            }
          }
          catch (e) {
            throw('Web service responded with invalid JSON!\n');
          }
      }
      else {
          trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
      }
    });
}

function setFlickrPhoto(){
    trace('reached photo \n');
    let message = new Message(flickrPhotoUrl);
    trace(flickrPhotoUrl+'\n');
    let promise = message.invoke(Message.TEXT)
    promise.then(text => {
      if (0 == message.error && 200 == message.status) {
          try {
            var responseObject = JSON.parse(text);
            if(responseObject.sizes.size[0].source){
                var imgs = responseObject.sizes.size;
                var len = imgs.length-2;
                if(len < 0){
                  len = 0;
                }
                trace(len+'\n');
                trace(imgs[len].source+'\n');
                flickrImg.url = imgs[len].source;
            }
            else {
                trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
            }
          }
          catch (e) {
            throw('Web service responded with invalid JSON!\n');
          }
      }
      else {
          trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
      }
    });
}


/* Helper function for sending the HTTP request and loading the response */
function getComicImg(uiCallback) {
    let message = new Message(comicUrl);
 
    let promise = message.invoke(Message.TEXT)
    promise.then(text => {
      if (0 == message.error && 200 == message.status) {
          try {
            var responseObject = JSON.parse(text);
            if (responseObject.img) {
              uiCallback(responseObject.img);
            }
            if(responseObject.title){
              setComicTitle(responseObject.title);
              comicTitleLabel.string = responseObject.title;
              setSearchUrl(responseObject.title);
              setFlickrPhotoUrl();
            }
            else {
                trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
            }
          }
          catch (e) {
            throw('Web service responded with invalid JSON!\n');
          }
      }
      else {
          trace('Request Failed - Raw Response Body: *'+text+'*'+'\n');
      }
    });
}

var buttonContainer = new Container({
  left: 0, right: 0, top: 0, height:40, skin: new Skin({fill:'#ff5b5b'}),
  contents: [
 	prevButton,
 	randomButton,
 	nextButton
  ]
});

var comicContainer = new Container({
  left: 0, right: 0, top: 0, height:200, skin: new Skin({fill:'#efefef'}),
  contents: [
    comicTitleLabel,
 	  comicImg
  ]
});

var flickrContainer = new Container({
  left: 0, right: 0, top: 0, height:200, skin: new Skin({fill:'#efefef'}),
  contents: [
    flickrTitleLabel,
 	  flickrImg
  ]
});

var value = new Container({
  left: 0, right: 150, top: 0, height:100, skin: new Skin({fill:'#ffffff'}),
  contents: [
 
  ]
});

let contentToScrollVertically = new Column({ 
    top: 0, left: 0, right: 0, 
    contents: [
        buttonContainer,
        comicContainer,
        flickrContainer    
    ]
});

function setComicImg(comicImgUrl) {
	comicImg.url = comicImgUrl;
}

function setFlickrImg(flickrImgUrl) {
	flickrImg.url = flickrImgUrl;
}

let scrollerExample = new MainContainer({ contentToScrollVertically });
application.add(scrollerExample);
currentComic = Math.floor(Math.random() * (1739))+1;
setComicUrl();
var firstComicCallback = function(imageURL) {
        setComicImg(imageURL);
      };
getComicImg(firstComicCallback);