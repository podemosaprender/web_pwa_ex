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

export function morseToText(message) {
	return message.split("   ").map((word) => 
		word.split(" ").map((letter) => CodeToChar[letter]).join('')
	).join(' ')
}

const TestMessage = ".... . .-.. .--. -·-·--     -- --- .-. ... .     -.-. --- -.. .     .. ...     -.. .-. .. ...- .. -. --.     -- .     -. ..- - ... -·-·--"; 
console.log(morseToText(TestMessage));
