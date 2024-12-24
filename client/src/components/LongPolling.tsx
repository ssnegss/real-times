import axios from "axios";
import { useEffect, useState } from "react";

type TMessage = {
   message: string;
   id: number;
};

export const LongPolling = () => {
   const [messages, setMessages] = useState<Array<TMessage>>([]);
   const [value, setValue] = useState<string>("");

   useEffect(() => {
      subscribe();
   }, []);

   const subscribe = async () => {
      try {
         const { data } = await axios.get("http://localhost:5000/get-messages");
         setMessages((prev) => [data, ...prev]);
         await subscribe();
      } catch (e) {
         setTimeout(() => {
            subscribe();
         }, 500);
         console.error(e);
      }
   };

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
