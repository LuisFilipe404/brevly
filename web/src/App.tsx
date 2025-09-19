import { Route, Routes } from 'react-router-dom'
import Initial from './pages/initial'
import Redirect from './pages/redirect'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Initial />} />
      <Route path="/:customAlias" element={<Redirect />} />
    </Routes>
  )
}

export default App
