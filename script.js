const $container = document.querySelector('.sketch');
const $body = document.querySelector('body');
const $size = document.querySelector('#size');
const $erase = document.querySelector('#erase');
const $black = document.querySelector('#black');
const $rainbow = document.querySelector('#rainbow');
const $grid = document.querySelector('#grid');
const $clear = document.querySelector('#clear');

let gridSize = $size.value;

let mouseDown = 0;
let bColor = 'black';
let random = 0;
let border = 1;

document.addEventListener('load', createGrid(gridSize, gridSize));

$size.addEventListener('mouseup', (e) => {
    let size = e.target.value;
    createGrid(size, size);
});

$erase.addEventListener('click', () => {
    bColor = 'white';
    random = 0;
});

$black.addEventListener('click', () => {
    bColor = 'black';
    random = 0;
});

$rainbow.addEventListener('click', () => random = 1);

$grid.addEventListener('click', () => {
    $container.classList.toggle('sk-border');
    const $pixels = document.querySelectorAll('.pixel');
    $pixels.forEach(pixel => pixel.classList.toggle('px-border'));
});

$clear.addEventListener('click', colorClear);

document.addEventListener('mousedown', (e) => print(e));
$body.addEventListener('mouseup', () => mouseDown = 0);



function createGrid(w, h) {

    clear();

    for (let i = 0; i < w; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        $container.appendChild(row);

        for (let j = 0; j < h; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.classList.toggle('px-border');
            row.appendChild(pixel);
        }

    }

}

function print(e) {

    let px = e.target;

    if (px.className.includes('pixel')) {

        mouseDown = 1;

        if (random === 1) px.style = `background-color: ${randomColor()}`;
        else px.style = `background-color: ${bColor}`;

        const $pixel = document.querySelectorAll('.pixel');

        $pixel.forEach(pixel => {

            pixel.ondragstart = () => false;

            pixel.addEventListener('mouseover', () => {
                if (mouseDown === 1)
                    if (random === 1) pixel.style = `background-color: ${randomColor()}`;
                    else pixel.style = `background-color: ${bColor}`;
            });

            pixel.addEventListener('mouseup', () => {
                mouseDown = 0;
            });

        });
    }
}

function clear() {
    while ($container.lastChild) $container.removeChild($container.lastChild);
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function colorClear() {
    const $pixel = document.querySelectorAll('.pixel');
    $pixel.forEach(pixel => pixel.style = 'background-color: white');
}