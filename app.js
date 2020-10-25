const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls_color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode")
const saveBtn = document.getElementById("jsSave");



console.log("range : " + range);
if(range){
    range.addEventListener("input", handleRangeChange);
}

function handleRangeChange(event){
    console.log("event : " + event);
    console.log(event.target.value);
    const rangeLineWidth = event.target.value;
    ctx.lineWidth = rangeLineWidth;

}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

ctx.fillStyle = "White";
ctx.fillRect(0,0,canvas.width, canvas.height);

let painting = false;
let filling = false;


ctx.fillRect(50, 20, 100, 50);

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("contextmenu", handleCM);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handSaveClick);
}

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function handleCM(event){
    event.preventDefault();
}

function onMouseMove(event){
    var x = event.offsetX;
    var y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    startPainting();
    
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height); 
        return;
    }
}
function onMouseUp(event){
    stopPainting();
}
function onMouseLeave(event){
    stopPainting();
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function handleModeClick(event){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handSaveClick(event){
    const img = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = "당신이 그린 이미지";
    link.click();
}