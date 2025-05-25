import { useDispatch, useSelector } from "react-redux";
import { setName } from "../reducers/nameReducer";

function NameInput() {
  const dispatch = useDispatch();  // För att kunna skicka meddelanden
  const currentName = useSelector((state) => state.name.name);  // Hämta nuvarande namn

  // När någon skriver i input-fältet
  function handleNameChange(event) {
    dispatch(setName(event.target.value));  // Skicka det nya namnet till Redux
  }

  return (
    <div className="name-input">
      <h2>Skriv ditt namn här:</h2>
      <input 
        type="text"
        value={currentName}
        onChange={handleNameChange}
        placeholder="Skriv ditt namn..."
      />
    </div>
  );
}

export default NameInput; 