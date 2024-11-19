import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'



function App() {
  return (
    <Box className="bg-blue-900 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>   
    </Box>
  );
}


export default App
