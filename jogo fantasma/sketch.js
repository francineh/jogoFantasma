//variaveis d

var towerImg, tower;
//variaveis da porta
var doorImg, door, doorsGroup;
//grades em baixo da porta
var climberImg, climber, climbersGroup;
// variaveis fantasma
var ghost, ghostImg;

var invisibleBlockGroup, invisibleBlock;
//variaveis do game state
var gameState = "play"

function preload(){
  //load das variaveis.
  towerImg = loadImage("tower.png");
  // porta
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  //grupo da porta
  doorsGroup = new Group();
  
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  //fantasma
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
//gravidade    
    ghost.velocityY = ghost.velocityY + 0.8
    //tornar infinita
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    //climbersGroup.collide(ghost);
    
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fim de Jogo", 230,250)
  }

}


function spawnDoors() {
  //escreva aqui o código para gerar as portas na torre
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
   //mais profundidade ao fantasma que a porta.
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //designe tempo de vida a variável
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //adicione cada porta ao grupo
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

