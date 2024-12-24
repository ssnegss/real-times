import { useRef, useState } from "react";

type TMessage = {
   message: string;
   id: number;
};

export const WebSockets = () => {
   const [messages, setMessages] = useState<Array<TMessage>>([]);
   const [value, setValue] = useState<string>("");
   const [connected, setConnected] = useState<boolean>(false);
   const [username, setUsername] = useState<string>("");
   const socket = useRef<WebSocket>();

   const sendMessage = async () => {
      const message = {
         username,
         message: value,
         id: Date.now(),
         event: "message",
      };

      socket.current?.send(JSON.stringify(message));
      setValue("");
   };

   const connect = () => {
      socket.current = new WebSocket("ws://localhost:5000");

      socket.current.onopen = () => {
         setConnected(true);
         const message = {
            event: "connection",
            username,
            id: Date.now(),
         };
         socket.current?.send(JSON.stringify(message));
         console.log("Подключение установлено");
      };

      socket.current.onmessage = (e) => {
         console.log(e.data);
         const message = JSON.parse(e.data);
         setMessages((prev) => [message, ...prev]);
      };

      socket.current.onclose = () => {
         console.log("Socket закрыт");
      };

      socket.current.onerror = () => {
         console.log("Socket произошла ошибка");
      };
   };

   if (!connected) {
      return (
         <div>
            <input
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               placeholder="Введите имя"
            />
            <button onClick={connect}>Войти</button>
         </div>
      );
   }

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
