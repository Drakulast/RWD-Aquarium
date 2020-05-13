/*globals $:false, window: flase,  document:false*/


//***IONUT WORKED ON THIS PART***//
var bubbleSpeed = 5000; //THE ANIMATION SPEED FOR ALL THE BUBBLES
var pos1X = Math.floor($("#coral1Id").offset().left + $("#coral1Id").width()/2);//COORDINATES
var pos1Y = Math.floor($("#coral1Id").offset().top + $("#coral1Id").height()/2);//FOR THE 
var pos2X = Math.floor($("#coral2Id").offset().left + $("#coral2Id").width()/2);//SMALL BUBBLES
var pos2Y = Math.floor($("#coral2Id").offset().top + $("#coral2Id").height()/2);//SPAWN POINTS

//FUNCTIONALITY FOR THE BIG BUBBLES
function spawnBubble(idRef)
{
    var randomX = Math.floor((Math.random() * ($(window).width() - $(idRef).width())));
    $(idRef).offset({top: $(window).height(), left: randomX}).delay(Math.floor(Math.random() * 1500));
    floatBubble(idRef);
}

function floatBubble(idRef)
{
    $(idRef).animate({top: -100}, bubbleSpeed, "swing",function() {spawnBubble(this)}).delay(750);
}

function popBubble()
{
     $("audio").play();
}

//FUNCTIONALITY FOR THE SMALL BUBBLES
//position IS UED TO SPECIFY THE SPAWN POINT
//float IS USED TO SPECIFY IF THE BUBBLE WILL FLOAT AFTER SPAWN OR IT WILL WAIT FOR ANOTHER ACTION TO FLOAT
//maxDelay IS USED TO SPECIFY THE TIMEFRAME IN WHICH THE RANDOM DELAY TIME WILL BE 
function spawnSmallBubble(idRef, position, float, maxDelay)
{
    //THE BUBBLE WILL SPAWN IN ONE OF THE TWO SPAWN POINTS. IF THE POSITION SPECIFIED WHILE CALLING THE FUNCTION IS NOT 1 OR 2 THE BUBBLE WILL SPAWN AT THE BOTTOM OF THE AQUARIUM
    if (position == 1)
        {
            $(idRef).offset({top: pos1Y, left: pos1X}).delay(Math.floor(Math.random() * maxDelay));
        }
    else if (position == 2)
        {
            $(idRef).offset({top: pos2Y, left: pos2X}).delay(Math.floor(Math.random() * maxDelay));
        }
    else
        {
            spawnBubble(idRef);
        }
    if(float == true)
        {
            floatSmallBubble(idRef, position, float, maxDelay);
        }
}

function floatSmallBubble(idRef, position, float, maxDelay)
{
    //THESE TWO VARIABLES ARE USED SO THE BUBBLE WILL MOVE SIDEWAYS WHILE FLOATING TOWARDS THE TOP
    var posX = $(idRef).offset().left;
    var randomY = Math.floor(Math.random() * 100)
    if(Math.random() < 0.5)
        {//THIS IF IS USED TO DETERMINE IN A RANDOM WAY IF THE BUBBLE WILL MOVE TO THE LEFT OR TO THE RIGHT
            $(idRef).animate({top: -25, left: posX - randomY}, bubbleSpeed, "swing",function() {spawnSmallBubble(this, position, float, maxDelay)}).delay(750);
        }
    else
        {
            $(idRef).animate({top: -25, left: posX + randomY}, bubbleSpeed, "swing",function() {spawnSmallBubble(this, position, float, maxDelay)}).delay(750);
        }
}

//SPAWNING AND CALLING THE FUNCTIONALITY FOR ALL BUBBLES
function animateBubbles()
{
    spawnBubble("#bubble1Id");
    spawnBubble("#bubble2Id");
    spawnBubble("#bubble3Id");
    $("#bubble1Id").on("click", function () {
        $("audio")[0].play();
        $("#bubble1Id").fadeOut();
        $("#bubble1Id").stop(true);
        spawnBubble("#bubble1Id");
    })
    $("#bubble2Id").on("click", function () {
        $("audio")[0].play();
        $("#bubble2Id").fadeOut();
        $("#bubble2Id").stop(true);
        spawnBubble("#bubble2Id");
                

    })
    $("#bubble3Id").on("click", function () {
        $("audio")[0].play();
        $("#bubble3Id").fadeOut();
        $("#bubble3Id").stop(true);        
        spawnBubble("#bubble3Id");
        
    })
    //SPAWNING SMALL BUBBLES IN BOTH SPAWN POINTS. EACH SPAWN POINT CONTAINTS 2 BUBBLES THAT FLOAT AUTOMATICALLY AND 3 BUBBLES THAT FLOAT ONLY WHEN CLICKING THE CORAL
    //SPAWN POINT 1
    spawnSmallBubble("#bubbleSm1Id", 1, true, 4000);
    spawnSmallBubble("#bubbleSm2Id", 1, true, 4000);
    spawnSmallBubble("#bubbleSm3Id", 1, false, 500);
    spawnSmallBubble("#bubbleSm4Id", 1, false, 500);
    spawnSmallBubble("#bubbleSm5Id", 1, false, 500);
    //SPAWN POINT 2
    spawnSmallBubble("#bubbleSm6Id", 2, true, 4000);
    spawnSmallBubble("#bubbleSm7Id", 2, true, 4000);
    spawnSmallBubble("#bubbleSm8Id", 2, false, 500);
    spawnSmallBubble("#bubbleSm9Id", 2, false, 500);
    spawnSmallBubble("#bubbleSm10Id", 2, false, 500);
}

animateBubbles();

//CORAL ANIMATIONS ON CLICK EVENT
$("#coral1Id").on("click", function () {
    $("#coral1Id").animate({height: "+=5px", top: "-=5px", left: "-=5px"}).delay(150).animate({height: "-=5px", top: "+=5px", left: "+=5px"});
    if ($("#bubbleSm3Id").offset().left == pos1X && $("#bubbleSm3Id").offset().top == pos1Y
        && $("#bubbleSm4Id").offset().left == pos1X && $("#bubbleSm4Id").offset().top == pos1Y
        && $("#bubbleSm5Id").offset().left == pos1X && $("#bubbleSm5Id").offset().top == pos1Y)
        {
            
            floatSmallBubble("#bubbleSm3Id", 1, false, 750);
            floatSmallBubble("#bubbleSm4Id", 1, false, 750);
            floatSmallBubble("#bubbleSm5Id", 1, false, 750);
            $("audio")[1].play();
        }
})

$("#coral2Id").on("click", function () {
    $("#coral2Id").animate({height: "+=5px", top: "-=5px", left: "-=5px"}).delay(150).animate({height: "-=5px", top: "+=5px", left: "+=5px"});
    if ($("#bubbleSm8Id").offset().left == pos2X && $("#bubbleSm8Id").offset().top == pos2Y
        && $("#bubbleSm9Id").offset().left == pos2X && $("#bubbleSm9Id").offset().top == pos2Y
        && $("#bubbleSm10Id").offset().left == pos2X && $("#bubbleSm10Id").offset().top == pos2Y)
        {
            floatSmallBubble("#bubbleSm8Id", 2, false, 750);
            floatSmallBubble("#bubbleSm9Id", 2, false, 750);
            floatSmallBubble("#bubbleSm10Id", 2, false, 750);
            $("audio")[1].play();
        }
})

$("#coral4Id").on("click", function() {
    $("#coral4Id").animate({height: "+=10px", top: "-=10px", left: "-=10px"}).delay(150).animate({height: "-=10px", top: "+=10px", left: "+=10px"});
})

// IONUT END


//Claudiu

//Orange fish moving and flipping on click
$(window).on("click", function (event) {
    $("#fish1Id").stop(true);
    var x = event.pageX - $("#fish1Id").width() / 2;
    var y = event.pageY - $("#fish1Id").height() / 2;
    
    
    var w = $(window).width() - $("#fish1Id").width() / 2.5;
    var h = $(window).height() - $("#fish1Id").height() / 3;
    
    
    if (x < $("#fish1Id").offset().left) {
        $("#fish1Id").css({
            "transform": "scaleX(-1)"
        }); //Using transform property from css along with scaleX for inverting the image.
    }
    else {
        $("#fish1Id").css({
            "transform": "scaleX(1)"
        });
    }
    
    
    if (x > (w - $("#fish1Id").width() / 2)) {
        x = w - $("#fish1Id").width() / 2;
    }
    if (x < -$("#fish1Id").width() / 10) {
        x = -$("#fish1Id").width() / 10;
    }
    if (y > (h - $("#fish1Id").height() / 2)) {
        y = h - $("#fish1Id").height() / 2;
    }
    if (y < - $("#fish1Id").height() / 5) {
        y =  - $("#fish1Id").height() / 5;
    }
    $("#fish1Id").animate({
            left: x
            , top: y
        }, {
            queue: false
        });
    window.setTimeout(movementOrange, 500);
    window.setTimeout(function(){ 
        $("#fish1Id").animate({
         height: "250"
        , width: "250"
        });
    }, 500);
      //Using queue : flase to be able to move the fish while its size is increased otherwise the script will wait for the increasing animation to finish and then will do the moving one
});
// Orange fish increasing size on double click
$("#fish1Id").on("dblclick", function () {
    $("#fish1Id").animate({
        height: "+=100"
        , width: "+=100"
        , top: "-=50"
        , left: "-=50"
    }).delay(2000).animate({
        height: "-=100"
        , width: "-=100"
        , top: "+=50"
        , left: "+=50"
    }); //I'm increasing the size with 100px but I'm also changing the position by half of the increasing number because in this way the animation will look like the fish doesn't change his position at all when increase or decrease, otherwise the animation will increase and  decrease from the top left corner
});
// Stingray1 changing position and flipping on click
$("#stingray1Id").on("click", function () {
    var distance = $(window).width() - $("#stingray1Id").width();
    var randomNumber = Math.floor(Math.random() * distance);
    if (randomNumber < $("#stingray1Id").offset().left) {
        $("#stingray1Id").css({
            "transform": "scaleX(-1)"
        });
    }
    else {
        $("#stingray1Id").css({
            "transform": "scaleX(1)"
        });
    }
    $("#stingray1Id").animate({
        left: randomNumber
    }, "slow", "swing");
});
// Stingray2 changing position and flipping on click
$("#stingray2Id").on("click", function () {
    var distance = $(window).width() - $("#stingray2Id").width();
    var randomNumber = Math.floor(Math.random() * distance);
    if (randomNumber < $("#stingray2Id").offset().left) {
        $("#stingray2Id").css({
            "transform": "scaleX(1)"
        });
    }
    else {
        $("#stingray2Id").css({
            "transform": "scaleX(-1)"
        });
    }
    $("#stingray2Id").animate({
        left: randomNumber
    }, "slow", "swing");
});

//CLAUDIU END


// CEZARY

//Orange Fish Movement -----------------------------------
function movementOrange() {
    var randomizeWidth1 = Math.floor(Math.random() * ($(window).width() - $("#fish1Id").width()));
    var randomizeHeigth1 = Math.floor(Math.random() * ($(window).height() - $("#fish1Id").height()));
    $("#fish1Id").animate({
        top: randomizeHeigth1
        , left: randomizeWidth1
    }, 9000, function () {
        movementOrange()
    });
    //Flipped IMG-----------
    if ($("#fish1Id").offset().left > randomizeWidth1) {
        $("#fish1Id").css({
            "transform": "scale(-1, 1)"
        });
    }
    if ($("#fish1Id").offset().left <= randomizeWidth1) {
        $("#fish1Id").css({
            "transform": "scale(1, 1)"
        });
    }
    //----------------------
}
$(document).ready(function () {
    movementOrange()
});
//------------------------------------------------------
//Blue Fish Movement -----------------------------------
function movementBlue() {
    var randomizeWidth2 = Math.floor(Math.random() * ($(window).width() - $("#fish2Id").width()));
    var randomizeHeigth2 = Math.floor(Math.random() * ($(window).height() - $("#fish2Id").height()));
    $("#fish2Id").animate({
        top: randomizeHeigth2
        , left: randomizeWidth2
    }, 9000, function () {
        movementBlue();
    });
    //Flipped IMG------------
    if ($("#fish2Id").offset().left > randomizeWidth2) {
        $("#fish2Id").css({
            "transform": "scale(-1, 1)"
        });
    }
    if ($("#fish2Id").offset().left <= randomizeWidth2) {
        $("#fish2Id").css({
            "transform": "scale(1, 1)"
        });
    }
    //----------------------
}
$(document).ready(function () {
    movementBlue()
});
//------------------------------------------------------
//Fishing Rod  -----------------------------------------
function fishingRod() {
    var randomizeWidth3 = Math.floor(Math.random() * ($(window).width() - $("#rod").width()));
    $("#rod").offset({
        left: randomizeWidth3
    });
    $("#rod").animate({
        top: 100
    }, 1000)
}
var myInterval = window.setInterval(plsWork, 500);
plsWork();

function plsWork() {
    var rodPos = {
        radius: 100
        , x: $("#rod").offset().left
        , y: $("#rod").offset().top + 460
    };
    var fishPos = {
        radius: 100
        , x: $("#fish2Id").offset().left
        , y: $("#fish2Id").offset().top
    };
    var dx = rodPos.x - fishPos.x;
    var dy = rodPos.y - fishPos.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    var sumRadius = rodPos.radius + fishPos.radius;
    window.setTimeout(function () {
        if (distance <= sumRadius) {
            $("#fish2Id").stop().animate({
                top: $("#rod").offset().top + 415
                , left: $("#rod").offset().left
            , }, 500).animate({
                top: -360
            }, 2000);
            window.clearInterval(myInterval);
            window.setTimeout(function () {
                $("#rod").animate({
                    top: -650
                }, 2000)
                $("#fish2Id").css({
                    "transform": "scale(1, -1)" && "rotate(20deg)"
                })
            }, 500);
        }
    }, 2000);
}
$(document).ready(function () {
    fishingRod();
});

//CEZARY END


// MARIA


// set random coordinates within the window frame
// define max height and width of window taking objects dimensions into account
// generate new coordinates within the window size
// using Math object with .floor method for rounding down and
// .random for generating a random value 0 < 1
function newPosition() {
    $("#fish2Id").stop(true);
    var height = $(window).height() - $("#fish2Id").height();
    var width = $(window).width() - $("#fish2Id").width();

    var newHeight = Math.floor(Math.random() * height);
    var newWidth = Math.floor(Math.random() * width);

    var newDimensions = [newHeight, newWidth];

    $("#fish2Id").animate({
        top: newDimensions[0],
        left: newDimensions[1]
    });
    window.setTimeout(movementBlue,500);
}

// set coordinates on mouseover
$("#fish2Id").on("mouseover", function () {
    newPosition();
});

// shark behaviour
// recursive function for iterating over animation
// achieved by adding and removing 4 pixels with delay of half a sec
function sharkMovement(IdRef) {
    $(IdRef).delay(500).animate({
        top: "+=4"
    }).delay(500).animate({
        top: "-=4"
    }, function () {
        sharkMovement(IdRef);
    });
}
sharkMovement($("#sharkId"));

// move shark with arrow keys within window
// jQuery window object with .on method with two parameters:
// the first parameter is the event keydown we want to respond to
// the second parameter is an anonymous function executed when keydown event occurs
// when keydown occurs the .stop method stops the currently running sharkMovement animation
// and the .attr method changes the src attribute of the jQuery object
$(window).on("keydown", function (event) {
    $("#sharkId").stop(true).attr("src", "images/excitedShark.svg");

    // variables defining the max width and heigth of the window
    // the .offset method retrieves the current position
    // of the shark object relative to the document
    var maxHeight = $(window).height() - $("#sharkId").height();
    var maxWidth = $(window).width() - $("#sharkId").width();
    var sharkX = $("#sharkId").offset().left;
    var sharkY = $("#sharkId").offset().top;

    // decision structure for each key arrow using the keyCode property
    // determing whether the shark object is within the max frame or not
    // adding or removing 4 pixels from current position depending on max width and height of window
    if (event.keyCode == 39) {
        if (sharkX >= maxWidth) {
            sharkX -= 10;
        }
        sharkX += 10;
    }
    if (event.keyCode == 37) {
        if (sharkX <= 0) {
            sharkX += 10;
        }
        sharkX -= 10;
    }
    if (event.keyCode == 38) {
        if (sharkY <= 0) {
            sharkY += 10;
        }
        sharkY -= 10;
    }
    if (event.keyCode == 40) {
        if (sharkY >= maxHeight) {
            sharkY -= 10;
        }
        sharkY += 10;
    }

    // sets the offset coordinates of the shark relative to the document
    $("#sharkId").offset({
        left: sharkX
    });

    $("#sharkId").offset({
        top: sharkY
    });
});

// --- Source and inspiration by Codepen.io 
// --- https://codepen.io/cmrector/pen/zMmgoz
// named function detecting collision betweem two objects returning a boolean value
// the two objects detected for collision are passed as parameters to the function
// variables for storing the X and Y coordinates, height and width for each object
// if statement returning a boolean value determined by whether the sum of top + width and
// left + height with respect to the document of the first object is smaller than the coordinates of the second object
function collision(sharkObject, fishObject) {

    var objectOne = $(sharkObject);
    var objectTwo = $(fishObject);

    var objectOneX = objectOne.offset().left;
    var objectOneW = objectOne.width();
    var objectOneY = objectOne.offset().top;
    var objectOneH = objectOne.height();

    var objectTwoX = objectTwo.offset().left;
    var objectTwoW = objectTwo.width();
    var objectTwoY = objectTwo.offset().top;
    var objectTwoH = objectTwo.height();

    if (objectOneY + objectOneH < objectTwoY ||
        objectTwoY + objectTwoH < objectOneY ||
        objectTwoX + objectTwoW < objectOneX ||
        objectOneX + objectOneW < objectTwoX) {
        return false;
    } else {
        return true;
    }
}

// document jQuery object with keydown event with an anonymous function
// jQuery selection with all elements with class attribute fish
// .each() method applies the same code to each element in the selection
// if the collision method returs true, the touched fish object fades out
$(document).keydown(function () {
    $(".fish").each(function () {
        if (collision("#sharkId", $(this))) {
            $(this).stop(true);
            $(this).fadeOut();
        }
    })
});
//MARIA END