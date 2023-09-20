import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './pages/Form'
import RegistrationDetails from './pages/RegistrationDetails'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Form/>}/>
      <Route path='/viewDetails' element={<RegistrationDetails/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
