song="";
leftWristX=0;
leftWristY=0;
rightWristY=0;
rightWristX=0;
scoreLeftwrist=0;
scoreRightwrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.position(560,150);
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("poseNet has been intialized");
}
function gotPoses(results){
    if (results.length>0){
        console.log(results);

    scoreLeftwrist=results[0].pose.keypoints[9].score;
    console.log("Left wrist's score is "+scoreLeftwrist);
    scoreRightwrist=results[0].pose.keypoints[10].score;
    console.log("Right wrist's score is "+scoreRightwrist);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("left wrist x = "+leftWristX, "left wrist y = "+leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("right wrist x = "+rightWristX, "right wrist y = "+rightWristY);
    }
}
function draw(){
    image(video,0,0,500,500);

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRightwrist>0.2){
        circle(rightWristX,rightWristY,20);

        if(rightWristY>0 && rightWristY<=100){
          document.getElementById("speed").innerHTML="speed = 0.5x";
          song.rate(0.5);
        }
        if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="speed = 1x";
            song.rate(1);
        }
        if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="speed = 1.5x";
            song.rate(1.5);
        }
        if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="speed = 2x";
            song.rate(2);
        }
        if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed").innerHTML="speed = 2.5x";
            song.rate(2.5);
        }
    }

    if (scoreLeftwrist>0.2){
        circle(leftWristX,leftWristY,20);
        numberLeftWrist=Number(leftWristY);
        without=floor(numberLeftWrist);
        volume=without/500;
        document.getElementById("volume").innerHTML="volume is "+volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}