// Serviço de autenticação usando Firebase
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'

class FirebaseAuthService {
  // Fazer login com Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      
      // Obter o token de acesso do Google OAuth
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const accessToken = credential?.accessToken
      
      // Salvar o access token no localStorage para uso posterior
      if (accessToken) {
        localStorage.setItem('google_oauth_access_token', accessToken)
      }
      
      return {
        user: {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          imageUrl: user.photoURL
        },
        token: accessToken
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    }
  }

  // Fazer logout
  async signOut() {
    try {
      await firebaseSignOut(auth)
      // Limpar tokens salvos
      localStorage.removeItem('google_oauth_access_token')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      throw error
    }
  }

  // Obter usuário atual
  getCurrentUser() {
    return auth.currentUser
  }

  // Observar mudanças no estado de autenticação
  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback)
  }

  // Obter token de acesso atual (para Google Drive API)
  async getAccessToken() {
    // Primeiro, tentar obter do localStorage (salvo durante o login)
    const savedToken = localStorage.getItem('google_oauth_access_token')
    if (savedToken) {
      return savedToken
    }

    const user = auth.currentUser
    if (!user) {
      return null
    }

    try {
      // Se não tiver o token salvo, tentar obter novamente
      // Isso pode acontecer se o usuário recarregou a página
      // Por enquanto, retornar null e o usuário precisará fazer login novamente
      return null
    } catch (error) {
      console.error('Erro ao obter token:', error)
      return null
    }
  }
}

export default new FirebaseAuthService()

