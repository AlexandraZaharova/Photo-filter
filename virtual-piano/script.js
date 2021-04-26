const piano = document.querySelector(".piano");
const body = document.querySelector("body");
const pianoButton = document.querySelectorAll(".piano-key");
const btnContainer = document.querySelector(".btn-container");
const btnNoteLet = document.querySelectorAll(".btn");
const keyObj = {
    KeyR: 'R',
    KeyT: 'T',
    KeyU: 'U',
    KeyI: 'I',
    KeyO: 'O',
    KeyD: 'D',
    KeyF: 'F',
    KeyG: 'G',
    KeyH: 'H',
    KeyJ: 'J',
    KeyK: 'K',
    KeyL: 'L',
};
const btnFullscreen = document.querySelector(".fullscreen");

//воспроизведение аудио
function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

//нажатие мышкой
const startSound = (event) => {
    event.target.classList.add("piano-key-active");
    event.target.classList.add("piano-key-active-pseudo");
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
}

const stopSound = (event) => {
    event.target.classList.remove("piano-key-active");
    event.target.classList.remove("piano-key-active-pseudo");
}

const startCorrespondOver = (event) => {
    event.target.classList.add("piano-key-active");
    event.target.classList.add("piano-key-active-pseudo");
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
    pianoButton.forEach((elem) => {
        elem.addEventListener("mouseover", startSound);
        elem.addEventListener("mouseout", stopSound);
    });
}

const stopCorrespondOver = () => {
    pianoButton.forEach((elem) => {
        elem.classList.remove("piano-key-active");
        elem.classList.remove("piano-key-active-pseudo");
        elem.removeEventListener("mouseover", startSound);
        elem.removeEventListener("mouseout", stopSound);
    });
}

//переключение кнопок
const activeBtn = (event) => {
    if (!event.target.classList.contains("btn-active")) {
        btnNoteLet.forEach((elem) => {
            elem.classList.toggle("btn-active");
        });
    }
    if (event.target.classList.contains("btn-letters")) {
        pianoButton.forEach((elem) => {
            elem.classList.add("piano-key-letter");
        });
    } else {
        pianoButton.forEach((elem) => {
            elem.classList.remove("piano-key-letter");
        });
    }
}

//нажатие клавиатуры
const keyStartSound = (event) => {
    if (event.code in keyObj) {
        pianoButton.forEach((elem) => {
            if (elem.getAttribute("data-letter") == keyObj[event.code]) {
                if (event.repeat === false) {
                    elem.classList.add("piano-key-active");
                    const note = elem.dataset.note;
                    const src = `assets/audio/${note}.mp3`;
                    playAudio(src);
                }
            }
        });
    }
}

const keyStopSound = () => {
    pianoButton.forEach((elem) => {
        elem.classList.remove("piano-key-active");
    });
}

//fullScreen
const fullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        body.requestFullscreen();
    }
}

piano.addEventListener("mousedown", startCorrespondOver, false);
body.addEventListener("mouseup", stopCorrespondOver);
window.addEventListener("keydown", keyStartSound);
window.addEventListener("keyup", keyStopSound);
btnContainer.addEventListener("click", activeBtn);
btnFullscreen.addEventListener("click", fullScreen);