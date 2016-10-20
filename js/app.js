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
});