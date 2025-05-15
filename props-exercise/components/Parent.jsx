import Child from "./Child";
export default function Parent({ message, energy }) {
  return (
    <Child message={message} energy={energy} />
  );
}