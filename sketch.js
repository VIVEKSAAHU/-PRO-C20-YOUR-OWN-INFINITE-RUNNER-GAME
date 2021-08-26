//Variables 
var biker,bikerImg;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var car,carImg,carGroup;
var gameOverImg,gameover;
var road,roadImg;
var color;
var rightline;

function preload(){
    bikerImg = loadImage("BIKER.jpg");
    carImg = loadImage("CAR FOR PROJECT.png");
    gameOverImg = loadImage("gameover.png");
    roadImg = loadImage("path.png")
}
function setup() {
    biker = createSprite(200,325);
    biker.addImage(bikerImg);
    biker.scale = 0.5;
    gameover = createSprite(200,200);
    gameover.addImage(gameOverImg);
    road = createSprite(150,200);
    road.scale = 1
    road.addImage(roadImg);
    color = createSprite(200,200,400,400);
    color.shapeColor = "grey";
    rightline = createSprite(305,200,2,400);
    rightline.shapeColor = "black";
    carGroup = new Group();
}
function draw() {
    background(0);
    createCanvas(400,400);
    edges = createEdgeSprites();
    biker.collide(edges);
    if (gamestate === PLAY) {
        if (keyDown("LEFT_ARROW")) {
            biker.x = biker.x -5;
        }
        if (keyDown("RIGHT_ARROW")) {
            biker.x = biker.x +5;
        }
        cars();
        if (carGroup.isTouching(biker)) {
            gamestate = END;
        }
        road.velocityY = +3;
        if (road.y > 400) {
            road.y = 200;
        }
        road.depth -=100;
        color.depth -=100;
        gameover.visible = false;
        color.visible = false;
    }
    drawSprites();

    if (gamestate == END) {
        carGroup.destroyEach();
        carGroup.setVelocityYEach(0);
        carGroup.setLifetimeEach(-1);
        biker.x = 200;
        biker.y = 200;
        biker.visible = false;
        gameover.visible = true;
        color.visible = true;
        rightline.visible = false;
        road.setVelocity(0,0);
        road.visible = false;
        if (keyDown("space")) {
            reset();
        }
    }
}

function cars () {
    if (frameCount % 100 == 0) {
        car = createSprite(Math.round(random(65,320),40));
        car.addImage(carImg);
        car.velocityY = 3;
        car.scale = 0.3;
        car.lifetime = 250;
        car.depth = biker.depth
        biker.depth +=100;
        carGroup.add(car);
    }
}
function reset () {
    gamestate = PLAY;
    road.visible = true;
    biker.visible = true;
    rightline.visible = true;
}