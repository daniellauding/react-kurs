import Parent from './Parent';

export default function GrandParent() {
    const message = 'Hello from GrandParent';
    const energy = 9500;
  return (
    <Parent message={message} energy={energy} />
  );
}