import "./App.css";
import NameInput from "./components/NameInput";
import Greeting from "./components/Greeting";

/**
 * Store - Håller vårt state
 * Reducer - Som uppdaterar vårt state
 * Action - Som säger vad ska vi uppdatera
 * Dispatch - Som triggar en action och uppdatering av state från en komponent
 */

function App() {
  return (
    <div className="app">
      <h1>Välkommen till Namnappen! 🌟</h1>
      <NameInput />
      <Greeting />
    </div>
  );
}

export default App;
