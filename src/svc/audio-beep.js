//if you have another AudioContext class use that one, as some browsers have a limit
let audioCtx_ 

export function audioCtx() { //A: must be called by user UI interaction eg button press
	audioCtx_= audioCtx_ || new (window.AudioContext || window.webkitAudioContext || window.audioContext);
	return audioCtx_;
}

//frequency of the tone in hertz. default is 440
//volume of the tone. Default is 1, off is 0.
//type of tone. Possible values are sine, square, sawtooth, triangle, and custom. Default is sine.
//callback to use on end of tone
export function mkOscillator(frequency, volume, type, callback) {
	var oscillator = audioCtx().createOscillator();
	var gainNode = audioCtx().createGain();

	oscillator.connect(gainNode);
	gainNode.connect(audioCtx().destination);

	if (volume){gainNode.gain.value = volume;}
	if (frequency){oscillator.frequency.value = frequency;}
	if (type){oscillator.type = type;}
	if (callback){oscillator.onended = callback;}
	return oscillator;
}

//duration of the tone in milliseconds. Default is 500
export function beep(duration, frequency, volume, type, callback) {
	var oscillator = mkOscillator(frequency, volume, type, callback); 
	oscillator.start(audioCtx().currentTime);
	oscillator.stop(audioCtx().currentTime + ((duration || 500) / 1000));
};

export function beep_dots(dots, duration, onProgress) {
	let oscillator;
	let i= 0;
	return new Promise( (onDone) => {
		const beep_dot = () => {
			//DBG: console.log("beep_dot",{i,dots})
			if (i<dots.length) { const dot= dots[i]; i++;
				//DBG: console.log("beep_dot",{i,dot});
				if (dot==' ') { oscillator.stop(); oscillator=null; }
				else if (!oscillator) { oscillator= mkOscillator(1000); oscillator.start() }
				setTimeout(beep_dot, duration);
				if (onProgress) { requestAnimationFrame(() => onProgress(i,dot,dots)) }
			} else {
				if (oscillator) { oscillator.stop() }
				onDone();
			}
		}
		beep_dot();
	})
}

window.beep= beep
