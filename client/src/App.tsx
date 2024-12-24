import { LongPolling } from "./components/LongPolling";
import { EventSourcing } from "./components/EventSourcing";
import { WebSockets } from "./components/WebSockets";

function App() {
   return (
      <>
         {/* <LongPolling /> */}
         {/* <EventSourcing /> */}
         <WebSockets />
      </>
   );
}

export default App;
