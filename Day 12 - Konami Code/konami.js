const pressed = [];
const secretCode = 'kareem';

window.addEventListener('keyup', (e) =>{
    pressed.push(e.key);
    console.log(pressed);
    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
    if(pressed.join('').includes(secretCode)) {
        console.log('DING DING');
        cornify_add();
    }
    console.log(pressed);
});