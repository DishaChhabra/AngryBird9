const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var attached = 0;
var launched = 1;

var gameState = 0;

var score = 0;

function preload() {
    getTime()
    bg3 = loadImage("sprites/bg_default.jpg")
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

//PI = 180 degrees
    ground = new Ground(600,height,1200,20);
    wall = new Ground(1200,200,20,700);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});

    
}

function draw(){
    if(backgroundImg){
     background(backgroundImg);
    } else{
     background(bg3)
    }
    textSize(25)
    text("Score = " + score, 1050,40)
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score()
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score()
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display(); 
    
}

function mouseDragged(){
    if(gameState === 0 && mouseX>=0 && mouseX<200){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = 1;
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed<3){
        Matter.Body.setPosition(bird.body, {x:200, y:50})
        slingshot.attach(bird.body);
        // no values, i.e it is cleared out
        bird.array = []
        gameState = 0
    }
}
// async is for a function to wait for its turn, otherwise it can show error
// json = java script object notation
async function getTime(){
    // await is wait for this particular info
    // fetch is for getting info from the link
    var information = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    // we want data in json form
    var infoType = await information.json()
    // filterind date and time
    var dateAndTime = infoType.datetime
    // cut the information, and get only the one you want
    // ending won't be included
    var time = dateAndTime.slice(11,13)
    //console.log(time)

    if(time>=6 && time<=18){
        bg = "sprites/bg.png"
    } else{
        bg = "sprites/bg2.jpg"
    }

    backgroundImg = loadImage(bg)
}