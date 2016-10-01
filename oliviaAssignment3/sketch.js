//global variables

var shape = 0;
var squareSides = 50; //length of sides for the four corner squares

var x = 50;
var y = 50;

var squareSpeed = 0;
var gravity = 0.1;

var isShrinking = true; 
var rectLength = 80;
var rectWidth = 100;

var move = 0;


//main setup for window
function setup() {
  
  createCanvas(600, 600);
  background(200, 127, 12);
  frameRate(5); //slows down frames so that the changing colors of the circle are visible

  
}


//for shape creation
function draw() {
  
  background(200, 127, 12);
  //circle

  if (shape == 1) {                            //if the mouse has been clicked, create a circle with arbitrary colors
    for (var d = width; d > 0; d -= 20) {     //loop creates a series of circles
      circleAppear(d, d);
    }
  }

  if (keyIsPressed) {
    if (key == 'm') {    //if m is pressed on keyboard, move the big triangle and quadrilaterals to the right
      move += 50;
    //  println(move);
    }
    if (move == 150){   // if these shapes reach the end of the screen, move to the left
      move -= 50;
      move = -150;
    }
  }

  moveShapes(move);    // function call to move the shapes

  triangleRotate(90);  //function call to make small triangle rotate in an interval of 90 degrees
  
  rectShrink(rectLength, rectWidth); //function call to shrink rectangles

  if (keyIsPressed) {
    if (key == 's') {                              // if s is pressed on the keyboard, shrink the rectangles by a factor of 5
      if (isShrinking) {
        rectLength -= 5;
        //println(rectLength);
        rectWidth -= 5;
        //println(rectWidth);
        if (rectWidth < 0 || rectLength < 0) {    // if the rectangle width and length has reached a negative value,
          rectLength = 0;                         // set the width and length to 0 (this makes the rectangles disappear
          rectWidth = 0;                          // once they have fully shrunk)
        }
      }
    }
    if (key == 'r') {                             // if r is pressed on the keyboard, make the rectangles reappear
      rectLength = 80;
      rectWidth = 100;
    }
  }

  squaresGravity(x, y, squareSides, squareSides);   //function call to apply gravity to corner squares

  y = y + squareSpeed;                              //make squares "fall", mimicking gravity
  //console.log(y);
  squareSpeed = squareSpeed + gravity;

  if (y > height || y == height) {                  //when squares reach the bottom, they'll go back up and 
    squareSpeed = squareSpeed * -0.95;              //the speed will be decresead every time
    // y = height;
    y = 50; //goes back to initial position
  }

}



function circleAppear(diam1, diam2) {       // this function creates a cricle whose size while vary depending on 
  var x = diam1;                            // the input given
  var y = diam2;
  stroke(0);
  fill(random(80), random(80), random(80)); //color of each circle changes randomly
  ellipseMode(CENTER);
  ellipse(300, 300, x, y);
}

function triangleRotate(degree) {         //function to rotate small triangle at a given degree
  var a = degree;
  push();                                 //within matrix, translates grid in order to achieve rotating effect
  translate(width / 2, height / 2);
  rotate(frameCount * radians(a) / 10);   // adds motion to rotation
  translate(0, 0);                        //rotation around origin
  fill(5, 5, 5);
  triangle(-50, 50, 0, -50, 50, 50);      //rotating triangle
  pop();
}

function squaresGravity(locX, locY, s1, s2) {    //function to make squares "fall" by applying a particular speed
  var x = locX;
  var y = locY;
  var w = s1;
  var z = s2;
  fill(237, 119, 60);
  rectMode(CENTER);
  rect(x + 500, y + 500, s1, s2);
  rect(x, y + 500, s1, s2);
  rect(x, y, s1, s2);
  rect(x + 500, y, s1, s2);
}

function rectShrink(l, w) {                     //function that creates rectangles with length and width as parameters.
  var x = l;                                    //Will be manipulated in draw() to create a shrinking effect.
  var y = w;
  fill(222, 237, 60);

  //upper rectangle
  rectMode(CENTER);
  rect(300, 75, y, x);

  //left side rectangle
  push();
  translate(45, 375); //translates the coordinate system's origin
  rotate(radians(345)); //rotates the grid
  rectMode(CORNERS);
  rect(0, 0, x, y); //draws the rotated rectangle
  pop();

  //right side rectangle
  push();
  translate(485, 365);
  rotate(radians(25));
  rectMode(CORNERS);
  rect(0, 0, x, y);
  pop();
}

function moveShapes(loc) {                                      // function used to translate a group of shapes (big triangle
  var m = loc;                                                  // and quadrilaterals) given a translation value
  
  //big triangle
  fill(22, 7, 247);
  triangle(150 + m, 400, 300 + m, 150, 450 + m, 400);


  //quadrilaterals surrounding big triangle
  stroke(0);
  fill(18, 179, 198);
  quad(200 + m, 315, 140 + m, 230, 200 + m, 120, 265 + m, 210);
  quad(400 + m, 315, 500 + m, 325, 435 + m, 220, 335 + m, 210);
  quad(190 + m, 490, 230 + m, 400, 360 + m, 400, 320 + m, 485);
}

function mousePressed() { //on mouse click, the block of code inside the if statement is executed.
  while (shape < 1) {
    shape++;              
  }
}