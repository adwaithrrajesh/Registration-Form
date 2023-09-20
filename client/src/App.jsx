import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './pages/Form'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/viewDetails'/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
