import axios from "axios";
import { useEffect, useState } from "react";

type TMessage = {
   message: string;
   id: number;
};

export const EventSourcing = () => {
   const [messages, setMessages] = useState<Array<TMessage>>([]);
   const [value, setValue] = useState<string>("");

   useEffect(() => {
      const eventSource = new EventSource("http://localhost:5000/connect");

      eventSource.onmessage = (e) => {
         console.log(e.data);
         const message = JSON.parse(e.data);
         setMessages((prev) => [message, ...prev]);
      };

      return () => {
         eventSource.close();
         console.log("EventSource closed");
      };
   }, []);

   const sendMessage = async () => {
      await axios.post("http://localhost:5000/post-message", {
         message: value,
         id: Date.now(),
      });
   };

   return (
      <div>
         <div>
            <input
               type="text"
               value={value}
               onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={sendMessage}>Отправить</button>
         </div>
         <div className="messages">
            {messages.map((message) => {
               return <div key={message.id}>{message.message}</div>;
            })}
         </div>
      </div>
   );
};
