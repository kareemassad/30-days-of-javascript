const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    //returns a promise so use .then after
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            //.createObjectURL(stream) seems deprecated
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(error => {
            console.error(`Oh NO!!!`, error);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    console.log(width, height);
    canvas.height = height;
    canvas.width = width;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        //take pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        //change em

        //FILTERS
        //pixels = redEffect(pixels);

        pixels = rgbSplit(pixels);
        ctx.globalAlpha = 0.8;

        //pixels = greenScreen(pixels);

        //put em back
        ctx.putImageData(pixels, 0, 0);

    }, 16);
}

function takePhoto() {
    //plays sound
    snap.currentTime = 0;
    snap.play();

    //remove data from canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'sexy');
    link.innerHTML = `<img src="${data}" alt="sexy beast" />`
    strip.insertBefore(link, strip.firstChild);
};

function redEffect(pixels) {
    //pixels is not in a normal array it is a special clampped array meant for large amounts of data
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100;       //red
        pixels.data[i + 1] = pixels.data[i + 1] - 50;       //green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5;       //blue
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0];       //red
        pixels.data[i + 500] = pixels.data[i + 1];       //green
        pixels.data[i - 550] = pixels.data[i + 2];       //blue
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            //take em out
            pixels.data[i + 3] = 0;
        }
    }
    return pixels;
}


//run
getVideo();

video.addEventListener('canplay', paintToCanvas);