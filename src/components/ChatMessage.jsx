import React from 'react';

import ChatbotIcon from './ChatbotIcon';


const ChatMessage = ({chat}) => {

    return(

        
        <div className = {chat.role === "model" ? 'messageBot' : 'messageUser'}>

            {chat.role == "model" && <ChatbotIcon />}

            <p className = "messageT">{chat.text}</p>

        </div>




    );
};
export default ChatMessage;

//div className = `message ${chat.role === "model" ? 'bot' : 'user'-messageUser` */
