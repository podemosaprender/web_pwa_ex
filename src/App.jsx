import { useState, useEffect, useCallback } from 'react'

import PWABadge from './PWABadge'

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { Editor } from './components/Editor'
import { MorseLine } from './components/MorseLine';

import { fsp } from './svc/git'
import { morseToText } from './svc/morse.js'
import { mkOscillator } from './svc/audio-beep.js'

let t0;
let oscillator; //A: must be initialized by UI interaction

export function App() {
	const [phrase,setPhrase]= useState('')
	const [txt,setTxt]= useState('')

	useEffect(() => {
		fsp.readFile('/xwip.txt','utf8').then( setTxt );
	}, [])

	const onChange= async (a_txt) => {
		await fsp.writeFile('/xwip.txt',a_txt);	
	}

	const onMorseDown= useCallback(
		(e)=> { e.preventDefault();
			console.log("DOWN"); 
			const dt=(new Date()-t0);
			const t= dt<400 ? '' : '\n';
			t0= new Date()
			setTxt(txt+' '+t+'='+dt)
			oscillator= mkOscillator(1000);
			oscillator.start();	
		},
		[txt, setTxt]
	)

	const onMorseUp= useCallback(
		(e) => { e.preventDefault();
			oscillator.stop();	
			const dt=(new Date()-t0);
			const t= dt<100 ? '.' : '-';
			t0= new Date();
			//DBG: console.log("UP",t,dt); 
			setTxt(txt+' '+t+'='+dt)
		},
	  [txt, setTxt]
	)

	// <Editor value={txt} onChange={onChange}/>

  return (
    <div>
			<InputText placeholder="Your phrase" onChange={(e) => setPhrase(e.target.value)} value={phrase} />
			{ phrase.split('').map( (l,idx) => 
					<MorseLine key={idx} letter={l}/>
				)
			}
			<Button label="morse" 
				onPointerDown={onMorseDown}
				onPointerUp={onMorseUp} 
			/>	
      <PWABadge />
    </div>
  )
}

