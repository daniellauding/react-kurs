import { useSelector } from "react-redux";

function ViewCounter() {
  const counter = useSelector((state) => {
    console.log(state);

    return state.counter.value; // Hämtar värdet från vår store, i detta fall value. Är reaktiv och hämtar nytt värde varje gång din store uppdateras
  });

  return <h2>Räknaren är: {counter}</h2>;
}

export default ViewCounter;
