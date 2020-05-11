const canvas = document.querySelector('#draw');

//context is where we actually begin all the drawing
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.strokeStyle = '#BADA55';
context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 100;
//context.globalCompositeOperation = 'multiply';

//not drawing, switch to true when mouse down to flag drawing
let isDrawing = false;
//remember last position
let lastX = 0;
let lastY = 0;

let hue = 0;
let direction = true;

function draw(e) {
    //only run when mouse down
    if(!isDrawing) return;
    console.log(e)

    context.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    context.beginPath();
    //start from
    context.moveTo(lastX, lastY);
    //go to
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    //update last location
    lastX = e.offsetX;
    lastY = e.offsetY;

    hue++;
    if(hue >= 360) {
        hue = 0;
    }
    if(context.lineWidth >= 100 || context.lineWidth <= 1) {
        direction = !direction;
    }
    if(direction) {
        context.lineWidth++;
    } else {
        context.lineWidth--;
    }

}


canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);