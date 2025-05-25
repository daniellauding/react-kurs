import { useSelector } from "react-redux";

function Greeting() {
  const name = useSelector((state) => state.name.name);  // Hämta namnet från Redux

  return (
    <div className="greeting">
      <h2>
        {name ? `Hej ${name}! 👋` : "Skriv ditt namn ovan! 😊"}
      </h2>
      {name && <p>Vad kul att du är här idag!</p>}
    </div>
  );
}

export default Greeting; 