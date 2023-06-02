//introducing the variables 
var jet, jet_flying, jet_sound, sky, sky_moving, points, ammunition, prshield, restartsp, restartImg, jet_stop;
var fighterh, fighterv, fitrh1, fitrh2, fitrh3, fitrv4, fitrv5, fitrv6, ftrh, ftrv, randst, clouds_grp, fighterh_grp, fighterv_grp, gameoverImage, gameover;
var jet_move, jet_crash, jet_chkpoint, jet_stars, createammo, createshld, ammo_grp, shld_grp, ammun; 
var rand_clouds, cloud, cloud_running, sky_inv;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var sound1 = "playsound";

//preloading the graphics of the jet for flying 
function preload(){
  jet_flying = loadAnimation ("MYJET.png");
  jet_sound = loadSound ("plane_flying.mp3");
  sky_moving = loadImage ("Bluesky.jpg");
  jet_stop = loadAnimation ("MYJETcrshd.png");
  jet_crash = loadSound ("crash.mp3");
  jet_move = loadSound ("jump.mp3");
  jet_chkpoint = loadSound ("checkpoint.mp3");

// preloading clouds, ammunition, shield and fighterplane graphics
  cloud1 = loadImage ("Large-cloud1.png");
  cloud2 = loadImage ("Large-cloud2.png");
  cloud3 = loadImage ("Large-cloud3.png");

  ammunition = loadImage ("ammo-pack.png");
  prshield = loadImage ("C_Am_Shield.png")

  fitrh1 = loadImage ("aircraft4left.png");
  fitrh2 = loadImage ("aircraft5left.png");
  fitrh3 = loadImage ("aircraft6left.png");
  fitrv4 = loadImage ("aircraft1up.png");
  fitrv5 = loadImage ("aircraft2up.png");
  fitrv6 = loadImage ("aircraft3up.png");
  
  gameoverImage = loadImage ("crashimg.png");
  restartImg = loadImage ("restart.png");
}

//creating the canvas, jet and sky sprites for the setup
function setup() {

  //creating the canvas on full screen where the jet flies
  createCanvas(windowWidth, windowHeight);
   //initialising the points and ammunition as 0 
  points = 0;
  ammun = 0;
  jet_sound.loop(); 
 sky_inv = createSprite (width/2, height/2-30, 30, height*6);
 
   //creating the sky sprite
  sky = createSprite(width/2,height/2,width,height*6);
  sky.addImage ("SKYMOVING", sky_moving);
  sky.scale = 1.5;
  sky.velocityY = 3;
   sky_inv.visible = false; 
 
  //create a jet sprite
    jet = createSprite(width/2, height-30, 80, 40);
 
    //jet animation 
    jet.addAnimation ("JETMOVING", jet_flying);
    jet.addAnimation ("JETSTOPPED", jet_stop);
    //resizing the jet to the canvas
    jet.scale = 0.45;
    fighterh_grp = createGroup();
    fighterv_grp = createGroup();
    clouds_grp = createGroup(); 
    ammo_grp = createGroup();
    shld_grp = createGroup();

    gameover = createSprite (width/2,(height/2)-80, 290, 85);
    gameover.addImage (gameoverImage);
    gameover.scale = 0.8;
   //    jet.setCollider ("circle", 0, 0, 150);
   //    jet.debug = true;
  restartsp = createSprite (width/2,(height/2)+ 90, 200, 55);
  restartsp.addImage (restartImg);
  restartsp.scale = 0.35;
    
    }

function draw(){

  //creating background
  background("light blue");
  drawSprites();  
//  sound1 = "playsound" ;
  //giving a title to the game
  console.log(sound1); 
  textSize(40);
  fill("red");
     text("JET FIGHTER GAME", (width/2)-180, 35); 

  //putting the points  and Ammunition on top left   
  fill("black");
   textSize(16);
   text ("POINTS : "+ points, 40, 45); 
   text ("AMMUNITION : "+ ammun, 37, 65);

   if (gamestate ==PLAY) 
   {
    
    jet.x = World.mouseX; 
  //  jet.y = World.mouseY; 

    if (keyDown ("up") || (touches.length >0))
    {
      //assigning the Y velocity to the jet on pressing UP key
      jet.velocityY = -6;
       jet_move.play();
       touches = [];

     }
     if (keyDown ("down") || (touches.length >0))
     {
       //assigning the Y velocity to the jet on pressing UP key
       jet.velocityY = 6;
        jet_move.play();
        touches = [];
      }  
    
    
   // adding the points according to the framecounts covered
      points = points + Math.round(frameCount/100);

    if ((points % 200 === 0) && (points > 0))
    {
      jet_chkpoint.play() ; 
    }
    gameover.visible = false;
   restartsp.visible = false;
   
   sky.velocityY = (4 + 2 * (points/200));
   
   if (sky.y > 230) {
     sky.y = sky.height/2;
       } 
      
       jet.collide (sky_inv);

         //calling the functions rand_clouds, fighterv, fighterh, shield and ammunition 
      rand_clouds();
      fighterh();
      fighterv();
      createshld();
      createammo();
     
      if (ammo_grp.isTouching(jet)) {
        ammo_grp.destroyEach();
        ammun=ammun+50;
      }
      else if (shld_grp.isTouching(jet)) {
        shld_grp.destroyEach();
        points=points+1000;
         } 
      else if ((fighterh_grp.isTouching(jet)) || (fighterv_grp.isTouching(jet)))
        {
        gamestate = END;
      }
     
    }
      if (gamestate == END)
      {
    gameover.visible = true;
    restartsp.visible = true; 
   
    sky.velocityY = 0;
    jet.velocityX = 0;
    jet.velocityY = 0;
    jet_sound.stop();
    jet.changeAnimation("JETSTOPPED", jet_stop);
    jet_crash.play();
    clouds_grp.setVelocityYEach (0);
    ammo_grp.setVelocityYEach (0);
    shld_grp.setVelocityYEach (0);
    fighterh_grp.setVelocityXEach (0);
    fighterv_grp.setVelocityYEach (0); 

    clouds_grp.setLifetimeEach(-1);
    fighterh_grp.setLifetimeEach(-1);
    fighterv_grp.setLifetimeEach(-1);
    ammo_grp.setLifetimeEach(-1);
    shld_grp.setLifetimeEach(-1);
                                                                                                                                                                                                                                                                                                                                        
        
    if (mousePressedOver (restartsp))
    {
      restartgm();
    }
   }
  }

 function rand_clouds() 
{
if (frameCount % 120 === 0) 
{
  cloud = createSprite (width/2, 10, 60, 20);
  cloud.scale = 0.9;
  cloud.velocityY  = 9;
  
  cloud.x = Math.round(random(25,width-20));

//adjusting the cloud depth
cloud.depth = jet.depth;
jet.depth = jet.depth + 1;
clouds_grp.add(cloud);

var rand = Math.round(random(1,3));

//adding random images to clouds
if (rand == 1) 
{
  cloud.addImage ("1st_Cloud", cloud1);}
  else if (rand == 2) 
  {
    cloud.addImage ("2nd_Cloud", cloud2);}
    else 
     {
      cloud.addImage ("3rd_Cloud", cloud3);} 
    
      cloud.lifetime = 720;
    }
    
  } 

function restartgm ()
{
  //create a function restart 
  gamestate = PLAY;
  jet_crash.stop();
  gameover.visible = false;
  restartsp.visible = false;
  fighterh_grp.destroyEach();
  fighterv_grp.destroyEach();
  clouds_grp.destroyEach();
  ammo_grp.destroyEach();
  shld_grp.destroyEach();
  
  points = 0;
  ammun=0;
  
  jet.changeAnimation("JETMOVING", jet_flying);
  
}

function fighterh() 
{
  if (frameCount % 80 === 0) 
  {
  //creating fighterh sprite and group
   
   // ftrh = createSprite (width-10, 265, 50, 20);
   ftrh = createSprite (width,Math.round(random(50, height-50)), 30, 30);
    ftrh.scale = 0.35;
    ftrh.velocityX  = -9;
    
   // ftrh.y = Math.round(random(10, height-10));
    ftrh.lifetime = 700; 
    fighterh_grp.add(ftrh);


 //generating random horizontal fighters on the screen
 var randhst = Math.round(random(1,3));
 
 //adding random images to the obstacles
  switch (randhst)
  {
  case 1: ftrh.addImage ("1st_FIGHTERH", fitrh1);
          break;
  case 2: ftrh.addImage ("2nd_FIGHTERH", fitrh2);
          break;
  case 3: ftrh.addImage ("3rd_FIGHTERH", fitrh3);
          break;
  default: break;
        }  
    }
  } 

function fighterv() 
{
  if (frameCount % 130 === 0) 
  {
  //creating fighterv sprite and group
    //ftrv = createSprite (550, 10, 20, 50);
    ftrv = createSprite (Math.round(random(50, width-50)), 10, 30, 30);
    ftrv.scale = 0.35;
    ftrv.velocityY  = 7;
    
    //ftrv.x = Math.round(random(30, width-30));
    ftrv.lifetime = 700; 
    fighterv_grp.add(ftrv);

 //generating random vertical fighters on the screen
 var randvst = Math.round(random(1,3));
 
 //adding random images to the fighters
  switch (randvst)
  {
  case 1: ftrv.addImage ("1st_FIGHTERV", fitrv4);
          break;
  case 2: ftrv.addImage ("2nd_FIGHTERV", fitrv5);
          break;
  case 3: ftrv.addImage ("3rd_FIGHTERV", fitrv6);
          break;
  default: break;
        }  
    }
  } 

  function createshld() {
    if (World.frameCount % 320 == 0) {
    var shield = createSprite(Math.round(random(50, width-50)),20, 20, 20);
    shield.addImage("Protective Shield", prshield);
    shield.scale=0.15;
    shield.velocityY = 5;
    shield.lifetime = 600;
    shld_grp.add(shield);
    }
  }
  
  function createammo() {
    if (World.frameCount % 410 == 0) {
    var ammuntn = createSprite(Math.round(random(50, width-50)), 30, 30, 30);
    ammuntn.addImage("Ammunition pack", ammunition);
    ammuntn.scale=0.35;
    ammuntn.velocityY = 7;
    ammuntn.lifetime = 600;
    ammo_grp.add(ammuntn);
    }
  }
  