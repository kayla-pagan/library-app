import './App.css'
import ActionPrompt from './components/ActionPrompt'
import AssistancePrompt from './components/AssistancePrompt'
import Carousel from './components/Carousel'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Carousel />
      <ActionPrompt />
      <AssistancePrompt />
    </>
  )
}

export default App
