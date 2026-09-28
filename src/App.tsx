import { useState } from 'react'
import {Routes,Route} from 'react-router-dom';
import Parse from "parse"
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import LinkButton from './components/LinkButton'
import URL_List from './components/URL_List'
import URL_Input from './components/URL_Input'
import SignUp from './components/SignUp'


// Initialize Parse :
Parse.initialize("CEkpc2RsLCNMHMcjBgNHpnnibNPDXDz5yRJlYwce",
		             "bdqfn5TkbGz4xV5DOfVLLHXIpzgYHn7AsON8kUJw");
Parse.serverURL = "https://parseapi.back4app.com/";


function App() {
  const [count, setCount] = useState(0)

  /*return (
    <>
      <URL_List/>
    </>
  )*/

  return (
    <Routes>
      <Route path="/" element={<URL_List/>} />
      <Route path="/Input" element={<URL_Input/>} />
      <Route path="/SignUp" element={<SignUp/>} />
    </Routes>
  );
}

export default App
