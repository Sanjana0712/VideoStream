import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import {faker} from '@faker-js/faker';

const LiveChat = () => {
    const [input, setInput] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(true); 
    const dispatch = useDispatch();
    const messages = useSelector((store) => store.chat.messages);

    const randomMessages = [
        "Great video!",
        "Loved the content!",
        "Keep it up!",
        "This is so helpful!",
        "Amazing explanation!",
        "I have a question about this.",
        "Can you share more details?",
        "Nice editing skills!",
        "Subscribing now!",
        "Thanks for this tutorial!",
      ];

    useEffect(() => {
        //Long Polling
        const interval = setInterval(() => {
            const randomName = faker.internet.userName();
            const botMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];;
            dispatch(addMessage({ user: randomName, text: botMessage }));
        }, 3000);

        return () => clearInterval(interval);
    }, [dispatch]);

    const handleSendMessage = () => {
        if (input.trim() !== "") {
            dispatch(addMessage({
                user: "You",
                text: input
            }));
            setInput("");
        }
    };

    const handleToggleChat = () => {
        setIsChatVisible((prevState) => !prevState); 
    };

    return (
        <div className="w-full h-[500px]">
            {isChatVisible ? (
                <div className="border h-full ml-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h3 className="text-lg font-semibold">Top Chat</h3>
                        <button onClick={handleToggleChat} className="text-red-500 font-semibold border border-red-200 rounded-lg px-4 py-2">
                            Close Chat
                        </button>
                    </div>

                    <div className="h-64 w-[100%] self-start overflow-y-scroll flex flex-col-reverse">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg flex items-center ${msg.user === "You" ? "bg-blue-100 self-start" : "bg-gray-100 self-start"}`}
                                style={{ width: "80%", marginBottom: "10px" }} 
                            >
                                <div className="text-sm font-semibold mr-2">{msg.user}:</div>
                                <div className="text-md">{msg.text}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-[100px] flex w-full">
                        <input
                            className="flex-grow border border-gray-300 p-2 rounded-l-lg"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message"
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
                            onClick={handleSendMessage}
                        >
                            Send
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-full">
                    <button
                        onClick={handleToggleChat}
                        className="text-blue-500 border border-blue-500 px-4 py-2 rounded-lg absolute top-20 right-30"
                    >
                        Show Chat
                    </button>
                </div>
            )}
        </div>
    );
};

export default LiveChat;
