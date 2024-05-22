import React, { useState, useCallback } from 'react'; 

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

import { vim } from "@replit/codemirror-vim"

export function Editor({value, onChange}) {
	const onChangeImpl = useCallback((val, viewUpdate) => {
		onChange(val);
	}, [onChange]);

	return (<>
			<CodeMirror
				value={value}	
				onChange={onChangeImpl} 
				height="95vh" 
				extensions={[
					vim(),
					markdown({ base: markdownLanguage, codeLanguages: languages }),
				]} 
				theme="dark"
				basicSetup={{
					highlightActiveLineGutter: true,
					bracketMatching: true,
					autocompletion: true,
					tabSize: 2,
				}}
			/>
		</>)
}

