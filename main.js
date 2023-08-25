function setup(){
    canvas = createCanvas(500,400);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelloaded);
    poseNet.on("pose", gotPoses);
}

function modelloaded(){
    console.log("Pose net is Initialize");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftwristX= results[0].pose.leftWrist.x;
        leftwristY= results[0].pose.leftWrist.y;
        console.log("Left Wrist X= "+leftwristX+ " Left Wrist Y= "+leftwristY);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score= "+ scoreleftWrist);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+ rightWristX+ " Right Wrist Y= "+ rightWristY);
        scoreRightWrist= results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score= "+scoreRightWrist);
    
    }
}

function draw(){
    image(video, 0, 0, 500, 400);

    fill("red");
    stroke("red");
    songStatus1=song1.isPlaying();
    songStatus2=song2.isPlaying();

    if(scoreleftWrist > 0.2){
        circle(leftwristX,leftwristY,25);
        song2.stop();
        if(songStatus1==false){
            song1.play();

            document.getElementById("songName").innerHTML="Playing Peter Pan song";
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY,25);
        song1.stop();
        if(songStatus2 ==false){
            song2.play();

            document.getElementById("songName").innerHTML="Playing Harry Potter Song";
        }
    }
}

song1= "";
song2="";
leftwristX=0;
leftwristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scoreRightWrist=0;
songStatus1="";
songStatus2="";

function preload(){
    song1= loadSound("music2.mp3");
    song2= loadSound("music.mp3");
}