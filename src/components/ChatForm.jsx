import { useRef } from "react";


const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {

    const inputRef = useRef();

    const handleFormSubmit = (event) => {

        event.preventDefault();

        const userMessage = inputRef.current.value.trim();

        if(!userMessage) return;

        inputRef.current.value = "";

        {/*console.log(userMessage); */}

        //show user messages on the screen
        setChatHistory((history) => [...history, {role: "user", text: userMessage}])
        
        //show the bot thinking
        setTimeout(() => {
            
            setChatHistory((history) => [...history, {role: "model", text: "Thinking..."}]);
            
            //call function that will generate the bot response
            generateBotResponse([...chatHistory, {role: "user", text: userMessage}]);

        }, 600);
        
        
    };



    return (

        <form action="#" className = "chatbotForm" onSubmit={handleFormSubmit}>


            <input ref={inputRef} type="text" placeholder="Message" className="message-input" required/>

            <button className="material-symbols-outlined">arrow_upward</button>



        </form>
    

    );
};

export default ChatForm;