var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg,bgimg;
var caveman,cavemanimg,cavemandie;
var title,titleimg;
var bowandarrow, bowandarrowimg,baGroup;
var gold,goldimg, goldGroup;
var chicken,chickengimg,chickenGroup;
var mace, maceimg, maceGroup;
var edges;
var dino,dinoimg,dinoGroup;
var score;




function preload(){
bgimg = loadImage("Images/bg.jpg");
cavemanimg = loadAnimation("Images/caveman 1.png","Images/caveman 2.png","Images/caveman 3.png","Images/caveman 4.png","Images/caveman 5.png","Images/caveman 6.png")  
titleimg = loadImage("Images/title.png");
jump = loadImage("Images/jump.png");
bowandarrow = loadImage("Images/bowandarrow.png");
gold = loadImage("Images/gold.png");
mace = loadImage("Images/mace.png");
chicken = loadImage("Images/chicken.png");
dinoimg = loadAnimation("Images/dino1.png","Images/dino2.png","Images/dino3.png","Images/dino4.png");
cavemandie = loadImage("Images/die.png");
}


function setup() {
  createCanvas(800, 600);
  edges - createEdgeSprites();
 bg = createSprite(450,250);
 bg.addImage("background",bgimg);
 

 caveman = createSprite(100,500);
 caveman.addAnimation("Player",cavemanimg);

 caveman.scale = 0.9;
 
 baGroup = new Group();
 chickenGroup = new Group();
 maceGroup = new Group();
 goldGroup = new Group(); 
 dinoGroup = new Group();

 title = createSprite(130,100);
 title.addAnimation("Title",titleimg);
 title.scale = 0.7;

 score = 0;
}

function draw() {
 background(0);

 if(gameState === PLAY){
  bg.velocityX = -3;
  if (bg.x < 70){
    bg.x = bg.width/2;
   }
   
   if(keyDown("SPACE")&& caveman.y >=300){
    caveman.addAnimation("jumping",jump);
    caveman.changeAnimation("jumping",jump);
    caveman.velocityY = -5;
   
    }
    caveman.velocityY = caveman.velocityY = 0.8;
    spawnChicken();
  spawnMace();
  spawnGold();
  spawnBowandarrow();
  dinosaur();

  if(dinoGroup.isTouching(caveman)){
  gameState = END;
  }

 }
 else if(gameState === END){
 bg.velocityX = 0;
 caveman.velocityY = 0;

 caveman.addImage("die",cavemandie);
 caveman.changeImage("die",cavemandie);
 goldGroup.setVelocityXEach(0);
 maceGroup.setVelocityXEach(0);
 chickenGroup.setVelocityXEach(0);
 baGroup.setVelocityXEach(0);
 dinoGroup.setVelocityXEach(0);

 goldGroup.setLifetimeEach(-1);
 maceGroup.setLifetimeEach(-1);
 chickenGroup.setLifetimeEach(-1);
 baGroup.setLifetimeEach(-1);
 dinoGroup.setLifetimeEach(-1);
 dinoGroup.destroyEach();


 }
 caveman.collide(edges);
  
 drawSprites();
textSize(25);
fill("white");
text("Score : "+score,300,300)

if(goldGroup.isTouching(caveman)){
score = score + 10;
goldGroup.destroyEach();
}
if(chickenGroup.isTouching(caveman)){
  score = score + 10;
  chickenGroup.destroyEach();
  }
  if(maceGroup.isTouching(caveman)){
    score = score + 10;
    maceGroup.destroyEach();
    }
    if(baGroup.isTouching(caveman)){
      score = score + 10;
      baGroup.destroyEach();
      }
}

function spawnChicken(){
if(frameCount%60 === 0){
var chicken = createSprite(700,500,40,40);
chicken.addImage("obstacle",chickenimg);
chicken.velocityX = -3;
chicken.lifetime = 300;
chickenGroup.add(chicken);
}
}

function spawnMace(){
  if(frameCount%60 === 0){
  var mace = createSprite(760,500,40,40);
  mace.addImage("obstacle2",maceimg);
  mace.velocityX = -3;
  mace.lifetime = 300;
  maceGroup.add(mace);
  }
  }

  function spawnGold(){
    if(frameCount%60 === 0){
    var gold = createSprite(800,500,40,40);
    gold.addImage("obstacle3",goldimg);
    gold.velocityX = -3;
    gold.lifetime = 300;
    goldGroup.add(gold);
    }
    }

    function spawnBowandarrow(){
      if(frameCount%60 === 0){
      var bowandarrow = createSprite(840,500,40,40);
      bowandarrow.addImage("obstacle4",bowandarrowimg);
      bowandarrow.velocityX = -3;
      bowandarrow.lifetime = 300;
      baGroup.add(bowandarrow);
      }
      }

      function dinosaur(){
      if(frameCount%300 === 0){
      dino = createSprite(400,500,70,50);
      dino.addAnimation("dinosaur",dinoimg);
      dino.velocityX = -3;
      dino.lifetime = 300;
      dinoGroup.add(dino);
      }
      }
