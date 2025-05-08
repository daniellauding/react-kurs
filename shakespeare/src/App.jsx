import './App.css'
import ShowInsult, { RandomInsult } from './components/ShowInsult'
import AddInsult from './components/AddInsult'
function App() {

  return (
    <>
      <AddInsult />
      <RandomInsult />
      <ShowInsult />
    </>
  )
}

export default App
