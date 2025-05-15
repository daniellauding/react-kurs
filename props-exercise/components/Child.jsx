export default function Child({ message, energy }) {
  return (
    <div>
      <h1>{message}</h1>
      {energy > 9000 ? "Energy: it's over 9000" : "Energy: low"}
    </div>
  );
}