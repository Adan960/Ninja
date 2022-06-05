var ninjaGirl;
var ninjaGirlImg,ninjaGirlParadaEsquerdaImg;
var backgroundImg;
var ninjaGirlCorrendoDireita;
var ninjaGirlCorrendoEsquerda;
var ninjaGirlAtacandoDireita;
var pos = "direita";
var invisibleGround;
var ninjaGirlJumpDireita;
var ninjaGirlJumpEsquerda;
var adaga;
var adagaImg;
var contAdaga = 3;
var conAdaga;
var contaAdaga;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
// colocar "Body"
const body = Matter.Body;

function preload()
{
  ninjaGirlImg = loadImage("girlparada.gif");
  backgroundImg = loadImage("background1.gif");
  ninjaGirlCorrendoEsquerda = loadImage("girlcorrendoesquerda.gif");
  ninjaGirlCorrendoDireita = loadImage("girlcorrendodireita.gif");
  ninjaGirlParadaEsquerdaImg = loadImage("girlparadaesquerda.gif");
  ninjaGirlAtacandoDireita = loadImage("girlatacandodireita.gif");
  ninjaGirlJumpDireita = loadImage("Jump.png");
  ninjaGirlJumpEsquerda = loadImage("JumpE.png");
  adagaImg = loadImage("Kunai.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);


	engine = Engine.create();
	world = engine.world;

	//Crie os Corpos aqui.

	ninjaGirl = createSprite(windowWidth/5, windowHeight/2,20,20);
	ninjaGirl.addImage(ninjaGirlImg);
	ninjaGirl.scale = 0.5;

	World.add(world, ninjaGirl);

	invisibleGround = createSprite(width/2,height-10,width,125);
	invisibleGround.visible = false;

  contaAdaga = createSprite(100,240,10,10);

  conAdaga = createSprite(500,240,10,10);


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(backgroundImg);
  ninjaGirl.velocityY += 1.85;
  ninjaGirl.collide(invisibleGround);

  drawSprites();

  console.log(contAdaga);
  if(contAdaga < 4){
    contaAdaga.velocityX = 1;
  }
  else{
    contaAdaga.velocityX = 0;
  }
  if(contaAdaga.x > 500){
    contAdaga++;
    contaAdaga.x = 100;
  }
  if(keyDown("w") && ninjaGirl.y >= height/1.4){
	ninjaGirl.velocityY = -30;
  }
  if(ninjaGirl.y <= height/1.4 && pos != "esquerda"){
    ninjaGirl.addImage(ninjaGirlJumpDireita);
  }
  if(ninjaGirl.y <= height/1.4 && pos != "direita"){
    ninjaGirl.addImage(ninjaGirlJumpEsquerda);
  }

  if(keyDown("A")){
    ninjaGirl.position.x = ninjaGirl.position.x -10;
	  pos = "esquerda";
  if(ninjaGirl.y > height/1.4){
    ninjaGirl.addImage(ninjaGirlCorrendoEsquerda); 
  }
  }
  if(keyDown("D") && pos != "ataque"){
    ninjaGirl.position.x = ninjaGirl.position.x +10;
    pos = "direita";
    if(ninjaGirl.y > height/1.4){
      ninjaGirl.addImage(ninjaGirlCorrendoDireita); 
    }
  }
  if(keyDown("O")){
	ninjaGirl.addImage(ninjaGirlAtacandoDireita);
  }
  if(keyDown("P") && contAdaga > 0){
    createAdaga();
    contAdaga --;
    }
  if(!keyDown("D") && !keyDown("A") &&  !keyDown("O") && !keyDown("W") && ninjaGirl.y > height/1.4 && pos == "direita"){
	ninjaGirl.addImage(ninjaGirlImg);
  }
  if(!keyDown("D") && !keyDown("A") &&  !keyDown("O") && !keyDown("W") && ninjaGirl.y > height/1.4 && pos == "esquerda"){
	ninjaGirl.addImage(ninjaGirlParadaEsquerdaImg);
}
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight); 
}
function createAdaga () {
  adaga = createSprite(100,100,50,50);
  adaga.addImage(adagaImg);
  adaga.velocityX = 17;
  adaga.x = ninjaGirl.x;
  adaga.y = ninjaGirl.y;
  adaga.lifetime = 80;
}