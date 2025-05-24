import ChatbotIcon from "./components/ChatbotIcon";

import ChatForm from "./components/ChatForm";

import ChatMessage from "./components/ChatMessage";

import { useState } from "react";

import { useEffect, useRef } from "react";

const App = () => {

  const[chatHistory, setChatHistory] = useState([]);

  const chatBodyScroll = useRef();



  const generateBotResponse = async (history) => {

    

    const updateHistory = (text) => {


      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), {role: "model", text}])



    }

    const clinicInfo = `
    You are an AI assistant for Harishan Thilakanathan.

    Here is some information about Harishan to help you answer questions:

    - Harishan is a second-year Software Engineering student at the University of Guelph.
    - He has work experince working as a Web Developer for SACHAYS
    - He has work experince doing freelance web development for clients
    - He has experience with web development (HTML, CSS, JavaScript, React), backend (Java, Python, C), and database systems (SQL, Firebase, MariaDB).
    - He built projects like a personal portfolio app, a vCard parser, and a soccer player stat tracker.
    - Harishan is passionate about software that helps people – from health apps to educational tools.
    - He has done freelance work, including custom websites for clients.
    - Harishan is currently looking for internships and co-op positions in software development and data science.
    - this is the link to his portfolio: https://harishanthilak.netlify.app/

    Use this information to answer questions related to Harishan's skills, experience, or career goals.
    `;


    history.unshift({
      role: "user",
      parts: [{ text: clinicInfo }]
    });



    //to look at inspect element
    //console.log(history);

    //format the chat history to match the API requirements
    //history = history.map(({role, text}) => ({role, parts: [{text}]}));
    history = history.map((msg) => {
      if (msg.parts) {
        return msg; // already correctly formatted (like clinicInfo)
      }
      return {
        role: msg.role,
        parts: [{ text: msg.text }]
      };
    });
    
    const requestOptions = {

      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({contents: history})

    }

    console.log("API URL:", import.meta.env.VITE_API_URL);


    //try and catch block
    try{

      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);

      const data = await response.json();

      if(!response.ok) throw new Error(data.error.message || "Wrong");
      

      //console.log(data);

      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim()


      updateHistory(apiResponseText);


    } catch(error){

      console.log(error);

    }


  };

  //auto scroll
  useEffect(() => {

    chatBodyScroll.current.scrollTo({top: chatBodyScroll.current.scrollHeight, behavior: "smooth"});

  }, [chatHistory]);


  return (
  
    <div className = "container">

      <div className = "chatbotPop">


        {/*chat bot header */}
        <div className = "chatbotHeader">


          <div className = "chatbotHeaderInfo"> 


            <ChatbotIcon />


            <h2 className = "logoText">Hari's Chatbot</h2>

          </div>

          <button className="material-symbols-outlined">keyboard_arrow_down</button>

        </div>


        {/*chat bot body */}

        <div ref={chatBodyScroll} className = "chatBody">

          <div className = "messageBot"> 

            <ChatbotIcon />

            <p className = "messageT">Hi there! I'm HariBot, Harishan's personal assistant. </p>

          </div>


          {/*render the chat history dynmancially*/}
          {chatHistory.map((chat, index) => (

            <ChatMessage key={index} chat={chat}/>


          ))}  

        </div>

        {/*footer*/}

        <div className = "chatbotFooter">

          <ChatForm chatHistory = {chatHistory} setChatHistory = {setChatHistory} generateBotResponse = {generateBotResponse}/>

        </div>

      </div>

      


    </div>

  );
};

export default App;


/*


curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=$GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "How does AI work?"
          }
        ]
      }
    ]
  }'



*/