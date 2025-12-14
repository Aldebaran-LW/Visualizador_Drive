import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import googleDriveService from '../services/googleDrive'
import './VideoList.css'

function VideoList({ user, onLogout }) {
  const [videos, setVideos] = useState([])
  const [folders, setFolders] = useState([])
  const [currentFolder, setCurrentFolder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [viewMode, setViewMode] = useState('all') // 'all', 'folders', 'videos'
  const navigate = useNavigate()

  useEffect(() => {
    loadContent()
  }, [currentFolder])

  const loadContent = async () => {
    setLoading(true)
    setError(null)
    try {
      if (currentFolder) {
        // Carregar vídeos da pasta atual
        const videoList = await googleDriveService.getVideosInFolder(currentFolder.id)
        setVideos(videoList || [])
        setFolders([])
      } else {
        // Carregar pastas com vídeos e vídeos na raiz
        // Fazer em paralelo, mas tratar erros individualmente
        const results = await Promise.allSettled([
          googleDriveService.getVideos(),
          googleDriveService.getFoldersWithVideos()
        ])
        
        // Processar resultados
        if (results[0].status === 'fulfilled') {
          setVideos(results[0].value || [])
        } else {
          console.error('Erro ao carregar vídeos:', results[0].reason)
          setVideos([])
          if (!error) {
            setError(`Erro ao carregar vídeos: ${results[0].reason?.message || 'Erro desconhecido'}`)
          }
        }
        
        if (results[1].status === 'fulfilled') {
          setFolders(results[1].value || [])
        } else {
          console.error('Erro ao carregar pastas:', results[1].reason)
          setFolders([])
          // Não mostrar erro se vídeos carregaram com sucesso
          if (!error && results[0].status !== 'fulfilled') {
            setError(`Erro ao carregar pastas: ${results[1].reason?.message || 'Erro desconhecido'}`)
          }
        }
      }
    } catch (err) {
      console.error('Erro ao carregar conteúdo:', err)
      setError(`Erro ao carregar conteúdo: ${err.message || 'Erro desconhecido'}`)
      setVideos([])
      setFolders([])
    } finally {
      setLoading(false)
    }
  }

  const loadVideos = () => {
    loadContent()
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Tamanho desconhecido'
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(2)} MB`
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Data desconhecida'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`)
  }

  const handleEditClick = (e, videoId) => {
    e.stopPropagation()
    navigate(`/video/${videoId}/edit`)
  }

  const handleFolderClick = (folder) => {
    setCurrentFolder(folder)
  }

  const handleBackToRoot = () => {
    setCurrentFolder(null)
  }

  const handleBlockVideo = async (e, videoId) => {
    e.stopPropagation()
    
    if (!window.confirm('Tem certeza que deseja bloquear este vídeo? Ele só poderá ser visualizado através desta aplicação.')) {
      return
    }

    try {
      await googleDriveService.blockVideo(videoId)
      alert('Vídeo bloqueado com sucesso! Agora só pode ser acessado através desta aplicação.')
      loadContent() // Recarregar lista
    } catch (err) {
      console.error('Erro ao bloquear vídeo:', err)
      alert('Erro ao bloquear vídeo. Verifique se você tem permissões de escrita.')
    }
  }

  return (
    <div className="video-list-container">
      <header className="video-list-header">
        <div className="header-content">
          <div className="header-title-section">
            {currentFolder && (
              <button onClick={handleBackToRoot} className="back-folder-button" title="Voltar">
                ←
              </button>
            )}
            <h1>
              {currentFolder ? `📁 ${currentFolder.name}` : '📹 Meus Vídeos'}
            </h1>
          </div>
          <div className="header-actions">
            <div className="view-mode-buttons">
              <button 
                onClick={() => setViewMode('all')} 
                className={viewMode === 'all' ? 'active' : ''}
              >
                Tudo
              </button>
              <button 
                onClick={() => setViewMode('folders')} 
                className={viewMode === 'folders' ? 'active' : ''}
              >
                Pastas
              </button>
              <button 
                onClick={() => setViewMode('videos')} 
                className={viewMode === 'videos' ? 'active' : ''}
              >
                Vídeos
              </button>
            </div>
            <button onClick={loadVideos} className="refresh-button">
              🔄 Atualizar
            </button>
            <div className="user-info">
              <img src={user?.imageUrl} alt={user?.name} className="user-avatar" />
              <span>{user?.name}</span>
              <button onClick={onLogout} className="logout-button">
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="video-list-main">
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando vídeos...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>{error}</p>
            <div className="error-actions">
              <button onClick={loadVideos} className="retry-button">
                🔄 Tentar novamente
              </button>
              {(error.includes('Token expirado') || error.includes('Não autenticado')) && (
                <button 
                  onClick={() => {
                    onLogout()
                    navigate('/login')
                  }} 
                  className="retry-button"
                  style={{ marginLeft: '10px', background: '#ff6b6b' }}
                >
                  🔐 Fazer Login Novamente
                </button>
              )}
            </div>
          </div>
        )}

        {!loading && !error && videos.length === 0 && (
          <div className="empty-state">
            <p>📭 Nenhum vídeo encontrado no seu Drive</p>
            <p className="empty-state-subtitle">Adicione vídeos ao Google Drive para visualizá-los aqui</p>
          </div>
        )}

        {!loading && !error && (videos.length > 0 || folders.length > 0) && (
          <>
            {/* Pastas */}
            {!currentFolder && (viewMode === 'all' || viewMode === 'folders') && folders.length > 0 && (
              <div className="folders-section">
                <h2 className="section-title">📁 Pastas com Vídeos ({folders.length})</h2>
                <div className="folders-grid">
                  {folders.map((folder) => (
                    <div 
                      key={folder.id} 
                      className="folder-card"
                      onClick={() => handleFolderClick(folder)}
                    >
                      <div className="folder-icon">📁</div>
                      <div className="folder-info">
                        <h3 className="folder-title">{folder.name}</h3>
                        <p className="folder-meta">{folder.videoCount} vídeo{folder.videoCount !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vídeos */}
            {(viewMode === 'all' || viewMode === 'videos') && videos.length > 0 && (
              <div className="videos-section">
                <h2 className="section-title">
                  {currentFolder ? `Vídeos em "${currentFolder.name}"` : 'Vídeos na Raiz'} ({videos.length})
                </h2>
                <div className="videos-grid">
                  {videos.map((video) => (
                    <div 
                      key={video.id} 
                      className="video-card"
                      onClick={() => handleVideoClick(video.id)}
                    >
                      <div className="video-thumbnail">
                        {video.thumbnailLink ? (
                          <img src={video.thumbnailLink} alt={video.name} />
                        ) : (
                          <div className="video-placeholder">🎬</div>
                        )}
                        {video.shared && (
                          <div className="shared-badge" title="Vídeo compartilhado">
                            🔓
                          </div>
                        )}
                        <div className="video-overlay">
                          <button 
                            className="play-button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleVideoClick(video.id)
                            }}
                          >
                            ▶
                          </button>
                        </div>
                      </div>
                      <div className="video-info">
                        <h3 className="video-title">{video.name}</h3>
                        <div className="video-meta">
                          <span>{formatFileSize(video.size)}</span>
                          <span>•</span>
                          <span>{formatDate(video.modifiedTime)}</span>
                        </div>
                        <div className="video-actions">
                          <button 
                            className="block-button"
                            onClick={(e) => handleBlockVideo(e, video.id)}
                            title="Bloquear vídeo (só acessível pela aplicação)"
                          >
                            🔒 Bloquear
                          </button>
                          <button 
                            className="edit-button"
                            onClick={(e) => handleEditClick(e, video.id)}
                          >
                            ✏️ Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!currentFolder && viewMode === 'all' && videos.length === 0 && folders.length === 0 && (
              <div className="empty-state">
                <p>📭 Nenhum vídeo ou pasta encontrada</p>
              </div>
            )}
          </>
        )}

        {!loading && !error && videos.length === 0 && folders.length === 0 && (
          <div className="empty-state">
            <p>📭 Nenhum vídeo encontrado</p>
            <p className="empty-state-subtitle">
              {currentFolder 
                ? `Nenhum vídeo nesta pasta` 
                : 'Adicione vídeos ao Google Drive para visualizá-los aqui'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default VideoList

