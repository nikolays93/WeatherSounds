import {Player} from "./app/Player";

require("./app.scss");

document.addEventListener('DOMContentLoaded', e => {
    const playerEl = document.querySelector('#player');
    const player = new Player(
        playerEl,
        playerEl.querySelector('.player__volume'),
        playerEl.querySelectorAll('.track')
    );
});
