import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import googleDriveService from '../services/googleDrive'
import './VideoEditor.css'

function VideoEditor({ user, onLogout }) {
  const { videoId } = useParams()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [videoMetadata, setVideoMetadata] = useState(null)
  const [trimStart, setTrimStart] = useState(0)
  const [trimEnd, setTrimEnd] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [cuts, setCuts] = useState([]) // Array de cortes: [{start, end}, ...]
  const [processing, setProcessing] = useState(false)

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
      const metadata = await googleDriveService.getVideoMetadata(videoId)
      setVideoMetadata(metadata)

      const streamUrl = await googleDriveService.getVideoStreamUrl(videoId)

      if (videoRef.current && !playerRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          responsive: true,
          fluid: true,
          playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
          sources: [{
            src: streamUrl,
            type: metadata.mimeType || 'video/mp4'
          }]
        })

        playerRef.current.ready(() => {
          setLoading(false)
          const player = playerRef.current
          
          // Obter duração do vídeo
          player.on('loadedmetadata', () => {
            setDuration(player.duration())
            setTrimEnd(player.duration())
          })

          // Atualizar tempo atual
          player.on('timeupdate', () => {
            setCurrentTime(player.currentTime())
          })

          // Atualizar estado de reprodução
          player.on('play', () => setIsPlaying(true))
          player.on('pause', () => setIsPlaying(false))
          player.on('ended', () => setIsPlaying(false))
        })

        playerRef.current.on('error', () => {
          setError('Erro ao carregar o vídeo.')
          setLoading(false)
        })
      }
    } catch (err) {
      console.error('Erro ao carregar vídeo:', err)
      setError('Erro ao carregar vídeo.')
      setLoading(false)
    }
  }

  const handleTrimStartChange = (e) => {
    const newStart = parseFloat(e.target.value)
    setTrimStart(newStart)
    if (playerRef.current && newStart < trimEnd) {
      playerRef.current.currentTime(newStart)
    }
  }

  const handleTrimEndChange = (e) => {
    const newEnd = parseFloat(e.target.value)
    setTrimEnd(newEnd)
    if (playerRef.current && newEnd > trimStart) {
      playerRef.current.currentTime(newEnd)
    }
  }

  const handleSeekToTime = (time) => {
    if (playerRef.current) {
      playerRef.current.currentTime(time)
    }
  }

  const handleSetStartFromCurrent = () => {
    setTrimStart(currentTime)
    if (playerRef.current) {
      playerRef.current.currentTime(currentTime)
    }
  }

  const handleSetEndFromCurrent = () => {
    setTrimEnd(currentTime)
    if (playerRef.current) {
      playerRef.current.currentTime(currentTime)
    }
  }

  const handleAddCut = () => {
    if (trimStart >= trimEnd) {
      alert('O tempo de início deve ser menor que o tempo de fim!')
      return
    }

    const newCut = {
      id: Date.now(),
      start: trimStart,
      end: trimEnd
    }

    setCuts([...cuts, newCut])
    // Resetar para o próximo corte
    setTrimStart(trimEnd)
    setTrimEnd(duration)
  }

  const handleRemoveCut = (cutId) => {
    setCuts(cuts.filter(cut => cut.id !== cutId))
  }

  const handlePreviewCut = (cut) => {
    if (playerRef.current) {
      playerRef.current.currentTime(cut.start)
      playerRef.current.play()
      
      // Parar no fim do corte
      const checkEnd = setInterval(() => {
        if (playerRef.current && playerRef.current.currentTime() >= cut.end) {
          playerRef.current.pause()
          clearInterval(checkEnd)
        }
      }, 100)
    }
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSave = async () => {
    if (cuts.length === 0) {
      alert('Adicione pelo menos um corte antes de salvar!')
      return
    }

    setProcessing(true)

    try {
      // Nota: O processamento real de vídeo requer um backend
      // Aqui estamos apenas preparando os dados para processamento
      const cutData = {
        videoId: videoId,
        videoName: videoMetadata.name,
        cuts: cuts.map(cut => ({
          start: cut.start,
          end: cut.end,
          duration: cut.end - cut.start
        }))
      }

      console.log('Dados de corte preparados:', cutData)

      // TODO: Enviar para backend para processar o vídeo
      // Por enquanto, apenas mostramos as informações
      alert(
        `Cortes preparados para processamento:\n\n` +
        `Vídeo: ${videoMetadata.name}\n` +
        `Total de cortes: ${cuts.length}\n\n` +
        `Cortes:\n${cuts.map((cut, idx) => 
          `${idx + 1}. ${formatTime(cut.start)} - ${formatTime(cut.end)} (${formatTime(cut.end - cut.start)})`
        ).join('\n')}\n\n` +
        `Nota: Para processar e salvar o vídeo cortado, é necessário um backend que processe o vídeo usando FFmpeg ou similar.`
      )

      // Aqui você pode adicionar código para enviar para um backend:
      // const response = await fetch('/api/process-video', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(cutData)
      // })

    } catch (err) {
      console.error('Erro ao salvar:', err)
      alert('Erro ao processar os cortes. Tente novamente.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="video-editor-container">
      <header className="editor-header">
        <div className="header-content">
          <button onClick={() => navigate(`/video/${videoId}`)} className="back-button">
            ← Voltar
          </button>
          <h1>✏️ Editor de Vídeo - {videoMetadata?.name || 'Carregando...'}</h1>
          <div className="header-actions">
            <div className="user-info">
              <img src={user?.imageUrl} alt={user?.name} className="user-avatar" />
              <button onClick={onLogout} className="logout-button">
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="editor-main">
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
          <>
            <div className="video-wrapper">
              <div data-vjs-player>
                <video
                  ref={videoRef}
                  className="video-js vjs-big-play-centered"
                  playsInline
                />
              </div>
            </div>

            <div className="editor-controls">
              {duration > 0 && (
                <>
                  {/* Timeline do vídeo */}
                  <div className="control-section timeline-section">
                    <h3>Timeline do Vídeo</h3>
                    <div className="timeline-container">
                      <div className="timeline-bar">
                        <div 
                          className="timeline-progress" 
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                        <div 
                          className="timeline-selection" 
                          style={{ 
                            left: `${(trimStart / duration) * 100}%`,
                            width: `${((trimEnd - trimStart) / duration) * 100}%`
                          }}
                        />
                      </div>
                      <div className="timeline-labels">
                        <span>0:00</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                    <div className="current-time-display">
                      Tempo atual: <strong>{formatTime(currentTime)}</strong> / {formatTime(duration)}
                    </div>
                  </div>

                  {/* Controles de corte */}
                  <div className="control-section">
                    <h3>✂️ Cortar Vídeo - Remover Partes Indesejadas</h3>
                    <p className="section-description">
                      Selecione a parte do vídeo que deseja <strong>remover</strong>. Você pode adicionar múltiplos cortes.
                    </p>
                    
                    <div className="trim-controls">
                      <div className="trim-input-group">
                        <div className="trim-input">
                          <label>Início da parte a remover: <strong>{formatTime(trimStart)}</strong></label>
                          <div className="trim-control-row">
                            <input
                              type="range"
                              min="0"
                              max={duration}
                              step="0.1"
                              value={trimStart}
                              onChange={handleTrimStartChange}
                              className="slider"
                            />
                            <button 
                              onClick={handleSetStartFromCurrent} 
                              className="set-time-button"
                              title="Usar tempo atual"
                            >
                              📍 Usar tempo atual
                            </button>
                          </div>
                        </div>
                        
                        <div className="trim-input">
                          <label>Fim da parte a remover: <strong>{formatTime(trimEnd)}</strong></label>
                          <div className="trim-control-row">
                            <input
                              type="range"
                              min="0"
                              max={duration}
                              step="0.1"
                              value={trimEnd}
                              onChange={handleTrimEndChange}
                              className="slider"
                            />
                            <button 
                              onClick={handleSetEndFromCurrent} 
                              className="set-time-button"
                              title="Usar tempo atual"
                            >
                              📍 Usar tempo atual
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="trim-info">
                        <p>
                          <strong>Duração da parte a remover:</strong> {formatTime(trimEnd - trimStart)}
                        </p>
                        <button 
                          onClick={handleAddCut} 
                          className="add-cut-button"
                          disabled={trimStart >= trimEnd}
                        >
                          ➕ Adicionar Corte
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Lista de cortes */}
                  {cuts.length > 0 && (
                    <div className="control-section cuts-section">
                      <h3>📋 Partes Marcadas para Remoção ({cuts.length})</h3>
                      <div className="cuts-list">
                        {cuts.map((cut, index) => (
                          <div key={cut.id} className="cut-item">
                            <div className="cut-info">
                              <span className="cut-number">#{index + 1}</span>
                              <span className="cut-time">
                                {formatTime(cut.start)} → {formatTime(cut.end)} 
                                <span className="cut-duration">({formatTime(cut.end - cut.start)})</span>
                              </span>
                            </div>
                            <div className="cut-actions">
                              <button 
                                onClick={() => handlePreviewCut(cut)}
                                className="preview-cut-button"
                                title="Visualizar esta parte"
                              >
                                ▶️ Visualizar
                              </button>
                              <button 
                                onClick={() => handleRemoveCut(cut.id)}
                                className="remove-cut-button"
                                title="Remover este corte"
                              >
                                🗑️ Remover
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="editor-actions">
                    <button 
                      onClick={handleSave} 
                      className="save-button"
                      disabled={processing || cuts.length === 0}
                    >
                      {processing ? '⏳ Processando...' : '💾 Salvar Vídeo Cortado'}
                    </button>
                    <button 
                      onClick={() => navigate(`/video/${videoId}`)} 
                      className="cancel-button"
                      disabled={processing}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default VideoEditor

