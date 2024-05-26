import React, { useState, useCallback } from 'react'; 

import {textToMorseDots} from '../svc/morse'
import {beep_dots} from '../svc/audio-beep'

const Style={display: 'inline-block', width: '1rem', textAlign: 'center'}

export function MorseLine({letter,status}) {
	const [idx, setIdx]= useState(0);
	const dots= textToMorseDots(letter)

	const onProgress= useCallback(
		(i) => setIdx(i),
		[setIdx]
	);

	return (<div onClick={()=> beep_dots(dots,100, onProgress)}>
		<div style={{...Style, marginRight: '5px'}}>{letter}</div>
		<div style={{display: 'inline-block'}}>
			{ dots.map( (dot,dotIdx) => (
				<div key={dotIdx} 
					style={{...Style, border:'1px dotted gray', background: dotIdx<idx ? 'gray' : 'none'}}
				>
					{dot}
				</div>
			))}
		</div>
	</div>)
}

