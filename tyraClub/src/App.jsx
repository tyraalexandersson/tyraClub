import { useState } from 'react'
import './App.css'

function App() {
const namn = "Hello" //sträng
const bord = "world"

const cong = (a, b) => {

  return a + ' ' + b;
}

const h = cong(namn, bord)
  return (
    <>
      {h && (
        <h1>
{h}
        </h1>
      )}
    </>
  )
}

export default App
