import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const wi = new ComlinkWorker(new URL('./worker-ex0.js', import.meta.url), {/* normal Worker options*/})
window.wi= wi;

/* U: shared worker 
const wig = new ComlinkWorker(new URL('./worker-git.js', import.meta.url), {type: 'module'})
window.wig= wig;
*/ 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
