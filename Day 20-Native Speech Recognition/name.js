window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

//takes what you said and outputs in console
recognition.addEventListener('result', e => {
    const transcript = [...e.results]
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

        //puts it on the page through the DOM
        p.textContent = transcript;
        //to stop overwriting line
        if(e.results[0].isFinal) {
            p = document.createElement('p');
            words.appendChild(p);
        }
        // if(transcript.includes('unicorn')) {
        //     console.log('UNICORNS UNICORNS UNICORNS UNICORNS UNICORNS')
        // }
        // //needs to be debounced
        // if(transcript.includes('get the weather')) {
        //     console.log('getting the weather ya sack of shit');
        // }
    console.log(transcript);
});

recognition.addEventListener('end', recognition.start)
recognition.start();