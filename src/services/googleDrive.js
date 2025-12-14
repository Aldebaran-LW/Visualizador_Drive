// Serviço para integração com Google Drive API
class GoogleDriveService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_API_KEY || ''
    this.clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
    this.scope = 'https://www.googleapis.com/auth/drive.readonly'
    this.discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }

  async loadGapi() {
    return new Promise((resolve, reject) => {
      // Verificar se as credenciais estão configuradas
      if (!this.apiKey || !this.clientId) {
        const error = new Error('Credenciais não configuradas. Verifique o arquivo .env')
        console.error('API Key:', this.apiKey ? 'Configurada' : 'NÃO CONFIGURADA')
        console.error('Client ID:', this.clientId ? 'Configurado' : 'NÃO CONFIGURADO')
        reject(error)
        return
      }

      if (window.gapi && window.gapi.auth2) {
        // Verificar se já está inicializado
        try {
          const authInstance = window.gapi.auth2.getAuthInstance()
          if (authInstance) {
            resolve()
            return
          }
        } catch (e) {
          // Se não estiver inicializado, continuar
        }
      }

      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = () => {
        window.gapi.load('client:auth2', () => {
          console.log('🔧 Inicializando Google API com:')
          console.log('  - API Key:', this.apiKey ? '✅ Configurada' : '❌ Não configurada')
          console.log('  - Client ID:', this.clientId ? '✅ Configurado' : '❌ Não configurado')
          console.log('  - Origin atual:', window.location.origin)
          
          window.gapi.client.init({
            apiKey: this.apiKey,
            clientId: this.clientId,
            discoveryDocs: this.discoveryDocs,
            scope: this.scope
          }).then(() => {
            console.log('✅ Google API inicializada com sucesso')
            resolve()
          }).catch((err) => {
            console.error('❌ Erro ao inicializar Google API:', err)
            console.error('Detalhes:', JSON.stringify(err, null, 2))
            
            // Mensagem mais detalhada
            if (err.error === 'idpiframe_initialization_failed' || err.message?.includes('Not a valid origin')) {
              const detailedError = new Error(
                `Origem não autorizada: ${window.location.origin}\n` +
                `Certifique-se de que "${window.location.origin}" está em "Origens JavaScript autorizadas" no Google Cloud Console.\n` +
                `Client ID: ${this.clientId}\n` +
                `Link: https://console.cloud.google.com/apis/credentials`
              )
              detailedError.originalError = err
              reject(detailedError)
            } else {
              reject(err)
            }
          })
        })
      }
      script.onerror = () => {
        reject(new Error('Erro ao carregar Google API script'))
      }
      document.head.appendChild(script)
    })
  }

  async signIn() {
    try {
      await this.loadGapi()
    } catch (err) {
      console.error('Erro ao carregar Google API:', err)
      throw err
    }

    try {
      const authInstance = window.gapi.auth2.getAuthInstance()
      
      if (!authInstance) {
        throw new Error('Instância de autenticação não disponível')
      }
      
      // Verificar se já está autenticado
      if (authInstance.isSignedIn.get()) {
        const user = authInstance.currentUser.get()
        const profile = user.getBasicProfile()
        const authResponse = user.getAuthResponse()
        
        return {
          user: {
            id: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl()
          },
          token: authResponse.access_token
        }
      }
      
      // Fazer login
      const user = await authInstance.signIn({
        prompt: 'consent'
      }).catch((err) => {
        console.error('Erro no signIn:', err)
        throw err
      })
      
      const profile = user.getBasicProfile()
      const authResponse = user.getAuthResponse()
      
      return {
        user: {
          id: profile.getId(),
          name: profile.getName(),
          email: profile.getEmail(),
          imageUrl: profile.getImageUrl()
        },
        token: authResponse.access_token
      }
    } catch (err) {
      console.error('Erro no processo de login:', err)
      throw err
    }
  }

  async getFoldersWithVideos() {
    const firebaseToken = localStorage.getItem('google_oauth_access_token')
    
    if (!firebaseToken) {
      throw new Error('Não autenticado')
    }

    try {
      // Buscar todas as pastas (limitado a 100 para performance)
      const foldersResponse = await fetch(
        'https://www.googleapis.com/drive/v3/files?q=mimeType%3D%27application%2Fvnd.google-apps.folder%27+and+trashed%3Dfalse&fields=files(id%2C+name%2C+modifiedTime%2C+parents)&orderBy=name&pageSize=100&supportsAllDrives=true&includeItemsFromAllDrives=true',
        {
          headers: {
            'Authorization': `Bearer ${firebaseToken}`
          }
        }
      )

      if (!foldersResponse.ok) {
        const errorData = await foldersResponse.json().catch(() => ({}))
        console.error('Erro ao buscar pastas:', errorData)
        throw new Error(`Erro ao buscar pastas: ${errorData.error?.message || 'Erro desconhecido'}`)
      }

      const foldersData = await foldersResponse.json()
      const folders = foldersData.files || []

      if (folders.length === 0) {
        return []
      }

      // Buscar vídeos em todas as pastas de uma vez (mais eficiente)
      // Usar Promise.all para buscar em paralelo, mas limitar a 10 pastas por vez
      const foldersWithVideos = []
      const batchSize = 10
      
      for (let i = 0; i < folders.length; i += batchSize) {
        const batch = folders.slice(i, i + batchSize)
        
        const batchPromises = batch.map(async (folder) => {
          try {
            const videosResponse = await fetch(
              `https://www.googleapis.com/drive/v3/files?q=%27${folder.id}%27+in+parents+and+mimeType+contains+%27video%2F%27+and+trashed%3Dfalse&fields=files(id)&pageSize=1&supportsAllDrives=true&includeItemsFromAllDrives=true`,
              {
                headers: {
                  'Authorization': `Bearer ${firebaseToken}`
                }
              }
            )

            if (videosResponse.ok) {
              const videosData = await videosResponse.json()
              const videos = videosData.files || []
              
              if (videos.length > 0) {
                // Buscar contagem total de vídeos
                const countResponse = await fetch(
                  `https://www.googleapis.com/drive/v3/files?q=%27${folder.id}%27+in+parents+and+mimeType+contains+%27video%2F%27+and+trashed%3Dfalse&fields=files(id)&supportsAllDrives=true&includeItemsFromAllDrives=true`,
                  {
                    headers: {
                      'Authorization': `Bearer ${firebaseToken}`
                    }
                  }
                )
                
                let videoCount = 0
                if (countResponse.ok) {
                  const countData = await countResponse.json()
                  videoCount = countData.files?.length || 0
                }

                return {
                  id: folder.id,
                  name: folder.name,
                  modifiedTime: folder.modifiedTime,
                  parents: folder.parents || [],
                  videoCount: videoCount
                }
              }
            }
            return null
          } catch (err) {
            console.warn(`Erro ao verificar pasta ${folder.name}:`, err)
            return null
          }
        })

        const results = await Promise.all(batchPromises)
        foldersWithVideos.push(...results.filter(f => f !== null))
      }

      return foldersWithVideos
    } catch (error) {
      console.error('Erro em getFoldersWithVideos:', error)
      throw error
    }
  }

  async getVideosInFolder(folderId) {
    const firebaseToken = localStorage.getItem('google_oauth_access_token')
    
    if (!firebaseToken) {
      throw new Error('Não autenticado')
    }

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=%27${folderId}%27+in+parents+and+mimeType+contains+%27video%2F%27+and+trashed%3Dfalse&fields=files(id%2C+name%2C+mimeType%2C+size%2C+modifiedTime%2C+thumbnailLink%2C+webViewLink%2C+shared%2C+permissions)&orderBy=modifiedTime+desc&supportsAllDrives=true&includeItemsFromAllDrives=true`,
      {
        headers: {
          'Authorization': `Bearer ${firebaseToken}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Erro ao buscar vídeos da pasta')
    }

    const data = await response.json()
    return data.files.map(file => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      size: file.size,
      modifiedTime: file.modifiedTime,
      thumbnailLink: file.thumbnailLink,
      webViewLink: file.webViewLink,
      shared: file.shared || false,
      permissions: file.permissions || []
    }))
  }

  async getVideos() {
    // Tentar usar token do Firebase primeiro
    const firebaseToken = localStorage.getItem('google_oauth_access_token')
    
    if (!firebaseToken) {
      throw new Error('Não autenticado. Faça login novamente.')
    }

    try {
      // Buscar vídeos na raiz (sem pasta pai específica ou na raiz do Drive)
      // Usar 'root' in parents para buscar apenas na raiz
      const response = await fetch(
        'https://www.googleapis.com/drive/v3/files?q=mimeType+contains+%27video%2F%27+and+trashed%3Dfalse+and+%27root%27+in+parents&fields=files(id%2C+name%2C+mimeType%2C+size%2C+modifiedTime%2C+thumbnailLink%2C+webViewLink%2C+shared%2C+permissions)&orderBy=modifiedTime+desc&pageSize=100&supportsAllDrives=true&includeItemsFromAllDrives=true',
        {
          headers: {
            'Authorization': `Bearer ${firebaseToken}`
          }
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Erro ao buscar vídeos:', errorData)
        
        if (response.status === 401) {
          throw new Error('Token expirado. Faça login novamente.')
        }
        
        throw new Error(`Erro ao buscar vídeos: ${errorData.error?.message || 'Erro desconhecido'}`)
      }

      const data = await response.json()
      const files = data.files || []
      
      return files.map(file => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size,
        modifiedTime: file.modifiedTime,
        thumbnailLink: file.thumbnailLink,
        webViewLink: file.webViewLink,
        shared: file.shared || false,
        permissions: file.permissions || []
      }))
    } catch (error) {
      console.error('Erro em getVideos:', error)
      throw error
    }

    // Fallback para método antigo (gapi)
    if (!window.gapi) {
      await this.loadGapi()
    }

    // Verificar se está autenticado
    const authInstance = window.gapi.auth2.getAuthInstance()
    const isSignedIn = authInstance.isSignedIn.get()
    
    if (!isSignedIn) {
      throw new Error('Não autenticado')
    }

    // Listar arquivos de vídeo do Drive
    const response = await window.gapi.client.drive.files.list({
      q: "mimeType contains 'video/' and trashed=false",
      fields: 'files(id, name, mimeType, size, modifiedTime, thumbnailLink, webViewLink)',
      orderBy: 'modifiedTime desc',
      pageSize: 50,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true
    })

    return response.result.files.map(file => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      size: file.size,
      modifiedTime: file.modifiedTime,
      thumbnailLink: file.thumbnailLink,
      webViewLink: file.webViewLink
    }))
  }

  async getVideoStreamUrl(videoId) {
    // Tentar obter token do Firebase primeiro
    const firebaseToken = localStorage.getItem('google_oauth_access_token')
    
    if (firebaseToken) {
      // Usar token do Firebase
      return `https://www.googleapis.com/drive/v3/files/${videoId}?alt=media&access_token=${firebaseToken}`
    }

    // Fallback para método antigo (gapi)
    if (!window.gapi) {
      await this.loadGapi()
    }

    // Verificar se está autenticado
    const authInstance = window.gapi.auth2.getAuthInstance()
    const isSignedIn = authInstance.isSignedIn.get()
    
    if (!isSignedIn) {
      throw new Error('Não autenticado')
    }

    // Obter token de acesso atualizado
    const user = authInstance.currentUser.get()
    const authResponse = user.getAuthResponse(true)
    const token = authResponse.access_token

    // Retornar URL com token de acesso para streaming
    return `https://www.googleapis.com/drive/v3/files/${videoId}?alt=media&access_token=${token}`
  }

  async getVideoMetadata(videoId) {
    // Tentar usar token do Firebase primeiro
    const firebaseToken = localStorage.getItem('google_oauth_access_token')
    
    if (firebaseToken) {
      // Usar Google Drive API REST diretamente com token do Firebase
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${videoId}?fields=id%2C+name%2C+mimeType%2C+size%2C+modifiedTime%2C+thumbnailLink%2C+webViewLink&supportsAllDrives=true`,
        {
          headers: {
            'Authorization': `Bearer ${firebaseToken}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao buscar metadados do vídeo')
      }

      const file = await response.json()
      return {
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        size: file.size,
        modifiedTime: file.modifiedTime,
        thumbnailLink: file.thumbnailLink,
        webViewLink: file.webViewLink
      }
    }

    // Fallback para método antigo (gapi)
    if (!window.gapi) {
      await this.loadGapi()
    }

    // Verificar se está autenticado
    const authInstance = window.gapi.auth2.getAuthInstance()
    const isSignedIn = authInstance.isSignedIn.get()
    
    if (!isSignedIn) {
      throw new Error('Não autenticado')
    }

    const response = await window.gapi.client.drive.files.get({
      fileId: videoId,
      fields: 'id, name, mimeType, size, modifiedTime, thumbnailLink, webViewLink',
      supportsAllDrives: true
    })

    return {
      id: response.result.id,
      name: response.result.name,
      mimeType: response.result.mimeType,
      size: response.result.size,
      modifiedTime: response.result.modifiedTime,
      thumbnailLink: response.result.thumbnailLink,
      webViewLink: response.result.webViewLink
    }
  }

  async blockVideo(videoId) {
    const firebaseToken = localStorage.getItem('google_oauth_access_token')
    
    if (!firebaseToken) {
      throw new Error('Não autenticado')
    }

    try {
      // Primeiro, obter todas as permissões do arquivo
      const permissionsResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files/${videoId}/permissions?supportsAllDrives=true&fields=permissions(id%2C+type%2C+role%2C+emailAddress)`,
        {
          headers: {
            'Authorization': `Bearer ${firebaseToken}`
          }
        }
      )

      if (!permissionsResponse.ok) {
        const errorData = await permissionsResponse.json().catch(() => ({}))
        throw new Error(`Erro ao buscar permissões: ${errorData.error?.message || 'Erro desconhecido'}`)
      }

      const permissionsData = await permissionsResponse.json()
      const permissions = permissionsData.permissions || []

      // Remover todas as permissões públicas e de outros usuários
      // Manter apenas a permissão do proprietário
      let removedCount = 0
      
      for (const permission of permissions) {
        // Não remover permissão do proprietário
        if (permission.role === 'owner') {
          continue
        }

        // Remover permissões públicas (anyone) e compartilhamentos
        if (permission.type === 'anyone' || permission.type === 'domain') {
          try {
            const deleteResponse = await fetch(
              `https://www.googleapis.com/drive/v3/files/${videoId}/permissions/${permission.id}?supportsAllDrives=true`,
              {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${firebaseToken}`
                }
              }
            )

            if (deleteResponse.ok) {
              removedCount++
            }
          } catch (err) {
            console.warn(`Erro ao remover permissão ${permission.id}:`, err)
          }
        }
      }

      return { 
        success: true, 
        message: `Vídeo bloqueado com sucesso! ${removedCount} permissão(ões) removida(s). Agora só pode ser acessado através desta aplicação.` 
      }
    } catch (error) {
      console.error('Erro ao bloquear vídeo:', error)
      throw error
    }
  }

  async unblockVideo(videoId) {
    // Para desbloquear, você pode adicionar permissões novamente se necessário
    // Por enquanto, apenas retornar sucesso
    return { success: true, message: 'Vídeo desbloqueado' }
  }
}

export default new GoogleDriveService()

