import "./App.css";
import { useDispatch } from "react-redux";
import { increment, decrement } from "./reducers/counterReducer";
import ViewCounter from "./components/ViewCounter";

/**
 * Store - Håller vårt state
 * Reducer - Som uppdaterar vårt state
 * Action - Som säger vad ska vi uppdatera
 * Dispatch - Som triggar en action och uppdatering av state från en komponent
 */

function App() {
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increment(1));
  }

  function handleDecrement() {
    dispatch(decrement(1));
  }

  return (
    <>
      <h1>Räknare</h1>
      <ViewCounter />
      <section>
        <button onClick={handleIncrement}>Öka med 1</button>
        <button onClick={handleDecrement}>Minska med 1</button>
      </section>
    </>
  );
}

export default App;
