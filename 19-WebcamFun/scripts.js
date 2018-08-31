const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true,audio:false}).then( media => {
        video.srcObject = media;
        video.play();
    }).catch( err => console.error('Denied Webcam Access'));
}

function paintToCanvas(){
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    canvas.width = vw;
    canvas.height = vh;

    setInterval( ()=>{
        ctx.drawImage(video,0,0,vw,vh);
        let pix = ctx.getImageData(0,0,vw,vh);
        //pix = redEffect(pix);
        //pix = rgbSplitEffect(pix);
        //ctx.globalAlpha = .1;
        pix = greenScreenEffect(pix);
        ctx.putImageData(pix,0,0);
    },16);
}

function redEffect(pix){
    const len = pix.data.length;
    for(let i=0; i < len; i+=4){
        pix.data[i+0] += 100; //R
        pix.data[i+1] -= 100; //G
        pix.data[i+2] -= 100; //B
    }
    return pix;
}

function rgbSplitEffect(pix){
    const len = pix.data.length;
    for(let i=0; i < len; i+=4){
        pix.data[i-100] = pix.data[i+0]; //R
        pix.data[i+100] = pix.data[i+1]; //G
        pix.data[i-100] = pix.data[i+2]; //B
    }
    return pix;
}

function greenScreenEffect(pix){
    const levels = {};
    document.querySelectorAll('.rgb input').forEach( input => levels[input.name] = input.value);

    const len = pix.data.length;
    for(let i=0; i < len; i+=4){
        r = pix.data[i+0];
        g = pix.data[i+1];
        b = pix.data[i+2];
        
        if (r >= levels.rmin &&
            r <= levels.rmax &&
            g >= levels.gmin &&
            g <= levels.gmax &&
            b >= levels.bmin &&
            b <= levels.bmax){
                pix.data[i+3] = 0;
            }
    }
    return pix;
}

function takePhoto(){
    snap.currentTime = 0;
    snap.play();
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','handsome');
    link.innerHTML = `<img src="${data}"/>`;
    strip .insertBefore(link,strip.firstChild);
}

video.addEventListener('canplay',paintToCanvas);
getVideo();