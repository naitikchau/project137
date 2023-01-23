objects = [];
Status = " ";
   
function setup(){
    canvas = createCanvas(400,300);
    canvas.position(480,250);
    video = createCapture(VIDEO);
    video.size(400,300);
    video.hide();
}

function draw()
{
    image(video,0,0,400,300);
    if(Status != ""){
        object_Detector.detect(video, gotResults);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            console.log(objects.length);
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text){
                video.stop();
                object_Detector.detect(gotResults);
                document.getElementById("no_of_object").innerHTML = input_text+" Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(input_text + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("no_of_object").innerHTML = input_text + " Not Found";
            }
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_text = document.getElementById("input").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    Status = true;
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else{
    console.log(results);
    object = results;
    }
}