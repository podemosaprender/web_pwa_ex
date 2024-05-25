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

window.beep= beep
