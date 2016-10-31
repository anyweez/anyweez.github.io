function activate(id) {
    // Hide all groups except active one.
    document.querySelectorAll(`.group:not(#${id})`)
        .forEach(el => el.classList.remove('show'));

    document.querySelector(`#${id}`).classList.add('show');

    // Change labeling of the nav elements.
    document.querySelectorAll('nav li').forEach(el => el.classList.remove('active'));
    document.querySelector(`[data-activate="${id}"]`).classList.add('active');

    // Expose 'more' if it was hidden.
    if (document.querySelectorAll(`#${id} section:not(.default)`).length > 0) {
        document.querySelector('#all').classList.remove('hidden');
    } else {
        document.querySelector('#all').classList.add('hidden');
    }
}

function showMore(id) {
    const active = document.querySelector('.show').getAttribute('id');

    document
        .querySelectorAll(`#${active} section:not(.default)`)
        .forEach(el => el.classList.add('default'));

    // Hide 'more' until we toggle.
    document.querySelector('#all').classList.add('hidden');
}

window.addEventListener('load', function () {
    activate('recent');

    document.querySelectorAll('nav li').forEach(el => {
        el.addEventListener('click', () => activate(el.dataset.activate));
    });

    document.querySelector('#all').addEventListener('click', () => showMore());

    const body = document.querySelector('body');
    const canvas = document.querySelector('#background');
    canvas.setAttribute('width', body.scrollWidth);
    canvas.setAttribute('height', body.scrollHeight);

    const context = canvas.getContext('2d');

    // setInterval(() => {
    //     if (Math.random() > 0.9) drip(context, Math.round(Math.random() * body.scrollWidth), 0);
    // }, 1000);
});

/** Background animation **/
const RECT_DIMENSION = 20;
const DRIP_DURATION = 5000;

const colors = () => [150, 150, 100 + Math.round(Math.random() * 155)];
const offset = max => Math.round(Math.random() * (offset * 2)) - offset; 

function drip(ctx, x, y) {
    let r, g, b = 0;
    [r, g, b] = colors();

    // Draw the rectangle
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(x, y, RECT_DIMENSION, RECT_DIMENSION);

    // Queue up the next rectangle drawing based on offsets from current position.
    setTimeout(() => drip(ctx, x, y + RECT_DIMENSION * 1.5), DRIP_DURATION);

    // Fading halfway through.
    setTimeout(() => {
        ctx.fillStyle = `rgba(255, 255, 255, .5)`;
        ctx.fillRect(x - 1, y - 1, RECT_DIMENSION + 2, RECT_DIMENSION + 2);
    }, DRIP_DURATION / 2);

    // Disappearing.
    setTimeout(() => {
        ctx.fillStyle = `rgb(255, 255, 255)`;
        ctx.fillRect(x - 1, y - 1, RECT_DIMENSION + 2, RECT_DIMENSION + 2);
    }, DRIP_DURATION + (DRIP_DURATION * 0.25) + Math.random() * 500);
}