const cursor = document.querySelector('div.cursor');
const canvasEl = document.querySelector('canvas');
const sectionEl = document.querySelector('#one');

let isMouseDown = false;

const growCursor = () => cursor.classList.add('is-down');
const shrinkCursor = () => cursor.classList.remove('is-down');

const moveCursor = (x, y) => {
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
};

const setupCanvas = (canvas) => {
    const h = sectionEl.offsetHeight;
    const w = window.innerWidth;
    const dpi = window.devicePixelRatio;
    canvas.height = h * dpi;
    canvas.width = w * dpi;
    canvas.style.height = h + 'px';
    canvas.style.width = w + 'px';

    const context = canvas.getContext('2d');
    context.scale(dpi, dpi);
    context.lineWidth = 90;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.shadowBlur = 10;
};

setupCanvas(canvasEl);

const startDrawing = (canvas, x, y) => {
    const context = canvas.getContext('2d');
    context.strokeStyle = '#f4a15d';
    context.moveTo(x, y);
    context.beginPath();
};

const moveDrawing = (canvas, x, y) => {
    const context = canvas.getContext('2d');
    if (isMouseDown) {
        context.lineTo(x, y);
        context.stroke();
    }
};

// event listeners:

document.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    growCursor();
    startDrawing(canvasEl, event.pageX, event.pageY);
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    shrinkCursor();
});

document.addEventListener('mousemove', (event) => {
    moveCursor(event.pageX, event.pageY);
    moveDrawing(canvasEl, event.pageX, event.pageY);
});

window.addEventListener('resize', () => {
    setupCanvas(canvasEl);
});

document.addEventListener('touchstart', (event) => {
    isMouseDown = true;
    startDrawing(canvasEl, event.pageX, event.pageY);
});

document.addEventListener('touchend', () => {
    isMouseDown = false;
});

document.addEventListener('touchmove', (event) => {
    moveDrawing(canvasEl, event.pageX, event.pageY);
});
