import React from 'react'
import { useState } from "react";
import './App.css'
import axios from 'axios'
const App = () => {
  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(question)
    axios.post('http://localhost:3000/',{
      question:question
    })
    .then(res=>{
      console.log(res.data)
      setResponse(res.data.response)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const speakHandler = () => {
      if (!response) return;
    const speech = new SpeechSynthesisUtterance(response)
    speech.pitch = 0.01
    speech.rate = 1.6
   
speech.lang = 'en-US'
    window.speechSynthesis.speak(speech)

  }

  return (
    <>
     <h1 className="appTitle">Intelligence, Refined.</h1>
       <p className="appTag">Experience seamless conversations with a system that adapts to you</p>
    <div className='App'>
      <div className="user">
        <button
          className="deleteBtn"
          onClick={(e) => {
            e.stopPropagation(); // stop DP click from opening gallery
            setImage(null);
          }}
        >❎
        </button>
        {/* <h2 style={{ color: "black" }}>Choose From Gallery</h2> */}
        <div className="DP" onClick={() => document.getElementById("galleryInput").click()}>
          {image ? (
            <img src={image} alt="pic" className="previewImg" />
          ) : (
            <p style={{ justifyContent: "center" }}>Choose from gallery</p>
          )}

          <input
            type="file"
            accept="image/*"
            id="galleryInput"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
          <p   className='label'>Your Question...</p>
        <textarea onChange={(e) => {setQuestion(e.target.value)}}></textarea>
        <button onClick={submitHandler}>Send</button>
      </div>
      <div className="gemini">
  <div className="DP">
    <img src="src/assests/OIP.jpg" alt="Gemini" />
  </div>
  <p className='label'>AI Response</p>
   <textarea name="" id="" value={response}></textarea>
   <button onClick={speakHandler}>Speak</button>
   <button onClick={() => window.speechSynthesis.cancel()}>Stop</button>


</div>

    </div>
    </>
  )
}
export default App