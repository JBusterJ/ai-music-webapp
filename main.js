var song = "";
var song1 = "";

var score_right_wrist = 0;
var score_left_wrist = 0;

var right_wrist_X = 0;
var right_wrist_Y = 0;

var left_wrist_X = 0;
var left_wrist_Y = 0;

var nose_X = 0;
var nose_Y = 0;

var songIsAlreadyPlaying = false;
var songIsAlreadyPlaying1 = false;

function preload() {
    song = loadSound("music.mp3");
    song1 = loadSound("pisong.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", got_poses);
}

function modelLoaded() {
    console.log("PoseNet initialised");
}

function got_poses(results) {
    if (results.length > 0) {
        // console.log(results);
        score_right_wrist = results[0].pose.keypoints[10].score;
        score_left_wrist = results[0].pose.keypoints[9].score;
        // console.log("score_right_wrist: " + score_right_wrist + ", score_left_wrist: " + score_left_wrist);
        right_wrist_X = results[0].pose.rightWrist.x;
        right_wrist_Y = results[0].pose.rightWrist.y;
        // console.log("right_wrist_X: " + right_wrist_X + ", right_wrist_Y: " + right_wrist_Y);
        left_wrist_X = results[0].pose.leftWrist.x;
        left_wrist_Y = results[0].pose.leftWrist.y;

        nose_X = results[0].pose.nose.x;
        nose_Y = results[0].pose.nose.y;

        console.log("nose_X: " + nose_X + ", nose_Y: " + nose_Y);
        // console.log("left_wrist_X: " + left_wrist_X + ", left_wrist_Y: " + left_wrist_Y);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if (nose_X > 360 && songIsAlreadyPlaying == false) {
        console.log(">360");
        song1.stop();
        song.play();
        songIsAlreadyPlaying1 = false;
        songIsAlreadyPlaying = true;
        document.getElementById("songnamethingy").innerHTML = "Song Name: Harry Potter Theme (remix)"
    }
    if (nose_X < 340 && songIsAlreadyPlaying1 == false) {
        console.log("<340");
        song.stop();
        song1.play();
        songIsAlreadyPlaying = false;
        songIsAlreadyPlaying1 = true;
        document.getElementById("songnamethingy").innerHTML = "Song Name: 100 digits of &pi; song"
    }

    // circle(right_wrist_X, right_wrist_Y, 20);
    // if (right_wrist_Y > 0 && right_wrist_Y <= 100) {
    //     document.getElementById("speed").innerHTML = "Speed: 0.5x";
    //     song.rate(0.5);
    // } else if (right_wrist_Y > 100 && right_wrist_Y <= 200) {
    //     document.getElementById("speed").innerHTML = "Speed: 1x";
    //     song.rate(1);
    // } else if (right_wrist_Y > 200 && right_wrist_Y <= 300) {
    //     document.getElementById("speed").innerHTML = "Speed: 1.5x";
    //     song.rate(1.5);
    // } else if (right_wrist_Y > 300 && right_wrist_Y <= 400) {
    //     document.getElementById("speed").innerHTML = "Speed: 2x";
    //     song.rate(2);
    // } else if (right_wrist_Y > 400) {
    //     document.getElementById("speed").innerHTML = "Speed: 2.5x";
    //     song.rate(2.5);
    // }
    circle(right_wrist_X, right_wrist_Y, 20);
    InNumberright_wrist_Y = Number(right_wrist_Y);
    remove_decimals = floor(InNumberright_wrist_Y);
    speed = remove_decimals / 480;
    document.getElementById("speed").innerHTML = "Speed: " + floor(speed);
    song.rate(speed);
    song1.rate(speed);
    circle(left_wrist_X, left_wrist_Y, 20);
    InNumberleft_wrist_Y = Number(left_wrist_Y);
    remove_decimals = floor(InNumberleft_wrist_Y);
    volume = remove_decimals / 500;
    document.getElementById("volume").innerHTML = "Volume: " + volume;
    song.setVolume(volume);
    song1.setVolume(volume);

    circle(nose_X, nose_Y, 20);
}

function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);

    song1.setVolume(0.5);
    song1.rate(1);
}
