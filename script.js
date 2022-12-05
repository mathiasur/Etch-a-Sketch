const $container = document.querySelector('.container');
const $body = document.querySelector('body');

let mouseDown = 0;

document.addEventListener('mousedown', (e) => print(e));
$body.addEventListener('mouseup', () => mouseDown = 0 );

createGrid(32, 32);


function createGrid(w, h) {

    $container.classList.add('borders');

    for (let i = 0; i < w; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        row.classList.add(`rw${i}`);
        $container.appendChild(row);

        for (let j = 0; j < h; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            row.appendChild(pixel);
        }

    }

}

function print(e) {

    let px = e.target;

    if (px.className === 'pixel') {
        
        mouseDown = 1; 

        console.log(px);

        px.style = 'background-color: black';

        const $pixel = document.querySelectorAll('.pixel');
        
        $pixel.forEach(pixel => {

            pixel.ondragstart = () => false;
         
            pixel.addEventListener('mouseover', () => {
                if (mouseDown === 1) 
                    pixel.style = 'background-color: black';
            });

            pixel.addEventListener('mouseup', () => {
                mouseDown = 0;
            });

        });
    }
}

