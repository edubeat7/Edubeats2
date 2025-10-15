import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import './PaginaAudio.css';
import Navbar from '../Navbar/Navbar';
import logoA from '../Login/Audifonoslogo.png';

// Inicialización del cliente de Supabase
const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

export default function AudioInterface() {
  // --- ESTADOS ---
  const [items, setItems] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pathParts, setPathParts] = useState(['MusicaCarpeta']);
  const [isEmptyFolder, setIsEmptyFolder] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // --- REFERENCIAS ---
  const audioRef = useRef(null);
  const currentPath = pathParts.join('/');

  // --- EFECTOS (HOOKS) ---

  // 1. Verificación de autenticación
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const userIsAuthenticated = !!session;
      setIsAuthenticated(userIsAuthenticated);
      if (!userIsAuthenticated) {
        window.location.href = '/Login';
      }
    };
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const userIsAuthenticated = !!session;
      setIsAuthenticated(userIsAuthenticated);
      if (!userIsAuthenticated) {
        window.location.href = '/Login';
      }
    });
    return () => subscription?.unsubscribe();
  }, []);

  // 2. Cargar contenido de la carpeta
  useEffect(() => {
    if (isAuthenticated) {
      fetchFolderContent(currentPath);
    }
  }, [currentPath, isAuthenticated]);

  // 3. Sincronizar el estado de reproducción
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error al reproducir:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentlyPlaying?.url]);

  // --- LÓGICA PRINCIPAL ---
  const fetchFolderContent = async (path) => {
    setIsLoading(true);
    setErrorMessage('');
    setIsEmptyFolder(false);
    setItems([]);
    setPlaylist([]);
    try {
      const { data, error } = await supabase.storage.from('Musica').list(path, {
        sortBy: { column: 'name', order: 'asc' },
      });
      if (error) throw error;
      if (!data || data.length === 0) {
        setIsEmptyFolder(true);
        return;
      }
      const processedItems = await Promise.all(
        data.map(async (item) => {
          if (item.id === null) {
            return { ...item, isFolder: true, name: item.name };
          }
          if (item.name.endsWith('.mp3')) {
            const { data: urlData } = supabase.storage.from('Musica').getPublicUrl(`${path}/${item.name}`);
            return {
              ...item,
              isFolder: false,
              originalName: item.name.replace(/\.mp3$/i, ''),
              url: urlData.publicUrl,
            };
          }
          return null;
        })
      );
      const validItems = processedItems.filter(Boolean);
      if (validItems.length === 0) {
        setIsEmptyFolder(true);
      } else {
        setItems(validItems);
        setPlaylist(validItems.filter(item => !item.isFolder));
      }
    } catch (error) {
      console.error('Error al cargar contenido:', error);
      setErrorMessage('Error al cargar el contenido. Revisa las políticas de Supabase.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- MANEJADORES DE EVENTOS ---

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleNavigate = (folderName) => {
    setPathParts(prev => [...prev, folderName]);
  };

  const handleBreadcrumbClick = (pathIndex) => {
    setPathParts(prev => prev.slice(0, pathIndex + 1));
  };

  const handlePlayAudio = (item, index) => {
    if (currentlyPlaying?.url === item.url) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentlyPlaying({ ...item, index });
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (!currentlyPlaying || playlist.length === 0) return;
    const nextIndex = (currentlyPlaying.index + 1) % playlist.length;
    setCurrentlyPlaying({ ...playlist[nextIndex], index: nextIndex });
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentlyPlaying || playlist.length === 0) return;
    const prevIndex = (currentlyPlaying.index - 1 + playlist.length) % playlist.length;
    setCurrentlyPlaying({ ...playlist[prevIndex], index: prevIndex });
    setIsPlaying(true);
  };

  // --- FUNCIONES DE RENDERIZADO ---

  const renderBreadcrumbs = () => (
    <div className="breadcrumbs">
      {pathParts.map((part, index) => (
        <span key={index}>
          <button onClick={() => handleBreadcrumbClick(index)} disabled={index === pathParts.length - 1}>
            {part}
          </button>
          {index < pathParts.length - 1 && ' / '}
        </span>
      ))}
    </div>
  );

  if (isAuthenticated === null) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div className="container">
      <header className="header"><Navbar /></header>
      <div className="logo-container">
        <img src={logoA} className="App-logo" alt="logo" />
      </div>
      <div className="music-container">
        <div className="header-wrapper">
          <h1>🎵 Music Library</h1>
        </div>
        {renderBreadcrumbs()}
        <div className="audio-list">
          {items.map((item) => {
            const playlistIndex = !item.isFolder ? playlist.findIndex(p => p.id === item.id) : -1;
            const isCurrentlyPlaying = currentlyPlaying?.id === item.id;
            return (
              <div key={item.id || item.name} className={`audio-item ${isCurrentlyPlaying ? 'playing' : ''}`}>
                {item.isFolder ? (
                  <button className="folder-button" onClick={() => handleNavigate(item.name)}>
                    📁 {item.name}
                  </button>
                ) : (
                  <div className="file-item">
                    <button className="play-button" onClick={() => handlePlayAudio(item, playlistIndex)}>
                      {isCurrentlyPlaying && isPlaying ? '⏸' : '▶'}
                    </button>
                    <span className="filename">{item.originalName}</span>
                    {/* <<< LÍNEA DE DESCARGA ELIMINADA DE AQUÍ >>> */}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div><p>Cargando contenido...</p>
          </div>
        )}
        {errorMessage && (
          <div className="error-container">
            <p>⚠️ {errorMessage}</p>
            <button className="upload-button" onClick={() => fetchFolderContent(currentPath)}>
              🔄 Intentar nuevamente
            </button>
          </div>
        )}
        {isEmptyFolder && !isLoading && (
          <div className="error-container">
            <p>La carpeta está vacía.</p>
          </div>
        )}
      </div>
      {currentlyPlaying && (
        <div className="fixed-player">
          <div className="song-info">
            <span>Reproduciendo: </span><strong>{currentlyPlaying.originalName}</strong>
          </div>
          <div className="player-controls">
            <button onClick={handlePrevious} title="Anterior">«</button>
            <button className="main-play-button" onClick={() => setIsPlaying(!isPlaying)} title={isPlaying ? 'Pausar' : 'Reproducir'}>
              {isPlaying ? '⏸' : '▶'}
            </button>
            <button onClick={handleNext} title="Siguiente">»</button>
          </div>
          <input
            type="range"
            value={audioProgress || 0}
            max="100"
            className="progress-bar"
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = (e.target.value / 100) * audioRef.current.duration;
              }
            }}
          />
          <audio
            ref={audioRef}
            src={currentlyPlaying.url}
            onTimeUpdate={(e) => {
              if (e.currentTarget.duration) {
                setAudioProgress((e.currentTarget.currentTime / e.currentTarget.duration) * 100);
              }
            }}
            onEnded={handleNext}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      )}
      <div className="card2">
        <button className="upload-button logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}