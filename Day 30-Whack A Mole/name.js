//holes is a NODElist
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
//moles is a nodeList
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randHole(holes) { 
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(hole === lastHole) {
        randHole(holes);
        return randHole(holes);
    }

    lastHole = hole;
    return hole;
}

function peep() {
    const time = randTime(200, 2000);
    const hole = randHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e) { 
    if(!e.isTrusted) return; //Cheater!!
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;

}

moles.forEach(mole => mole.addEventListener('click', bonk));