import Image from '../components/Image'
import About from '../components/About'

function App() {
const name = "Ada Lovelace"
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold text-white mb-4 text-center">{name}</h1>
        <Image />
        <About />
      </div>
    </>
  );
}

export default App
