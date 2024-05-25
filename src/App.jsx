import { useState, useEffect, useCallback } from 'react'

import PWABadge from './PWABadge'

import { Button } from 'primereact/button';
import { Editor } from './components/Editor'

import { fsp } from './svc/git'

let t0;

export function App() {
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
		},
		[txt, setTxt]
	)

	const onMorseUp= useCallback(
		(e) => { e.preventDefault();
			const dt=(new Date()-t0);
			const t= dt<100 ? '.' : '-';
			t0= new Date();
			//DBG: console.log("UP",t,dt); 
			setTxt(txt+' '+t+'='+dt)
		},
	  [txt, setTxt]
	)

  return (
    <div>
      <h1>pwa-tut0</h1>
			<Editor value={txt} onChange={onChange}/>
			<Button label="morse" 
				onPointerDown={onMorseDown}
				onPointerUp={onMorseUp} 
			/>	
      <PWABadge />
    </div>
  )
}

