var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jellyfish,jelly_img
var plastic,plastic_img
var turtle,turtle_img
var bg,bg_img
var coral,coral_img
var home,home_img
var restart,restart_img
var jelliesGroup,plasticsGroup
var score


var gameOver,reset;



function preload(){

  
  jellyfish_img = loadImage("pics for game/jelly.png");
  
  plastic_img = loadImage("pics for game/plastic.png");
  
  
  coral_img= loadImage("pics for game/coral.png");

  bg_img= loadImage("pics for game/underwater-image.png");

  turtle_img= loadImage("pics for game/turtle.png");

  home_img= loadImage("pics for game/home.png");

  restart_img= loadImage("pics for game/reset.png");



}

function setup() {
  createCanvas(1500, 400);
  
   
  bg = createSprite(100,120,10,10);
  bg.addImage("underwater",bg_img);
  bg.scale=1.5
  bg.x = bg.width/2;
  bg.velocityX=-3
  
  coral = createSprite(1200,200,400,20);
  coral.addImage("corals",coral_img);
  coral.scale = 0.8;
  coral.visible=false

  home = createSprite(700,100,400,20);
  home.addImage("words",home_img);
  home.scale = 0.95;
  home.visible=false

  restart= createSprite(700,200,400,20);
  restart.addImage("restart",restart_img);
  restart.scale = 0.5;
  restart.visible=false
    


 jelliesGroup = new Group();
 plasticsGroup = new Group();


  turtle = createSprite(300,-140,10,10);
  turtle.addImage("turtles",turtle_img);
  turtle.scale=0.6

  
  turtle.debug=true

  turtle.setCollider("rectangle",0,0,300,150)


  
  score=0 ;

}

function draw() {
  background("black")

 if (gameState===PLAY){
  
  turtle.x=200
  turtle.y=mouseY

  if (bg.x < 0){
    bg.x = bg.width/2;
  }

  spawnPlastics();
  spawnJellies();

   if (jelliesGroup.isTouching(turtle)){
    score=score+1
  }

    if(plasticsGroup.isTouching(turtle)){  
     score=score-2
    }
     if (score>=3){
       gameState=END
     }

 }

 else if (gameState === END) {
   coral .visible=true
   jelliesGroup.destroyEach();
   plasticsGroup.destroyEach();
   turtle.velocityX=0
   turtle.velocityY=0
   home.visible=true

   restart.visible=true

   bg.velocity=0

   if(mousePressedOver(restart)) {
    reset();
  }




  }


    
    drawSprites();

    textSize(30)
    text("Score: "+ score,1300,60);
  }
 
  
    
    
    

  
 
  



function spawnPlastics() {
  //write code here to spawn the plastics
  if (frameCount %  80=== 0) {
    plastic = createSprite(1550,100,10,10);
    plastic.addImage("plastics",plastic_img);
    plastic.y = Math.round(random(50,350));
    plastic.scale=0.1
    plastic.velocityX = -13;
    
     //assign lifetime to the variable
    plastic.lifetime = 1040;
    
    //adjust the depth
    plastic.depth = turtle.depth+1;
    turtle.depth = turtle.depth;
     //add each plastic to the group
     plasticsGroup.add(plastic);
    
  }
  
}


function spawnJellies() {
  //write code here to spawn the plastics
  if (frameCount %  100=== 0) {
    jellyfish = createSprite(1550,140,10,10);
    jellyfish.addImage("jellies",jellyfish_img);
    jellyfish.y = Math.round(random(50,350));
    jellyfish.scale=0.50
    jellyfish.velocityX = -13;
    
    jellyfish.debug=true
     //assign lifetime to the variable
     jellyfish.lifetime = 1300;
    
    //adjust the depth
    jellyfish.depth = turtle.depth+1;
    turtle.depth = turtle.depth;
    
   //add each jelly to the group
   jelliesGroup.add(jellyfish);
    
  jellyfish.setCollider("rectangle",-60,0,100,100)
   
  }
  
}
    
    

function reset(){
  gameState = PLAY;

  reset.visible = false;
  // make coral reset and text not visible and velocity start again
  score = 0;
  
}
