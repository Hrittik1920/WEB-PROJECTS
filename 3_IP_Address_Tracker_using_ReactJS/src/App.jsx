import { useState } from 'react'
import './App.css'
import IPAddress from './components/IPAddress'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <IPAddress/>
    </>
  )
}

export default App
