import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import googleDriveService from '../services/googleDrive'
import './VideoPlayer.css'

function VideoPlayer({ user, onLogout }) {
  const { videoId } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [videoMetadata, setVideoMetadata] = useState(null)

  useEffect(() => {
    loadVideo()

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
      }
    }
  }, [videoId])

  const loadVideo = async () => {
    setLoading(true)
    setError(null)

    try {
      // Carregar metadados do vídeo
      const metadata = await googleDriveService.getVideoMetadata(videoId)
      setVideoMetadata(metadata)

      // Obter URL do stream com token de acesso
      const streamUrl = await googleDriveService.getVideoStreamUrl(videoId)

      // Inicializar player de vídeo
      if (videoRef.current && !playerRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          responsive: true,
          fluid: true,
          playbackRates: [0.5, 1, 1.25, 1.5, 2],
          sources: [{
            src: streamUrl,
            type: metadata.mimeType || 'video/mp4'
          }]
        })

        playerRef.current.ready(() => {
          setLoading(false)
        })

        playerRef.current.on('error', () => {
          setError('Erro ao carregar o vídeo. Verifique sua conexão.')
          setLoading(false)
        })
      }
    } catch (err) {
      console.error('Erro ao carregar vídeo:', err)
      setError('Erro ao carregar vídeo. Verifique sua conexão e tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="video-player-container">
      <header className="player-header">
        <div className="header-content">
          <button onClick={() => navigate('/videos')} className="back-button">
            ← Voltar
          </button>
          <h1>{videoMetadata?.name || 'Carregando...'}</h1>
          <div className="header-actions">
            <button 
              onClick={() => navigate(`/video/${videoId}/edit`)} 
              className="edit-button"
            >
              ✏️ Editar
            </button>
            <div className="user-info">
              <img src={user?.imageUrl} alt={user?.name} className="user-avatar" />
              <button onClick={onLogout} className="logout-button">
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="player-main">
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando vídeo...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={loadVideo} className="retry-button">
              Tentar novamente
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="video-wrapper">
            <div data-vjs-player>
              <video
                ref={videoRef}
                className="video-js vjs-big-play-centered"
                playsInline
              />
            </div>
          </div>
        )}

        {videoMetadata && (
          <div className="video-details">
            <h2>Informações do Vídeo</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Nome:</span>
                <span className="detail-value">{videoMetadata.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tipo:</span>
                <span className="detail-value">{videoMetadata.mimeType}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Modificado:</span>
                <span className="detail-value">
                  {new Date(videoMetadata.modifiedTime).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default VideoPlayer

