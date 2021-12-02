let range = document.querySelectorAll("input");
let rang_val = document.querySelectorAll("span");
const voiceSelect = document.querySelector('select');
let inputTxt = document.querySelector('textarea');
let synth = window.speechSynthesis;

let voices = [];
let optionValue;
const getVoices = () => {
    return new Promise((resolve) => {
        let speechVoices = speechSynthesis.getVoices()
        if (speechVoices.length) {
            resolve(speechVoices)
            return
        }

        const voiceschanged = () => {
            speechVoices = speechSynthesis.getVoices()
            resolve(speechVoices)
        }

        speechSynthesis.onvoiceschanged = voiceschanged
    })
}

getVoices().then((val) => {
    newOption(val);
    voices.push(...val)
})

function newOption(arr) {
    for (let i = 0; i < arr.length; i++) {
        let option = document.createElement('option');
        option.textContent = arr[i].name;
        option.value = `${arr[i].name}`;
        voiceSelect.appendChild(option);
    }
}

let allOption = document.querySelectorAll("option");

function setVal(index) {
    rang_val[index].innerHTML = `${range[index].value}`
}

function toStart() {
    let utterThis = new SpeechSynthesisUtterance(inputTxt.value);

    let select = document.querySelector("select")

    for (i = 0; i < voices.length; i++) {
        if (voices[i].name === select.value) {
            utterThis.voice = voices[i];
        }
    }
    utterThis.value = 0;
    utterThis.rate = range[1].value;
    utterThis.pitch = range[2].value;
    synth.speak(utterThis);

}

function toPause() {
    synth.pause()
}

function toResume() {
    synth.resume()
}

function toCancel() {
    synth.cancel();

}


// Hello Arpinei Mkoyan