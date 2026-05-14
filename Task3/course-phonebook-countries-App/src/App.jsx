import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/shared/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import CoursePage from './pages/CoursePage.jsx'
import PhonebookPage from './pages/PhonebookPage.jsx'
import CountriesPage from './pages/CountriesPage.jsx'

const App = () => (
  <div className="app-shell">
    <NavBar />
    <main className="app-main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/phonebook" element={<PhonebookPage />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>
)

export default App
