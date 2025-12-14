import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import VideoList from './components/VideoList'
import VideoPlayer from './components/VideoPlayer'
import VideoEditor from './components/VideoEditor'
import firebaseAuth from './services/firebaseAuth'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Observar mudanças no estado de autenticação do Firebase
    const unsubscribe = firebaseAuth.onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        // Usuário está autenticado
        const userData = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          imageUrl: firebaseUser.photoURL
        }
        
        // Obter token de acesso
        const token = await firebaseAuth.getAccessToken()
        
        setIsAuthenticated(true)
        setUser(userData)
        
        // Salvar no localStorage para compatibilidade
        if (token) {
          localStorage.setItem('google_access_token', token)
        }
        localStorage.setItem('google_user', JSON.stringify(userData))
      } else {
        // Usuário não está autenticado
        setIsAuthenticated(false)
        setUser(null)
        localStorage.removeItem('google_access_token')
        localStorage.removeItem('google_user')
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = (userData, token) => {
    setIsAuthenticated(true)
    setUser(userData)
    if (token) {
      localStorage.setItem('google_access_token', token)
    }
    localStorage.setItem('google_user', JSON.stringify(userData))
  }

  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut()
      setIsAuthenticated(false)
      setUser(null)
      localStorage.removeItem('google_access_token')
      localStorage.removeItem('google_user')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '40px', 
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <div className="spinner" style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #667eea',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/videos" replace /> : 
                <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/videos" 
            element={
              isAuthenticated ? 
                <VideoList user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/video/:videoId" 
            element={
              isAuthenticated ? 
                <VideoPlayer user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/video/:videoId/edit" 
            element={
              isAuthenticated ? 
                <VideoEditor user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/videos" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

