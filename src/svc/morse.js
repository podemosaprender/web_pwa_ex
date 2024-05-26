//INFO: MorseCode
//SEE: https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Morse-Code.svg/745px-Morse-Code.svg.png
// 1dash=3dots, space within letter=1dot, between letters 3dots, between words 7 dots

export const CodeToChar= {
	"-----":"0",
	".----":"1",
	"..---":"2",
	"...--":"3",
	"....-":"4",
	".....":"5",
	"-....":"6",
	"--...":"7",
	"---..":"8",
	"----.":"9",
	".-":"a",
	"-...":"b",
	"-.-.":"c",
	"-..":"d",
	".":"e",
	"..-.":"f",
	"--.":"g",
	"....":"h",
	"..":"i",
	".---":"j",
	"-.-":"k",
	".-..":"l",
	"--":"m",
	"-.":"n",
	"---":"o",
	".--.":"p",
	"--.-":"q",
	".-.":"r",
	"...":"s",
	"-":"t",
	"..-":"u",
	"...-":"v",
	".--":"w",
	"-..-":"x",
	"-.--":"y",
	"--..":"z",
	"-.-.--":"!",
	".-.-.-":".",
	"--..--":","
};

export const CharToCode= Object.assign(...Object.entries(CodeToChar).map( ([code,char]) => ({[char]:code}) ))

export const CodeWordSep= '  ';
export const CodeLetterSep= ' ';

export function textToMorse(message) {
	return message.toLowerCase().split(" ").map((word)=>
		word.split("").map((letter) => CharToCode[letter]).join(CodeLetterSep)
	).join(CodeWordSep);
}
export const morseToText_r= textToMorse;

export function textToMorseDots(message) {
	return textToMorse(message)
		.replace(/(.)/g,c => (c+' '))
		.replace(/-/g,'---')
		.trim()
		.split('');
}

export function morseToText(message) {
	return message.split(CodeWordSep).map((word) => 
		word.split(CodeLetterSep).map((letter) => CodeToChar[letter]).join('')
	).join(' ')
}

const TestMessage = ".... . .-.. .--. -·-·--     -- --- .-. ... .     -.-. --- -.. .     .. ...     -.. .-. .. ...- .. -. --.     -- .     -. ..- - ... -·-·--"; 
console.log(morseToText(TestMessage));
