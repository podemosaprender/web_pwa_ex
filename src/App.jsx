import { useState, useEffect } from 'react'

import PWABadge from './PWABadge'

import { Editor } from './components/Editor'

import { fsp } from './svc/git'

export function App() {
	const [txt,setTxt]= useState('')

	useEffect(() => {
		fsp.readFile('/xwip.txt','utf8').then( setTxt );
	}, [])

	const onChange= async (a_txt) => {
		await fsp.writeFile('/xwip.txt',a_txt);	
	}
	
  return (
    <>
      <h1>pwa-tut0</h1>
			<Editor value={txt} onChange={onChange}/>
      <PWABadge />
    </>
  )
}

